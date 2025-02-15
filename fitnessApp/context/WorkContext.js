import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WorkoutContext = createContext();

export const WorkoutProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    loadWorkouts();
  }, []);

  useEffect(() => {
    saveWorkouts();
  }, [workouts]);

  const loadWorkouts = async () => {
    try {
      const storedWorkouts = await AsyncStorage.getItem('workouts');
      if (storedWorkouts) {
        setWorkouts(JSON.parse(storedWorkouts));
      }
    } catch (error) {
      console.error('Failed to load workouts:', error);
    }
  };

  const saveWorkouts = async () => {
    try {
      await AsyncStorage.setItem('workouts', JSON.stringify(workouts));
    } catch (error) {
      console.error('Failed to save workouts:', error);
    }
  };

  const addWorkout = (newWorkout) => {
    setWorkouts([...workouts, newWorkout]);
  };

  return (
    <WorkoutContext.Provider value={{ workouts, addWorkout }}>
      {children}
    </WorkoutContext.Provider>
  );
};

export default WorkoutContext;
