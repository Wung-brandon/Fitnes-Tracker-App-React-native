import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Button,
  Text
} from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';

import { colors } from '../theme/color';
import { typography } from '../theme/typography';

export default function ProgressScreen() {
  const [timeframe, setTimeframe] = useState('week'); // week, month, year
  
  const weightData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      data: [75.5, 75.3, 75.4, 75.1, 74.9, 74.8, 74.7],
    }],
  };

  const workoutData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      data: [45, 60, 0, 30, 45, 0, 60],
    }],
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.timeframeButtons}>
        <Button 
          title="Week" 
          variant={timeframe === 'week' ? 'primary' : 'secondary'}
          onPress={() => setTimeframe('week')}
        />
        <Button 
          title="Month" 
          variant={timeframe === 'month' ? 'primary' : 'secondary'}
          onPress={() => setTimeframe('month')}
        />
        <Button 
          title="Year" 
          variant={timeframe === 'year' ? 'primary' : 'secondary'}
          onPress={() => setTimeframe('year')}
        />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Weight Progress</Text>
        <LineChart
          data={weightData}
          width={Dimensions.get('window').width - 40}
          height={220}
          chartConfig={{
            backgroundColor: colors.background,
            backgroundGradientFrom: colors.background,
            backgroundGradientTo: colors.background,
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
          style={styles.chart}
        />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Workout Duration (minutes)</Text>
        <BarChart
          data={workoutData}
          width={Dimensions.get('window').width - 40}
          height={220}
          chartConfig={{
            backgroundColor: colors.background,
            backgroundGradientFrom: colors.background,
            backgroundGradientTo: colors.background,
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={styles.chart}
        />
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Weight Change</Text>
          <Text style={styles.statValue}>-0.8 kg</Text>
          <Text style={styles.statPeriod}>This Week</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Workouts</Text>
          <Text style={styles.statValue}>5</Text>
          <Text style={styles.statPeriod}>This Week</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Avg. Duration</Text>
          <Text style={styles.statValue}>48 min</Text>
          <Text style={styles.statPeriod}>Per Workout</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  timeframeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  chartContainer: {
    padding: 20,
  },
  chartTitle: {
    ...typography.h2,
    marginBottom: 10,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  statBox: {
    backgroundColor: colors.surface,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '30%',
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  statValue: {
    ...typography.h2,
    color: colors.primary,
    marginVertical: 5,
  },
  statPeriod: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});