import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type Props = StackScreenProps<RootStackParamList, 'Achievements'>;

const AchievementsScreen = ({}: Props) => {
  // This would come from your API
  const achievements = [
    { id: '1', name: 'Primeros pasos', description: 'Completa tu primer registro', earned: true, date: 'Hoy' },
    { id: '2', name: 'Hidratación constante', description: 'Toma agua por 5 días seguidos', earned: true, date: 'Ayer' },
    { id: '3', name: 'Racha de 7 días', description: 'Registra un hábito por 7 días seguidos', earned: false },
    { id: '4', name: 'Mañana saludable', description: 'Registra ejercicio y desayuno antes del mediodía', earned: false },
  ];

  const earnedAchievements = achievements.filter(a => a.earned);
  const lockedAchievements = achievements.filter(a => !a.earned);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Logros</Text>
        <Text style={styles.subtitle}>
          {earnedAchievements.length} de {achievements.length} logros desbloqueados
        </Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <Text style={styles.sectionTitle}>Desbloqueados</Text>
        {earnedAchievements.length > 0 ? (
          earnedAchievements.map((achievement) => (
            <View key={achievement.id} style={[styles.achievementCard, styles.achievementEarned]}>
              <View style={styles.achievementIcon}>
                <Text style={styles.achievementIconText}>🏆</Text>
              </View>
              <View style={styles.achievementContent}>
                <Text style={styles.achievementName}>{achievement.name}</Text>
                <Text style={styles.achievementDescription}>{achievement.description}</Text>
                <Text style={styles.achievementDate}>{achievement.date}</Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>Aún no has desbloqueado logros</Text>
        )}

        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Por desbloquear</Text>
        {lockedAchievements.map((achievement) => (
          <View key={achievement.id} style={[styles.achievementCard, styles.achievementLocked]}>
            <View style={[styles.achievementIcon, styles.achievementIconLocked]}>
              <Text style={styles.achievementIconText}>🔒</Text>
            </View>
            <View style={styles.achievementContent}>
              <Text style={[styles.achievementName, { color: '#999' }]}>{achievement.name}</Text>
              <Text style={[styles.achievementDescription, { color: '#bbb' }]}>{achievement.description}</Text>
            </View>
          </View>
        ))}
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  achievementCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  achievementEarned: {
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  achievementLocked: {
    opacity: 0.7,
  },
  achievementIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  achievementIconLocked: {
    backgroundColor: '#f0f0f0',
  },
  achievementIconText: {
    fontSize: 24,
  },
  achievementContent: {
    flex: 1,
  },
  achievementName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  achievementDate: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  emptyText: {
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default AchievementsScreen;
