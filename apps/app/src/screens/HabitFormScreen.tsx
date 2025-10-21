import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type Props = StackScreenProps<RootStackParamList, 'HabitForm'>;

const HabitFormScreen = ({ route, navigation }: Props) => {
  const { habitType } = route.params || {};
  const [value, setValue] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getHabitConfig = () => {
    switch (habitType) {
      case 'water':
        return { title: 'Registrar Agua', unit: 'ml', placeholder: 'Ej: 250' };
      case 'food':
        return { title: 'Registrar Comida', unit: 'g', placeholder: 'Ej: 150' };
      case 'exercise':
        return { title: 'Registrar Ejercicio', unit: 'min', placeholder: 'Ej: 30' };
      default:
        return { title: 'Registrar Hábito', unit: '', placeholder: 'Cantidad' };
    }
  };

  const { title, unit, placeholder } = getHabitConfig();

  const handleSubmit = () => {
    if (!value) {
      alert('Por favor ingresa un valor');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Habit recorded:', { habitType, value, unit, notes });
      setIsSubmitting(false);
      navigation.goBack();
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Cantidad ({unit})</Text>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          keyboardType="numeric"
          value={value}
          onChangeText={setValue}
        />
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Notas (opcional)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Agrega alguna nota..."
          multiline
          numberOfLines={4}
          value={notes}
          onChangeText={setNotes}
        />
      </View>
      
      <TouchableOpacity 
        style={[styles.button, isSubmitting && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={isSubmitting}
      >
        <Text style={styles.buttonText}>
          {isSubmitting ? 'Guardando...' : 'Guardar'}
        </Text>
      </TouchableOpacity>
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
    marginBottom: 30,
    color: '#333',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#4A90E2',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: '#A0C4FF',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HabitFormScreen;
