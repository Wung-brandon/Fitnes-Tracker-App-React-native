import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, TextInput, Modal, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from '../context/AuthContext';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export default function ProfileScreen({ navigation }) {
  const { user, setUser } = useContext(AuthContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    username: user?.username || '',
    email: user?.email || '',
    profilePic: user?.profilePic || '',
    age: user?.age?.toString() || '',
    height: user?.height?.toString() || '',
    weight: user?.weight?.toString() || '',
    gender: user?.gender || '',
    goal: user?.goal || '',
  });

  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();

  useEffect(() => {
    // Request permissions to access the gallery when the component mounts
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'We need permission to access your photos.');
      }
    })();
  }, []);

  // Handle input change
  const handleInputChange = (field, value) => {
    setUpdatedUser({
      ...updatedUser,
      [field]: value,
    });
  };

  // Handle image picking from the gallery
  const handleImagePick = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        setUpdatedUser({ ...updatedUser, profilePic: result.assets[0].uri });
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to select image. Please try again.");
    }
  };

  // Upload image to Firebase Storage
  const uploadImage = async (uri) => {
    if (!uri) return null;
    
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      
      const fileExtension = uri.split('.').pop();
      const fileName = `profileImages/${auth.currentUser.uid}_${Date.now()}.${fileExtension}`;
      const storageRef = ref(storage, fileName);
      
      const uploadTask = uploadBytesResumable(storageRef, blob);
      
      return new Promise((resolve, reject) => {
        uploadTask.on('state_changed',
          (snapshot) => {
            // Upload progress tracking if needed
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
          },
          (error) => {
            reject(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          }
        );
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  // Handle saving profile updates
  const handleSaveProfile = async () => {
    try {
      setIsLoading(true);
      
      // Check if user is authenticated
      if (!auth.currentUser) {
        Alert.alert("Error", "You must be logged in to update your profile.");
        setIsLoading(false);
        return;
      }
      
      // Prepare updated user data
      const userId = auth.currentUser.uid;
      const userRef = doc(db, 'users', userId);
      
      let profilePicUrl = user?.profilePic || ''; // Default to empty string instead of undefined
      
      // If profile pic has changed (and is a local URI), upload it
      if (updatedUser.profilePic && updatedUser.profilePic !== user?.profilePic && 
          updatedUser.profilePic.startsWith('file:')) {
        try {
          const uploadedUrl = await uploadImage(updatedUser.profilePic);
          if (uploadedUrl) {
            profilePicUrl = uploadedUrl;
          }
        } catch (uploadError) {
          console.error("Failed to upload profile image:", uploadError);
          // Continue with update even if image upload fails
        }
      } else if (updatedUser.profilePic) {
        // Keep existing remote URL
        profilePicUrl = updatedUser.profilePic;
      }
      
      // Convert numeric fields to numbers and ensure no undefined values
      const userUpdates = {
        username: updatedUser.username || '',
        email: updatedUser.email || '', // Note: email updates should be done via Firebase Auth
        profilePic: profilePicUrl,
        age: updatedUser.age ? parseInt(updatedUser.age) : null,
        height: updatedUser.height ? parseFloat(updatedUser.height) : null,
        weight: updatedUser.weight ? parseFloat(updatedUser.weight) : null,
        gender: updatedUser.gender || '',
        goal: updatedUser.goal || '',
        updatedAt: new Date()
      };
      
      // Remove any null values to prevent Firestore errors
      Object.keys(userUpdates).forEach(key => {
        if (userUpdates[key] === null || userUpdates[key] === undefined) {
          delete userUpdates[key];
        }
      });
      
      // Update Firestore
      await updateDoc(userRef, userUpdates);
      
      // Update local context
      setUser({ ...user, ...userUpdates });
      
      setModalVisible(false);
      setIsLoading(false);
      Alert.alert('Success', 'Profile updated successfully!');
      
    } catch (error) {
      setIsLoading(false);
      console.error("Error updating profile:", error);
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    }
  };

  // Get profile picture or fallback
  const getProfilePicture = () => {
    if (updatedUser.profilePic) {
      return (
        <Image source={{ uri: updatedUser.profilePic }} style={styles.image} />
      );
    } else {
      const initial = updatedUser.email ? updatedUser.email.charAt(0).toUpperCase() : '?';
      return (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>{initial}</Text>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" size={30} color="#4CAF50" />
      </TouchableOpacity>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileHeader}>
          <View style={styles.profilePicContainer}>
            {getProfilePicture()}
            <TouchableOpacity
              style={styles.editIconContainer}
              onPress={() => setModalVisible(true)}
            >
              <MaterialIcons name="edit" size={20} color="#4CAF50" />
            </TouchableOpacity>
          </View>

          <Text style={styles.userName}>{user?.username || 'User'}</Text>
          <Text style={styles.userEmail}>{user?.email || ''}</Text>
        </View>

        <View style={styles.userInfo}>
          <View style={styles.infoCard}>
            <Text style={styles.cardTitle}>Personal Information</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Age:</Text>
              <Text style={styles.infoValue}>{user?.age || 'Not set'}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Gender:</Text>
              <Text style={styles.infoValue}>{user?.gender || 'Not set'}</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.cardTitle}>Fitness Information</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Height:</Text>
              <Text style={styles.infoValue}>{user?.height ? `${user.height} cm` : 'Not set'}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Weight:</Text>
              <Text style={styles.infoValue}>{user?.weight ? `${user.weight} kg` : 'Not set'}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Fitness Goal:</Text>
              <Text style={styles.infoValue}>{user?.goal || 'Not set'}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal for Editing Profile */}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalTitle}>Edit Profile</Text>

              <View style={styles.profilePicEditContainer}>
                {updatedUser.profilePic ? (
                  <Image source={{ uri: updatedUser.profilePic }} style={styles.profilePicEdit} />
                ) : (
                  <View style={styles.profilePicPlaceholder}>
                    <Text style={styles.placeholderTextModal}>
                      {updatedUser.email?.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                )}
                <TouchableOpacity style={styles.changePicButton} onPress={handleImagePick}>
                  <Text style={styles.changePicText}>Change Picture</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.inputLabel}>Username</Text>
              <TextInput
                style={styles.input}
                placeholder="Username"
                value={updatedUser.username}
                onChangeText={(text) => handleInputChange('username', text)}
              />

              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={[styles.input, styles.disabledInput]}
                placeholder="Email"
                value={updatedUser.email}
                editable={false}
              />

              <Text style={styles.inputLabel}>Age</Text>
              <TextInput
                style={styles.input}
                placeholder="Age"
                value={updatedUser.age}
                onChangeText={(text) => handleInputChange('age', text)}
                keyboardType="numeric"
              />

              <Text style={styles.inputLabel}>Gender</Text>
              <TextInput
                style={styles.input}
                placeholder="Gender"
                value={updatedUser.gender}
                onChangeText={(text) => handleInputChange('gender', text)}
              />

              <Text style={styles.inputLabel}>Height (cm)</Text>
              <TextInput
                style={styles.input}
                placeholder="Height in cm"
                value={updatedUser.height}
                onChangeText={(text) => handleInputChange('height', text)}
                keyboardType="numeric"
              />

              <Text style={styles.inputLabel}>Weight (kg)</Text>
              <TextInput
                style={styles.input}
                placeholder="Weight in kg"
                value={updatedUser.weight}
                onChangeText={(text) => handleInputChange('weight', text)}
                keyboardType="numeric"
              />

              <Text style={styles.inputLabel}>Fitness Goal</Text>
              <TextInput
                style={[styles.input, styles.goalInput]}
                placeholder="Your fitness goal"
                value={updatedUser.goal}
                onChangeText={(text) => handleInputChange('goal', text)}
                multiline
              />

              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  style={styles.saveButton} 
                  onPress={handleSaveProfile}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.saveButtonText}>Save Changes</Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.cancelButton} 
                  onPress={() => setModalVisible(false)}
                  disabled={isLoading}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 30,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    padding: 10,
    zIndex: 10,
  },
  profileHeader: {
    alignItems: 'center',
    marginTop: 80,
    marginBottom: 30,
    width: '100%',
  },
  profilePicContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#fff',
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
  },
  placeholderText: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    elevation: 3,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
  },
  userInfo: {
    width: '90%',
    marginTop: 20,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 12,
    paddingVertical: 5,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    width: 100,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    width: '90%',
    maxHeight: '90%',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 20,
    textAlign: 'center',
  },
  profilePicEditContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicEdit: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profilePicPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  placeholderTextModal: {
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
  },
  changePicButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  changePicText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  disabledInput: {
    backgroundColor: '#e8e8e8',
    color: '#888',
  },
  goalInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'column',
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  cancelButtonText: {
    color: '#555',
    fontSize: 16,
    fontWeight: 'bold',
  },
});