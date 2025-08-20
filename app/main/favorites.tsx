// Favorites tab screen placeholder

import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, SafeAreaView, StatusBar } from 'react-native';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';

const MOCK_FAVORITES = [
  {
    id: '1',
    name: 'Sunshine Electronics',
    category: 'Electronics',
    address: '123 Main St, Downtown',
    image: 'https://pbs.twimg.com/media/FjhMfGAUAAAbfGz?format=jpg&name=900x900',
    rating: 4.5,
    distance: '1 km',
  },
  {
    id: '2',
    name: 'GreenLeaf Grocers',
    category: 'Groceries',
    address: '456 Oak Ave, Midtown',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    rating: 4.8,
    distance: '2 km',
  },
  {
    id: '3',
    name: 'Book Haven',
    category: 'Bookstore',
    address: '321 Maple St, Downtown',
    image: 'https://kerala.mallsmarket.com/sites/default/files/photos/events/centre-square-kochi-onam-shopping-is-back-27aug-15sep2022-1.jpg',
    rating: 4.9,
    distance: '0.5 km',
  },
];

export default function Favorites() {
  const statusBarHeight = Constants.statusBarHeight || 0;
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#43AA8B" />
      <View style={[styles.headerRow, { paddingTop: statusBarHeight + 8 }]}> 
        <Text style={styles.headerTitle}>Favorites</Text>
      </View>
      <View style={styles.body}>
        <FlatList
          data={MOCK_FAVORITES}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={{ uri: item.image }} style={styles.shopImage} />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.shopName}>{item.name}</Text>
                  <Text style={styles.shopCategory}>{item.category}</Text>
                  <Text style={styles.shopAddress}>{item.address}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                    <Ionicons name="star" size={14} color="#FFD700" style={{ marginRight: 4 }} />
                    <Text style={styles.shopRating}>{item.rating}</Text>
                    <Ionicons name="walk-outline" size={14} color="#43AA8B" style={{ marginLeft: 12, marginRight: 4 }} />
                    <Text style={styles.shopDistance}>{item.distance}</Text>
                  </View>
                </View>
              </View>
            </View>
          )}
          ListEmptyComponent={<Text style={{ color: '#888', textAlign: 'center', marginTop: 40 }}>No favorite shops yet.</Text>}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#2c2455',
  },
  headerRow: {
    paddingTop: 8,
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
  shopRating: {
    fontSize: 13,
    color: '#FFD700',
    fontWeight: 'bold',
  },
  shopDistance: {
    fontSize: 13,
    color: '#43AA8B',
  },
});
 