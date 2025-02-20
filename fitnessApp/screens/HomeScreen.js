import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
  FlatList,
  TextInput,
  Alert,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import { strength, muscle, stamina } from './images';

const { width } = Dimensions.get('window');
const SLIDE_WIDTH = width * 0.9; // 90% of screen width
const SPACING = width * 0.005; // 5% spacing


const BMIInformation = () => (
  <View style={styles.bmiInfoContainer}>
    <Text style={styles.bmiInfoTitle}>Understanding your Body Mass Index</Text>
    <Text style={styles.bmiInfoSubtitle}>
      Now that you know your body mass index you are one step closer to mastering your overall health. 
      Find out how to understand your BMI:
    </Text>
    
    <View style={styles.bmiCategoryInfo}>
      <Text style={styles.categoryTitle}>If your BMI is below 18.5:</Text>
      <Text style={styles.categoryDescription}>
        Your BMI is considered underweight. Keep in mind that an underweight BMI calculation may pose certain health risks. 
        Please consult your healthcare provider for more information about BMI calculations.
      </Text>
    </View>

    <View style={styles.bmiCategoryInfo}>
      <Text style={styles.categoryTitle}>If your BMI is between 18.5 – 24.9:</Text>
      <Text style={styles.categoryDescription}>
        Your BMI is considered normal. This healthy weight helps reduce your risk of serious health conditions 
        and means you're close to your fitness goals.
      </Text>
    </View>

    <View style={styles.bmiCategoryInfo}>
      <Text style={styles.categoryTitle}>If your BMI is between 25 – 29.9:</Text>
      <Text style={styles.categoryDescription}>
        You're in the overweight range. You are at increased risk for a variety of illnesses at your present weight. 
        You should lose weight by changing your diet and exercising more.
      </Text>
    </View>

    <View style={styles.bmiCategoryInfo}>
      <Text style={styles.categoryTitle}>If your BMI is above 30:</Text>
      <Text style={styles.categoryDescription}>
        Your BMI is considered obese. Being overweight may increase your risk of cardiovascular disease. 
        Consider making lifestyle changes through healthy eating and fitness to improve your health.
      </Text>
    </View>

    <View style={styles.bmiWarning}>
      <Text style={styles.warningText}>
        Individuals who fall into the BMI range of 25 to 34.9, and have a waist size of over 40 inches for men 
        and 35 inches for women, are considered to be at especially high risk for health problems.
      </Text>
    </View>
  </View>
);
// Generate 15 days of workouts for each plan
const generateWorkoutDays = (planSchedule) => {
  let days = [];
  let currentDay = 0;
  
  while (currentDay < 15) {
    for (let schedule of planSchedule) {
      if (currentDay < 15) {
        days.push({
          day: currentDay + 1,
          focus: schedule.focus,
          isLocked: currentDay === 0 ? false : true,
          isCompleted: false,
          isCurrent: currentDay === 0 // Add this to track current day per plan
        });
        currentDay++;
      }
    }
  }
  return days;
};

const workoutPlans = [
  {
    id: 1,
    title: 'STRENGTH TRAINING',
    days: '15 Days',
    image: strength,
    schedule: generateWorkoutDays([
      { focus: 'Chest' },
      { focus: 'Back' },
      { focus: 'Lower body' },
      { focus: 'Shoulders' },
      { focus: 'Arm' },
    ])
  },
  {
    id: 2,
    title: 'BUILD MUSCLE STAMINA',
    days: '15 Days',
    image: stamina,
    schedule: generateWorkoutDays([
      { focus: 'Full Body' },
      { focus: 'Upper body' },
      { focus: 'Rest Day' },
      { focus: 'Full Body' },
      { focus: 'Chest' },
    ])
  },
  {
    id: 3,
    title: 'MUSCLE BUILDING',
    days: '15 Days',
    image: muscle,
    schedule: generateWorkoutDays([
      { focus: 'Chest' },
      { focus: 'Back' },
      { focus: 'Lower body' },
      { focus: 'Rest Day' },
      { focus: 'Shoulders' },
    ])
  }
];

export default function HomeScreen({ navigation }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('PLAN');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [plans, setPlans] = useState(workoutPlans);
  
  // Load saved progress
  React.useEffect(() => {
    loadProgress();
  }, []);

  const resetProgress = async () => {
    Alert.alert(
      "Reset Progress",
      "Are you sure you want to reset all your progress? This cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Reset",
          style: "destructive",
          onPress: async () => {
            try {
              // Clear AsyncStorage
              await AsyncStorage.clear();
              
              // Reset plans to initial state
              const resetPlans = workoutPlans.map(plan => ({
                ...plan,
                schedule: generateWorkoutDays(plan.schedule.map(day => ({ focus: day.focus })))
              }));
              
              setPlans(resetPlans);
              
              Alert.alert("Success", "All progress has been reset!");
            } catch (error) {
              console.error('Error resetting progress:', error);
              Alert.alert("Error", "Failed to reset progress. Please try again.");
            }
          }
        }
      ]
    );
  };

  // Update the loadProgress function
  const loadProgress = async () => {
    try {
      const savedProgress = await AsyncStorage.getItem('workoutProgress');
      if (savedProgress) {
        const { plans: savedPlans } = JSON.parse(savedProgress);
        setPlans(savedPlans);
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    }
  };

  // Update the saveProgress function
  const saveProgress = async (updatedPlans) => {
    try {
      await AsyncStorage.setItem('workoutProgress', JSON.stringify({
        plans: updatedPlans
      }));
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const calculateBMI = () => {
    if (height && weight) {
      const heightInMeters = Number(height) / 100;
      const bmiValue = (Number(weight) / (heightInMeters * heightInMeters)).toFixed(1);
      setBmi(bmiValue);
      setWeight('')
      setHeight('');
    }
  };

  const getBMICategory = (bmiValue) => {
    if (bmiValue < 18.5) return 'Underweight';
    if (bmiValue < 25) return 'Normal weight';
    if (bmiValue < 30) return 'Overweight';
    return 'Obese';
  };

  const completeWorkout = (planIndex, dayIndex) => {
    const updatedPlans = [...plans];
    const currentPlan = updatedPlans[planIndex];
    
    // Mark current day as completed and remove current status
    currentPlan.schedule[dayIndex].isCompleted = true;
    currentPlan.schedule[dayIndex].isCurrent = false;
    
    // Unlock and set next day as current if available
    if (dayIndex + 1 < currentPlan.schedule.length) {
      currentPlan.schedule[dayIndex + 1].isLocked = false;
      currentPlan.schedule[dayIndex + 1].isCurrent = true;
    }
    
    setPlans(updatedPlans);
    saveProgress(updatedPlans);
    
    Alert.alert('Congratulations!', 'Workout completed! Next day unlocked.');
  };

  const renderPlanContent = () => (
    <FlatList
      ListHeaderComponent={
        <>
          {/* Slider */}
          <FlatList
            data={plans}
            renderItem={renderSliderItem}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={(event) => {
              const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
              setCurrentSlide(slideIndex);
            }}
            style={styles.slider}
          />

          {/* Dots */}
          <View style={styles.dotsContainer}>
            {plans.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  currentSlide === index && styles.activeDot
                ]}
              />
            ))}
          </View>
        </>
      }
      data={plans[currentSlide].schedule}
      renderItem={renderDayItem}
      keyExtractor={(item) => item.day.toString()}
      style={styles.scheduleList}
      ListFooterComponent={
        <TouchableOpacity 
          onPress={resetProgress}
          style={styles.resetButtonContainer}
        >
          <Text style={styles.resetButtonText}>Reset All Progress</Text>
        </TouchableOpacity>
      }
      ListFooterComponentStyle={styles.footerStyle}
    />
  );

  const renderSliderItem = ({ item, index }) => (
    <View style={styles.slideWrapper}>
      <View style={styles.slide}>
        <Image source={item.image} style={styles.slideImage} resizeMode="cover" />
        <View style={styles.overlayText}>
          <Text style={styles.slideTitle}>{item.title}</Text>
          <Text style={styles.daysText}>{item.days}</Text>
        </View>
      </View>
    </View>
  );

  // Update the renderDayItem function
  const renderDayItem = ({ item, index }) => (
    <View style={[
      styles.dayContainer,
      item.isCurrent && styles.currentDayContainer
    ]}>
      <View>
        <Text style={[
          styles.dayText,
          item.isCurrent && styles.currentDayText
        ]}>Day {item.day}</Text>
        <Text style={styles.focusText}>{item.focus}</Text>
      </View>
      {item.isLocked ? (
        <View style={styles.lockContainer}>
          <AntDesign name="lock" size={20} color="#666" />
        </View>
      ) : item.isCompleted ? (
        <View style={styles.completedContainer}>
          <AntDesign name="checkcircle" size={20} color="#4CAF50" />
        </View>
      ) : (
        <TouchableOpacity 
          style={styles.startButton}
          onPress={() => completeWorkout(currentSlide, index)}
        >
          <Text style={styles.startButtonText}>Start</Text>
        </TouchableOpacity>
      )}
    </View>
  );

      const renderBMICalculator = () => (
        <ScrollView style={styles.bmiContainer}>
          <Text style={styles.bmiTitle}>BMI Calculator</Text>
          <TextInput
            style={styles.input}
            placeholder="Height (cm)"
            keyboardType="numeric"
            value={height}
            onChangeText={setHeight}
          />
          <TextInput
            style={styles.input}
            placeholder="Weight (kg)"
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
          />
          <TouchableOpacity style={styles.calculateButton} onPress={calculateBMI}>
            <Text style={styles.calculateButtonText}>Calculate BMI</Text>
          </TouchableOpacity>
          
          {bmi && (
            <View style={styles.bmiResult}>
              <Text style={styles.bmiValue}>Your BMI: {bmi}</Text>
              <Text style={styles.bmiCategory}>Category: {getBMICategory(Number(bmi))}</Text>
            </View>
          )}
      
          <BMIInformation />
        </ScrollView>
      );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Top Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          onPress={() => setActiveTab('PLAN')}
          style={[styles.tab, activeTab === 'PLAN' && styles.activeTab]}
        >
          <Text style={[styles.tabText, activeTab === 'PLAN' && styles.activeTabText]}>
            PLAN
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => setActiveTab('BMI')}
          style={[styles.tab, activeTab === 'BMI' && styles.activeTab]}
        >
          <Text style={[styles.tabText, activeTab === 'BMI' && styles.activeTabText]}>
            BMI
          </Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      {activeTab === 'PLAN' ? renderPlanContent() : (
        <ScrollView style={styles.bmiContainer}>
          {renderBMICalculator()}
          <TouchableOpacity 
            onPress={resetProgress}
            style={styles.resetButtonContainer}
          >
            <Text style={styles.resetButtonText}>Reset All Progress</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tab: {
    paddingBottom: 5,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#4CAF50',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  activeTabText: {
    color: '#4CAF50',
  },
  slider: {
    height: 220,
  },
  slideWrapper: {
    width: SLIDE_WIDTH,
    marginHorizontal: SPACING / 2,
  },
  slide: {
    width: '100%',
    height: 180,
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: 15,
  },
  slideImage: {
    width: '100%',
    height: '100%',
  },
  overlayText: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  slideTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  daysText: {
    color: 'white',
    fontSize: 16,
    opacity: 0.9,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DDD',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#4CAF50',
  },
  scheduleList: {
    paddingHorizontal: 20,
  },
  dayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  currentDayContainer: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
    borderWidth: 1,
  },
  currentDayText: {
    color: '#4CAF50',
  },
  dayText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  focusText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  lockContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
  },
  startButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  bmiInfoContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  bmiInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  bmiInfoSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    lineHeight: 22,
  },
  bmiContainer: {
    padding: 20,
  },
  bmiTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  calculateButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  calculateButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bmiResult: {
    marginTop: 20,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  bmiValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5,
  },
  bmiCategory: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
  },
  bmiCategoryInfo: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  bmiWarning: {
    marginTop: 15,
    padding: 15,
    backgroundColor: '#FFE0E0',
    borderRadius: 8,
    marginBottom: 30,
  },
  warningText: {
    fontSize: 14,
    color: '#D32F2F',
    lineHeight: 20,
  },
  resetButtonContainer: {
    marginHorizontal: 20,
    marginVertical: 30,
    backgroundColor: '#FF5252',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  footerStyle: {
    paddingBottom: 20,
  },
});