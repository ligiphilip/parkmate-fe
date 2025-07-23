import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, Text, TouchableOpacity } from 'react-native';
import 'react-native-reanimated';
import Toast from 'react-native-toast-message';
import { Slot } from 'expo-router';
import React from 'react';

import { ThemeContextProvider, useThemeMode } from '@/context/ThemeContext'; // ✅ custom context

function LayoutContent() {
  const { theme, toggleTheme } = useThemeMode(); // ✅ use context

  return (
    <NavigationThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerTitle: () => (
            <Text style={{ fontWeight: 'bold', fontSize: 20, color: theme === 'dark' ? '#fff' : '#000' }}>
              ParkMate
            </Text>
          ),
          headerTitleAlign: 'center',
          headerLeft: () => (
            <Image
              source={require('../assets/images/ParkMateLogo.jpeg')}
              style={{ width: 60, height: 55, marginLeft: 12 }}
              resizeMode="contain"
            />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={toggleTheme} style={{ marginRight: 12 }}>
              <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>
                {theme === 'dark' ? '🌙' : '☀️'}
              </Text>
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: theme === 'dark' ? '#000' : '#fff',
          },
          documentTitle: 'ParkMate',
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
    </NavigationThemeProvider>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) return null;

  return (
    <ThemeContextProvider>
      <LayoutContent />
      <Toast />
    </ThemeContextProvider>
  );
}
