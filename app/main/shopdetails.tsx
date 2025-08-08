import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

// Dummy data for offers, items, and pricing
const OFFERS = [
  { id: 1, title: '10% off on all electronics', description: 'Valid till 31st Aug' },
  { id: 2, title: 'Buy 1 Get 1 Free on select books', description: 'Weekend special' },
];
const ITEMS = [
  { id: 1, name: 'Smartphone Repair', price: '₹499' },
  { id: 2, name: 'Organic Apples (1kg)', price: '₹199' },
  { id: 3, name: 'Bluetooth Headphones', price: '₹1299' },
  { id: 4, name: 'Bestseller Book', price: '₹399' },
];

export default function ShopDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();
  // In a real app, fetch shop details by params.id
  // For now, just show static content
  const shopName = 'Sunshine Electronics'; // Replace with fetched name if available

  return (
    <View style={styles.container}>
      {/* Header with back button and shop name */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.shopTitle}>{shopName}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Offers */}
        <Text style={styles.sectionTitle}>Current Offers</Text>
        {OFFERS.map((offer) => (
          <View key={offer.id} style={styles.offerCard}>
            <Ionicons name="pricetag-outline" size={18} color="#43AA8B" style={{ marginRight: 8 }} />
            <View>
              <Text style={styles.offerTitle}>{offer.title}</Text>
              <Text style={styles.offerDesc}>{offer.description}</Text>
            </View>
          </View>
        ))}
        {/* Items/Menu */}
        <Text style={styles.sectionTitle}>Items / Menu</Text>
        {ITEMS.map((item) => (
          <View key={item.id} style={styles.itemRow}>
            <Ionicons name="cube-outline" size={18} color="#518048" style={{ marginRight: 8 }} />
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>{item.price}</Text>
          </View>
        ))}
        {/* High Level Pricing */}
        <Text style={styles.sectionTitle}>High Level Pricing</Text>
        <View style={styles.pricingBox}>
          <Text style={styles.pricingText}>Average Price: ₹500 - ₹1500</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#43AA8B',
    paddingTop: 44,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    elevation: 4,
    shadowColor: '#43AA8B',
    shadowOpacity: 0.08,
  },
  backBtn: {
    marginRight: 12,
    padding: 4,
    borderRadius: 20,
    backgroundColor: '#43AA8B',
  },
  shopTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#518048',
    marginTop: 18,
    marginBottom: 8,
  },
  offerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  offerTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#263238',
  },
  offerDesc: {
    fontSize: 13,
    color: '#666',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
  },
  itemName: {
    flex: 1,
    fontSize: 15,
    color: '#263238',
  },
  itemPrice: {
    fontSize: 15,
    color: '#43AA8B',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  pricingBox: {
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    padding: 14,
    marginTop: 10,
    alignItems: 'center',
  },
  pricingText: {
    fontSize: 16,
    color: '#263238',
    fontWeight: 'bold',
  },
});
