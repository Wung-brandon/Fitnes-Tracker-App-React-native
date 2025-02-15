import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  TextInput,
  Button,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from 'react-native-picker-select';

const workoutCategories = [
  { id: '1', name: 'Strength', icon: 'barbell' },
  { id: '2', name: 'Cardio', icon: 'heart' },
  { id: '3', name: 'Yoga', icon: 'body' },
  { id: '4', name: 'HIIT', icon: 'timer' },
];

export default function ExerciseScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [recentWorkouts, setRecentWorkouts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editWorkoutId, setEditWorkoutId] = useState(null)
  const [newWorkout, setNewWorkout] = useState({
    name: '',
    duration: '',
    calories: '',
    category: null,  // Added category to the workout
  });

  const addWorkout = () => {
    if (!newWorkout.name || !newWorkout.duration || !newWorkout.calories || !newWorkout.category) return;
    setRecentWorkouts([
      ...recentWorkouts,
      { id: Date.now().toString(), ...newWorkout },
    ]);
    setNewWorkout({ name: '', duration: '', calories: '', category: null });
    setModalVisible(false);
  };

   // Load workouts from local storage when the component mounts
   useEffect(() => {
    loadWorkouts();
  }, []);

  // Save workouts to local storage
  const saveWorkouts = async (workouts) => {
    try {
      await AsyncStorage.setItem('workouts', JSON.stringify(workouts));
      setRecentWorkouts(workouts);
    } catch (error) {
      console.error('Error saving workouts:', error);
    }
  };

  // Load workouts from local storage
  const loadWorkouts = async () => {
    try {
      const storedWorkouts = await AsyncStorage.getItem('workouts');
      if (storedWorkouts) {
        setRecentWorkouts(JSON.parse(storedWorkouts));
      }
    } catch (error) {
      console.error('Error loading workouts:', error);
    }
  };

  // Add a new workout or update an existing one
  const handleWorkoutSave = () => {
    if (!newWorkout.name || !newWorkout.duration || !newWorkout.calories || !newWorkout.category) return;

    if (isEditing) {
      // Update an existing workout
      const updatedWorkouts = recentWorkouts.map(workout =>
        workout.id === editWorkoutId ? { ...workout, ...newWorkout } : workout
      );
      saveWorkouts(updatedWorkouts);
    } else {
      // Add a new workout
      const updatedWorkouts = [
        ...recentWorkouts,
        { id: Date.now().toString(), ...newWorkout },
      ];
      saveWorkouts(updatedWorkouts);
    }

    setModalVisible(false);
    resetForm();
  };

  // Delete a workout
  const deleteWorkout = (id) => {
    const updatedWorkouts = recentWorkouts.filter(workout => workout.id !== id);
    saveWorkouts(updatedWorkouts);
  };

  // Edit a workout
  const editWorkout = (workout) => {
    setNewWorkout(workout);
    setEditWorkoutId(workout.id);
    setIsEditing(true);
    setModalVisible(true);
  };

  // Reset form state
  const resetForm = () => {
    setNewWorkout({ name: '', duration: '', calories: '', category: null });
    setIsEditing(false);
    setEditWorkoutId(null);
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryCard,
        selectedCategory === item.id && styles.selectedCategory,
      ]}
      onPress={() => {
        setSelectedCategory(item.id);
        navigation.navigate('CategoryDetail', { category: item.name }); // Pass the category name as a param
      }}
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
  

  // Render workout item
  const renderWorkoutItem = ({ item }) => {
    const category = workoutCategories.find(cat => cat.id === item.category);

    return (
      <View style={styles.workoutCard}>
        <View style={styles.workoutInfo}>
          <View style={styles.textContainer}>
            <Text style={styles.categoryName}>{category ? category.name : 'Unknown'}</Text>
            <Text style={styles.workoutName}>{item.name}</Text>
            <View style={styles.workoutStats}>
              <Text style={styles.workoutStat}>
                <Ionicons name="time-outline" size={16} /> {item.duration} mins
              </Text>
              <Text style={styles.workoutStat}>
                <Ionicons name="flame-outline" size={16} /> {item.calories} cal
              </Text>
            </View>
            
          </View>
            {/* Edit and Delete Icons */}
          <View style={styles.actionIcons}>
            <TouchableOpacity onPress={() => editWorkout(item)}>
              <Ionicons name="pencil" size={20} color="#4CAF50" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteWorkout(item.id)}>
              <Ionicons name="trash" size={20} color="red" />
            </TouchableOpacity>
          </View>

        </View>

        

        <TouchableOpacity onPress={() => navigation.navigate('WorkoutDetail', { workout: item })}>
          {/* Chevron icon on the right */}
          <Ionicons name="chevron-forward" size={24} color="#666" style={styles.chevronIcon} />
        </TouchableOpacity>
      </View>
    );
  };

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

      {/* Modal for Adding/Editing Workouts */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{isEditing ? 'Edit Workout' : 'Add Workout'}</Text>
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
          <View style={styles.input}>
            <RNPickerSelect
              onValueChange={(value) => setNewWorkout({ ...newWorkout, category: value })}
              items={workoutCategories.map(category => ({
                label: category.name,
                value: category.id,
                key: category.id,
              }))}
              value={newWorkout.category}
              style={pickerSelectStyles}
              placeholder={{ label: 'Select a category...', value: null }}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleWorkoutSave}>
            <Text style={styles.buttonText}>{isEditing ? 'Update' : 'Add'}</Text>
          </TouchableOpacity>
          <Button title="Cancel" color="red" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
}


const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: '#fff',
    color: '#333',
    paddingRight: 30, // Adding padding to the right for the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: '#fff',
    color: '#333',
    paddingRight: 30, // Adding padding to the right for the icon
  },
});

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
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  categoryName: {
    color: '#4CAF50',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dropdownContainer: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
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
  sectionTitle: {
    marginBottom: 15,
  },
  workoutCard: {
    marginVertical: 10,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    elevation: 3, // Adds shadow on Android
    shadowColor: '#000', // Adds shadow on iOS
    shadowOpacity: 0.1,
    shadowRadius: 5,
   
  },
  workoutInfo: {
    flexDirection: 'row', // Layout items horizontally
    alignItems: 'center', // Center vertically
    justifyContent: 'space-between', // Distribute space between elements
  },
  iconContainer: {
    flexDirection: 'row', // Make sure the text and icon are aligned horizontally
    alignItems: 'center',
  },
  textContainer: {
    marginRight: 15, // Space between text and chevron icon
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  workoutName: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
  },
  workoutStats: {
    flexDirection: 'row',
  },
  workoutStat: {
    fontSize: 12,
    color: '#777',
    marginRight: 10,
  },
  actionIcons: {
    marginLeft: 'auto', // Push the chevron icon to the far right
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 'auto',
    gap: 15,
  },
  chevronIcon: {
    marginLeft: 'auto', // Push the chevron icon to the far right
    marginBottom: 3,
    marginTop: -30
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
    marginBottom: 15,
    marginTop: 10,
    paddingVertical: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
