import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, SafeAreaView, StatusBar } from 'react-native';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';

const MOCK_BOOKINGS = [
  {
    id: 'b1',
    shopName: 'Sunshine Electronics',
    category: 'Electronics',
    address: '123 Main St, Downtown',
    image: 'https://pbs.twimg.com/media/FjhMfGAUAAAbfGz?format=jpg&name=900x900',
    date: '2025-08-10',
    slot: 'Afternoon',
    status: 'Confirmed',
  },
  {
    id: 'b2',
    shopName: 'GreenLeaf Grocers',
    category: 'Groceries',
    address: '456 Oak Ave, Midtown',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    date: '2025-08-12',
    slot: 'Evening',
    status: 'Pending',
  },
  {
    id: 'b3',
    shopName: 'Book Haven',
    category: 'Bookstore',
    address: '321 Maple St, Downtown',
    image: 'https://kerala.mallsmarket.com/sites/default/files/photos/events/centre-square-kochi-onam-shopping-is-back-27aug-15sep2022-1.jpg',
    date: '2025-08-01',
    slot: 'Forenoon',
    status: 'Cancelled',
  },
];

export default function Bookings() {
  const statusBarHeight = Constants.statusBarHeight || 0;
  const today = new Date('2025-08-09'); // For demo, set today as mock current date
  const isPast = (dateStr, status) => {
    const d = new Date(dateStr);
    return d < today || status === 'Cancelled';
  };
  const activeBookings = MOCK_BOOKINGS.filter(b => !isPast(b.date, b.status));
  const pastBookings = MOCK_BOOKINGS.filter(b => isPast(b.date, b.status));

  const renderBooking = (item) => (
    <View style={styles.card}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={{ uri: item.image }} style={styles.shopImage} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.shopName}>{item.shopName}</Text>
          <Text style={styles.shopCategory}>{item.category}</Text>
          <Text style={styles.shopAddress}>{item.address}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
            <Ionicons name="calendar-outline" size={14} color="#43AA8B" style={{ marginRight: 4 }} />
            <Text style={styles.bookingDetail}>{item.date}</Text>
            <Ionicons name="time-outline" size={14} color="#43AA8B" style={{ marginLeft: 12, marginRight: 4 }} />
            <Text style={styles.bookingDetail}>{item.slot}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
            <Ionicons name="checkmark-circle" size={14} color={
              item.status === 'Confirmed' ? '#43AA8B' : item.status === 'Pending' ? '#FFD700' : '#E95555'
            } style={{ marginRight: 4 }} />
            <Text style={[styles.bookingStatus, {
              color: item.status === 'Confirmed' ? '#43AA8B' : item.status === 'Pending' ? '#FFD700' : '#E95555',
            }]}>{item.status}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#43AA8B" />
      <View style={[styles.headerRow, { paddingTop: statusBarHeight + 8 }]}> 
        <Text style={styles.headerTitle}>Bookings</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.sectionTitle}>Active Bookings</Text>
        <FlatList
          data={activeBookings}
          keyExtractor={item => item.id}
          renderItem={({ item }) => renderBooking(item)}
          ListEmptyComponent={<Text style={{ color: '#888', textAlign: 'center', marginTop: 20 }}>No active bookings.</Text>}
        />
        <Text style={styles.sectionTitle}>Past Bookings</Text>
        <FlatList
          data={pastBookings}
          keyExtractor={item => item.id}
          renderItem={({ item }) => renderBooking(item)}
          ListEmptyComponent={<Text style={{ color: '#888', textAlign: 'center', marginTop: 20 }}>No past bookings.</Text>}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c2455',
    marginTop: 8,
    marginBottom: 8,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#2c2455',
  },
  headerRow: {
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: '#2c2455',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: '#518048',
    shadowOpacity: 0.08,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'left',
  },
  body: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  shopImage: {
    width: 64,
    height: 64,
    borderRadius: 10,
    backgroundColor: '#E3F2FD',
  },
  shopName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#43AA8B',
  },
  shopCategory: {
    fontSize: 14,
    color: '#518048',
    marginBottom: 2,
  },
  shopAddress: {
    fontSize: 13,
    color: '#888',
  },
  bookingDetail: {
    fontSize: 13,
    color: '#43AA8B',
  },
  bookingStatus: {
    fontSize: 13,
    fontWeight: 'bold',
  },
});
