import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { useRoute } from '@react-navigation/native';

const mockShops = [
  { id: 1, name: 'Joe’s Bakery', category: 'Bakery', address: '123 Main St', phone: '555-1234' },
  { id: 2, name: 'Tech World', category: 'Electronics', address: '456 Tech Ave', phone: '555-5678' },
  { id: 3, name: 'Green Grocers', category: 'Grocery', address: '789 Market Rd', phone: '555-8765' },
  { id: 4, name: 'Book Nook', category: 'Books', address: '321 Library Ln', phone: '555-4321' },
];

const ShopList: React.FC = () => {
  const route = useRoute();
  // @ts-ignore
  const { category } = route.params || {};
  const [query, setQuery] = useState('');

  const filteredShops = useMemo(() => {
    return mockShops.filter(
      shop =>
        shop.category === category &&
        (shop.name.toLowerCase().includes(query.toLowerCase()) ||
          shop.address.toLowerCase().includes(query.toLowerCase()))
    );
  }, [category, query]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Text style={styles.title}>{category} Shops</Text>
        <TextInput
          style={styles.input}
          placeholder={`Search in ${category}...`}
          placeholderTextColor="#888"
          value={query}
          onChangeText={setQuery}
        />
        <FlatList
          data={filteredShops}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.shopList}
          ListEmptyComponent={<Text style={styles.emptyText}>No shops found.</Text>}
          renderItem={({ item }) => (
            <View style={styles.shopCard}>
              <Text style={styles.shopName}>{item.name}</Text>
              <Text style={styles.shopDetail}>Address: {item.address}</Text>
              <Text style={styles.shopDetail}>Phone: {item.phone}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#007bff',
  },
  input: {
    backgroundColor: '#fff',
    color: '#222',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#b3d1ff',
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  shopList: {
    paddingBottom: 16,
  },
  shopCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 14,
    borderWidth: 1.5,
    borderColor: '#b3d1ff',
    shadowColor: '#eee',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 4,
    elevation: 2,
  },
  shopName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 6,
  },
  shopDetail: {
    color: '#444',
    fontSize: 15,
    marginBottom: 2,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 18,
    marginTop: 40,
  },
});

export default ShopList;
