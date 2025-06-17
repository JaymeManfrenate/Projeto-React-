import React, { useContext } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles';

export default function AdminScreen({ navigation }) {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigation.navigate('Login');
  };

  const MenuCard = ({ icon, title, color, onPress }) => (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: color }]}
      onPress={onPress}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons name={icon} size={28} color="white" />
        <Text style={styles.cardText}>{title}</Text>
      </View>
      <MaterialIcons name="chevron-right" size={24} color="white" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerProfile}>
          <View style={styles.avatarPlaceholder}>
            <Ionicons name="medical" size={24} color="#3E7BFA" />
          </View>
          <Text style={styles.headerTitle}>Painel Médico</Text>
        </View>
        <TouchableOpacity onPress={handleLogout}>
          <Ionicons name="exit-outline" size={24} color="#64748B" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <MenuCard
          icon="person-add"
          title="Cadastrar Paciente"
          color="#3E7BFA"
          onPress={() => navigation.navigate('CadastrarPaciente')}
        />

        <MenuCard
          icon="people"
          title="Lista de Pacientes"
          color="#10B981"
          onPress={() => navigation.navigate('ListaPacientes')}
        />

        <MenuCard
          icon="document-text"
          title="Relatórios"
          color="#F59E0B"
          onPress={() => navigation.navigate('Relatorios')}
        />

        <MenuCard
          icon="settings"
          title="Configurações"
          color="#8B5CF6"
          onPress={() => navigation.navigate('Configuracoes')}
        />
      </ScrollView>
    </View>
  );
}