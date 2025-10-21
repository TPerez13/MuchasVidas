import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type Props = StackScreenProps<RootStackParamList, 'History'>;

const HistoryScreen = ({}: Props) => {
  // This would come from your API
  const history = [
    { id: '1', type: 'Agua', value: '500', unit: 'ml', date: 'Hoy, 10:30 AM' },
    { id: '2', type: 'Ejercicio', value: '30', unit: 'min', date: 'Hoy, 08:15 AM' },
    { id: '3', type: 'Comida', value: '200', unit: 'g', date: 'Ayer, 07:30 PM' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial</Text>
      
      {history.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No hay registros aún</Text>
          <Text style={styles.emptySubtext}>Comienza a registrar tus hábitos para verlos aquí</Text>
        </View>
      ) : (
        <ScrollView style={styles.list}>
          {history.map((item) => (
            <View key={item.id} style={styles.historyItem}>
              <View style={styles.itemLeft}>
                <Text style={styles.itemType}>{item.type}</Text>
                <Text style={styles.itemDate}>{item.date}</Text>
              </View>
              <View style={styles.itemRight}>
                <Text style={styles.itemValue}>
                  {item.value} <Text style={styles.itemUnit}>{item.unit}</Text>
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  list: {
    flex: 1,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemLeft: {
    flex: 1,
  },
  itemType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 12,
    color: '#999',
  },
  itemRight: {
    marginLeft: 10,
  },
  itemValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4A90E2',
  },
  itemUnit: {
    fontSize: 12,
    color: '#999',
  },
});

export default HistoryScreen;
