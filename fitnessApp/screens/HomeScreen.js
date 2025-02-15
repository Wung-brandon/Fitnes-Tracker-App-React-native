import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function HomeScreen({ navigation }) {
  const { user } = useAuth();
  const [todayStats, setTodayStats] = useState({
    steps: 6543,
    calories: 420,
    workouts: 1,
    waterIntake: 1.5,
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, {user?.name}!</Text>
        <Text style={styles.date}>
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
      </View>

      <View style={styles.statsGrid}>
        <TouchableOpacity 
          style={styles.statCard}
          onPress={() => navigation.navigate('Progress')}
        >
          <Text style={styles.statValue}>{todayStats.steps}</Text>
          <Text style={styles.statLabel}>Steps</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.statCard}
          onPress={() => navigation.navigate('Nutrition')}
        >
          <Text style={styles.statValue}>{todayStats.calories}</Text>
          <Text style={styles.statLabel}>Calories Burned</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.statCard}
          onPress={() => navigation.navigate('Workout')}
        >
          <Text style={styles.statValue}>{todayStats.workouts}</Text>
          <Text style={styles.statLabel}>Workouts</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.statCard}
          onPress={() => navigation.navigate('Nutrition')}
        >
          <Text style={styles.statValue}>{todayStats.waterIntake}L</Text>
          <Text style={styles.statLabel}>Water Intake</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.quickActions}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#4CAF50' }]}
          onPress={() => navigation.navigate('WorkoutDetail')}
        >
          <Text style={styles.actionButtonText}>Start Workout</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#2196F3' }]}
          onPress={() => navigation.navigate('MealPlanner')}
        >
          <Text style={styles.actionButtonText}>Log Meal</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Schedule</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        
        {/* Add scheduled workouts/meals here */}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activities</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        
        {/* Add recent activities here */}
      </View>
    </ScrollView>
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
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  date: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  statCard: {
    width: '45%',
    backgroundColor: '#f5f5f5',
    padding: 15,
    margin: '2.5%',
    borderRadius: 10,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  quickActions: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAll: {
    color: '#4CAF50',
    fontSize: 14,
  },
});




// import React from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   StyleSheet,
// } from 'react-native';
// import { LineChart } from 'react-native-chart-kit';

// export default function HomeScreen({ navigation }) {
//   const weeklyProgress = {
//     labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//     datasets: [{
//       data: [30, 45, 28, 80, 99, 43, 50],
//     }],
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.greeting}>Hello, John!</Text>
//         <Text style={styles.date}>
//           {new Date().toLocaleDateString('en-US', {
//             weekday: 'long',
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric',
//           })}
//         </Text>
//       </View>

//       <View style={styles.statsContainer}>
//         <View style={styles.statBox}>
//           <Text style={styles.statNumber}>2,453</Text>
//           <Text style={styles.statLabel}>Steps Today</Text>
//         </View>
//         <View style={styles.statBox}>
//           <Text style={styles.statNumber}>320</Text>
//           <Text style={styles.statLabel}>Calories Burned</Text>
//         </View>
//         <View style={styles.statBox}>
//           <Text style={styles.statNumber}>45</Text>
//           <Text style={styles.statLabel}>Active Minutes</Text>
//         </View>
//       </View>

//       <View style={styles.chartContainer}>
//         <Text style={styles.chartTitle}>Weekly Activity</Text>
//         <LineChart
//           data={weeklyProgress}
//           width={350}
//           height={200}
//           chartConfig={{
//             backgroundColor: '#ffffff',
//             backgroundGradientFrom: '#ffffff',
//             backgroundGradientTo: '#ffffff',
//             decimalPlaces: 0,
//             color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
//             style: {
//               borderRadius: 16,
//             },
//           }}
//           style={styles.chart}
//         />
//       </View>

//       <View style={styles.quickActions}>
//         <TouchableOpacity
//           style={styles.actionButton}
//           onPress={() => navigation.navigate('AddWorkout')}
//         >
//           <Text style={styles.actionButtonText}>Start Workout</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.actionButton}
//           onPress={() => navigation.navigate('Goals')}
//         >
//           <Text style={styles.actionButtonText}>Set Goals</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.recentActivities}>
//         <Text style={styles.sectionTitle}>Recent Activities</Text>
//         {/* Add list of recent activities here */}
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     padding: 20,
//     backgroundColor: '#4CAF50',
//   },
//   greeting: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   date: {
//     fontSize: 16,
//     color: '#fff',
//     opacity: 0.8,
//   },
//   statsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 20,
//   },
//   statBox: {
//     backgroundColor: '#F5F5F5',
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     width: '30%',
//   },
//   statNumber: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#4CAF50',
//   },
//   statLabel: {
//     fontSize: 12,
//     color: '#666',
//     marginTop: 5,
//   },
//   chartContainer: {
//     padding: 20,
//   },
//   chartTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   chart: {
//     marginVertical: 8,
//     borderRadius: 16,
//   },
//   quickActions: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 20,
//   },
//   actionButton: {
//     backgroundColor: '#4CAF50',
//     padding: 15,
//     borderRadius: 10,
//     width: '48%',
//     alignItems: 'center',
//   },
//   actionButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   recentActivities: {
//     padding: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
// });