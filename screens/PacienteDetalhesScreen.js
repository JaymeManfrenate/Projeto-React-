import React, { useState, useContext } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  Modal,
  ActivityIndicator,
  Alert,
  StyleSheet
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles';

const PacienteDetalhesScreen = ({ route, navigation }) => {
  const { paciente } = route.params;
  const { updatePaciente } = useContext(AuthContext);
  const [showRegistrosModal, setShowRegistrosModal] = useState(false);
  const [novoRegistro, setNovoRegistro] = useState(paciente.registrosDiarios?.toString() || '3');
  const [loading, setLoading] = useState(false);

  const salvarLimiteRegistros = async () => {
    if (!novoRegistro) {
      Alert.alert('Atenção', 'Informe o número de registros diários');
      return;
    }

    setLoading(true);

    try {
      const limite = parseInt(novoRegistro) || 3;
      const pacienteAtualizado = {
        ...paciente,
        registrosDiarios: limite
      };

      await updatePaciente(paciente.email, pacienteAtualizado);
      Alert.alert('Sucesso', `Limite de registros diários definido para ${limite}`);
      setShowRegistrosModal(false);
      navigation.setParams({ paciente: pacienteAtualizado });
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar as alterações');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#3E7BFA" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{paciente.nome}</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Configurações</Text>
          <Text style={styles.itemSubtext}>Medições diárias permitidas: {paciente.registrosDiarios || 3}</Text>
          
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => setShowRegistrosModal(true)}
          >
            <Text style={styles.buttonText}>Alterar Limite Diário</Text>
          </TouchableOpacity>
        </View>

        {/* Restante da tela... */}
      </ScrollView>

      <Modal visible={showRegistrosModal} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Alterar Limite de Registros Diários</Text>
            
            <TextInput
              placeholder="Número de registros"
              value={novoRegistro}
              onChangeText={setNovoRegistro}
              keyboardType="numeric"
              style={styles.modalInput}
            />

            <View style={localStyles.modalButtons}>
              <TouchableOpacity 
                style={[localStyles.modalButton, localStyles.cancelButton]}
                onPress={() => setShowRegistrosModal(false)}
              >
                <Text style={localStyles.modalButtonTextCancel}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[localStyles.modalButton, localStyles.confirmButton]}
                onPress={salvarLimiteRegistros}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={localStyles.modalButtonTextConfirm}>Confirmar</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const localStyles = StyleSheet.create({
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  modalButton: {
    borderRadius: 8,
    padding: 12,
    width: '48%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#E2E8F0',
  },
  confirmButton: {
    backgroundColor: '#3E7BFA',
  },
  modalButtonTextCancel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#64748B',
  },
  modalButtonTextConfirm: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#FFFFFF',
  }
});

export default PacienteDetalhesScreen;