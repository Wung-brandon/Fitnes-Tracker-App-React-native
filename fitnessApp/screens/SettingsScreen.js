import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Button title="Change Profile" onPress={() => alert('Change Profile')} />
      <Button title="Notification Settings" onPress={() => alert('Notification Settings')} />
      <Button title="Privacy Policy" onPress={() => alert('Privacy Policy')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
});

export default SettingsScreen;