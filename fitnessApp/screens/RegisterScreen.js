import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { 
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { AuthContext } from '../context/AuthContext';
import { auth, db } from '../firebaseConfig';


export default function RegisterScreen({ navigation }) {
  const { setUser } = useContext(AuthContext);
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [goal, setGoal] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    setError('');
    
    if (!username || !email || !password || !confirmPassword || !age || !gender || !goal || !height || !weight) {
      setError('Please fill in all fields');
      return false;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    if (isNaN(age) || parseInt(age) < 13 || parseInt(age) > 100) {
      setError('Please enter a valid age (13-100)');
      return false;
    }
    
    if (isNaN(height) || parseInt(height) <= 0) {
      setError('Please enter a valid height');
      return false;
    }
    
    if (isNaN(weight) || parseInt(weight) <= 0) {
      setError('Please enter a valid weight');
      return false;
    }
    
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;
    
    try {
      setLoading(true);
      
      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Save additional user data to Firestore
      const userData = {
        uid: firebaseUser.uid,
        username,
        email,
        age: parseInt(age),
        gender,
        goal,
        height: parseFloat(height),
        weight: parseFloat(weight),
        createdAt: new Date().toISOString(),
      };
      
      await setDoc(doc(db, "users", firebaseUser.uid), userData);
      
      // Update context
      setUser(userData);
      
      // Show success message and navigate to Home
      Alert.alert('Registration Successful', 'You have registered successfully!', [
        { text: 'OK', onPress: () => navigation.replace('HomeTabs') },
      ]);
    } catch (error) {
      let errorMessage = 'Registration failed';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Email address is already in use';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak';
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.logoContainer}>
          <Text style={styles.title}>FitTracker Pro</Text>
          <Text style={styles.subtitle}>Start your fitness journey today today</Text>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
          
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter email address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Create password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          
          <Text style={styles.inputLabel}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          
          <Text style={styles.inputLabel}>Age</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your age"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
          />
          
          <Text style={styles.inputLabel}>Height (cm)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your height in cm"
            value={height}
            onChangeText={setHeight}
            keyboardType="numeric"
          />
          
          <Text style={styles.inputLabel}>Weight (kg)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your weight in kg"
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
          />
          
          <Text style={styles.inputLabel}>Gender</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue) => setGender(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select gender" value="" />
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
              <Picker.Item label="Non-binary" value="non-binary" />
              <Picker.Item label="Prefer not to say" value="not-specified" />
            </Picker>
          </View>
          
          <Text style={styles.inputLabel}>Fitness Goal</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={goal}
              onValueChange={(itemValue) => setGoal(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select your goal" value="" />
              <Picker.Item label="Weight Loss" value="weight-loss" />
              <Picker.Item label="Muscle Gain" value="muscle-gain" />
              <Picker.Item label="Improve Endurance" value="endurance" />
              <Picker.Item label="Maintain Fitness" value="maintain" />
              <Picker.Item label="General Health" value="general-health" />
            </Picker>
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.registerButton, loading && styles.disabledButton]}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={styles.registerButtonText}>Create Account</Text>
                )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('Login')}
          disabled={loading}
        >
          <Text style={styles.loginButtonText}>
            Already have an account? Login Login
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 5,
    marginLeft: 5,
  },
  input: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  pickerContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  picker: {
    height: 50,
  },
  registerButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: '#A5D6A7',
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginButton: {
    marginTop: 20,
    marginBottom: 30,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#4CAF50',
    fontSize: 16,
  },
  errorText: {
    color: '#D32F2F',
    marginBottom: 15,
    textAlign: 'center',
    backgroundColor: '#FFEBEE',
    padding: 10,
    borderRadius: 5,
  },
});