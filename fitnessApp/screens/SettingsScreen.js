import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { auth } from '../firebaseConfig';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const { setUser } = useContext(AuthContext);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: async () => {
            try {
              await signOut(auth);
              setUser(null);
              await AsyncStorage.removeItem('user');
              Alert.alert('Logout Successful', 'You have logged out successfully!');
              navigation.replace('Login');
            } catch (error) {
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderSettingItem = (iconName, title, onPress, iconColor = '#4A90E2', badgeCount = null) => (
    <TouchableOpacity style={styles.settingOption} onPress={onPress}>
      <View style={[styles.iconContainer, { backgroundColor: `${iconColor}20` }]}>
        <Icon name={iconName} size={22} color={iconColor} />
      </View>
      <View style={styles.settingTextContainer}>
        <Text style={styles.optionText}>{title}</Text>
      </View>
      {badgeCount && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badgeCount}</Text>
        </View>
      )}
      <Icon name="chevron-right" size={22} color="#BDBDBD" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          {renderSettingItem('account-circle', 'My Profile', () => navigation.navigate('Profile'), '#4A90E2')}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          {renderSettingItem('bell-ring-outline', 'Notifications', () => navigation.navigate('NotificationSettings'), '#FF9500', '3')}
          {renderSettingItem('shield-lock-outline', 'Privacy Policy', () => navigation.navigate('PrivacyPolicy'), '#4CAF50')}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          {renderSettingItem('star-outline', 'Rate Us', () => navigation.navigate('RateUs'), '#FFD700')}
          {renderSettingItem('help-circle-outline', 'Help & Support', () => Alert.alert('Help & Support', 'Contact our support team for assistance'), '#8E8E93')}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="logout" size={20} color="#FF3B30" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.version}>Fitness Tracker Pro v1.2.3</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
    paddingVertical: 8,
  },
  title: {
    marginTop: 24,
    fontSize: 28,
    fontWeight: '700',
    color: '#1C1C1E',
    letterSpacing: 0.35,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6E6E73',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
    marginLeft: 12,
  },
  settingOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  iconContainer: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingTextContainer: {
    flex: 1,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1C1C1E',
  },
  badge: {
    backgroundColor: '#FF3B30',
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    backgroundColor: '#FFF1F0',
    borderWidth: 1,
    borderColor: '#FFCECB',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF3B30',
    marginLeft: 8,
  },
  footer: {
    alignItems: 'center',
    marginTop: 'auto',
    paddingVertical: 24,
  },
  version: {
    fontSize: 12,
    color: '#8E8E93',
  },
});

export default SettingsScreen;