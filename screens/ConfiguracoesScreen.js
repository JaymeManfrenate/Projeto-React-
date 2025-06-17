import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ConfiguracoesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>
      <View style={styles.comingSoon}>
        <Ionicons name="settings" size={50} color="#4CAF50" />
        <Text style={styles.comingSoonText}>Em desenvolvimento</Text>
        <Text style={styles.comingSoonSubtext}>Esta funcionalidade estará disponível em breve</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333'
  },
  comingSoon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  comingSoonText: {
    fontSize: 20,
    marginTop: 20,
    color: '#4CAF50'
  },
  comingSoonSubtext: {
    fontSize: 16,
    marginTop: 10,
    color: '#666'
  }
});