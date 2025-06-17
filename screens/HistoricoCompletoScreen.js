import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HistoricoCompletoScreen({ route }) {
  const { medicoes } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico Completo ({medicoes.length} medições)</Text>
      
      <FlatList
        data={medicoes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.medicaoItem}>
            <View style={styles.medicaoHeader}>
              <Text style={styles.medicaoData}>{item.data} às {item.horario}</Text>
              <Text style={[
                styles.medicaoValor,
                item.valor > 140 ? styles.medicaoAlta : 
                item.valor < 70 ? styles.medicaoBaixa : null
              ]}>
                {item.valor} mg/dL
              </Text>
            </View>
            {item.observacao && (
              <Text style={styles.medicaoObservacao}>Obs: {item.observacao}</Text>
            )}
          </View>
        )}
      />
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333'
  },
  medicaoItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    elevation: 2
  },
  medicaoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  medicaoData: {
    color: '#666',
    fontSize: 14
  },
  medicaoValor: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#4CAF50'
  },
  medicaoAlta: {
    color: '#f44336'
  },
  medicaoBaixa: {
    color: '#FFC107'
  },
  medicaoObservacao: {
    color: '#666',
    fontStyle: 'italic',
    fontSize: 14,
    marginTop: 5
  }
});