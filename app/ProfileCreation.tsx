// app/profilecreation.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, SafeAreaView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useThemeMode } from '../context/ThemeContext';

export default function ProfileCreation() {
  const [name, setName] = useState('');
  const [carNumber, setCarNumber] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const router = useRouter();

  const { theme } = useThemeMode();
  const isDark = theme === 'dark';

  const textColor = isDark ? '#fff' : '#000';
  const bgColor = isDark ? '#121212' : '#f2f2f2';
  const cardBg = isDark ? '#1e1e1e' : '#fff';
  const borderColor = isDark ? '#444' : '#ccc';

  const handleSubmit = () => {
    if (!name || !carNumber || !email || !city) {
      alert('Please fill all fields');
      return;
    }

    alert('Profile saved!');
    // router.replace('/dashboard'); // Navigate to next screen if needed
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: bgColor }]}>
      <View style={styles.container}>
        <View style={[styles.card, { backgroundColor: cardBg, borderColor }]}>
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
            onChangeText={setEmail}
          />
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
  },
  card: {
    width: 320,
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
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
});
