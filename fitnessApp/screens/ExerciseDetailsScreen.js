import React, { useState } from "react";
import { View, Text, Image, TextInput, ScrollView, Button, Alert, StyleSheet } from "react-native";
import Slider from '@react-native-community/slider';  // Make sure to install this library if you haven't

const exerciseDetails = {
    "Back Extension": {
      preparation: "Lie face down on a mat with hands behind your head.",
      steps: [
        "Lift your upper body off the ground.",
        "Hold for a second at the top.",
        "Slowly lower yourself back down.",
      ],
      tips: "Keep your neck neutral to avoid strain.",
    },
    "Backward Lunge": {
      preparation: "Stand upright with your feet together.",
      steps: [
        "Step backward with one leg.",
        "Lower your hips until both knees are bent at about a 90-degree angle.",
        "Push through your front heel to return to the starting position.",
      ],
      tips: "Keep your front knee above your ankle.",
    },
    "Push Up": {
      preparation: "Start in a high plank position.",
      steps: [
        "Lower your body until your chest almost touches the ground.",
        "Push yourself back up to the starting position.",
        "Keep your core tight throughout the movement.",
      ],
      tips: "Maintain a straight body to avoid back strain.",
    },
    "Squat": {
      preparation: "Stand with your feet shoulder-width apart.",
      steps: [
        "Lower your body by bending your knees and pushing your hips back.",
        "Keep your chest up and back straight.",
        "Go down until your thighs are parallel to the ground, then return to standing.",
      ],
      tips: "Keep your weight on your heels.",
    },
    "Pull Up": {
      preparation: "Hang from a pull-up bar with an overhand grip.",
      steps: [
        "Pull your body up until your chin is above the bar.",
        "Lower yourself back to the starting position.",
      ],
      tips: "Engage your back muscles to avoid straining your arms.",
    },
    "Plank": {
      preparation: "Lie face down and lift your body on your forearms and toes.",
      steps: [
        "Keep your body in a straight line from head to heels.",
        "Hold the position for the desired time.",
      ],
      tips: "Don't let your hips sag or lift too high.",
    },
    "Deadlift": {
      preparation: "Stand with your feet hip-width apart and a barbell in front of you.",
      steps: [
        "Bend at your hips and knees to grab the bar.",
        "Lift the bar by straightening your hips and knees.",
        "Keep your back straight throughout the movement.",
      ],
      tips: "Keep the bar close to your body.",
    },
    "Lunges": {
      preparation: "Stand upright with feet together.",
      steps: [
        "Step forward with one leg and lower your hips.",
        "Both knees should be at 90-degree angles.",
        "Push through the front heel to return to standing.",
      ],
      tips: "Keep your torso upright.",
    },
    "Bicep Curl": {
      preparation: "Stand with a dumbbell in each hand, arms at your sides.",
      steps: [
        "Curl the weights towards your shoulders while keeping your elbows close to your body.",
        "Lower the weights back to the starting position.",
      ],
      tips: "Don't swing your body; keep it still.",
    },
    "Bench Press": {
      preparation: "Lie on a bench with a barbell above your chest.",
      steps: [
        "Lower the barbell to your chest.",
        "Push the barbell back to the starting position.",
      ],
      tips: "Keep your feet flat on the ground.",
    },
    "Overhead Press": {
      preparation: "Stand with a barbell at shoulder height.",
      steps: [
        "Press the barbell overhead until your arms are fully extended.",
        "Lower the barbell back to shoulder height.",
      ],
      tips: "Keep your core tight to avoid back strain.",
    },
    "Tricep Dips": {
      preparation: "Sit on the edge of a bench with your hands beside you.",
      steps: [
        "Lower your body by bending your elbows.",
        "Push back up to the starting position.",
      ],
      tips: "Keep your elbows close to your body.",
    },
    "Mountain Climbers": {
      preparation: "Start in a high plank position.",
      steps: [
        "Quickly bring one knee towards your chest.",
        "Switch legs, bringing the other knee forward.",
        "Continue alternating legs rapidly.",
      ],
      tips: "Keep your core engaged.",
    },
    "Leg Press": {
      preparation: "Sit on a leg press machine with your feet on the platform.",
      steps: [
        "Push the platform away by extending your legs.",
        "Lower the platform back towards you by bending your knees.",
      ],
      tips: "Do not lock your knees at the top.",
    },
    "Chest Fly": {
      preparation: "Lie on a bench with dumbbells in each hand, arms extended above your chest.",
      steps: [
        "Lower the dumbbells out to the sides in a wide arc.",
        "Bring the dumbbells back together above your chest.",
      ],
      tips: "Keep a slight bend in your elbows.",
    },
    "Russian Twist": {
      preparation: "Sit on the floor with your knees bent and feet flat.",
      steps: [
        "Lean back slightly and lift your feet off the ground.",
        "Twist your torso to one side, then to the other.",
      ],
      tips: "Engage your core throughout the movement.",
    },
    "Burpee": {
      preparation: "Stand with your feet shoulder-width apart.",
      steps: [
        "Drop into a squat and put your hands on the ground.",
        "Kick your feet back into a plank position.",
        "Do a push-up, then jump your feet back to your hands.",
        "Jump up explosively with your arms overhead.",
      ],
      tips: "Keep your movements fluid.",
    },
    "Kettlebell Swing": {
      preparation: "Stand with feet wider than shoulder-width and a kettlebell in front of you.",
      steps: [
        "Hinge at your hips and grab the kettlebell.",
        "Swing the kettlebell between your legs and then thrust your hips forward to swing it up.",
        "Control the descent back between your legs.",
      ],
      tips: "Use your hips, not your arms, to drive the swing.",
    },
    "Hip Thrust": {
      preparation: "Sit on the ground with your upper back against a bench and a barbell over your hips.",
      steps: [
        "Drive through your heels to lift your hips towards the ceiling.",
        "Hold the position at the top for a moment before lowering back down.",
      ],
      tips: "Keep your chin tucked and your core engaged.",
    },
    "Side Plank": {
      preparation: "Lie on your side with your legs stacked on top of each other.",
      steps: [
        "Lift your body off the ground using your forearm.",
        "Keep your body in a straight line from head to heels.",
        "Hold the position for the desired time.",
      ],
      tips: "Don't let your hips sag.",
    },
  };

const ExerciseDetailScreen = ({ route }) => {
  const { exercise } = route.params;
  const details = exerciseDetails[exercise.name] || {};
  const [note, setNote] = useState("");
  const [isImageVisible, setIsImageVisible] = useState(true);  // State for toggle between image/video
  const [extraNote, setExtraNote] = useState("");

  const saveNote = () => {
    console.log("Note saved:", note);
    Alert.alert("Note Saved", "Your note has been saved successfully!");
    setExtraNote(note)
    setNote("");
  };

  return (
    <ScrollView style={{ padding: 20, flex:1 }}>
      {/* Slider to switch between Image and Video */}
     {/* Carousel for Image and Video */}
     <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.carousel}>
        <View style={styles.carouselItem}>
          <Image source={exercise.image} style={styles.carouselImage} />
        </View>
        {/* Placeholder for video or additional images */}
        <View style={styles.carouselItem}>
          <Text style={styles.videoPlaceholder}>Video Placeholder (Replace with actual video component)</Text>
        </View>
      </ScrollView>

      <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 10 }}>{exercise.name}</Text>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10, paddingBottom:5 }}>Focus Area:</Text>
      <Text style={{ fontWeight: "400", fontSize:18 }}>{exercise.category || "No category available."}</Text>
      <Text style={{ fontSize: 23, fontWeight: "bold", marginTop: 10, paddingBottom:5, color: "#4CAF50" }}>Instructions</Text>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginTop: 10, paddingBottom:15 }}>Preparation:</Text>
      <Text style={{ fontWeight: "400", fontSize:18 }}>{details.preparation || "No preparation details available."}</Text>

      <Text style={{ fontSize: 22, fontWeight: "bold", marginTop: 10, paddingBottom:15 }}>Steps:</Text>
      {details.steps ? (
        details.steps.map((step, index) => <Text key={index} style={{ fontWeight: "400", fontSize:18 }}>{index + 1}. {step}</Text>)
      ) : (
        <Text style={{ fontWeight: "300" }}>No step-by-step guide available.</Text>
      )}

      <Text style={{ fontSize: 22, fontWeight: "bold", marginTop: 10, paddingBottom:15 }}>Key Tips:</Text>
      <Text style={{ fontWeight: "400", fontSize:18 }}>{details.tips || "No tips available."}</Text>

      <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10 }}>Add Notes:</Text>
      <TextInput
        placeholder="Write your notes here..."
        value={note}
        onChangeText={setNote}
        multiline
        style={{ borderWidth: 1, borderColor: "#ddd", padding: 10, marginVertical: 10, borderRadius: 5 }}
      />

      <View style={{paddingTop:20, paddingBottom:50}}>
        <Button
            title="Save Note"
            onPress={saveNote}
            color="#4CAF50"
        />
      </View>
       {/* Conditionally Render Extra Notes */}
       {extraNote ? (
        <View style={{paddingTop:20, paddingBottom:50}}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10 }}>Extra Notes:</Text>
          <Text style={{ fontWeight: "400", fontSize: 18 }}>{extraNote}</Text>
        </View>
      ) : null}
    </ScrollView>
  );
};


const styles = StyleSheet.create({
    
    carousel: {
      width: "100%",
      height: 200,
      marginBottom: 20,
    },
    carouselItem: {
        width: 370,
        height: "100%",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      backgroundColor: "#ddd",
      marginRight: 10,
    },
    carouselImage: {
      width: "100%",
      height: "100%",
      borderRadius: 10,
    },
    videoPlaceholder: {
      textAlign: "center",
      fontSize: 16,
      color: "#555",
    },
    
  });

  
export default ExerciseDetailScreen;
