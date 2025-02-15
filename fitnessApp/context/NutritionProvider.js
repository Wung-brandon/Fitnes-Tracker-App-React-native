// Nutrition Context
import React, { createContext, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const NutritionContext = createContext();

export const NutritionProvider = ({ children }) => {
  const [nutritionData, setNutritionData] = useState([]);

  const addNutrition = (item) => {
    setNutritionData([...nutritionData, item]);
  };

  return (
    <NutritionContext.Provider value={{ nutritionData, addNutrition }}>
      {children}
    </NutritionContext.Provider>
  );
};

export const useNutrition = () => useContext(NutritionContext);
