import React, { useState, useEffect, useContext } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  FlatList,
  ActivityIndicator,
  Alert,
  StyleSheet,
  Image,
  Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PatientScreen = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);
  const [paciente, setPaciente] = useState(null);
  const [glicemia, setGlicemia] = useState('');
  const [observacao, setObservacao] = useState('');
  const [loading, setLoading] = useState(false);
  const [showExameModal, setShowExameModal] = useState(false);
  const [novoExame, setNovoExame] = useState({ nome: '', uri: '' });
  const [mediçõesHoje, setMedicoesHoje] = useState(0);
  const [modalExameVisible, setModalExameVisible] = useState(false);
  const [exameSelecionado, setExameSelecionado] = useState(null);

  useEffect(() => {
    const loadPaciente = async () => {
      try {
        if (!user?.email) return;
        
        const pacienteData = await AsyncStorage.getItem(`paciente_${user.email}`);
        if (pacienteData) {
          const pacienteObj = JSON.parse(pacienteData);
          setPaciente(pacienteObj);
          
          const hoje = new Date().toLocaleDateString('pt-BR');
          const count = pacienteObj.medicoes?.filter(m => m.data === hoje).length || 0;
          setMedicoesHoje(count);
        }
      } catch (error) {
        console.error('Erro ao carregar paciente:', error);
        Alert.alert('Erro', 'Não foi possível carregar os dados do paciente');
      }
    };
    
    loadPaciente();

    const focusListener = navigation.addListener('focus', loadPaciente);
    return () => focusListener();
  }, [user, navigation]);

  const registrarMedicao = async () => {
    if (!paciente || !user?.email) return;

    if (mediçõesHoje >= (paciente.registrosDiarios || 3)) {
      Alert.alert('Limite atingido', `Você já realizou ${paciente.registrosDiarios || 3} medições hoje`);
      return;
    }

    if (!glicemia || isNaN(glicemia)) {
      Alert.alert('Valor inválido', 'Informe um valor numérico para glicemia');
      return;
    }

    try {
      setLoading(true);
      const novaMedicao = {
        id: Date.now().toString(),
        valor: parseInt(glicemia),
        data: new Date().toLocaleDateString('pt-BR'),
        horario: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        observacao: observacao || 'Sem observação'
      };

      const pacienteAtualizado = {
        ...paciente,
        medicoes: [novaMedicao, ...(paciente.medicoes || [])]
      };

      await AsyncStorage.setItem(`paciente_${user.email}`, JSON.stringify(pacienteAtualizado));
      setPaciente(pacienteAtualizado);
      setMedicoesHoje(prev => prev + 1);
      setGlicemia('');
      setObservacao('');
    } catch (error) {
      console.error('Erro ao registrar medição:', error);
      Alert.alert('Erro', 'Não foi possível registrar a medição');
    } finally {
      setLoading(false);
    }
  };

  const selecionarImagem = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Precisamos acessar sua galeria para adicionar exames');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
      });

      if (!result.canceled && result.assets?.[0]?.uri) {
        setNovoExame({ ...novoExame, uri: result.assets[0].uri });
      }
    } catch (error) {
      console.error('Erro ao selecionar imagem:', error);
      Alert.alert('Erro', 'Não foi possível selecionar a imagem');
    }
  };

  const salvarExame = async () => {
    if (!novoExame.nome || !novoExame.uri || !paciente || !user?.email) {
      Alert.alert('Atenção', 'Preencha todos os campos');
      return;
    }

    try {
      setLoading(true);
      const exame = {
        id: Date.now().toString(),
        nome: novoExame.nome,
        data: new Date().toLocaleDateString('pt-BR'),
        uri: novoExame.uri,
        status: 'pendente'
      };

      const pacienteAtualizado = {
        ...paciente,
        exames: [exame, ...(paciente.exames || [])]
      };

      await AsyncStorage.setItem(`paciente_${user.email}`, JSON.stringify(pacienteAtualizado));
      setPaciente(pacienteAtualizado);
      setNovoExame({ nome: '', uri: '' });
      setShowExameModal(false);
      Alert.alert('Sucesso', 'Exame salvo e disponível para o médico');
    } catch (error) {
      console.error('Erro ao salvar exame:', error);
      Alert.alert('Erro', 'Não foi possível salvar o exame');
    } finally {
      setLoading(false);
    }
  };

  const getCorGlicemia = (valor) => {
    if (!valor) return styles.normal;
    if (valor > 180) return styles.alto;
    if (valor < 70) return styles.baixo;
    return styles.normal;
  };

  const renderNomeUsuario = () => {
    if (!user) return 'Paciente';
    return paciente?.nome || user.nome || user.email || 'Paciente';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.replace('Login')} style={{ padding: 8 }}>
          <Ionicons name="arrow-back" size={24} color="#3E7BFA" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meu Painel</Text>
        <View style={{ width: 24 }} />
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3E7BFA" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.card}>
            <Text style={styles.saudacao}>Bem-vindo, {renderNomeUsuario()}</Text>
            <View style={styles.limiteContainer}>
              <Text style={styles.limiteText}>
                {mediçõesHoje}/{paciente?.registrosDiarios || 3} medições hoje
              </Text>
              <View style={[
                styles.limiteBarra,
                { width: `${(mediçõesHoje / (paciente?.registrosDiarios || 3)) * 100}%` }
              ]}/>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Registrar Medição</Text>
            
            <View style={styles.inputGroup}>
              <Ionicons name="pulse" size={20} color="#64748B" style={styles.inputIcon} />
              <TextInput
                placeholder="Valor da glicemia (mg/dL)"
                value={glicemia}
                onChangeText={setGlicemia}
                style={styles.input}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Ionicons name="document-text" size={20} color="#64748B" style={styles.inputIcon} />
              <TextInput
                placeholder="Observação (opcional)"
                value={observacao}
                onChangeText={setObservacao}
                style={styles.input}
              />
            </View>

            <TouchableOpacity
              style={[
                styles.primaryButton,
                (mediçõesHoje >= (paciente?.registrosDiarios || 3)) && styles.buttonDisabled
              ]}
              onPress={registrarMedicao}
              disabled={mediçõesHoje >= (paciente?.registrosDiarios || 3) || loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.buttonText}>
                  {mediçõesHoje >= (paciente?.registrosDiarios || 3) ? 'Limite Atingido' : 'Registrar Medição'}
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Histórico</Text>
              {paciente?.medicoes?.length > 0 && (
                <TouchableOpacity onPress={() => navigation.navigate('HistoricoCompleto', { medicoes: paciente.medicoes })}>
                  <Text style={styles.verTodos}>Ver tudo</Text>
                </TouchableOpacity>
              )}
            </View>
            
            {paciente?.medicoes?.length > 0 ? (
              <FlatList
                data={[...(paciente.medicoes || [])]
                  .sort((a, b) => new Date(b.data.split('/').reverse().join('/')) - new Date(a.data.split('/').reverse().join('/')))
                  .slice(0, 5)}
                keyExtractor={item => item.id}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <View style={styles.medicaoItem}>
                    <View>
                      <Text style={styles.medicaoHorario}>{item.horario}</Text>
                      {item.observacao && item.observacao !== 'Sem observação' && (
                        <Text style={styles.medicaoObs}>Obs: {item.observacao}</Text>
                      )}
                    </View>
                    <Text style={[styles.medicaoValor, getCorGlicemia(item.valor)]}>
                      {item.valor} mg/dL
                    </Text>
                  </View>
                )}
              />
            ) : (
              <Text style={styles.emptyText}>Nenhuma medição registrada</Text>
            )}
          </View>

          <View style={styles.card}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Meus Exames</Text>
              <TouchableOpacity 
                style={styles.secondaryButton}
                onPress={() => setShowExameModal(true)}
              >
                <Text style={styles.secondaryButtonText}>+ Adicionar</Text>
              </TouchableOpacity>
            </View>
            
            {paciente?.exames?.length > 0 ? (
              <FlatList
                data={(paciente.exames || []).slice(0, 3)}
                keyExtractor={item => item.id}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <TouchableOpacity 
                    style={{ width: '48%', marginBottom: 12 }}
                    onPress={() => {
                      setExameSelecionado(item);
                      setModalExameVisible(true);
                    }}
                  >
                    <Image 
                      source={{ uri: item.uri }} 
                      style={{ width: '100%', height: 120, borderRadius: 8, backgroundColor: '#F1F5F9' }}
                    />
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 12, color: '#64748B', marginTop: 4 }}>
                      {item.nome}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <Text style={styles.emptyText}>Nenhum exame cadastrado</Text>
            )}
          </View>
        </ScrollView>
      )}

      <Modal visible={showExameModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Adicionar Exame</Text>
            
            <TextInput
              placeholder="Nome do exame"
              value={novoExame.nome}
              onChangeText={text => setNovoExame({...novoExame, nome: text})}
              style={styles.modalInput}
            />

            <TouchableOpacity
              style={styles.imageButton}
              onPress={selecionarImagem}
            >
              <Ionicons 
                name={novoExame.uri ? "checkmark-circle" : "image"} 
                size={24} 
                color={novoExame.uri ? "#10B981" : "#3E7BFA"} 
              />
              <Text style={styles.imageButtonText}>
                {novoExame.uri ? 'Imagem Selecionada' : 'Selecionar Imagem'}
              </Text>
            </TouchableOpacity>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowExameModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={salvarExame}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.confirmButtonText}>Salvar Exame</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={modalExameVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <Text style={styles.sectionTitle}>{exameSelecionado?.nome}</Text>
              <TouchableOpacity onPress={() => setModalExameVisible(false)}>
                <Ionicons name="close" size={24} color="#64748B" />
              </TouchableOpacity>
            </View>
            
            <Image 
              source={{ uri: exameSelecionado?.uri }} 
              style={{ width: '100%', height: 300, marginBottom: 16 }}
              resizeMode="contain"
            />
            
            <Text style={styles.itemSubtext}>
              Enviado em: {exameSelecionado?.data}
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FBFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 40,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E8F1FB',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#0A2463',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 12,
  },
  content: {
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EDF4FF',
    shadowColor: '#3E7BFA',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saudacao: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#0A2463',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#0A2463',
    marginBottom: 16,
  },
  emptyText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 16,
  },
  verTodos: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#3E7BFA',
  },
  limiteContainer: {
    marginTop: 8,
    height: 24,
    backgroundColor: '#E2E8F0',
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  limiteText: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#0A2463',
    zIndex: 1,
    lineHeight: 24,
  },
  limiteBarra: {
    height: '100%',
    backgroundColor: '#3E7BFA',
    opacity: 0.2,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FBFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    borderColor: '#E1EBFA',
    marginBottom: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: '100%',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#1E3A8A',
  },
  primaryButton: {
    backgroundColor: '#3E7BFA',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
  buttonDisabled: {
    backgroundColor: '#94A3B8',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#3E7BFA',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  secondaryButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#3E7BFA',
  },
  medicaoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  medicaoHorario: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: '#1E3A8A',
  },
  medicaoObs: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: '#64748B',
    marginTop: 4,
  },
  medicaoValor: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  normal: {
    color: '#10B981',
  },
  alto: {
    color: '#EF4444',
  },
  baixo: {
    color: '#F59E0B',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(10, 36, 99, 0.7)',
    justifyContent: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
  },
  modalTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#0A2463',
    marginBottom: 24,
    textAlign: 'center',
  },
  modalInput: {
    backgroundColor: '#F8FBFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E1EBFA',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#1E3A8A',
    marginBottom: 16,
  },
  imageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#E1EBFA',
    borderRadius: 12,
    marginBottom: 24,
  },
  imageButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#3E7BFA',
    marginLeft: 12,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    borderRadius: 12,
    padding: 16,
    flex: 1,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#E2E8F0',
    marginRight: 8,
  },
  confirmButton: {
    backgroundColor: '#3E7BFA',
    marginLeft: 8,
  },
  cancelButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#64748B',
  },
  confirmButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(10, 36, 99, 0.7)',
  },
});

export default PatientScreen;