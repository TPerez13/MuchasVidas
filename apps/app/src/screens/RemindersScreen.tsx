import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type Props = StackScreenProps<RootStackParamList, 'Reminders'>;

type Reminder = {
  id: string;
  title: string;
  time: string;
  enabled: boolean;
  days: {
    sun: boolean;
    mon: boolean;
    tue: boolean;
    wed: boolean;
    thu: boolean;
    fri: boolean;
    sat: boolean;
  };
};

const RemindersScreen = ({}: Props) => {
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      title: 'Recordatorio mañanero',
      time: '07:00',
      enabled: true,
      days: {
        mon: true,
        tue: true,
        wed: true,
        thu: true,
        fri: true,
        sat: false,
        sun: false,
      },
    },
    {
      id: '2',
      title: 'Recordatorio de mediodía',
      time: '12:30',
      enabled: true,
      days: {
        mon: true,
        tue: true,
        wed: true,
        thu: true,
        fri: true,
        sat: false,
        sun: false,
      },
    },
    {
      id: '3',
      title: 'Recordatorio nocturno',
      time: '20:00',
      enabled: false,
      days: {
        mon: true,
        tue: true,
        wed: true,
        thu: true,
        fri: true,
        sat: true,
        sun: true,
      },
    },
  ]);

  const toggleReminder = (id: string) => {
    setReminders(prev => 
      prev.map(reminder => 
        reminder.id === id 
          ? { ...reminder, enabled: !reminder.enabled } 
          : reminder
      )
    );
  };

  const days = [
    { key: 'sun', label: 'D' },
    { key: 'mon', label: 'L' },
    { key: 'tue', label: 'M' },
    { key: 'wed', label: 'M' },
    { key: 'thu', label: 'J' },
    { key: 'fri', label: 'V' },
    { key: 'sat', label: 'S' },
  ] as const;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recordatorios</Text>
        <Text style={styles.subtitle}>Configura recordatorios para mantener tus hábitos</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {reminders.map((reminder) => (
          <View key={reminder.id} style={styles.reminderCard}>
            <View style={styles.reminderHeader}>
              <Text style={styles.reminderTitle}>{reminder.title}</Text>
              <Switch
                value={reminder.enabled}
                onValueChange={() => toggleReminder(reminder.id)}
                trackColor={{ false: '#e0e0e0', true: '#4CAF50' }}
                thumbColor="white"
              />
            </View>
            
            <Text style={styles.reminderTime}>{reminder.time}</Text>
            
            <View style={styles.daysContainer}>
              {days.map((day) => (
                <View 
                  key={day.key} 
                  style={[
                    styles.dayPill, 
                    reminder.days[day.key] && styles.dayPillActive,
                    !reminder.enabled && styles.dayPillDisabled
                  ]}
                >
                  <Text 
                    style={[
                      styles.dayText,
                      reminder.days[day.key] && styles.dayTextActive,
                      !reminder.enabled && styles.dayTextDisabled
                    ]}
                  >
                    {day.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ))}
        
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Agregar recordatorio</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    backgroundColor: '#4A90E2',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  reminderCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  reminderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  reminderTime: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 16,
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayPill: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  dayPillActive: {
    backgroundColor: '#4CAF50',
  },
  dayPillDisabled: {
    opacity: 0.5,
  },
  dayText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  dayTextActive: {
    color: '#fff',
  },
  dayTextDisabled: {
    color: '#999',
  },
  addButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default RemindersScreen;
