import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import MainNavigator from './src/navigation/MainNavigator';
import api from './src/services/api';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasUser, setHasUser] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    await api.init();
    const user = await api.getUser();
    setHasUser(!!user);
    setIsLoading(false);
  };

  const handleCreateUser = async () => {
    if (!email.trim()) {
      alert('Please enter a valid email');
      return;
    }

    try {
      await api.createUser(email);
      setHasUser(true);
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Failed to create user');
    }
  };

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!hasUser) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.welcomeTitle}>Welcome to Content Dashboard</Text>
        <Text style={styles.welcomeSubtitle}>
          Your unified feed for emails, YouTube, RSS, and more
        </Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          placeholderTextColor="#999"
          autoCapitalize="none"
          keyboardType="email-address"
          autoCorrect={false}
        />
        <TouchableOpacity style={styles.button} onPress={handleCreateUser}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <MainNavigator />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    textAlign: 'center',
    lineHeight: 24,
  },
  input: {
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
