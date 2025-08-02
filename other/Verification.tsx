import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useThemeMode } from '../context/ThemeContext';

export default function VerifyScreen() {
  const { phoneNumber } = useLocalSearchParams();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { theme } = useThemeMode();
  const isDark = theme === 'dark';

  const bgColor = isDark ? '#121212' : '#f2f2f2';
  const cardBg = isDark ? '#1e1e1e' : '#fff';
  const textColor = isDark ? '#fff' : '#000';
  const borderColor = isDark ? '#444' : '#ccc';

  const verifyOtp = async () => {
    setError(''); 

    if (!otp || otp.length !== 6) {
      setError('Please enter the 6-digit OTP');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber,  
          otp,
        }),
      });

      const data = await response.json(); 
    

      if (!response.ok) {
  
     Toast.show({
        type: 'error', // or 'success'
        text1: 'OTP verification failed', // Bold text
        text2: data.message || '',        // Subtext
      });

        setTimeout(() => {
          router.replace('/');
        }, 1500);

        return;
      }

    Toast.show({
      type: 'success',
      text1: 'OTP verified!',
      text2: data.message || 'OTP verified!',
    });

    // Navigate to categories select page after successful OTP
    router.replace('/CategoriesSelect');

    setOtp('');
 
    } catch (err) {
      console.error('OTP verification error:', err);
      setError('Could not connect to the server.');
    }
};

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: bgColor }]}>
        <View style={styles.container}>
            <View style={[styles.card, { backgroundColor: cardBg }]}>
                <Text style={{ color: textColor, fontSize: 16, marginBottom: 8, textAlign: 'center' }}>
                  🔒 For your security, we've sent a 6-digit code to your mobile. Please enter it below to verify your identity.
                </Text>
                <Text style={{ color: textColor }}>Enter OTP sent to {phoneNumber}</Text>
                <TextInput
                  placeholder="OTP"
                  placeholderTextColor={isDark ? '#999' : '#666'}
                  value={otp}
                  onChangeText={(text) => {
                      setOtp(text);
                      if (error) setError('');
                    }}
                  keyboardType="number-pad"
                  maxLength={6}
                  style={[
                    styles.input,
                    {
                      borderColor: borderColor,
                      color: textColor,
                    },
                  ]}
                />
                <Button title="Verify OTP" onPress={verifyOtp} />
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
    backgroundColor: 'white',
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
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontSize: 12,
  },
  successText: {
    color: 'green',
    marginBottom: 10,
    fontSize: 12,
  },
});
