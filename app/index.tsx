import { useNavigation, useRouter } from 'expo-router';
import React, { useLayoutEffect, useState } from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Toast from 'react-native-toast-message';
import { useThemeMode } from '../context/ThemeContext';

export default function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const navigation = useNavigation();
  const { theme, toggleTheme } = useThemeMode();

  const isValidPhone = (number: string) => /^[6-9]\d{9}$/.test(number);

  const sendOtp = async () => {
    if (!isValidPhone(phoneNumber)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber }),
      });

      const data = await response.json();

      if (!response.ok) {
        Toast.show({
          type: 'error',
          text1: 'OTP Failed',
          text2: data.message || 'Failed to send OTP',
        });
        return;
      }

      Toast.show({
        type: 'success',
        text1: 'OTP Sent',
        text2: data.message || 'Please check your mobile number',
      });

      router.push({ pathname: '/Verification', params: { phoneNumber } });
    } catch (err) {
      console.error('Send OTP error:', err);
      Toast.show({
        type: 'error',
        text1: 'Network Error',
        text2: 'Could not connect to server.',
      });
    }
  };

  // Theme colors
  const isDark = theme === 'dark';
  const bgColor = isDark ? '#121212' : '#f2f2f2';
  const cardBg = isDark ? '#1e1e1e' : '#fff';
  const textColor = isDark ? '#fff' : '#000';
  const borderColor = isDark ? '#444' : '#ccc';

  // 🔼 Set theme toggle button in header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={toggleTheme} style={{ marginRight: 16 }}>
          <Text style={{ fontSize: 18 }}>{isDark ? '☀️' : '🌙' }</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, toggleTheme, isDark]);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: bgColor }]}>
      <View style={styles.container}>
        <View style={[styles.card, { backgroundColor: cardBg }]}>
          <Text style={[styles.heading, { color: textColor }]}>Enter Mobile Number</Text>
          <TextInput
            placeholder="Enter 10-digit number"
            placeholderTextColor={isDark ? '#999' : '#666'}
            value={phoneNumber}
            onChangeText={(text) => {
              setPhoneNumber(text);
              if (error) setError('');
            }}
            keyboardType="phone-pad"
            style={[
              styles.input,
              {
                borderColor: borderColor,
                color: textColor,
              },
            ]}
            maxLength={10}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <Button title="Send OTP" onPress={sendOtp} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f2f2f2',
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  heading: {
    fontSize: 16,
    marginBottom: 12,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontSize: 12,
  },
});
