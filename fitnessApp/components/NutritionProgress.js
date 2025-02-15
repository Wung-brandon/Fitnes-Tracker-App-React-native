// src/components/nutrition/NutritionProgress.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/color';
import { typography } from '../theme/typography';

export default function NutritionProgress({ current, goals }) {
  const getPercentage = (currentValue, goalValue) => {
    return Math.min((currentValue / goalValue) * 100, 100);
  };

  return (
    <View style={styles.container}>
      {Object.keys(goals).map(nutrient => (
        <View key={nutrient} style={styles.progressItem}>
          <Text style={styles.label}>{nutrient.toUpperCase()}</Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${getPercentage(current[nutrient], goals[nutrient])}%` },
              ]}
            />
          </View>
          <Text style={styles.value}>
            {current[nutrient]} / {goals[nutrient]}g
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.cardBackground,
    borderRadius: 10,
    margin: 20,
  },
  progressItem: {
    marginBottom: 15,
  },
  label: {
    ...typography.h4,
    color: colors.primary,
    marginBottom: 5,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.grayLight,
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  value: {
    fontSize: 14,
    color: colors.textPrimary,
    marginTop: 5,
  },
});
