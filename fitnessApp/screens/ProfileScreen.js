import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, TextInput, Modal, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'; // Expo Image Picker to select images

export default function ProfileScreen({ navigation }) {
  const { user } = useAuth();
  const [isModalVisible, setModalVisible] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    name: user?.name || 'Perez',
    email: user?.email || 'john.doe@example.com',
    profileImage: user?.profilePic || '', // Initially use the profile pic if available
    bio: user?.bio || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non felis sed libero cursus commodo.',
  });

  useEffect(() => {
    // Request permissions to access the gallery when the component mounts
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'We need permission to access your photos.');
      }
    })();
  }, []);

  // Handle input change (e.g., for name, bio)
  const handleInputChange = (field, value) => {
    setUpdatedUser({
      ...updatedUser,
      [field]: value,
    });
  };

  // Handle image picking from the gallery
  const handleImagePick = async () => {
    try {
      console.log("Opening image picker...");
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        // Update profileImage state with selected image URI
        setUpdatedUser({ ...updatedUser, profileImage: result.uri });
        console.log("Image selected:", result.uri);
      } else {
        console.log("Image picker was canceled.");
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  // Handle saving profile updates (simulate an API call)
  const handleSaveProfile = () => {
    setModalVisible(false);
    Alert.alert('Profile Edited Successfully!');
    // Send updated profile to the API, including the image URI if required
    // Example:
    // api.updateProfile(updatedUser);
  };

  // Profile picture fallback (use first letter of email if no profile image)
  const profilePic = updatedUser.profileImage ? (
    <Image source={{ uri: updatedUser.profileImage }} style={styles.image} />
  ) : (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderText}>
        {updatedUser.email.charAt(0).toUpperCase()}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" size={30} color="#4CAF50" />
      </TouchableOpacity>

      <View style={styles.profileHeader}>
        <View style={styles.profilePicContainer}>
          {updatedUser.profileImage ? (
            <Image source={{ uri: updatedUser.profileImage }} style={styles.image} />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>{profilePic}</Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.editIconContainer}
            onPress={handleImagePick}
          >
            <Text style={styles.editIcon}>✎</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.userName}>{updatedUser.name}</Text>
        <Text style={styles.userEmail}>{updatedUser.email}</Text>
      </View>

      <View style={styles.userInfo}>
        <Text style={styles.userInfoTitle}>Name</Text>
        <TextInput
          style={styles.userInfoInput}
          value={updatedUser.name}
          onChangeText={(text) => handleInputChange('name', text)}
          editable={false}
        />

        <Text style={styles.userInfoTitle}>Email</Text>
        <TextInput
          style={styles.userInfoInput}
          value={updatedUser.email}
          onChangeText={(text) => handleInputChange('email', text)}
          editable={false}
        />

        <Text style={styles.userInfoTitle}>Bio</Text>
        <TextInput
          style={[styles.userInfoInput, styles.bioInput]}
          value={updatedUser.bio}
          onChangeText={(text) => handleInputChange('bio', text)}
          multiline
          editable={false}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

      {/* Modal for Editing Profile */}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <Text>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={updatedUser.name}
              onChangeText={(text) => handleInputChange('name', text)}
            />
            <Text>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={updatedUser.email}
              onChangeText={(text) => handleInputChange('email', text)}
              editable={false}
            />
            <Text>Bio</Text>
            <TextInput
              style={styles.input}
              placeholder="Bio"
              value={updatedUser.bio}
              onChangeText={(text) => handleInputChange('bio', text)}
              multiline
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancell</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 20,
    padding: 10,
  },
  profileHeader: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 30,
  },
  profilePicContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
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
    backgroundColor: '#ccc',
  },
  placeholderText: {
    fontSize: 36,
    color: '#666',
    fontWeight: 'bold',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#4CAF50',
    borderRadius: 50,
    padding: 5,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  
  button: {
    marginTop: 30,
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
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
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16,
  },
  userInfo: {
    width: '90%',
    // backgroundColor: '#f5f5f5',
    // borderRadius: 10,
    padding: 20,
    // elevation: 1,
  },
  userInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userInfoInput: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 5,
  },
  editIcon: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
});
