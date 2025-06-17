import React, { useState, useContext } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Atenção', 'Preencha todos os campos');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Alert.alert('Atenção', 'Informe um e-mail válido');
      return;
    }

    setLoading(true);
    try {
      const isMedico = email === 'medico@clinica.com';
      const success = await login(email, senha, isMedico);
      
      if (success) {
        navigation.replace(isMedico ? 'Admin' : 'Patient');
      } else {
        Alert.alert('Erro', 'E-mail ou senha incorretos');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um problema ao fazer login');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.loginContainer}>
      <Ionicons 
        name="medical" 
        size={64} 
        color="#3E7BFA" 
        style={styles.logo} 
      />
      <Text style={styles.loginTitle}>Controle Glicêmico</Text>
      
      <View style={styles.inputGroup}>
        <Ionicons name="mail" size={20} color="#64748B" style={{ marginRight: 8 }} />
        <TextInput
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      
      <View style={styles.inputGroup}>
        <Ionicons name="lock-closed" size={20} color="#64748B" style={{ marginRight: 8 }} />
        <TextInput
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          style={styles.input}
          secureTextEntry
        />
      </View>
      
      <TouchableOpacity 
        style={[styles.loginButton, loading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.loginButtonText}>Entrar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}