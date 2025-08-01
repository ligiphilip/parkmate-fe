import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native';

// Placeholder shop image and logo
const SHOP_IMAGE = 'https://images.unsplash.com/photo-1515168833906-d2a3b82b3029?auto=format&fit=crop&w=400&q=80';
const LOGO = 'https://img.icons8.com/ios-filled/100/007bff/shop.png';
const AMENITIES = [
  { key: 'wifi', label: 'WiFi', icon: '📶' },
  { key: 'parking', label: 'Parking', icon: '🅿️' },
  { key: 'accessible', label: 'Accessible', icon: '♿' },
  { key: 'delivery', label: 'Delivery', icon: '🚚' },
];
const OFFERS = [
  { id: 1, title: '20% Off on All Breads!', desc: 'Enjoy fresh bakery items at a discount this week only.', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80' },
  { id: 2, title: 'Buy 1 Get 1 Free Coffee', desc: 'Morning offer: BOGO on all coffees from 8-11am.', image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80' },
  { id: 3, title: 'Free Delivery Over $30', desc: 'Order online and get free delivery for orders above $30.', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
];

const ShopProfile = () => {
  // In a real app, shop data would come from navigation params or a store
  const shop = {
    name: "Joe’s Bakery",
    address: '123 Main St',
    phone: '555-1234',
    category: 'Bakery',
    description: 'A family-owned bakery serving fresh breads, pastries, and cakes daily. Known for our sourdough and friendly service.',
    image: SHOP_IMAGE,
    logo: LOGO,
    amenities: AMENITIES,
    offers: OFFERS,
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: shop.image }} style={styles.coverImage} />
      <View style={styles.profileHeader}>
        <Image source={{ uri: shop.logo }} style={styles.logo} />
        <View style={{ flex: 1 }}>
          <Text style={styles.shopName}>{shop.name}</Text>
          <Text style={styles.category}>{shop.category}</Text>
        </View>
      </View>
      <Text style={styles.description}>{shop.description}</Text>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Address:</Text>
        <Text style={styles.infoValue}>{shop.address}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Phone:</Text>
        <Text style={styles.infoValue}>{shop.phone}</Text>
      </View>
      <View style={styles.amenitiesSection}>
        <Text style={styles.sectionTitle}>Amenities</Text>
        <View style={styles.amenitiesRow}>
          {shop.amenities.map(a => (
            <View key={a.key} style={styles.amenity}>
              <Text style={styles.amenityIcon}>{a.icon}</Text>
              <Text style={styles.amenityLabel}>{a.label}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.offersSection}>
        <Text style={styles.sectionTitle}>Latest Offers</Text>
        <FlatList
          data={shop.offers}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 8 }}
          renderItem={({ item }) => (
            <View style={styles.offerCard}>
              <Image source={{ uri: item.image }} style={styles.offerImage} />
              <Text style={styles.offerTitle}>{item.title}</Text>
              <Text style={styles.offerDesc}>{item.desc}</Text>
            </View>
          )}
        />
      </View>
      <TouchableOpacity style={styles.contactBtn}>
        <Text style={styles.contactBtnText}>Contact Shop</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  coverImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginTop: -32,
    marginBottom: 8,
  },
  logo: {
    width: 64,
    height: 64,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#fff',
    marginRight: 16,
    backgroundColor: '#fff',
  },
  shopName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#007bff',
  },
  category: {
    fontSize: 16,
    color: '#888',
    marginTop: 2,
  },
  description: {
    fontSize: 16,
    color: '#444',
    paddingHorizontal: 18,
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginBottom: 2,
  },
  infoLabel: {
    fontWeight: 'bold',
    color: '#222',
    marginRight: 6,
    fontSize: 15,
  },
  infoValue: {
    color: '#444',
    fontSize: 15,
  },
  amenitiesSection: {
    marginTop: 14,
    paddingHorizontal: 18,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 6,
  },
  amenitiesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  amenity: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6f0ff',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginRight: 10,
    marginBottom: 8,
  },
  amenityIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  amenityLabel: {
    fontSize: 14,
    color: '#007bff',
  },
  offersSection: {
    marginTop: 18,
    paddingHorizontal: 8,
  },
  offerCard: {
    width: 220,
    backgroundColor: '#fff',
    borderRadius: 14,
    marginRight: 14,
    padding: 12,
    shadowColor: '#aaa',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 4,
    elevation: 2,
  },
  offerImage: {
    width: '100%',
    height: 90,
    borderRadius: 10,
    marginBottom: 8,
  },
  offerTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#222',
    marginBottom: 2,
  },
  offerDesc: {
    color: '#555',
    fontSize: 14,
  },
  contactBtn: {
    marginTop: 28,
    marginBottom: 32,
    marginHorizontal: 40,
    backgroundColor: '#007bff',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#007bff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 2,
  },
  contactBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1,
  },
});

export default ShopProfile;
