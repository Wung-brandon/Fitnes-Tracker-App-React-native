import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Statusbar
} from 'react-native';
import MealCard from '../components/MealCard';
import NutritionProgress from '../components/NutritionProgress';
import { colors } from '../theme/color';
import { typography } from '../theme/typography';

export default function NutritionScreen({ navigation }) {
  const [nutritionGoals] = useState({
    calories: 2000,
    protein: 150,
    carbs: 200,
    fat: 65,
  });

  const [meals, setMeals] = useState([
    {
      id: 1,
      name: 'Breakfast',
      time: '8:00 AM',
      foods: [
        { name: 'Oatmeal', calories: 150, protein: 6, carbs: 27, fat: 3 },
        { name: 'Banana', calories: 105, protein: 1.3, carbs: 27, fat: 0.4 },
      ],
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newMeal, setNewMeal] = useState({
    name: '',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    foods: [],
  });

  const [foodItem, setFoodItem] = useState({ name: '', calories: '', protein: '', carbs: '', fat: '' });

  const handleAddFood = () => {
    if (foodItem.name && foodItem.calories && foodItem.protein && foodItem.carbs && foodItem.fat) {
      setNewMeal({ ...newMeal, foods: [...newMeal.foods, { ...foodItem, calories: Number(foodItem.calories), protein: Number(foodItem.protein), carbs: Number(foodItem.carbs), fat: Number(foodItem.fat) }] });
      setFoodItem({ name: '', calories: '', protein: '', carbs: '', fat: '' }); // Reset food input fields
    }
  };

  const handleAddMeal = () => {
    if (newMeal.name && newMeal.foods.length > 0) {
      setMeals([...meals, { id: meals.length + 1, ...newMeal }]);
      setNewMeal({ name: '', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), foods: [] }); // Reset meal form
      setModalVisible(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      
      <View style={styles.header}>
        <Text style={styles.title}>Nutrition Tracking</Text>
        <TouchableOpacity style={styles.addMealButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>+ Add Meal</Text>
        </TouchableOpacity>
      </View>

      <NutritionProgress current={{ calories: 1250, protein: 75, carbs: 120, fat: 35 }} goals={nutritionGoals} />

      <View style={styles.mealsSection}>
        <Text style={styles.sectionTitle}>Today's Meals</Text>
        {meals.map(meal => (
          <MealCard key={meal.id} meal={meal} onPress={() => navigation.navigate('MealDetail', { meal })} />
        ))}
      </View>

      {/* Modal for Adding Meal */}
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Meal</Text>
            
            {/* Meal Name Input */}
            <TextInput style={styles.input} placeholder="Meal Name" value={newMeal.name} onChangeText={text => setNewMeal({ ...newMeal, name: text })} />
            
            {/* Display Auto-Generated Time */}
            <Text style={styles.timeDisplay}>Time: {newMeal.time}</Text>

            <Text style={styles.subTitle}>Add Food Item</Text>
            <TextInput style={styles.input} placeholder="Food Name" value={foodItem.name} onChangeText={text => setFoodItem({ ...foodItem, name: text })} />
            <TextInput style={styles.input} placeholder="Calories" keyboardType="numeric" value={foodItem.calories} onChangeText={text => setFoodItem({ ...foodItem, calories: text })} />
            <TextInput style={styles.input} placeholder="Protein (g)" keyboardType="numeric" value={foodItem.protein} onChangeText={text => setFoodItem({ ...foodItem, protein: text })} />
            <TextInput style={styles.input} placeholder="Carbs (g)" keyboardType="numeric" value={foodItem.carbs} onChangeText={text => setFoodItem({ ...foodItem, carbs: text })} />
            <TextInput style={styles.input} placeholder="Fat (g)" keyboardType="numeric" value={foodItem.fat} onChangeText={text => setFoodItem({ ...foodItem, fat: text })} />

            <TouchableOpacity style={[styles.modalButton, styles.addFoodButton]} onPress={handleAddFood}>
              <Text style={styles.buttonText}>+ Add Food</Text>
            </TouchableOpacity>

            {/* Display Added Foods */}
            {newMeal.foods.length > 0 && (
              <View style={styles.foodList}>
                {newMeal.foods.map((food, index) => (
                  <Text key={index} style={styles.foodItem}>{food.name} - {food.calories} cal</Text>
                ))}
              </View>
            )}

            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.addButton]} onPress={handleAddMeal}>
                <Text style={styles.buttonText}>Add Meal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { ...typography.h1 },
  addMealButton: { backgroundColor: colors.primary, padding: 10, borderRadius: 8 },
  buttonText: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
  mealsSection: { padding: 20 },
  sectionTitle: { ...typography.h2, marginBottom: 15 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '80%', backgroundColor: '#fff', padding: 20, borderRadius: 10, elevation: 5 },
  modalTitle: { ...typography.h2, textAlign: 'center', marginBottom: 15 },
  subTitle: { fontWeight: 'bold', marginVertical: 10 },
  timeDisplay: { fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: colors.grayLight, padding: 10, borderRadius: 5, marginBottom: 10 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  modalButton: { flex: 1, padding: 10, borderRadius: 5, alignItems: 'center', marginHorizontal: 5 },
  cancelButton: { backgroundColor: colors.danger },
  addButton: { backgroundColor: colors.primary },
  addFoodButton: { backgroundColor: colors.secondary, marginTop: 5 },
  foodList: { marginTop: 10 },
  foodItem: { fontSize: 14, marginBottom: 5 },
});

