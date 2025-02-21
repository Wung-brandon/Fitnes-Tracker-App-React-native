import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const RateUsScreen = () => {
  const navigation = useNavigation();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleStarPress = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleSubmit = () => {
    if (rating === 0) {
      Alert.alert('Rating Required', 'Please select a star rating before submitting.');
      return;
    }

    // Here you would normally send the rating data to your backend
    Alert.alert(
      'Thank You!',
      'Your rating has been submitted successfully!',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" size={24} color="#43A047" />
          </TouchableOpacity>
          <Text style={styles.title}>Rate Fitness Tracker Pro</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.appInfo}>
              <View style={styles.appIconContainer}>
                <Icon name="arm-flex" size={60} color="#FFFFFF" style={styles.appIcon} />
              </View>
              <Text style={styles.appName}>Fitness Tracker Pro</Text>
              <Text style={styles.appVersion}>Version 1.2.3 1.2.3</Text>
            </View>

            <Text style={styles.ratingPrompt}>How would you rate your experience?</Text>
            
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => handleStarPress(star)}
                  style={styles.starButton}
                >
                  <Icon
                    name={rating >= star ? "star" : "star-outline"}
                    size={40}
                    color={rating >= star ? "#FFD700" : "#D1D1D6"}
                  />
                </TouchableOpacity>
              ))}
            </View>
            
            <Text style={styles.ratingText}>
              {rating === 0 ? 'Tap a star to rate' : 
               rating === 1 ? 'Poor' :
               rating === 2 ? 'Fair' :
               rating === 3 ? 'Good' :
               rating === 4 ? 'Very Good' : 'Excellent'}
            </Text>

            <View style={[styles.feedbackContainer, isFocused && styles.focusedInput]}>
              <TextInput
                style={styles.feedbackInput}
                placeholder="Tell us what you think (optional)"
                placeholderTextColor="#8E8E93"
                value={feedback}
                onChangeText={setFeedback}
                multiline
                numberOfLines={4}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
            </View>

            <TouchableOpacity 
              style={[styles.submitButton, rating > 0 && styles.activeButton]}
              onPress={handleSubmit}
              disabled={rating === 0}
            >
              <Text style={[styles.submitText, rating > 0 && styles.activeButtonText]}>
                Submit Rating
              </Text>
            </TouchableOpacity>

            {rating >= 4 && (
              <TouchableOpacity 
                style={styles.storeRating}
                onPress={() => {
                  Alert.alert(
                    'Rate on App Store',
                    'You will be redirected to the App Store to leave a review.',
                    [
                      { text: 'Cancel', style: 'cancel' },
                      { text: 'Continue', onPress: () => console.log('Redirecting to App Store') }
                    ]
                  );
                }}
              >
                <Icon name="store" size={18} color="#43A047" />
                <Text style={styles.storeRatingText}>
                  Also rate us on the App Store
                </Text>
                <Icon name="chevron-right" size={18} color="#43A047" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#f8f9fa',
      marginTop: '10%'
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      backgroundColor: '#ffffff',
      elevation: 4,
    },
    backButton: {
      marginRight: 16,
    },
    title: {
      flex: 1,
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333333',
      textAlign: 'center',
    },
    placeholder: {
      width: 24, // Placeholder width for alignment
    },
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
    },
    content: {
      backgroundColor: '#ffffff',
      borderRadius: 10,
      padding: 20,
      elevation: 4,
    },
    appInfo: {
      alignItems: 'center',
      marginBottom: 20,
    },
    appIconContainer: {
      backgroundColor: '#4CAF50',
      borderRadius: 30,
      padding: 10,
      marginBottom: 10,
    },
    appIcon: {
      textAlign: 'center',
    },
    appName: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    appVersion: {
      fontSize: 14,
      color: '#777777',
    },
    ratingPrompt: {
      fontSize: 16,
      marginBottom: 10,
      textAlign: 'center',
    },
    starsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 10,
    },
    starButton: {
      marginHorizontal: 5,
    },
    ratingText: {
      textAlign: 'center',
      fontSize: 16,
      color: '#333333',
      marginBottom: 10,
    },
    feedbackContainer: {
      borderWidth: 1,
      borderColor: '#D1D1D6',
      borderRadius: 8,
      padding: 10,
      marginBottom: 20,
    },
    focusedInput: {
      borderColor: '#4CAF50',
    },
    feedbackInput: {
      height: 80,
      textAlignVertical: 'top',
      fontSize: 16,
      color: '#333333',
    },
    submitButton: {
      backgroundColor: '#43A047',
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginBottom: 10,
    },
    activeButton: {
      backgroundColor: '#43A047', // Darker shade when active
    },
    submitText: {
      color: '#ffffff',
      fontWeight: 'bold',
    },
    activeButtonText: {
      color: '#ffffff',
    },
    storeRating: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      borderTopWidth: 1,
      borderColor: '#D1D1D6',
    },
    storeRatingText: {
      color: '#43A047',
      marginHorizontal: 8,
    },
  });
  
  export default RateUsScreen;