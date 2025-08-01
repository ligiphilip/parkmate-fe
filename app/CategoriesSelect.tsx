import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const mockShops = [
  { id: 1, name: 'Joe’s Bakery', category: 'Bakery' },
  { id: 2, name: 'Tech World', category: 'Electronics' },
  { id: 3, name: 'Green Grocers', category: 'Grocery' },
  { id: 4, name: 'Book Nook', category: 'Books' },
];

const CategoriesSelect: React.FC = () => {
  const navigation = useNavigation();
  const categories = Array.from(new Set(mockShops.map(shop => shop.category)));

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.title}>Select a Category</Text>
      <View style={styles.listContainer}>
        <FlatList
          data={categories}
          keyExtractor={item => item}
          numColumns={2}
          style={styles.flatList}
          contentContainerStyle={styles.categoryList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.categoryCard}
              onPress={() => navigation.navigate('ShopList', { category: item })}
            >
              <Text style={styles.categoryText}>{item}</Text>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#007bff',
    alignSelf: 'center',
  },
  listContainer: {
    flex: 1,
    width: '100%',
  },
  flatList: {
    flex: 1,
  },
  categoryList: {
    paddingBottom: 16,
  },
  categoryCard: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#b3d1ff',
    shadowColor: '#eee',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryText: {
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
  },
});

export default CategoriesSelect;