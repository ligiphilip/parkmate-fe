import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Modal,
  Pressable
} from 'react-native';
import { useRouter } from 'expo-router';
import Constants from 'expo-constants';

const statusBarHeight = Constants.statusBarHeight;

const MOCK_SHOPS = [
  {
    id: '1',
    name: 'Sunshine Electronics',
    category: 'Electronics',
    address: '123 Main St, Downtown',
    phone: '555-1234',
    image: 'https://images.unsplash.com/photo-1515168833906-d2a3b82b1a5b?auto=format&fit=facearea&w=400&q=80',
    rating: 4.5,
  },
  {
    id: '2',
    name: 'GreenLeaf Grocers',
    category: 'Groceries',
    address: '456 Oak Ave, Midtown',
    phone: '555-5678',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&q=80',
    rating: 4.8,
  },
  {
    id: '3',
    name: 'QuickFix Mobiles',
    category: 'Mobile Repair',
    address: '789 Pine Rd, Uptown',
    phone: '555-9012',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=400&q=80',
    rating: 4.2,
  },
  {
    id: '4',
    name: 'Book Haven',
    category: 'Bookstore',
    address: '321 Maple St, Downtown',
    phone: '555-3456',
    image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=facearea&w=400&q=80',
    rating: 4.9,
  },
];

export default function ShopSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(MOCK_SHOPS);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null as null | typeof MOCK_SHOPS[0]);
  const [bookingStep, setBookingStep] = useState<'date' | 'slot' | null>(null);
  const [selectedDate, setSelectedDate] = useState<'today' | 'tomorrow' | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const router = useRouter();

  const handleSearch = (text: string) => {
    setQuery(text);
    if (!text.trim()) {
      setResults(MOCK_SHOPS);
      return;
    }
    setResults(
      MOCK_SHOPS.filter(
        (shop) =>
          shop.name.toLowerCase().includes(text.toLowerCase()) ||
          shop.category.toLowerCase().includes(text.toLowerCase()) ||
          shop.address.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const openShopDetails = (shop: typeof MOCK_SHOPS[0]) => {
    router.push(`/other/shopdetails?id=${shop.id}`);
  };

  const openBookingModal = (shop: typeof MOCK_SHOPS[0]) => {
    setSelectedShop(shop);
    setBookingStep('date');
    setModalVisible(true);
    setSelectedDate(null);
    setSelectedSlot(null);
  };

  const handleDateSelect = (date: 'today' | 'tomorrow') => {
    setSelectedDate(date);
    setBookingStep('slot');
  };

  const handleSlotSelect = (slot: string) => {
    setSelectedSlot(slot);
    setModalVisible(false);
    setBookingStep(null);
    // Here you can add booking logic or show a confirmation
    alert(`Parking booked at ${selectedShop?.name} for ${selectedDate} (${slot})`);
  };

  const renderShop = ({ item }: { item: typeof MOCK_SHOPS[0] }) => (
    <View style={styles.card}>
      <TouchableOpacity style={{ flex: 1 }} activeOpacity={0.85} onPress={() => openShopDetails(item)}>
        <Image source={{ uri: item.image }} style={styles.shopImage} />
        <View style={styles.cardContent}>
          <Text style={styles.shopName}>{item.name}</Text>
          <Text style={styles.shopCategory}>{item.category}</Text>
          <Text style={styles.shopAddress}>{item.address}</Text>
          <View style={styles.row}>
            <Text style={styles.shopPhone}>📞 {item.phone}</Text>
            <Text style={styles.shopRating}>⭐ {item.rating}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bookBtn} onPress={() => openBookingModal(item)}>
        <Text style={styles.bookBtnText}>Book Parking</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TextInput
          style={styles.input}
          placeholder="Search shops, categories, or address..."
          placeholderTextColor="#aaa"
          value={query}
          onChangeText={handleSearch}
          clearButtonMode="while-editing"
        />
      </View>
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={renderShop}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.noResults}>No shops found.</Text>}
        keyboardShouldPersistTaps="handled"
      />
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {bookingStep === 'date' && (
              <>
                <Text style={styles.modalTitle}>Select Date</Text>
                <View style={styles.modalRow}>
                  <Pressable
                    style={[styles.modalBtn, selectedDate === 'today' && styles.modalBtnActive]}
                    onPress={() => handleDateSelect('today')}
                  >
                    <Text style={styles.modalBtnText}>Today</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.modalBtn, selectedDate === 'tomorrow' && styles.modalBtnActive]}
                    onPress={() => handleDateSelect('tomorrow')}
                  >
                    <Text style={styles.modalBtnText}>Tomorrow</Text>
                  </Pressable>
                </View>
                <TouchableOpacity style={styles.modalCancel} onPress={() => setModalVisible(false)}>
                  <Text style={{ color: cancelTextColor, fontSize: 16 }}>Cancel</Text>
                </TouchableOpacity>
              </>
            )}
            {bookingStep === 'slot' && (
              <>
                <Text style={styles.modalTitle}>Select Time Slot</Text>
                <View style={styles.modalRow}>
                  {['Forenoon', 'Afternoon', 'Evening'].map((slot) => (
                    <Pressable
                      key={slot}
                      style={[styles.modalBtn, selectedSlot === slot && styles.modalBtnActive]}
                      onPress={() => handleSlotSelect(slot)}
                    >
                      <Text style={styles.modalBtnText}>{slot}</Text>
                    </Pressable>
                  ))}
                </View>
                <TouchableOpacity style={styles.modalCancel} onPress={() => setModalVisible(false)}>
                  <Text style={{ color: cancelTextColor, fontSize: 16 }}>Cancel</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// Updated Colors (Vibrant Retail App Palette)
const cancelTextColor = "#9E9E9E"; // Soft gray
const primaryColor = "#2962FF"; // Electric blue (replaces #FFD32C)
const secondaryColor = "#00E5FF"; // Bright cyan (replaces #FFF9C4)
const borderColor = "#2962FF"; // Electric blue (replaces #FFD32C)
const shadowColor = "rgba(41, 98, 255, 0.3)"; // Blue tint (replaces #FFD32C)
const textInputColor = "#263238"; // Dark gray (replaces #000)
const cardBgColor = "#FAFAFA"; // Light gray (replaces #deb41c5b)
const cardBorderColor = "#E0E0E0"; // Neutral border (replaces #e0e7ff)
const bookBtnGradient = ["#2575FC", "#6A11CB"]; // Blue-purple gradient (replaces original)
const bookBtnTextColor = "#FFFFFF"; // White (replaces #5100ffff)
const modalBgColor = "#FFFFFF"; // White (unchanged)
const modalBtnBg = "#F5F5F5"; // Light gray (replaces #fffbe6)
const modalBtnActiveBg = "#2962FF"; // Electric blue (replaces #ffe066)
const modalBtnActiveBorder = "#2962FF"; // Electric blue (replaces #ffb300)
const shopImageBg = "#E3F2FD"; // Light blue (replaces #ffe066)
const shopNameColor = "#2962FF"; // Electric blue (replaces #2575fc)
const shopCategoryColor = "#6A11CB"; // Purple (unchanged)
const shopAddressColor = "#666666"; // Gray (unchanged)
const shopPhoneColor = "#2962FF"; // Electric blue (replaces #007bff)
const shopRatingColor = "#6A11CB"; // Purple (unchanged)
const noResultsColor = "#888888"; // Gray (unchanged)

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: primaryColor,
  },
  header: {
    paddingTop: statusBarHeight,
    paddingBottom: 5,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: shadowColor,
    shadowOpacity: 0.08,
    elevation: 4,
    // For React Native, use a View with a gradient background instead of backgroundColor
  },
  input: {
    backgroundColor: secondaryColor,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: borderColor,
    marginBottom: 2,
    color: textInputColor,
    shadowColor: shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  list: {
    padding: 18,
    paddingTop: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: cardBgColor,
    borderRadius: 8,
    marginBottom: 5,
    padding: 13,
    shadowColor: shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.13,
    shadowRadius: 12,
    elevation: 3,
    alignItems: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: cardBorderColor,
  },
  bookBtn: {
    backgroundColor: bookBtnGradient,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    alignSelf: 'center',
    marginLeft: 10,
    elevation: 1,
    // For React Native, use a View with a gradient background
  },
  bookBtnText: {
    color: bookBtnTextColor,
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0,0,0,0.08)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: modalBgColor,
    borderRadius: 18,
    padding: 28,
    width: 320,
    alignItems: 'center',
    shadowColor: shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 18,
    color: '#222',
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 18,
  },
  modalBtn: {
    backgroundColor: modalBtnBg,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 18,
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: modalBtnActiveBorder,
  },
  modalBtnActive: {
    backgroundColor: modalBtnActiveBg,
    borderColor: modalBtnActiveBorder,
  },
  modalBtnText: {
    fontSize: 16,
    color: '#222',
    fontWeight: 'bold',
  },
  modalCancel: {
    marginTop: 8,
  },
  shopImage: {
    width: 64,
    height: 64,
    borderRadius: 12,
    marginRight: 16,
    backgroundColor: shopImageBg,
  },
  cardContent: {
    flex: 1,
  },
  shopName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: shopNameColor,
    marginBottom: 2,
    letterSpacing: 0.2,
  },
  shopCategory: {
    fontSize: 14,
    color: shopCategoryColor,
    marginBottom: 2,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  shopAddress: {
    fontSize: 13,
    color: shopAddressColor,
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shopPhone: {
    fontSize: 13,
    color: shopPhoneColor,
    marginRight: 10,
  },
  shopRating: {
    fontSize: 13,
    color: shopRatingColor,
    fontWeight: 'bold',
  },
  noResults: {
    textAlign: 'center',
    color: noResultsColor,
    fontSize: 16,
    marginTop: 40,
  },
});
