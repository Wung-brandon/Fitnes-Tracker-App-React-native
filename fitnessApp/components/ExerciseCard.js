import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ExerciseCard = ({ exercise }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{exercise.name}</Text>
      <Text>Duration: {exercise.duration} mins</Text>
      <Text>Calories Burned: {exercise.calories}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    margin: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ExerciseCard;