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
  // Qodo color theme
  const qodoSecondary = '#2c2455'; // bright cyan
  const qodoBg = '#2c2455'; // deep dark
  const qodoCard = '#2c2455'; // slightly lighter dark
  const qodoText = '#FFFFFF'; // white

  const isDark = true; // Force qodo theme for now
  const bgColor = qodoBg;
  const cardBg = qodoCard;
  const textColor = qodoText;
  const borderColor = qodoSecondary;

  // 🔼 Set theme toggle button in header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={toggleTheme} style={{ marginRight: 16 }}>
          <Text style={{ fontSize: 18 }}>{isDark ? '☀️' : '🌙'}</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, toggleTheme, isDark]);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: bgColor }]}>
      <View style={styles.container}>
        <View style={[styles.card, { backgroundColor: cardBg }]}>
          <Text style={{ color: textColor, fontSize: 18, marginBottom: 8, textAlign: 'center' }}>
            👋 Welcome! Let's get you started.
          </Text>
          <Text style={{ color: textColor, fontSize: 14, marginBottom: 16, textAlign: 'center' }}>
            Please enter your mobile number to continue. Your privacy is important to us.
          </Text>
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
          <TouchableOpacity
            style={[
              styles.modalBtn,
              { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#3F3B49', borderColor: '#51513D', marginTop: 8 }
            ]}
            onPress={sendOtp}
            activeOpacity={0.85}
          >
            <Text style={[styles.modalBtnText, { color: '#fff', fontWeight: 'bold', fontSize: 16, marginRight: 6 }]}>Send OTP</Text>
            <View style={{ marginLeft: 2 }}>
              {/* Ionicons vector icon for consistency */}
              <Text style={{ color: '#fff', fontSize: 18 }}>🔒</Text>
            </View>
          </TouchableOpacity>
  
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#43AA8B',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 400, // Tab width
    paddingVertical: 100,
    paddingHorizontal: 36,

    alignSelf: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 20,
    marginBottom: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 14,
    marginBottom: 18,
    borderRadius: 10,
    fontSize: 18,
    backgroundColor:'#ffffff'
  },
  errorText: {
    color: 'red',
    marginBottom: 14,
    fontSize: 14,
    textAlign: 'center',
  },
  modalBtn: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: '#3F3B49',
    marginBottom: 2,
    marginTop: 8,
    shadowColor: '#3F3B49',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  modalBtnText: {
    fontSize: 16,
    color: '#263238',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
