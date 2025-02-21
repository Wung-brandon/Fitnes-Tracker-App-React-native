// context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    // Check for cached user first
    const bootstrapAsync = async () => {
      try {
        const cachedUser = await AsyncStorage.getItem('user');
        if (cachedUser) {
          setUser(JSON.parse(cachedUser));
        }
      } catch (e) {
        console.log('Failed to load cached user data');
      }
    };
    
    bootstrapAsync();
    
    // Listen for Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in
        try {
          // Get user data from Firestore
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser(userData);
            
            // Cache user data
            await AsyncStorage.setItem('user', JSON.stringify(userData));
          } else {
            // Only basic auth data available
            const basicUserData = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
            };
            setUser(basicUserData);
            await AsyncStorage.setItem('user', JSON.stringify(basicUserData));
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        // User is signed out
        setUser(null);
        await AsyncStorage.removeItem('user');
      }
      setLoading(false);
    });
    
    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};