import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import {
    backextension,
    lowerBack,
    backwardLunge,
    plank,
    sidePlank,
    pullup,
    pushups,
    lunges,
    russianTwist,
    hipThrust,
    bicepCurl,
    legpress,
    mountainClimber,
    kettlebellSwing,
    squat,
    benchPress,
    overhead,
    chestFly,
    deathLift,
    burpee,
    tricepdips,
    defaultImage
} from "./images"

const initialExercises = [
  { id: "1", name: "Back Extension", category: "Lower Back", image: backextension },
  { id: "2", name: "Backward Lunge", category: "Glutes, Quadriceps", image: backwardLunge },
  { id: "3", name: "Push Up", category: "Chest, Triceps", image: pushups },
  { id: "4", name: "Squat", category: "Legs, Glutes", image: squat },
  { id: "5", name: "Pull Up", category: "Back, Biceps", image: pullup },
  { id: "6", name: "Plank", category: "Core", image: plank },
  { id: "7", name: "Deadlift", category: "Back, Legs", image: deathLift },
  { id: "8", name: "Lunges", category: "Legs, Glutes", image: lunges},
  { id: "9", name: "Bicep Curl", category: "Arms", image: bicepCurl },
  { id: "10", name: "Bench Press", category: "Chest", image: benchPress},
  { id: "11", name: "Overhead Press", category: "Shoulders, Arms", image: overhead },
  { id: "12", name: "Tricep Dips", category: "Triceps", image: tricepdips },
  { id: "13", name: "Mountain Climbers", category: "Core, Cardio", image: mountainClimber },
  { id: "14", name: "Leg Press", category: "Legs", image: legpress },
  { id: "15", name: "Chest Fly", category: "Chest", image: chestFly },
  { id: "16", name: "Russian Twist", category: "Core", image: russianTwist },
  { id: "17", name: "Burpee", category: "Full Body, Cardio", image: burpee },
  { id: "18", name: "Kettlebell Swing", category: "Full Body, Legs", image: kettlebellSwing },
  { id: "19", name: "Hip Thrust", category: "Glutes, Hamstrings", image: hipThrust },
  { id: "20", name: "Side Plank", category: "Core", image: sidePlank },
];

const bodyParts = [
  
  "Lower Back",
  "Glutes, Quadriceps",
  "Chest, Triceps",
  "Legs, Glutes",
  "Back, Biceps",
  "Core",
  "Back, Legs",
  "Arms",
  "Chest",
  "Shoulders, Arms",
  "Triceps",
  "Core, Cardio",
  "Legs",
  "Full Body, Cardio",
  "Full Body, Legs",
  "Glutes, Hamstrings",
];

export default function ExerciseListScreen() {
  const navigation = useNavigation();
  const [exercises, setExercises] = useState(initialExercises);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLetter, setSelectedLetter] = useState("All");
  const [newExercise, setNewExercise] = useState({ name: "", category: "", image: null });

  // Load exercises from AsyncStorage when the component mounts
  useEffect(() => {
    const loadExercises = async () => {
      const storedExercises = await AsyncStorage.getItem('exercises');
      if (storedExercises) {
        setExercises(JSON.parse(storedExercises));
      }else {
        await AsyncStorage.setItem('exercises', JSON.stringify(initialExercises));
        setExercises(initialExercises);
      }
    };
    loadExercises();
  }, []);

  const handleAddExercise = async () => {
    if (newExercise.name && newExercise.category) {
      const newId = String(exercises.length + 1);
      const exerciseToAdd = {
        ...newExercise,
        id: newId,
        image: newExercise.image || lowerBack,
      };

      const updatedExercises = [...exercises, exerciseToAdd];
      console.log("updated exercises", updatedExercises)
      setExercises(updatedExercises);
      await AsyncStorage.setItem('exercises', JSON.stringify(updatedExercises));
      setNewExercise({ name: "", category: "", image: null }); // Reset form
      setModalVisible(false); // Close modal
    } else {
      alert("Please fill in all fields."); // Alert if fields are empty
    }
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setNewExercise({ ...newExercise, image: result.assets[0].uri }); // Update state with selected image
    }
  };

  const handleSearchToggle = () => {
    // Clear filters when search is toggled
    if (showSearch) {
      setSelectedCategory("All");
      setSelectedLetter("All");
      setSearchQuery(""); // Clear search query
    }
    setShowSearch(!showSearch);
  };
   // Function to filter exercises
   const filteredExercises = exercises.filter((exercise) => {
    const matchesCategory = selectedCategory === "All" || exercise.category === selectedCategory;
    const matchesLetter = selectedLetter === "All" || exercise.name.startsWith(selectedLetter);
    const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesLetter && matchesSearch;
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {showSearch ? (
          <TextInput
            style={styles.searchInput}
            placeholder="Search exercises..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onEndEditing={() => setSearchQuery("")}
          />
        ) : (
            <Text style={styles.title}>EXERCISES</Text>
            
        )}
        <TouchableOpacity onPress={handleSearchToggle}>
          <Ionicons name={showSearch ? "close" : "search"} size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Text>Filter by Letters</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", marginVertical: 10 }}>
        {["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"].map((letter) => (
          <TouchableOpacity key={letter} onPress={() => setSelectedLetter(letter)} style={{ padding: 5, margin: 5, backgroundColor: selectedLetter === letter ? "green" : "lightgray", borderRadius: 5 }}>
            <Text style={{ color: "white", fontWeight: "bold" }}>{letter}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <TouchableOpacity onPress={() => {
        setSelectedCategory("All"); // Resetting the category filter
        setSelectedLetter("All"); // Optionally reset letter filter to show all
        setSearchQuery(""); // Clear search query
      }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom:10 }}>
        <Ionicons 
          name="filter" 
          size={24} 
          color={selectedCategory === "All" ? "#4CAF50" : "black"} 
        />
        <Text style={{ color: selectedCategory === "All" ? "#4CAF50" : "black", marginLeft: 5 }}>
          (All)
        </Text>
      </View>
    </TouchableOpacity>

      {/* Exercises List */}
      <FlatList
        data={filteredExercises}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.exerciseItem}
            onPress={() => navigation.navigate("ExerciseDetail", { exercise: item })}
          >
            <Image source={item.image} style={styles.exerciseImage} />
            <View>
              <Text style={styles.exerciseName}>{item.name}</Text>
              <Text style={styles.exerciseCategory}>{item.category}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyMessage}>
              Oops! No exercises found. Try another search or reset filters.
            </Text>
          </View>
        }
      />

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>

      {/* Add Exercise Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Exercise</Text>
            <TouchableOpacity onPress={handlePickImage} style={styles.imagePicker}>
              <Image source={newExercise.image ? { uri: newExercise.image } : defaultImage} style={styles.imagePreview} />
              <Ionicons name="camera" size={50} color="#4CAF50" style={styles.cameraIcon} />
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              placeholder="Exercise Name"
              value={newExercise.name}
              onChangeText={(text) => setNewExercise({ ...newExercise, name: text })}
            />
            <Picker
              selectedValue={newExercise.category}
              onValueChange={(value) => setNewExercise({ ...newExercise, category: value })}
              style={styles.picker} // Add styling if necessary
            >
              <Picker.Item label="Select Body Part" value="" />
              {bodyParts.map((part) => (
                <Picker.Item key={part} label={part} value={part} />
              ))}
            </Picker>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.button} onPress={handleAddExercise}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 15,  marginTop: '10%' },

  // Header styling
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10 },
  title: { fontSize: 24, fontWeight: "bold", flex: 1, textAlign: "left" },
  searchInput: { flex: 1, backgroundColor: "#eee", padding: 8, borderRadius: 10, marginLeft: 10 },

  // Exercise List styling
  exerciseItem: { flexDirection: "row", alignItems: "center", backgroundColor: "#f9f9f9", padding: 15, borderRadius: 10, marginVertical: 5 },
  exerciseImage: { width: 50, height: 50, borderRadius: 25, marginRight: 15 }, // Rounded image
  exerciseName: { fontSize: 16, fontWeight: "bold", color: "#4CAF50" },
  exerciseCategory: { fontSize: 14, color: "gray" },

  // Floating Action Button
  fab: { position: "absolute", bottom: 20, right: 20, backgroundColor: "black", padding: 15, borderRadius: 30 },

  // Modal styling
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { width: 320, backgroundColor: "white", padding: 20, borderRadius: 15, alignItems: "center" },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },

  // Image Picker Styling
  imagePickerContainer: { alignItems: "center", marginBottom: 15 },
  imagePicker: { width: 100, height: 100, borderRadius: 50, backgroundColor: "#ddd", alignItems: "center", justifyContent: "center", overflow: "hidden" },
  imageIcon: { position: "absolute", bottom: 5, right: 5, backgroundColor: "#000", padding: 5, borderRadius: 15 },

  // Input fields
  input: { width: "100%", borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5, marginBottom: 10, marginTop: 15 },

  // Buttons inside modal
  modalButtons: { flexDirection: "row", justifyContent: "space-between", width: "100%" },
  button: { flex: 1, backgroundColor: "green", padding: 10, borderRadius: 5, alignItems: "center", marginRight: 5 },
  cancelButton: { flex: 1, backgroundColor: "red", padding: 10, borderRadius: 5, alignItems: "center", marginLeft: 5 },
  buttonText: { color: "white", fontWeight: "bold" },

  // Filter section
  filterSection: { marginTop: 10, alignItems: "center" },
  filterButton: { backgroundColor: "#ddd", padding: 8, borderRadius: 10 },
  filterText: { fontSize: 16, fontWeight: "bold" },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    marginTop: 100,
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: 18,
    color: 'gray',
  },
  picker: {
    // height: 50,
    width: '100%',
    marginBottom: 20,
  },
});

