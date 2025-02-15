import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function WorkoutDetailScreen({ route, navigation }) {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [isWorkoutStarted, setIsWorkoutStarted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const workout = {
    name: 'Full Body Strength',
    exercises: [
      {
        id: '1',
        name: 'Push-ups',
        sets: 3,
        reps: 12,
        restTime: 60,
      },
      {
        id: '2',
        name: 'Squats',
        sets: 4,
        reps: 15,
        restTime: 90,
      },
      // Add more exercises...
    ],
  };

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  const startWorkout = () => {
    setIsWorkoutStarted(true);
    const id = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    setIntervalId(id);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNextExercise = () => {
    if (currentExercise < workout.exercises.length - 1) {
      setCurrentExercise((prev) => prev + 1);
    } else {
      Alert.alert(
        'Workout Complete!',
        'Great job! Would you like to save this workout?',
        [
          {
            text: 'Save',
            onPress: handleSaveWorkout,
          },
          {
            text: "Don't save",
            style: 'cancel',
          },
        ]
      );
    }
  };

  const handleSaveWorkout = async () => {
    // Save workout logic here
    navigation.navigate('WorkoutSummary', {
      duration: timer,
      exercises: workout.exercises.length,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.workoutName}>{workout.name}</Text>
        {isWorkoutStarted && (
          <Text style={styles.timer}>{formatTime(timer)}</Text>
        )}
      </View>

      {!isWorkoutStarted ? (
        <View style={styles.startSection}>
          <Text style={styles.exerciseCount}>
            {workout.exercises.length} exercises
          </Text>
          <TouchableOpacity
            style={styles.startButton}
            onPress={startWorkout}
          >
            <Text style={styles.startButtonText}>Start Workout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.exerciseSection}>
          <Text style={styles.exerciseName}>
            {workout.exercises[currentExercise].name}
          </Text>
          <View style={styles.exerciseDetails}>
            <Text style={styles.exerciseInfo}>
              Sets: {workout.exercises[currentExercise].sets}
            </Text>
            <Text style={styles.exerciseInfo}>
              Reps: {workout.exercises[currentExercise].reps}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNextExercise}
          >
            <Text style={styles.nextButtonText}>Next Exercise</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView style={styles.exerciseList}>
        {workout.exercises.map((exercise, index) => (
          <View
            key={exercise.id}
            style={[
              styles.exerciseItem,
              currentExercise === index && styles.currentExerciseItem,
            ]}
          >
            <Text style={styles.exerciseItemName}>{exercise.name}</Text>
            <Text style={styles.exerciseItemDetails}>
              {exercise.sets} sets × {exercise.reps} reps
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
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
  },
  workoutName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
  },
  startSection: {
    padding: 20,
    alignItems: 'center',
  },
  exerciseCount: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  exerciseSection: {
    padding: 20,
    alignItems: 'center',
  },
  exerciseName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  exerciseDetails: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20,
  },
  exerciseInfo: {
    fontSize: 18,
    color: '#666',
  },
  nextButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  exerciseList: {
    flex: 1,
    padding: 20,
  },
  exerciseItem: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  currentExerciseItem: {
    backgroundColor: '#4CAF50',
  },
  exerciseItemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  exerciseItemDetails: {
    color: '#666',
    marginTop: 5,
  },
});