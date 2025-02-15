import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CategoryDetailScreen = ({ route }) => {
  const { category } = route.params; // Get the category name passed via navigation

  const categoryDetails = {
    Strength: {
      description: [
        "1. **Warm-Up**: Start with a light warm-up to get your body prepared for the heavy lifting. Try light cardio or dynamic stretching for 5-10 minutes.",
        "2. **Start with Compound Movements**: Begin with larger muscle group exercises like squats, deadlifts, or bench presses. These are great for building overall strength.",
        "3. **Focus on Form**: Proper technique is essential to prevent injury. Make sure to engage your core and maintain proper posture during each movement.",
        "4. **Increase Intensity Gradually**: Aim for 3-4 sets of 8-12 repetitions for each exercise. Gradually increase the weight as your strength improves.",
        "5. **Cool Down**: End your workout with stretching or foam rolling to promote recovery and flexibility."
      ],
      icon: 'barbell',
    },
    Cardio: {
      description: [
        "1. **Warm-Up**: Begin with a 5-minute warm-up to get your heart rate up and muscles ready for more intense activity. You can walk or jog slowly.",
        "2. **Intensity**: Focus on a steady, moderate pace to keep your heart rate in the target zone. You can increase intensity with sprints or intervals.",
        "3. **Breathing**: Remember to breathe deeply and consistently. This helps your body stay oxygenated and perform at its best.",
        "4. **Duration**: Aim for at least 30 minutes of cardio for optimal heart health. Increase the time as your endurance improves.",
        "5. **Cool Down**: Slow down gradually and stretch to prevent stiffness and aid recovery."
      ],
      icon: 'heart',
    },
    Yoga: {
      description: [
        "1. **Begin with Mindful Breathing**: Start in a comfortable seated position. Focus on your breath, inhaling deeply through your nose and exhaling slowly through your mouth.",
        "2. **Sun Salutations**: Move through gentle flow sequences like Sun Salutation A to stretch and warm up the body.",
        "3. **Balance Postures**: Incorporate balance poses like Tree Pose or Warrior III to enhance stability and strength.",
        "4. **Focus on Flexibility**: Include stretches like Downward Dog, Forward Fold, and Pigeon Pose to target different muscle groups.",
        "5. **End with Meditation**: Conclude your session with a few minutes of seated meditation or Savasana to relax your mind and body."
      ],
      icon: 'body',
    },
    HIIT: {
      description: [
        "1. **Warm-Up**: Start with 5-10 minutes of dynamic stretches or light jogging to get your heart rate up.",
        "2. **Intervals**: Alternate between 30-45 seconds of high-intensity exercises (like jumping jacks, burpees, or sprints) followed by 15-30 seconds of rest.",
        "3. **Full Body Engagement**: Include exercises that engage your whole body such as mountain climbers, squat jumps, and push-ups.",
        "4. **Pacing**: Maintain a pace that challenges you but doesn't leave you completely exhausted. The idea is to push hard during intervals and rest during the recovery period.",
        "5. **Cool Down**: End with a cool-down to bring your heart rate back down and stretch your muscles."
      ],
      icon: 'timer',
    },
  };

  const categoryData = categoryDetails[category];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name={categoryData.icon} size={40} color="#4CAF50" />
        <Text style={styles.title}>{category}</Text>
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.subtitle}>Step-by-Step Guide</Text>
        {categoryData.description.map((step, index) => (
          <View key={index} style={styles.stepContainer}>
            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
      </View>

      <View style={styles.additionalInfo}>
        <Text style={styles.subtitle}>Why This Is Important</Text>
        <Text style={styles.infoText}>
          Following a structured workout plan helps you focus on improving your strength, endurance, or flexibility without overtraining any muscle group. Each step ensures that you’re working at the right intensity to achieve your fitness goals. Proper technique reduces the risk of injury, and adequate rest periods allow your body to recover and perform at its best.
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Stay Consistent and Push Your Limits!</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginLeft: 10,
  },
  descriptionContainer: {
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  stepText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
    lineHeight: 24,
  },
  additionalInfo: {
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'justify',
    lineHeight: 24,
  },
  footer: {
    alignItems: 'center',
    marginTop: 40,
  },
  footerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
});

export default CategoryDetailScreen;
