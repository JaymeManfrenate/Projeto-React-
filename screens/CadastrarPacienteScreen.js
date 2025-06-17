import React, { useState, useContext } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  View,
  StyleSheet
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles';

// Funções de máscara
const maskPhone = (value) => {
  if (!value) return '';
  value = value.replace(/\D/g, '');
  if (value.length > 11) value = value.substring(0, 11);
  if (value.length <= 10) {
    return value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }
  return value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
};

const maskDate = (value) => {
  if (!value) return '';
  value = value.replace(/\D/g, '');
  if (value.length > 8) value = value.substring(0, 8);
  if (value.length > 4) {
    return value.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
  } else if (value.length > 2) {
    return value.replace(/(\d{2})(\d{2})/, '$1/$2/');
  }
  return value;
};

export default function CadastrarPacienteScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [telefone, setTelefone] = useState('');
  const [registrosDiarios, setRegistrosDiarios] = useState('3');
  const [loading, setLoading] = useState(false);
  const { hashPassword } = useContext(AuthContext);

  const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validarData = (data) => {
    const re = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!re.test(data)) return false;
    const [dia, mes, ano] = data.split('/');
    const date = new Date(ano, mes - 1, dia);
    return date.getFullYear() == ano && date.getMonth() + 1 == mes && date.getDate() == dia;
  };

  const handleCadastro = async () => {
    try {
      if (!nome.trim()) throw new Error('Informe o nome completo');
      if (!email.trim()) throw new Error('Informe o e-mail');
      if (!dataNascimento.trim()) throw new Error('Informe a data de nascimento');
      if (!telefone.trim()) throw new Error('Informe o telefone');
      if (!validarEmail(email)) throw new Error('E-mail inválido (exemplo@dominio.com)');
      if (!validarData(dataNascimento)) throw new Error('Data inválida (DD/MM/AAAA)');

      const telefoneNumeros = telefone.replace(/\D/g, '');
      if (telefoneNumeros.length < 10 || telefoneNumeros.length > 11) {
        throw new Error('Telefone inválido (XX) XXXXX-XXXX');
      }

      setLoading(true);
      if (await AsyncStorage.getItem(`paciente_${email}`)) {
        throw new Error('E-mail já cadastrado');
      }

      const senha = Math.random().toString(36).slice(-8);
      const novoPaciente = {
        nome: nome.trim(),
        email: email.trim().toLowerCase(),
        senhaHash: hashPassword(senha),
        dataNascimento,
        telefone: telefoneNumeros,
        registrosDiarios: parseInt(registrosDiarios) || 3,
        diasLimite: 7,
        medicoes: [],
        exames: [],
        criadoEm: new Date().toISOString()
      };

      await AsyncStorage.setItem(`paciente_${email}`, JSON.stringify(novoPaciente));

      Alert.alert(
        'Cadastro realizado!',
        `Paciente cadastrado com sucesso.\n\nE-mail: ${email}\nSenha temporária: ${senha}`,
        [{ text: 'OK', onPress: () => navigation.navigate('ListaPacientes') }]
      );
    } catch (error) {
      Alert.alert('Erro no cadastro', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <View style={localStyles.header}>
        <Text style={localStyles.title}>CADASTRAR PACIENTE</Text>
      </View>

      <View style={styles.card}>
        {/* Campo Nome */}
        <View style={styles.inputGroup}>
          <Ionicons name="person" size={20} color="#64748B" style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Nome Completo"
            value={nome}
            onChangeText={setNome}
            style={styles.input}
            autoCapitalize="words"
          />
        </View>

        {/* Campo Email */}
        <View style={styles.inputGroup}>
          <Ionicons name="mail" size={20} color="#64748B" style={{ marginRight: 8 }} />
          <TextInput
            placeholder="E-mail (exemplo@dominio.com)"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Campo Data de Nascimento */}
        <View style={styles.inputGroup}>
          <Ionicons name="calendar" size={20} color="#64748B" style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Data de Nascimento (DD/MM/AAAA)"
            value={dataNascimento}
            onChangeText={(text) => setDataNascimento(maskDate(text))}
            style={styles.input}
            keyboardType="numeric"
          />
        </View>

        {/* Campo Telefone */}
        <View style={styles.inputGroup}>
          <Ionicons name="call" size={20} color="#64748B" style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Telefone (XX) XXXXX-XXXX"
            value={telefone}
            onChangeText={(text) => setTelefone(maskPhone(text))}
            style={styles.input}
            keyboardType="phone-pad"
          />
        </View>

        <TouchableOpacity
          style={[styles.primaryButton, { marginTop: 20 }]}
          onPress={handleCadastro}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>CADASTRAR</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const localStyles = StyleSheet.create({
  header: {
    padding: 24,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E8F1FB'
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#0A2463',
    textAlign: 'center'
  }
});