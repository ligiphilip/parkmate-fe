import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

const MOCK_SHOPS = [
  {
    id: '1',
    name: 'Sunshine Electronics',
    category: 'Electronics',
    address: '123 Main St, Downtown',
    phone: '555-1234',
    images: [
      'https://images.unsplash.com/photo-1515168833906-d2a3b82b1a5b?auto=format&fit=facearea&w=400&q=80',
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=400&q=80',
    ],
    rating: 4.5,
    offer: '10% off on all items!',
  },
  {
    id: '2',
    name: 'GreenLeaf Grocers',
    category: 'Groceries',
    address: '456 Oak Ave, Midtown',
    phone: '555-5678',
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&q=80',
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&q=80',
    ],
    rating: 4.8,
    offer: 'Free delivery for orders above $50!',
  },
  {
    id: '3',
    name: 'QuickFix Mobiles',
    category: 'Mobile Repair',
    address: '789 Pine Rd, Uptown',
    phone: '555-9012',
    images: [
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=400&q=80',
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=400&q=80',
    ],
    rating: 4.2,
    offer: 'Screen replacement at just $49!',
  },
  {
    id: '4',
    name: 'Book Haven',
    category: 'Bookstore',
    address: '321 Maple St, Downtown',
    phone: '555-3456',
    images: [
      'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=facearea&w=400&q=80',
      'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=facearea&w=400&q=80',
    ],
    rating: 4.9,
    offer: 'Buy 2 Get 1 Free on all novels!',
  },
];

export default function ShopDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const shop = MOCK_SHOPS.find((s) => s.id === id);

  if (!shop) {
    return (
      <View style={styles.centered}><Text>Shop not found.</Text></View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <Text style={{ fontSize: 18 }}>← Back</Text>
      </TouchableOpacity>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageRow}>
        {shop.images.map((img, idx) => (
          <Image key={idx} source={{ uri: img }} style={styles.shopImage} />
        ))}
      </ScrollView>
      <Text style={styles.shopName}>{shop.name}</Text>
      <Text style={styles.shopCategory}>{shop.category}</Text>
      <Text style={styles.shopAddress}>{shop.address}</Text>
      <Text style={styles.shopPhone}>📞 {shop.phone}</Text>
      <Text style={styles.shopRating}>⭐ {shop.rating}</Text>
      <Text style={styles.offer}>{shop.offer}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffbe6',
    padding: 18,
  },
  backBtn: {
    marginBottom: 10,
  },
  imageRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  shopImage: {
    width: 120,
    height: 120,
    borderRadius: 16,
    marginRight: 12,
    backgroundColor: '#ffe066',
  },
  shopName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  shopCategory: {
    fontSize: 16,
    color: '#ffb300',
    marginBottom: 2,
    fontWeight: '600',
  },
  shopAddress: {
    fontSize: 15,
    color: '#666',
    marginBottom: 2,
  },
  shopPhone: {
    fontSize: 15,
    color: '#007bff',
    marginBottom: 2,
  },
  shopRating: {
    fontSize: 15,
    color: '#ffb300',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  offer: {
    fontSize: 16,
    color: '#fff',
    backgroundColor: '#ffb300',
    padding: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    marginTop: 8,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
