import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Constants from 'expo-constants';
const statusBarHeight = Constants.statusBarHeight;

const MOCK_NOTIFICATIONS = [
  { id: '1', title: 'Booking Confirmed', message: 'Your parking at Sunshine Electronics is confirmed for today.' },
  { id: '2', title: 'Offer', message: '10% off on your next booking at GreenLeaf Grocers!' },
  { id: '3', title: 'Reminder', message: 'Don’t forget your booking at Book Haven tomorrow.' },
];

export default function Notifications() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#2962FF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>
      <FlatList
        data={MOCK_NOTIFICATIONS}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.message}>{item.message}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No notifications.</Text>}
      />
    </SafeAreaView>
  );
}
const primaryColor = "#2962FF"; // Electric blue (replaces #FFD32C)
const shadowColor = "rgba(41, 98, 255, 0.3)"; // Blue tint (replaces #FFD32C)

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
     paddingTop: statusBarHeight,
    paddingBottom: 5,
    paddingHorizontal: 20,
    backgroundColor: primaryColor,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: shadowColor,
    shadowOpacity: 0.08,
    elevation: 4,
  },
  backBtn: {
    marginRight: 10,
    padding: 4,
    borderRadius: 16,
    backgroundColor: '#F0F4FF',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2962FF',
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#2962FF',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#2962FF',
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: '#333',
  },
  empty: {
    textAlign: 'center',
    color: '#888',
    marginTop: 40,
    fontSize: 16,
  },
});
