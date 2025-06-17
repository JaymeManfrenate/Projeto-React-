import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isMedico, setIsMedico] = useState(false);

  // Função de hash simplificada para protótipo
  const hashPassword = (password) => {
    return password; // Em produção, substitua por um hash real
  };

  const login = async (email, password, medico = false) => {
    try {
      // Login do médico (senha fixa para protótipo)
      if (medico) {
        if (email === 'medico@clinica.com' && password === 'senha123') {
          setUser({ email, nome: "Médico" });
          setIsMedico(true);
          return true;
        }
        return false;
      }

      // Login do paciente
      const pacienteData = await AsyncStorage.getItem(`paciente_${email}`);
      if (!pacienteData) return false;
      
      const paciente = JSON.parse(pacienteData);
      
      // Comparação direta (protótipo)
      if (password === paciente.senhaHash) {
        setUser(paciente);
        setIsMedico(false);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsMedico(false);
  };

  const updatePaciente = async (email, pacienteAtualizado) => {
    try {
      await AsyncStorage.setItem(`paciente_${email}`, JSON.stringify(pacienteAtualizado));
      return true;
    } catch (error) {
      console.error('Erro ao atualizar paciente:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, isMedico, login, logout, hashPassword, updatePaciente }}>
      {children}
    </AuthContext.Provider>
  );
};
