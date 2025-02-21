import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PrivacyPolicyScreen = () => {
  const navigation = useNavigation();

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
        <Text style={styles.title}>Privacy Policy</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.lastUpdated}>Last Updated: February 15, 2025</Text>
          
          <Text style={styles.sectionTitle}>Introduction</Text>
          <Text style={styles.paragraph}>
            We at Fitness Tracker Pro ("Company", "we", "us", "our") respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and share information about you when you use our mobile application ("App").
          </Text>
          
          <Text style={styles.sectionTitle}>Information We Collect</Text>
          <Text style={styles.subheading}>Personal Information</Text>
          <Text style={styles.paragraph}>
            When you create an account, we collect your email address, name, age, gender, height, and weight to personalize your fitness experience.
          </Text>
          
          <Text style={styles.subheading}>Health and Fitness Data</Text>
          <Text style={styles.paragraph}>
            With your permission, we collect data about your physical activity, workout routines, heart rate, sleep patterns, and other biometric information through the App and connected devices.
          </Text>
          
          <Text style={styles.subheading}>Usage Information</Text>
          <Text style={styles.paragraph}>
            We automatically collect information about how you interact with our App, including the features you use, time spent in the App, and other analytics data to improve our services.
          </Text>
          
          <Text style={styles.sectionTitle}>How We Use Your Information</Text>
          <Text style={styles.paragraph}>
            We use your information to:
          </Text>
          <View style={styles.bulletPoints}>
            <Text style={styles.bulletPoint}>• Provide, maintain, and improve our App functionality</Text>
            <Text style={styles.bulletPoint}>• Personalize your experience and offer customized fitness recommendations</Text>
            <Text style={styles.bulletPoint}>• Process and track your workouts and fitness progress</Text>
            <Text style={styles.bulletPoint}>• Send you important notifications about your goals and achievements</Text>
            <Text style={styles.bulletPoint}>• Analyze usage patterns to enhance our App features</Text>
          </View>
          
          <Text style={styles.sectionTitle}>Data Sharing and Disclosure</Text>
          <Text style={styles.paragraph}>
            We do not sell your personal information. We may share data with:
          </Text>
          <View style={styles.bulletPoints}>
            <Text style={styles.bulletPoint}>• Service providers who help us deliver our services</Text>
            <Text style={styles.bulletPoint}>• Partners for integrating third-party fitness devices (only with your explicit consent)</Text>
            <Text style={styles.bulletPoint}>• Legal authorities when required by law</Text>
          </View>
          
          <Text style={styles.sectionTitle}>Your Rights and Choices</Text>
          <Text style={styles.paragraph}>
            You have the right to:
          </Text>
          <View style={styles.bulletPoints}>
            <Text style={styles.bulletPoint}>• Access, correct, or delete your personal information</Text>
            <Text style={styles.bulletPoint}>• Opt out of certain data collection features</Text>
            <Text style={styles.bulletPoint}>• Revoke permissions for health data access</Text>
            <Text style={styles.bulletPoint}>• Manage notification preferences</Text>
          </View>
          
          <Text style={styles.paragraph}>
            You can exercise these rights through the App's Settings menu or by contacting our support team.
          </Text>
          
          <Text style={styles.sectionTitle}>Data Security</Text>
          <Text style={styles.paragraph}>
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. We use encryption, secure server facilities, and regular security assessments to ensure the highest level of protection.
          </Text>
          
          <Text style={styles.sectionTitle}>Data Retention</Text>
          <Text style={styles.paragraph}>
            We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law.
          </Text>
          
          <Text style={styles.sectionTitle}>Changes to This Policy</Text>
          <Text style={styles.paragraph}>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
          </Text>
          
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <Text style={styles.paragraph}>
            If you have any questions about this Privacy Policy or our data practices, please contact us at:
          </Text>
          <Text style={styles.contactInfo}>
            privacy@fitnesstrackerproapp.com
          </Text>
          <Text style={styles.contactInfo}>
            Fitness Tracker Pro, Inc.
          </Text>
          <Text style={styles.contactInfo}>
            123 Health Street, Suite 456
          </Text>
          <Text style={styles.contactInfo}>
            Fitness City, FC 98765
          </Text>
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
  },
  content: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  lastUpdated: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#43A047',
    marginTop: 24,
    marginBottom: 12,
  },
  subheading: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3A3A3C',
    marginTop: 16,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 22,
    color: '#3A3A3C',
    marginBottom: 12,
  },
  bulletPoints: {
    marginLeft: 8,
    marginBottom: 16,
  },
  bulletPoint: {
    fontSize: 15,
    lineHeight: 22,
    color: '#3A3A3C',
    marginBottom: 6,
  },
  contactInfo: {
    fontSize: 15,
    lineHeight: 22,
    color: '#43A047',
    marginBottom: 4,
  }
});

export default PrivacyPolicyScreen;