import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ExameItem({ exame, onPress }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Ionicons name="document" size={24} color="#4CAF50" />
        <Text style={styles.nome}>{exame.nome}</Text>
      </TouchableOpacity>
      <Text style={styles.data}>{exame.data}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  nome: {
    marginLeft: 10,
    color: '#333',
    fontWeight: '500'
  },
  data: {
    color: '#666',
    fontSize: 12
  }
});