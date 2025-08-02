// app/profilecreation.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, SafeAreaView, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
// Update the import path if ThemeContext is located elsewhere, for example:
import { useThemeMode } from '../context/ThemeContext';
// Or, if you do not have ThemeContext, you can temporarily mock the hook as below:
// const useThemeMode = () => ({ theme: 'light' });

export default function ProfileCreation() {
  const [name, setName] = useState('');
  const [carNumber, setCarNumber] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const { phoneNumberId } = useLocalSearchParams();
  const router = useRouter();
  const [emailError, setEmailError] = useState('');

  const { theme } = useThemeMode();
  const isDark = theme === 'dark';

  const textColor = isDark ? '#fff' : '#000';
  const bgColor = isDark ? '#121212' : '#f2f2f2';
  const cardBg = isDark ? '#1e1e1e' : '#fff';
  const borderColor = isDark ? '#444' : '#ccc';

const handleSubmit = async () => {
  if (!name || !carNumber || !email || !city) {
    alert('Please fill all fields');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return;
    } else {
      setEmailError('');
    }

  try {
    const response = await fetch('http://localhost:3000/api/user-profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        carNumber,
        email,
        city,
        phoneNumberId: parseInt(phoneNumberId as string),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error:', errorData);
      alert('Failed to save profile. Please try again.');
      return;
    }

    const result = await response.json();
    alert('Profile saved!');
    // router.replace('/dashboard'); // Navigate to next screen if needed
  } catch (error) {
    console.error('Request failed:', error);
    alert('Network error. Please try again.');
  }
};

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: bgColor }]}>
      <View style={styles.container}>
        <View style={[styles.card, { backgroundColor: cardBg, borderColor }]}>
          <Text style={{ color: textColor, fontSize: 16, marginBottom: 10, textAlign: 'center' }}>
            🚗 Let's set up your profile! Fill in your details to personalize your parking experience.
          </Text>
          <Text style={[styles.title, { color: textColor }]}>Create Your Profile</Text>

          <TextInput
            style={[styles.input, { backgroundColor: cardBg, borderColor, color: textColor }]}
            placeholder="Name"
            placeholderTextColor="#888"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={[styles.input, { backgroundColor: cardBg, borderColor, color: textColor }]}
            placeholder="Car Number"
            placeholderTextColor="#888"
            value={carNumber}
            onChangeText={setCarNumber}
          />
          <TextInput
            style={[styles.input, { backgroundColor: cardBg, borderColor, color: textColor }]}
            placeholder="Email"
            placeholderTextColor="#888"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (emailError) setEmailError(''); // clear error on change
            }}
          />
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}
          <TextInput
            style={[styles.input, { backgroundColor: cardBg, borderColor, color: textColor }]}
            placeholder="City"
            placeholderTextColor="#888"
            value={city}
            onChangeText={setCity}
          />

          <Button title="Submit" onPress={handleSubmit} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
 container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16, // Add horizontal padding for mobile look
  },
  card: {
    width: 320,
    maxWidth: '100%', // Prevent overflow on small screens
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    alignSelf: 'center', // Center the card
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
    marginTop: -12,
    alignSelf: 'flex-start',
    marginLeft: 4,
  },
});
