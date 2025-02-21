import React, { useState, useEffect, useRef, useContext } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
  SafeAreaView,
  Image,
} from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../context/AuthContext';
// Updated theme with a more professional color palette
const colors = {
  primary: '#3367D6',
  secondary: '#5C6BC0',
  success: '#43A047',
  warning: '#FFA000',
  danger: '#E53935',
  background: '#F5F7FA',
  surface: '#FFFFFF',
  textPrimary: '#263238',
  textSecondary: '#546E7A',
  border: '#ECEFF1',
  cardShadow: 'rgba(0, 0, 0, 0.1)',
  chartBlue: '#3367D6',
  chartGreen: '#43A047',
  chartOrange: '#FFA000',
  chartPurple: '#7E57C2',
  chartRed: '#E53935',
};

const typography = {
  h1: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'System',
  },
  h2: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'System',
  },
  h3: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'System',
  },
  body: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'System',
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'System',
    color: colors.textSecondary,
  },
};

// Mock user profile data
const userProfile = {
  name: 'Alex Johnson',
  age: 28,
  height: '5\'10"',
  startingWeight: 78.2,
  currentWeight: 74.5,
  goalWeight: 72.0,
  workoutStreak: 14,
  profileImage: 'https://placeholder-image.jpg',
};

// Exercise types for workout breakdown
const exerciseTypes = [
  { name: 'Cardio', color: colors.chartBlue },
  { name: 'Strength', color: colors.chartGreen },
  { name: 'Flexibility', color: colors.chartOrange },
  { name: 'HIIT', color: colors.chartPurple },
];

export default function ProgressScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('week');
  const [weightData, setWeightData] = useState({ labels: [], datasets: [{ data: [] }] });
  const [workoutData, setWorkoutData] = useState({ labels: [], datasets: [{ data: [] }] });
  const [calorieData, setCalorieData] = useState({ labels: [], datasets: [{ data: [] }] });
  const [workoutBreakdown, setWorkoutBreakdown] = useState([]);
  const [completionRate, setCompletionRate] = useState(0);
  const [markedDates, setMarkedDates] = useState({});
  const [statsData, setStatsData] = useState({
    weightLost: 0,
    caloriesBurned: 0,
    workoutsCompleted: 0,
    averageWorkoutDuration: 0,
  });
  const { user } = useContext(AuthContext)
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Simulate API loading
    setIsLoading(true);
    
    setTimeout(() => {
      generateWeightData();
      generateWorkoutData();
      generateCalorieData();
      generateWorkoutBreakdown();
      generateMarkedDates();
      generateStats();
      setIsLoading(false);
      
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }, 1000);
  }, [timeframe]);

  const generateTimeLabels = () => {
    if (timeframe === 'week') {
      return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    } else if (timeframe === 'month') {
      return Array.from({ length: 30 }, (_, i) => (i + 1).toString());
    } else {
      return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    }
  };

  const generateWeightData = () => {
    const labels = generateTimeLabels();
    
    // Create realistic weight data with a downward trend and small fluctuations
    let baseWeight = 78.2;
    let data;
    
    if (timeframe === 'week') {
      data = labels.map((_, i) => {
        baseWeight -= 0.15 * (Math.random() * 0.7 + 0.6);
        return parseFloat(baseWeight.toFixed(1));
      });
    } else if (timeframe === 'month') {
      data = labels.map((_, i) => {
        baseWeight -= 0.05 * (Math.random() * 0.8 + 0.6);
        return parseFloat(baseWeight.toFixed(1));
      });
    } else {
      data = [78.2, 77.3, 76.8, 76.2, 75.6, 75.0, 74.7, 74.5, 74.3, 74.1, 73.9, 73.8];
    }
    
    // Add goal weight as a second dataset
    const goalLine = Array(labels.length).fill(userProfile.goalWeight);
    
    setWeightData({
      labels,
      datasets: [
        { data, color: () => colors.chartBlue },
        { data: goalLine, color: () => `${colors.chartRed}88`, strokeDotted: true }
      ],
      legend: ['Actual Weight', 'Goal Weight']
    });
  };
  
  const generateWorkoutData = () => {
    const labels = generateTimeLabels();
    
    // Create realistic workout duration data with reasonable ranges and rest days
    let data;
    
    if (timeframe === 'week') {
      data = [45, 0, 55, 40, 60, 30, 0];
    } else if (timeframe === 'month') {
      data = Array.from({ length: 30 }, (_, i) => {
        // Include some rest days (0 minutes)
        return i % 4 === 3 ? 0 : Math.floor(Math.random() * 35) + 30;
      });
    } else {
      // Average workout minutes per month
      data = [42, 44, 47, 45, 53, 50, 52, 55, 50, 53, 56, 58];
    }
    
    setWorkoutData({
      labels,
      datasets: [{ data, color: (opacity = 1) => colors.chartGreen }]
    });
  };
  
  const generateCalorieData = () => {
    const labels = generateTimeLabels();
    
    // Create realistic calorie burn data
    let data;
    
    if (timeframe === 'week') {
      data = [320, 0, 450, 380, 510, 260, 0];
    } else if (timeframe === 'month') {
      data = Array.from({ length: 30 }, (_, i) => {
        // Include some rest days (0 calories)
        return i % 4 === 3 ? 0 : Math.floor(Math.random() * 300) + 250;
      });
    } else {
      // Average calories burned per month
      data = [9500, 10200, 11000, 10800, 12500, 12000, 12800, 13200, 12500, 13000, 13400, 14000];
    }
    
    setCalorieData({
      labels,
      datasets: [{ data, color: (opacity = 1) => colors.chartOrange }]
    });
  };
  
  const generateWorkoutBreakdown = () => {
    // Create workout type distribution based on timeframe
    let cardioPercentage, strengthPercentage, flexibilityPercentage, hiitPercentage;
    
    if (timeframe === 'week') {
      cardioPercentage = 35;
      strengthPercentage = 40;
      flexibilityPercentage = 15;
      hiitPercentage = 10;
    } else if (timeframe === 'month') {
      cardioPercentage = 32;
      strengthPercentage = 38;
      flexibilityPercentage = 18;
      hiitPercentage = 12;
    } else {
      cardioPercentage = 30;
      strengthPercentage = 35;
      flexibilityPercentage = 20;
      hiitPercentage = 15;
    }
    
    setWorkoutBreakdown([
      {
        name: 'Cardio',
        population: cardioPercentage,
        color: colors.chartBlue,
        legendFontColor: colors.textPrimary,
      },
      {
        name: 'Strength',
        population: strengthPercentage,
        color: colors.chartGreen,
        legendFontColor: colors.textPrimary,
      },
      {
        name: 'Flexibility',
        population: flexibilityPercentage,
        color: colors.chartOrange,
        legendFontColor: colors.textPrimary,
      },
      {
        name: 'HIIT',
        population: hiitPercentage,
        color: colors.chartPurple,
        legendFontColor: colors.textPrimary,
      },
    ]);
    
    // Calculate completion rate based on timeframe
    if (timeframe === 'week') {
      setCompletionRate(85);
    } else if (timeframe === 'month') {
      setCompletionRate(78);
    } else {
      setCompletionRate(82);
    }
  };
  
  const generateMarkedDates = () => {
    const today = new Date();
    const dates = {};
    
    // Mark the last 30 days with appropriate colors based on workout intensity
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      
      if (i % 4 === 3) {
        // Rest day
        dates[dateString] = { marked: true, dotColor: colors.textSecondary };
      } else if (i % 7 === 1 || i % 11 === 3) {
        // High intensity day
        dates[dateString] = { marked: true, dotColor: colors.success };
      } else if (i % 3 === 0) {
        // Medium intensity day
        dates[dateString] = { marked: true, dotColor: colors.warning };
      } else {
        // Low intensity day
        dates[dateString] = { marked: true, dotColor: colors.primary };
      }
    }
    
    // Mark today specially
    const todayString = today.toISOString().split('T')[0];
    dates[todayString] = {
      selected: true,
      marked: true,
      selectedColor: colors.primary,
    };
    
    setMarkedDates(dates);
  };
  
  const generateStats = () => {
    // Generate statistics based on timeframe
    let weightLost, caloriesBurned, workoutsCompleted, averageWorkoutDuration;
    
    if (timeframe === 'week') {
      weightLost = 0.7;
      caloriesBurned = 1920;
      workoutsCompleted = 5;
      averageWorkoutDuration = 46;
    } else if (timeframe === 'month') {
      weightLost = 2.8;
      caloriesBurned = 8400;
      workoutsCompleted = 22;
      averageWorkoutDuration = 48;
    } else {
      weightLost = 4.4;
      caloriesBurned = 132800;
      workoutsCompleted = 265;
      averageWorkoutDuration = 51;
    }
    
    setStatsData({
      weightLost,
      caloriesBurned,
      workoutsCompleted,
      averageWorkoutDuration,
    });
  };

  const chartConfig = {
    backgroundColor: colors.surface,
    backgroundGradientFrom: colors.surface,
    backgroundGradientTo: colors.surface,
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(51, 103, 214, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(38, 50, 56, ${opacity})`,
    propsForDots: {
      r: '5',
      strokeWidth: '2',
      stroke: colors.surface
    },
    propsForBackgroundLines: {
      strokeDasharray: '',
      stroke: colors.border,
    },
    style: {
      borderRadius: 16,
    },
  };

  const renderSummaryCard = () => (
    <View style={styles.summaryCard}>
      <View style={styles.profileSection}>
        <View style={styles.profileImageContainer}>
          <Image 
            source={{ uri: 'https://via.placeholder.com/150' }}
            style={styles.profileImage}
          />
          <View style={styles.streakBadge}>
            <Text style={styles.streakText}>{userProfile.workoutStreak}🔥</Text>
          </View>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.userName}>{userProfile.name}</Text>
          <Text style={styles.userDetails}>Age: {userProfile.age} | Height: {userProfile.height}</Text>
          <View style={styles.weightGoalContainer}>
            <Text style={styles.weightGoalText}>
              {userProfile.currentWeight} kg / {userProfile.goalWeight} kg
            </Text>
            <View style={styles.goalProgressBar}>
              <View 
                style={[
                  styles.goalProgress, 
                  { 
                    width: `${Math.min(100, (((userProfile.startingWeight - userProfile.currentWeight) / 
                      (userProfile.startingWeight - userProfile.goalWeight)) * 100))}%` 
                  }
                ]} 
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  const renderStats = () => (
    <View style={styles.statsContainer}>
      <Text style={styles.sectionTitle}>Statistics ({timeframe})</Text>
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Icon name="scale" size={24} color={colors.primary} />
          <Text style={styles.statValue}>{statsData.weightLost} kg</Text>
          <Text style={styles.statLabel}>Weight Lost</Text>
        </View>
        <View style={styles.statCard}>
          <Icon name="fire" size={24} color={colors.chartOrange} />
          <Text style={styles.statValue}>
            {statsData.caloriesBurned >= 1000 
              ? `${(statsData.caloriesBurned / 1000).toFixed(1)}k` 
              : statsData.caloriesBurned}
          </Text>
          <Text style={styles.statLabel}>Calories Burned</Text>
        </View>
        <View style={styles.statCard}>
          <Icon name="calendar-check" size={24} color={colors.success} />
          <Text style={styles.statValue}>{statsData.workoutsCompleted}</Text>
          <Text style={styles.statLabel}>Workouts</Text>
        </View>
        <View style={styles.statCard}>
          <Icon name="clock-outline" size={24} color={colors.chartPurple} />
          <Text style={styles.statValue}>{statsData.averageWorkoutDuration} min</Text>
          <Text style={styles.statLabel}>Avg. Duration</Text>
        </View>
      </View>
    </View>
  );

  const renderProgressSection = () => (
    <View style={styles.progressSection}>
      <View style={styles.completionContainer}>
        <Text style={styles.completionTitle}>Workout Completion</Text>
        <View style={styles.completionCircle}>
          <Text style={styles.completionPercentage}>{completionRate}%</Text>
        </View>
        <Text style={styles.completionSubtitle}>
          {completionRate >= 80 ? 'Excellent progress!' : 
           completionRate >= 60 ? 'Good progress!' : 'Keep pushing!'}
        </Text>
      </View>
      
      <View style={styles.breakdownContainer}>
        <Text style={styles.breakdownTitle}>Workout Breakdown</Text>
        <PieChart
          data={workoutBreakdown}
          width={Dimensions.get('window').width / 2 - 30}
          height={160}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="0"
          absolute
        />
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading your fitness data...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.ScrollView 
        style={[styles.container, { opacity: fadeAnim }]}
        showsVerticalScrollIndicator={false}
      >
        {renderSummaryCard()}
        
        <View style={styles.timeframeContainer}>
          <Text style={styles.sectionTitle}>View Progress</Text>
          <View style={styles.timeframeButtons}>
            {['week', 'month', 'year'].map((t) => (
              <TouchableOpacity
                key={t}
                style={[styles.timeframeButton, timeframe === t && styles.activeTimeframeButton]}
                onPress={() => setTimeframe(t)}
              >
                <Text style={[styles.timeframeButtonText, timeframe === t && styles.activeTimeframeButtonText]}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {renderStats()}

        <View style={styles.chartContainer}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Weight Trend</Text>
            <View style={styles.legendContainer}>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: colors.chartBlue }]} />
                <Text style={styles.legendText}>Current</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: colors.chartRed }]} />
                <Text style={styles.legendText}>Goal</Text>
              </View>
            </View>
          </View>
          {weightData.labels.length > 0 && (
            <LineChart
              data={weightData}
              width={Dimensions.get('window').width - 40}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
              fromZero={false}
              yAxisSuffix=" kg"
              yAxisInterval={1}
              segments={5}
            />
          )}
          <Text style={styles.chartCaption}>
            {timeframe === 'week' ? 'Daily weight tracking for the past week' :
             timeframe === 'month' ? 'Daily weight tracking for the past month' :
             'Monthly average weight for the past year'}
          </Text>
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Workout Duration</Text>
          {workoutData.labels.length > 0 && (
            <BarChart
              data={workoutData}
              width={Dimensions.get('window').width - 40}
              height={220}
              chartConfig={{
                ...chartConfig,
                color: (opacity = 1) => `rgba(67, 160, 71, ${opacity})`,
              }}
              style={styles.chart}
              showValuesOnTopOfBars={true}
              fromZero
              yAxisSuffix=" min"
            />
          )}
          <Text style={styles.chartCaption}>
            {timeframe === 'week' ? 'Daily workout durations for the past week' :
             timeframe === 'month' ? 'Daily workout durations for the past month' :
             'Monthly average workout durations for the past year'}
          </Text>
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Calories Burned</Text>
          {calorieData.labels.length > 0 && (
            <LineChart
              data={calorieData}
              width={Dimensions.get('window').width - 40}
              height={220}
              chartConfig={{
                ...chartConfig,
                color: (opacity = 1) => `rgba(255, 160, 0, ${opacity})`,
              }}
              bezier
              style={styles.chart}
              fromZero
              yAxisSuffix={timeframe === 'year' ? 'k' : ''}
            />
          )}
          <Text style={styles.chartCaption}>
            {timeframe === 'week' ? 'Daily calories burned for the past week' :
             timeframe === 'month' ? 'Daily calories burned for the past month' :
             'Monthly calories burned (in thousands) for the past year'}
          </Text>
        </View>

        {renderProgressSection()}

        <View style={styles.calendarContainer}>
          <Text style={styles.chartTitle}>Workout Calendar</Text>
          <View style={styles.calendarLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.success }]} />
              <Text style={styles.legendText}>High Intensity</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.warning }]} />
              <Text style={styles.legendText}>Medium Intensity</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.primary }]} />
              <Text style={styles.legendText}>Low Intensity</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.textSecondary }]} />
              <Text style={styles.legendText}>Rest Day</Text>
            </View>
          </View>
          <View style={styles.calendarCard}>
            <Calendar
              markedDates={markedDates}
              theme={{
                backgroundColor: colors.surface,
                calendarBackground: colors.surface,
                textSectionTitleColor: colors.textSecondary,
                selectedDayBackgroundColor: colors.primary,
                selectedDayTextColor: colors.surface,
                todayTextColor: colors.primary,
                dayTextColor: colors.textPrimary,
                textDisabledColor: colors.border,
                dotColor: colors.primary,
                selectedDotColor: colors.surface,
                arrowColor: colors.primary,
                monthTextColor: colors.textPrimary,
                indicatorColor: colors.primary,
                textDayFontFamily: 'System',
                textMonthFontFamily: 'System',
                textDayHeaderFontFamily: 'System',
                textDayFontSize: 14,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 12
              }}
            />
          </View>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
     marginTop: '10%'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    ...typography.body,
    marginTop: 12,
    color: colors.textPrimary,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  summaryCard: {
    backgroundColor: colors.surface,
    margin: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageContainer: {
    position: 'relative',
    marginRight: 16,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  streakBadge: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: colors.warning,
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 1.5,
    borderColor: colors.surface,
  },
  streakText: {
    ...typography.caption,
    color: colors.surface,
    fontWeight: '700',
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  userDetails: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  weightGoalContainer: {
    marginTop: 4,
  },
  weightGoalText: {
    ...typography.body,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  goalProgressBar: {
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    width: '100%',
  },
  goalProgress: {
    height: 6,
    backgroundColor: colors.success,
    borderRadius: 3,
  },
  timeframeContainer: {
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: 12,
  },
  timeframeButtons: {
    flexDirection: 'row',
    backgroundColor: colors.border,
    borderRadius: 8,
    padding: 3,
  },
  timeframeButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTimeframeButton: {
    backgroundColor: colors.surface,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  timeframeButtonText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  activeTimeframeButtonText: {
    color: colors.primary,
    fontWeight: '600',
  },
  statsContainer: {
    padding: 16,
    marginBottom: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  statValue: {
    ...typography.h1,
    color: colors.textPrimary,
    marginVertical: 8,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  chartContainer: {
    backgroundColor: colors.surface,
    margin: 16,
    marginTop: 0,
    padding: 16,
    borderRadius: 16,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  chartTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: 12,
  },
  legendContainer: {
    flexDirection: 'row',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 14,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  legendText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  chartCaption: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
  },
  progressSection: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  completionContainer: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  completionTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  completionCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  completionPercentage: {
    ...typography.h1,
    color: colors.surface,
  },
  completionSubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  breakdownContainer: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  breakdownTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: 12,
  },
  calendarContainer: {
    padding: 16,
    backgroundColor: colors.surface,
    borderRadius: 16,
    margin: 16,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  calendarLegend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  calendarCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
});

