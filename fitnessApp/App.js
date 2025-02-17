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
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoadingScreen from './screens/LoadingScreen';
import GetStartedScreen from './screens/GetStartedScreen';
import ProfileScreen from './screens/ProfileScreen';
import CategoryDetailScreen from './screens/CategoryDetailScreen';
import ExerciseListScreen from './screens/ExerciseListScreen';
import ExerciseDetailScreen from './screens/ExerciseDetailsScreen';

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

          if (route.name === 'Training') {
            iconName = focused ? 'barbell' : 'barbell-outline';
          } else if (route.name === 'Workout') {
            iconName = focused ? 'fitness' : 'fitness-outline';
          } else if (route.name === 'Exercises') {
            iconName = focused ? 'walk' : 'walk-outline';;
          } else if (route.name === 'Progress') {
            iconName = focused ? 'trending-up' : 'trending-up-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Training" component={HomeScreen} />
      <Tab.Screen name="Workout" component={WorkoutStack} />
      <Tab.Screen name="Exercises" component={ExerciseListScreen} />
      <Tab.Screen name="Progress" component={ProgressScreen} />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{ 
          tabBarIcon: ({ color, size }) => <Ionicons name="settings" size={size} color={color} /> 
        }} 
      />
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
    <Drawer.Screen name="Training" component={TabNavigator} options={{ headerShown: false }} />
    <Drawer.Screen name="Settings" component={SettingsScreen} />
  </Drawer.Navigator>
);

// ✅ **Main App Navigator (Handles Authentication)**
function AppNavigator() {
  const { user, loading, firstTimeUser } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator initialRouteName='GetStarted'>
      {/* Always register GetStarted */}
      <Stack.Screen
        name="GetStarted"
        component={GetStartedScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
            name="HomeTabs"
            component={TabNavigator} // Ensure HomeScreen is imported
            options={{ headerShown: false }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CategoryDetail" component={CategoryDetailScreen} />
        <Stack.Screen name="WorkoutDetail" component={WorkoutDetailScreen} />
        <Stack.Screen name="ExerciseDetail" component={ExerciseDetailScreen} />
      {firstTimeUser ? (
        // Only show the Get Started screen if it's the user's first time
        <Stack.Screen
          name="GetStarted"
          component={GetStartedScreen}
          options={{ headerShown: false }}
        />
      ) : (
        // Conditional rendering for login/register for returning users
        <>
          {!user ? (
            <>
              <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
            </>
          ) : (
            // Main App
            <>
              <Stack.Screen name="MainTabs" component={DrawerNavigator} options={{ headerShown: false }} />
              <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
              
              <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Settings" component={SettingsScreen} />
              
            </>
          )}
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
