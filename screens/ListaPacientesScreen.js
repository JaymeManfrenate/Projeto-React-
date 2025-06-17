import React, { useState, useEffect, useContext } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  ActivityIndicator,
  RefreshControl,
  Alert,
  StyleSheet
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles';

const ListaPacientesScreen = ({ navigation }) => {
  const [pacientes, setPacientes] = useState([]);
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { logout } = useContext(AuthContext);

  const carregarPacientes = async () => {
    try {
      setLoading(true);
      const keys = await AsyncStorage.getAllKeys();
      const pacientesKeys = keys.filter(k => k.startsWith('paciente_'));
      
      if (pacientesKeys.length === 0) {
        setPacientes([]);
        return;
      }

      const pacientesData = await AsyncStorage.multiGet(pacientesKeys);
      
      const pacientesFormatados = pacientesData.map(([key, value]) => {
        try {
          const paciente = JSON.parse(value);
          return {
            ...paciente,
            id: key.replace('paciente_', ''),
            ultimaMedicao: paciente.medicoes?.length > 0 
              ? paciente.medicoes[0] 
              : null,
            examesPendentes: paciente.exames?.filter(e => e.status === 'pendente').length || 0
          };
        } catch (e) {
          console.error(`Erro ao parsear paciente ${key}`, e);
          return null;
        }
      }).filter(Boolean);

      setPacientes(pacientesFormatados);
    } catch (error) {
      console.error('Erro ao carregar pacientes:', error);
      Alert.alert('Erro', 'Não foi possível carregar os pacientes');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await carregarPacientes();
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', carregarPacientes);
    return unsubscribe;
  }, [navigation]);

  const pacientesFiltrados = pacientes.filter(p => {
    if (!p?.nome || !p?.email) return false;
    const searchTerm = busca.toLowerCase();
    return (
      p.nome.toLowerCase().includes(searchTerm) ||
      p.email.toLowerCase().includes(searchTerm)
    );
  });

  const handleLogout = () => {
    logout();
    navigation.replace('Login');
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pacientes</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Ionicons name="log-out" size={24} color="#f44336" />
        </TouchableOpacity>
      </View>

      <View style={styles.buscaContainer}>
        <Ionicons name="search" size={20} color="#999" />
        <TextInput
          placeholder="Buscar por nome ou e-mail"
          value={busca}
          onChangeText={setBusca}
          style={styles.inputBusca}
        />
      </View>

      <FlatList
        data={pacientesFiltrados}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#4CAF50']}
          />
        }
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.itemPaciente}
            onPress={() => navigation.navigate('PacienteDetalhes', { paciente: item })}
          >
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flex: 1}}>
                <Text style={styles.nomePaciente}>{item.nome || 'Nome não disponível'}</Text>
                <View style={{flexDirection: 'row', marginTop: 4}}>
                  {item.ultimaMedicao && (
                    <View style={[localStyles.statusBadge, 
                      item.ultimaMedicao.valor > 140 ? localStyles.statusAlerta : 
                      item.ultimaMedicao.valor < 70 ? localStyles.statusAlerta : localStyles.statusNormal]}>
                      <Text style={localStyles.statusText}>{item.ultimaMedicao.valor} mg/dL</Text>
                    </View>
                  )}
                  {item.examesPendentes > 0 && (
                    <View style={localStyles.exameBadge}>
                      <Text style={localStyles.exameText}>{item.examesPendentes} exame(s) novo(s)</Text>
                    </View>
                  )}
                </View>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#999" />
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyMessage}>
            {busca ? 'Nenhum paciente encontrado' : 'Nenhum paciente cadastrado'}
          </Text>
        }
      />
    </View>
  );
};

const localStyles = StyleSheet.create({
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    alignSelf: 'flex-start'
  },
  statusNormal: {
    backgroundColor: '#E6F6ED',
  },
  statusAlerta: {
    backgroundColor: '#FEE2E2',
  },
  statusText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#065F46'
  },
  exameBadge: {
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start'
  },
  exameText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#1E40AF'
  }
});

export default ListaPacientesScreen;