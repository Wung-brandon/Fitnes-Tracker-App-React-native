import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [firstTimeUser, setFirstTimeUser] = useState(false);

  useEffect(() => {
    initializeAuth();
  }, []);

  async function initializeAuth() {
    try {
      // Check if it's the first time launching the app
      const firstLaunch = await AsyncStorage.getItem('first_time');
      if (firstLaunch === null) {
        setFirstTimeUser(true);
        await AsyncStorage.setItem('first_time', 'false');
      }

      // Load user from storage
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
    } finally {
      setLoading(false);
    }
  }

  async function register(name, email, password) {
    try {
      // Simulating user registration
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password, // In a real app, NEVER store plain passwords!
      };

      await AsyncStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async function login(email, password) {
    try {
      const storedUser = await AsyncStorage.getItem('user');

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);

        // Simulating authentication
        if (parsedUser.email === email && parsedUser.password === password) {
          setUser(parsedUser);
          return { success: true };
        } else {
          return { success: false, error: 'Invalid credentials' };
        }
      }

      return { success: false, error: 'User not found' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async function logout() {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, firstTimeUser, setFirstTimeUser, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
