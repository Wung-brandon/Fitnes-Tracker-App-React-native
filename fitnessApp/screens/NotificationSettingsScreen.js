import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const NotificationSettingsScreen = () => {
  const navigation = useNavigation();
  
  // State for notification toggles
  const [notifications, setNotifications] = useState({
    allNotifications: true,
    workoutReminders: true,
    goalAchievements: true,
    weeklyReports: true,
    friendActivity: false,
    tipsAndTricks: true,
    appUpdates: true,
  });

  const handleToggle = (key) => {
    if (key === 'allNotifications') {
      const newValue = !notifications.allNotifications;
      setNotifications({
        allNotifications: newValue,
        workoutReminders: newValue,
        goalAchievements: newValue,
        weeklyReports: newValue,
        friendActivity: newValue,
        tipsAndTricks: newValue,
        appUpdates: newValue,
      });
    } else {
      setNotifications({
        ...notifications,
        [key]: !notifications[key],
        allNotifications: !notifications[key] ? notifications.allNotifications : 
          Object.keys(notifications).filter(k => k !== 'allNotifications' && k !== key)
            .every(k => notifications[k])
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color="#43A047" />
        </TouchableOpacity>
        <Text style={styles.title}>Notification Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.infoCard}>
          <Icon name="information-outline" size={20} color="#007AFF" />
          <Text style={styles.infoText}>
            Control which notifications you receive from Fitness Tracker Pro.
          </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.settingItem}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>All Notifications</Text>
              <Text style={styles.settingDescription}>
                Enable or disable all notifications
              </Text>
            </View>
            <Switch
              value={notifications.allNotifications}
              onValueChange={() => handleToggle('allNotifications')}
              trackColor={{ false: '#D1D1D6', true: '#34C759' }}
              thumbColor="#FFFFFF"
              ios_backgroundColor="#D1D1D6"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Activity</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Workout Reminders</Text>
              <Text style={styles.settingDescription}>
                Get reminded of your scheduled workouts
              </Text>
            </View>
            <Switch
              value={notifications.workoutReminders}
              onValueChange={() => handleToggle('workoutReminders')}
              trackColor={{ false: '#D1D1D6', true: '#34C759' }}
              thumbColor="#FFFFFF"
              ios_backgroundColor="#D1D1D6"
              disabled={!notifications.allNotifications}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Goal Achievements</Text>
              <Text style={styles.settingDescription}>
                Notifications when you reach fitness goals
              </Text>
            </View>
            <Switch
              value={notifications.goalAchievements}
              onValueChange={() => handleToggle('goalAchievements')}
              trackColor={{ false: '#D1D1D6', true: '#34C759' }}
              thumbColor="#FFFFFF"
              ios_backgroundColor="#D1D1D6"
              disabled={!notifications.allNotifications}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Weekly Reports</Text>
              <Text style={styles.settingDescription}>
                Weekly summary of your fitness activities
              </Text>
            </View>
            <Switch
              value={notifications.weeklyReports}
              onValueChange={() => handleToggle('weeklyReports')}
              trackColor={{ false: '#D1D1D6', true: '#34C759' }}
              thumbColor="#FFFFFF"
              ios_backgroundColor="#D1D1D6"
              disabled={!notifications.allNotifications}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Social</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Friend Activity</Text>
              <Text style={styles.settingDescription}>
                Updates when friends complete workouts
              </Text>
            </View>
            <Switch
              value={notifications.friendActivity}
              onValueChange={() => handleToggle('friendActivity')}
              trackColor={{ false: '#D1D1D6', true: '#34C759' }}
              thumbColor="#FFFFFF"
              ios_backgroundColor="#D1D1D6"
              disabled={!notifications.allNotifications}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Tips and Tricks</Text>
              <Text style={styles.settingDescription}>
                Helpful fitness and nutrition tips
              </Text>
            </View>
            <Switch
              value={notifications.tipsAndTricks}
              onValueChange={() => handleToggle('tipsAndTricks')}
              trackColor={{ false: '#D1D1D6', true: '#34C759' }}
              thumbColor="#FFFFFF"
              ios_backgroundColor="#D1D1D6"
              disabled={!notifications.allNotifications}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>App Updates</Text>
              <Text style={styles.settingDescription}>
                Notifications about new features and updates
              </Text>
            </View>
            <Switch
              value={notifications.appUpdates}
              onValueChange={() => handleToggle('appUpdates')}
              trackColor={{ false: '#D1D1D6', true: '#34C759' }}
              thumbColor="#FFFFFF"
              ios_backgroundColor="#D1D1D6"
              disabled={!notifications.allNotifications}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: 4,
  },
  placeholder: {
    width: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F8FF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  infoText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: '#505060',
    lineHeight: 20,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6E6E73',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F2F2F7',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1C1C1E',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 13,
    color: '#8E8E93',
  },
});

export default NotificationSettingsScreen;