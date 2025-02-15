import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  TextInput,
  Button,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const workoutCategories = [
  { id: '1', name: 'Strength', icon: 'barbell' },
  { id: '2', name: 'Cardio', icon: 'heart' },
  { id: '3', name: 'Yoga', icon: 'body' },
  { id: '4', name: 'HIIT', icon: 'timer' },
];

export default function ExerciseScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [recentWorkouts, setRecentWorkouts] = useState([
    {
      id: '1',
      name: 'Full Body Strength',
      duration: '45 min',
      calories: 320,
      date: '2025-02-14',
    },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newWorkout, setNewWorkout] = useState({
    name: '',
    duration: '',
    calories: '',
  });

  const addWorkout = () => {
    if (!newWorkout.name || !newWorkout.duration || !newWorkout.calories) return;
    setRecentWorkouts([...recentWorkouts, { id: Date.now().toString(), ...newWorkout }]);
    setNewWorkout({ name: '', duration: '', calories: '' });
    setModalVisible(false);
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryCard,
        selectedCategory === item.id && styles.selectedCategory,
      ]}
      onPress={() => setSelectedCategory(item.id)}
    >
      <Ionicons
        name={item.icon}
        size={24}
        color={selectedCategory === item.id ? '#4CAF50' : '#4CAF50'}
      />
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item.id && styles.selectedCategoryText,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderWorkoutItem = ({ item }) => (
    <TouchableOpacity
      style={styles.workoutCard}
      onPress={() => navigation.navigate('WorkoutDetail', { workout: item })}
    >
      <View style={styles.workoutInfo}>
        <Text style={styles.workoutName}>{item.name}</Text>
        <View style={styles.workoutStats}>
          <Text style={styles.workoutStat}>
            <Ionicons name="time-outline" size={16} /> {item.duration}
          </Text>
          <Text style={styles.workoutStat}>
            <Ionicons name="flame-outline" size={16} /> {item.calories} cal
          </Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#666" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Workouts</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.categories}>
        <FlatList
          data={workoutCategories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Workouts</Text>
        <FlatList
          data={recentWorkouts}
          renderItem={renderWorkoutItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add Workout</Text>
          <TextInput
            style={styles.input}
            placeholder="Workout Name"
            value={newWorkout.name}
            onChangeText={(text) => setNewWorkout({ ...newWorkout, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Duration (e.g., 45 min)"
            value={newWorkout.duration}
            onChangeText={(text) => setNewWorkout({ ...newWorkout, duration: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Calories Burned"
            keyboardType="numeric"
            value={newWorkout.calories}
            onChangeText={(text) => setNewWorkout({ ...newWorkout, calories: text })}
          />
          <TouchableOpacity style={styles.button} onPress={addWorkout}>
              <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
          <Button title="Cancel" color="red" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#4CAF50',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  addButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categories: {
    padding: 20,
  },
  categoryCard: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
    width: 100,
  },
  section: {
    flex: 1,
    padding: 20,
  },
  workoutCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    marginBottom: 15, // Adjust the padding as needed
    marginTop: 10,
    paddingVertical: 8, // Optional: to give rounded corners
    alignItems: 'center', // Center the text
  },
  buttonText: {
    color: '#fff', // Text color
    fontSize: 16, // Font size
    fontWeight: 'bold', // Bold text
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
