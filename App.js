import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './context/AuthContext';
import LoginScreen from './screens/LoginScreen';
import AdminScreen from './screens/AdminScreen';
import CadastrarPacienteScreen from './screens/CadastrarPacienteScreen';
import ListaPacientesScreen from './screens/ListaPacientesScreen';
import PatientScreen from './screens/PatientScreen';
import HistoricoCompletoScreen from './screens/HistoricoCompletoScreen';
import PacienteDetalhesScreen from './screens/PacienteDetalhesScreen';
import RelatoriosScreen from './screens/RelatoriosScreen';
import ConfiguracoesScreen from './screens/ConfiguracoesScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Admin" 
            component={AdminScreen} 
            options={{ 
              title: 'Painel Médico',
              headerStyle: {
                backgroundColor: '#FFFFFF',
                shadowColor: 'transparent',
                elevation: 0,
              },
              headerTintColor: '#0A2463',
              headerTitleStyle: {
                fontFamily: 'Poppins-SemiBold',
              }
            }} 
          />
          <Stack.Screen 
            name="CadastrarPaciente" 
            component={CadastrarPacienteScreen} 
            options={{ 
              title: '',
              headerStyle: {
                backgroundColor: '#FFFFFF',
                shadowColor: 'transparent',
                elevation: 0,
              },
              headerTintColor: '#0A2463',
            }} 
          />
          <Stack.Screen 
            name="ListaPacientes" 
            component={ListaPacientesScreen} 
            options={{ 
              title: 'Pacientes',
              headerStyle: {
                backgroundColor: '#FFFFFF',
                shadowColor: 'transparent',
                elevation: 0,
              },
              headerTintColor: '#0A2463',
              headerTitleStyle: {
                fontFamily: 'Poppins-SemiBold',
              }
            }} 
          />
          <Stack.Screen 
            name="Patient" 
            component={PatientScreen} 
            options={{ 
              title: 'Meu Painel',
              headerStyle: {
                backgroundColor: '#FFFFFF',
                shadowColor: 'transparent',
                elevation: 0,
              },
              headerTintColor: '#0A2463',
              headerTitleStyle: {
                fontFamily: 'Poppins-SemiBold',
              }
            }} 
          />
          <Stack.Screen 
            name="HistoricoCompleto" 
            component={HistoricoCompletoScreen} 
            options={{ 
              title: 'Histórico',
              headerStyle: {
                backgroundColor: '#FFFFFF',
                shadowColor: 'transparent',
                elevation: 0,
              },
              headerTintColor: '#0A2463',
              headerTitleStyle: {
                fontFamily: 'Poppins-SemiBold',
              }
            }} 
          />
          <Stack.Screen 
            name="PacienteDetalhes" 
            component={PacienteDetalhesScreen} 
            options={{ 
              title: 'Detalhes',
              headerStyle: {
                backgroundColor: '#FFFFFF',
                shadowColor: 'transparent',
                elevation: 0,
              },
              headerTintColor: '#0A2463',
              headerTitleStyle: {
                fontFamily: 'Poppins-SemiBold',
              }
            }} 
          />
          <Stack.Screen 
            name="Relatorios" 
            component={RelatoriosScreen} 
            options={{ 
              title: 'Relatórios',
              headerStyle: {
                backgroundColor: '#FFFFFF',
                shadowColor: 'transparent',
                elevation: 0,
              },
              headerTintColor: '#0A2463',
              headerTitleStyle: {
                fontFamily: 'Poppins-SemiBold',
              }
            }} 
          />
          <Stack.Screen 
            name="Configuracoes" 
            component={ConfiguracoesScreen} 
            options={{ 
              title: 'Configurações',
              headerStyle: {
                backgroundColor: '#FFFFFF',
                shadowColor: 'transparent',
                elevation: 0,
              },
              headerTintColor: '#0A2463',
              headerTitleStyle: {
                fontFamily: 'Poppins-SemiBold',
              }
            }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}