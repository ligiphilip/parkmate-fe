import React from 'react';
import { Tabs } from 'expo-router';
import { Text } from 'react-native';

const tabIcon = (icon: string) => ({ color }: { color: string }) => (
  <Text style={{ color, fontSize: 20 }}>{icon}</Text>
);

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: '#888',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderColor: '#ddd',
        },
      }}
    >
      <Tabs.Screen
        name="main/index"
        options={{
          title: 'Home',
          tabBarIcon: tabIcon('🏠'),
          tabBarAccessibilityLabel: 'Home Tab',
        }}
      />
      <Tabs.Screen
        name="main/shopsearch"
        options={{
          title: 'Shop Search',
          tabBarIcon: tabIcon('🛒'),
          tabBarAccessibilityLabel: 'Shop Search Tab',
        }}
      />
      <Tabs.Screen
        name="main/favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: tabIcon('❤️'),
          tabBarAccessibilityLabel: 'Favorites Tab',
        }}
      />
      <Tabs.Screen
        name="main/bookings"
        options={{
          title: 'Bookings',
          tabBarIcon: tabIcon('📝'),
          tabBarAccessibilityLabel: 'Bookings Tab',
        }}
      />
    </Tabs>
  );
}