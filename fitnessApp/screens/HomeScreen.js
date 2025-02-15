import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function HomeScreen({ navigation }) {
  const { user } = useAuth();
  const [todayStats, setTodayStats] = useState({
    steps: 6543,
    calories: 420,
    workouts: 1,
    waterIntake: 1.5,
  });

  // Random email for demonstration purposes
  const randomEmail = "john.doe@example.com"; // Replace with user.email when available
  const profilePic = user?.profilePic || randomEmail.charAt(0).toUpperCase(); // Use first letter of email

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#388E3C" barStyle="light-content" />
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.greeting}>Hello, {user?.name || "User"}!</Text>
            <Text style={styles.date}>
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </View>
          <TouchableOpacity style={styles.profilePic} onPress={() => navigation.navigate('Profile')}>
            {user?.profilePic ? (
              <Image source={{ uri: user.profilePic }} style={styles.image} />
            ) : (
              <View style={styles.placeholder}>
                <Text style={styles.placeholderText}>{profilePic}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.statsGrid}>
          <TouchableOpacity 
            style={styles.statCard}
            onPress={() => navigation.navigate('Progress')}
          >
            <Text style={styles.statValue}>{todayStats.steps}</Text>
            <Text style={styles.statLabel}>Steps</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.statCard}
            onPress={() => navigation.navigate('Nutrition')}
          >
            <Text style={styles.statValue}>{todayStats.calories}</Text>
            <Text style={styles.statLabel}>Calories Burned</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.statCard}
            onPress={() => navigation.navigate('Workout')}
          >
            <Text style={styles.statValue}>{todayStats.workouts}</Text>
            <Text style={styles.statLabel}>Workouts</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.statCard}
            onPress={() => navigation.navigate('Nutrition')}
          >
            <Text style={styles.statValue}>{todayStats.waterIntake}L</Text>
            <Text style={styles.statLabel}>Water Intake</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.quickActions}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#4CAF50' }]}
            onPress={() => navigation.navigate('WorkoutDetail')}
          >
            <Text style={styles.actionButtonText}>Start Workout</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#2196F3' }]}
            onPress={() => navigation.navigate('MealPlanner')}
          >
            <Text style={styles.actionButtonText}>Log Meal</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Schedule</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {/* Add scheduled workouts/meals here */}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activities</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {/* Add recent activities here */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContent: {
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  date: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: '50%',
    overflow: 'hidden',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
    borderRadius: 20,
  },
  placeholderText: {
    fontSize: 18,
    color: '#666',
    fontWeight: 'bold',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  statCard: {
    width: '45%',
    backgroundColor: '#f5f5f5',
    padding: 15,
    margin: '2.5%',
    borderRadius: 10,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  quickActions: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAll: {
    color: '#4CAF50',
    fontSize: 14,
  },
});