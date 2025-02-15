// LoadingScreen.js
import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#4CAF50" />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Background color of the loading screen
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#4CAF50', // Color of the loading text
  },
});

export default LoadingScreen;