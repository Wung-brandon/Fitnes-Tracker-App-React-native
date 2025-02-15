// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import HomeScreen from './screens/HomeScreen';
// import ExerciseScreen from './screens/ExerciseScreen';
// import NutritionScreen from './screens/NutritionScreen';
// import ProgressScreen from './screens/ProgressScreen';
// import SettingsScreen from './screens/SettingsScreen';
// import WorkoutDetailScreen from './screens/WorkoutDetailScreen';
// import { Ionicons } from '@expo/vector-icons';

// const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();
// const Drawer = createDrawerNavigator();

// // Bottom Tab Navigator
// function TabNavigator() {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;

//           if (route.name === 'Home') {
//             iconName = focused ? 'home' : 'home-outline';
//           } else if (route.name === 'Workout') {
//             iconName = focused ? 'fitness' : 'fitness-outline';
//           } else if (route.name === 'Nutrition') {
//             iconName = focused ? 'restaurant' : 'restaurant-outline';
//           } else if (route.name === 'Progress') {
//             iconName = focused ? 'trending-up' : 'trending-up-outline';
//           }

//           return <Ionicons name={iconName} size={size} color={color} />;
//         },
//         tabBarActiveTintColor: '#4CAF50',
//         tabBarInactiveTintColor: 'gray',
//         headerShown: false,
//       })}
//     >
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Workout" component={WorkoutStack} />
//       <Tab.Screen name="Nutrition" component={NutritionScreen} />
//       <Tab.Screen name="Progress" component={ProgressScreen} />
//     </Tab.Navigator>
//   );
// }

// // Stack Navigator for Workout Details
// function WorkoutStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Exercise" component={ExerciseScreen} options={{ headerShown: false }} />
//       <Stack.Screen name="WorkoutDetail" component={WorkoutDetailScreen} options={{ title: 'Workout Details' }} />
//     </Stack.Navigator>
//   );
// }

// // Drawer Navigator
// const DrawerNavigator = () => (
//   <Drawer.Navigator>
//     <Drawer.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
//     <Drawer.Screen name="Settings" component={SettingsScreen} />
//   </Drawer.Navigator>
// );

// // Main App Navigator
// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Main" component={DrawerNavigator} options={{ headerShown: false }} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }



import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useAuth, AuthProvider } from './context/AuthContext';
import { WorkoutProvider } from './context/WorkContext';
import { NutritionProvider } from './context/NutritionProvider';

// Import Screens
import HomeScreen from './screens/HomeScreen';
import ExerciseScreen from './screens/ExerciseScreen';
import NutritionScreen from './screens/NutritionScreen';
import ProgressScreen from './screens/ProgressScreen';
import SettingsScreen from './screens/SettingsScreen';
import WorkoutDetailScreen from './screens/WorkoutDetailScreen';
// import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoadingScreen from './screens/LoadingScreen';
// import ExerciseLibraryScreen from './screens/ExerciseLibraryScreen';
// import MealPlannerScreen from './screens/MealPlannerScreen';
// import GoalsScreen from './screens/GoalsScreen';
// import SocialScreen from './screens/SocialScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// ✅ **Bottom Tab Navigator**
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Workout') {
            iconName = focused ? 'fitness' : 'fitness-outline';
          } else if (route.name === 'Nutrition') {
            iconName = focused ? 'restaurant' : 'restaurant-outline';
          } else if (route.name === 'Progress') {
            iconName = focused ? 'trending-up' : 'trending-up-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Workout" component={WorkoutStack} />
      <Tab.Screen name="Nutrition" component={NutritionScreen} />
      <Tab.Screen name="Progress" component={ProgressScreen} />
      {/* <Tab.Screen name="Profile" component={ProfileScreen} /> */}
    </Tab.Navigator>
  );
}

// ✅ **Workout Stack Navigator (For Workout Details)**
function WorkoutStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Exercise" component={ExerciseScreen} options={{ headerShown: false }} />
      <Stack.Screen name="WorkoutDetail" component={WorkoutDetailScreen} options={{ title: 'Workout Details' }} />
    </Stack.Navigator>
  );
}

// ✅ **Drawer Navigator**
const DrawerNavigator = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
    <Drawer.Screen name="Settings" component={SettingsScreen} />
  </Drawer.Navigator>
);

// ✅ **Main App Navigator (Handles Authentication)**
function AppNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator>
      {!user ? (
        // If user is NOT logged in, show Auth Stack
        <>
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Register" 
            component={RegisterScreen} 
            options={{ headerShown: false }}
          />
        </>
      ) : (
        // If user IS logged in, show Main App
        <>
          <Stack.Screen
            name="MainTabs"
            component={DrawerNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="WorkoutDetail" component={WorkoutDetailScreen} />
          {/* <Stack.Screen name="ExerciseLibrary" component={ExerciseLibraryScreen} /> */}
          {/* <Stack.Screen name="MealPlanner" component={MealPlannerScreen} /> */}
          {/* <Stack.Screen name="Goals" component={GoalsScreen} /> */}
          <Stack.Screen name="Settings" component={SettingsScreen} />
          {/* <Stack.Screen name="Social" component={SocialScreen} /> */}
        </>
      )}
    </Stack.Navigator>
  );
}

// ✅ **Wrap Everything with Context Providers**
export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <WorkoutProvider>
          <NutritionProvider>
            <AppNavigator />
          </NutritionProvider>
        </WorkoutProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
