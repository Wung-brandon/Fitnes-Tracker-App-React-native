// src/components/nutrition/MealCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../theme/color';
import { typography } from '../theme/typography';

export default function MealCard({ meal, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.mealName}>{meal.name}</Text>
      <Text style={styles.mealTime}>{meal.time}</Text>
      <Text style={styles.foodList}>
        {meal.foods.map(food => food.name).join(', ')}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  mealName: {
    ...typography.h3,
    color: colors.primary,
  },
  mealTime: {
    color: colors.textSecondary,
    fontSize: 14,
    marginVertical: 5,
  },
  foodList: {
    color: colors.textPrimary,
    fontSize: 14,
  },
});
