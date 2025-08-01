import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const mockShops = [
  { id: 1, name: 'Joe’s Bakery', category: 'Bakery' },
  { id: 2, name: 'Tech World', category: 'Electronics' },
  { id: 3, name: 'Green Grocers', category: 'Grocery' },
  { id: 4, name: 'Book Nook', category: 'Books' },
];

export default function Categories() {
  const navigation = useNavigation();
  const categories = Array.from(new Set(mockShops.map(shop => shop.category)));

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Text style={styles.title}>Select a Category</Text>
        <FlatList
          data={categories}
          keyExtractor={item => item}
          numColumns={2}
          style={styles.flatList}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('ShopList', { category: item })}
            >
              <Text style={styles.cardText}>{item}</Text>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 900,
    alignSelf: 'center',
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#007bff',
    alignSelf: 'center',
  },
  flatList: {
    flex: 1,
    width: '100%',
  },
  list: {
    paddingBottom: 16,
  },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardText: {
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
  },
});