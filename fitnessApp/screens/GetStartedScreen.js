import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Animated, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function GetStartedScreen() {
  const navigation = useNavigation();
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(20);
  
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  return (
    <LinearGradient
      colors={['#1E5631', '#2E7D32', '#43A047']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      
      <View style={styles.contentContainer}>
        <Animated.View style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}>
          {/* App Logo with Icon */}
          <View style={styles.iconWrapper}>
            <MaterialCommunityIcons name="weight-lifter" size={90} color="#fff" style={styles.icon} />
          </View>
          
          <Text style={styles.appName}>FitTrack</Text>
        </Animated.View>

        <Animated.View style={[
          styles.textContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}>
          {/* Welcome Message */}
          <Text style={styles.title}>Your Fitness Journey Starts Here</Text>
          <Text style={styles.subtitle}>
            Track workouts, monitor progress, and achieve your health goals with personalized insights.
          </Text>
        </Animated.View>

        <Animated.View style={[
          styles.buttonContainer,
          {
            opacity: fadeAnim
          }
        ]}>
          {/* Get Started Button */}
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('Register')}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#1976D2', '#2196F3']}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.buttonText}>Get Started</Text>
              <MaterialCommunityIcons name="arrow-right" size={20} color="#fff" style={styles.buttonIcon} />
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.skipButton} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.skipText}>Already have an account? Login</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
      
      {/* Background Elements */}
      <View style={styles.backgroundCircle1} />
      <View style={styles.backgroundCircle2} />
      <View style={styles.backgroundCircle3} />
    </LinearGradient>
  );
}

// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    overflow: 'hidden',
  },
  contentContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: height * 0.1,
    zIndex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  iconWrapper: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  icon: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 5,
  },
  textContainer: {
    width: '90%',
    alignItems: 'center',
    marginVertical: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    paddingHorizontal: 20,
    fontWeight: '400',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    width: width * 0.7,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    marginBottom: 20,
  },
  buttonGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
    letterSpacing: 0.5,
    marginRight: 8,
  },
  buttonIcon: {
    marginLeft: 4,
  },
  skipButton: {
    padding: 12,
  },
  skipText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  // Background decorative elements
  backgroundCircle1: {
    position: 'absolute',
    width: width * 1.5,
    height: width * 1.5,
    borderRadius: width * 0.75,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    top: -width * 0.5,
    left: -width * 0.25,
  },
  backgroundCircle2: {
    position: 'absolute',
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    bottom: -width * 0.2,
    right: -width * 0.2,
  },
  backgroundCircle3: {
    position: 'absolute',
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    top: height * 0.4,
    left: -width * 0.3,
  },
});