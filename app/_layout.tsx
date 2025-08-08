import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const tabIcon = (iconName: string) => ({ color }: { color: string }) => (
  <Ionicons name={iconName} size={22} color={color} />
);

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#363636ff',
        tabBarInactiveTintColor: 'rgba(199, 199, 199, 1)',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#43AA8B',
          borderTopWidth: 0,
          borderColor: '#4D908E',
        },
      }}
    >
      <Tabs.Screen
        name="main/index"
        options={{
          title: 'Home',
          tabBarIcon: tabIcon('home'),
          tabBarAccessibilityLabel: 'Home Tab',
        }}
      />
      <Tabs.Screen
        name="main/shopsearch"
        options={{
          title: 'Shop Search',
          tabBarIcon: tabIcon('search'),
          tabBarAccessibilityLabel: 'Shop Search Tab',
        }}
      />
      <Tabs.Screen
        name="main/favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: tabIcon('heart'),
          tabBarAccessibilityLabel: 'Favorites Tab',
        }}
      />
      <Tabs.Screen
        name="main/bookings"
        options={{
          title: 'Bookings',
          tabBarIcon: tabIcon('document-text'),
          tabBarAccessibilityLabel: 'Bookings Tab',
        }}
      />
    </Tabs>
  );
}