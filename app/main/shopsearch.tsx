import React, { useState, useRef, useEffect } from 'react';
import { Animated, Easing, Dimensions } from 'react-native';
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
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

const statusBarHeight = Constants.statusBarHeight;

const MOCK_SHOPS = [
  {
    id: '1',
    name: 'Sunshine Electronics',
    category: 'Electronics',
    address: '123 Main St, Downtown',
    phone: '555-1234',
    images: [
      'https://pbs.twimg.com/media/FjhMfGAUAAAbfGz?format=jpg&name=900x900',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      'https://kerala.mallsmarket.com/sites/default/files/photos/events/centre-square-kochi-onam-shopping-is-back-27aug-15sep2022-1.jpg',
    ],
    rating: 4.5,
    distance: '1 km',
  },
  {
    id: '2',
    name: 'GreenLeaf Grocers',
    category: 'Groceries',
    address: '456 Oak Ave, Midtown',
    phone: '555-5678',
    images: [
      'https://instagram.fccj6-2.fna.fbcdn.net/v/t39.30808-6/468493826_17928898574972269_6939063415323627906_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDgweDEwODAuc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlLmMyIn0&_nc_ht=instagram.fccj6-2.fna.fbcdn.net&_nc_cat=101&_nc_oc=Q6cZ2QGlM9nJ-aNVfMiFZBnYm-ZSY5AiHgd08sMHIdknZvhIAuTcxvBiB9CYnClbnXsyYtZ9E3DPz_xv8nr9cGmY6fN6&_nc_ohc=ggifWwoNwCMQ7kNvwHVKxki&_nc_gid=L4WsCLkCKoQDgDI7dBj4Bg&edm=ANTKIIoAAAAA&ccb=7-5&oh=00_AfQ3mMjdC-7JTGbfdJPrlRZePUc1ap0g7WvhCL8KWqYM_Q&oe=689505C5&_nc_sid=d885a2',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      'https://pbs.twimg.com/media/FjhMfGAUAAAbfGz?format=jpg&name=900x900',
    ],
    rating: 4.8,
    distance: '1 km',
  },
  {
    id: '3',
    name: 'QuickFix Mobiles',
    category: 'Mobile Repair',
    address: '789 Pine Rd, Uptown',
    phone: '555-9012',
    images: [
      'https://kerala.mallsmarket.com/sites/default/files/photos/events/centre-square-kochi-onam-shopping-is-back-27aug-15sep2022-1.jpg',
      'https://pbs.twimg.com/media/FjhMfGAUAAAbfGz?format=jpg&name=900x900',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    ],
    rating: 4.2,
    distance: '1 km',
  },
  {
    id: '4',
    name: 'Book Haven',
    category: 'Bookstore',
    address: '321 Maple St, Downtown',
    phone: '555-3456',
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      'https://kerala.mallsmarket.com/sites/default/files/photos/events/centre-square-kochi-onam-shopping-is-back-27aug-15sep2022-1.jpg',
      'https://pbs.twimg.com/media/FjhMfGAUAAAbfGz?format=jpg&name=900x900',
    ],
    rating: 4.9,
    distance: '1 km',
  },
];

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function ShopSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([] as typeof MOCK_SHOPS);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null as null | typeof MOCK_SHOPS[0]);
  const [bookingStep, setBookingStep] = useState<'date' | 'slot' | null>(null);
  const [selectedDate, setSelectedDate] = useState<'today' | 'tomorrow' | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [searchActive, setSearchActive] = useState(false);
  const searchAnim = useRef(new Animated.Value(0)).current; // 0=center, 1=top
  const router = useRouter();

  // Animate search box position
  useEffect(() => {
    Animated.timing(searchAnim, {
      toValue: searchActive ? 1 : 0,
      duration: 350,
      useNativeDriver: false,
    }).start();
  }, [searchActive]);

  const handleSearch = (text: string) => {
    setQuery(text);
    if (!searchActive && text.length > 0) setSearchActive(true);
    if (searchActive && text.length === 0) setSearchActive(false);
    if (!text.trim()) {
      setResults([]);
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
    router.push(`../other/shopdetails?id=${shop.id}`);
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

  // ShopImageSlider: shows one image at a time, auto-slides every second
  const ShopImageSlider = ({ images }: { images: string[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState<'left' | 'right'>('right');
    const timeoutRef = useRef<any>(null);
    const translateX = useRef(new Animated.Value(0)).current;
    const width = 300; // match shopImage width

    // Helper to get a random delay: 1, 1.5, or 2 seconds
    const getRandomDelay = () => {
      const options = [1000, 1500, 2000];
      return options[Math.floor(Math.random() * options.length)];
    };

    // Animate slide in from direction
    const animateToIndex = (newIndex: number, dir: 'left' | 'right') => {
      // Start image off-screen
      translateX.setValue(dir === 'right' ? width : -width);
      setCurrentIndex(newIndex);
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    };

    // Auto-slide logic
    useEffect(() => {
      function scheduleNext() {
        timeoutRef.current = setTimeout(() => {
          const next = (currentIndex + 1) % images.length;
          setDirection('right');
          animateToIndex(next, 'right');
        }, getRandomDelay());
      }
      scheduleNext();
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [images.length, currentIndex]);

    // Bullet navigation
    const goToIndex = (target: number) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (target === currentIndex) return;
      const dir = target > currentIndex ? 'right' : 'left';
      animateToIndex(target, dir);
    };

    return (
      <View style={styles.sliderContent}>
        <Animated.Image
          source={{ uri: images[currentIndex] }}
          style={[
            styles.shopImage,
            { transform: [{ translateX }] },
          ]}
        />
        <View style={styles.sliderBulletsRow}>
          {images.map((_, idx) => (
            <TouchableOpacity
              key={idx}
              style={[styles.sliderBullet, idx === currentIndex && styles.sliderBulletActive]}
              onPress={() => goToIndex(idx)}
              accessibilityLabel={`Go to image ${idx + 1}`}
            />
          ))}
        </View>
      </View>
    );
  };

  const renderShop = ({ item }: { item: typeof MOCK_SHOPS[0] }) => (
    <View style={styles.card}>
      <TouchableOpacity style={styles.cardTouch} activeOpacity={0.85} onPress={() => openShopDetails(item)}>
        <ShopImageSlider images={item.images} />
        <View style={styles.cardContent}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
            <Ionicons name="storefront-outline" size={16} color={COLORS.shopName} style={{ marginRight: 6 }} />
            <Text style={styles.shopName}>{item.name}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
            <Ionicons name="pricetag-outline" size={15} color={COLORS.shopCategory} style={{ marginRight: 6 }} />
            <Text style={styles.shopCategory}>{item.category}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
            <Ionicons name="location-outline" size={15} color={COLORS.shopAddress} style={{ marginRight: 6 }} />
            <Text style={styles.shopAddress}>{item.address}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
            <Ionicons name="walk-outline" size={15} color={COLORS.shopName} style={{ marginRight: 6 }} />
            <Text style={styles.shopDistance}>{item.distance} 2KM Away</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.bookBtn} onPress={() => openBookingModal(item)}>
          <Ionicons name="car-outline" size={18} style={styles.actionBtnIcon} />
          <Text style={styles.bookBtnText}>Book</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.locateBtn} onPress={() => alert('Show Google Map and locate me')}>
          <Ionicons name="location-outline" size={18} style={styles.actionBtnIcon} />
          <Text style={styles.actionBtnText}>Locate Me</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.chatBtn} onPress={() => alert(`Chat with ${item.name}`)}>
          <Ionicons name="chatbubbles-outline" size={18} style={styles.actionBtnIcon} />
          <Text style={styles.actionBtnText}>Chat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );


  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Animated Search Box */}
      <Animated.View
        style={[
          styles.animatedSearchBox,
          {
            // Center vertically when inactive, move to below status bar when active
            top: searchAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [SCREEN_HEIGHT / 2 - 32, statusBarHeight + 16], // 32 is half the input height (approx), 16px below status bar
            }),
            transform: [
              {
                translateY: searchAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-60, 0],
                }),
              },
            ],
          },
        ]}
      >
        <TextInput
          style={styles.inputFluid}
          placeholder="Search shops, categories, or address..."
          placeholderTextColor={COLORS.placeholder}
          value={query}
          onChangeText={handleSearch}
          clearButtonMode="while-editing"
          onFocus={() => setSearchActive(true)}
        />
      </Animated.View>

      {/* Welcome Content (hide when searching) */}
      {!searchActive && (
        <View style={styles.welcomeContent}>

          <Text style={styles.welcomeTitle}>Welcome to ParkMate!</Text>
          <Text style={styles.welcomeSubtitle}>Find the best shops and parking spots nearby.</Text>
        </View>
      )}

      {/* Shop List (show only when searching and query is not empty) */}
      {searchActive && query.trim().length > 0 && (
        <View style={{ flex: 1, paddingTop: statusBarHeight + 80 }}>
          <FlatList
            style={styles.body}
            data={results}
            keyExtractor={(item) => item.id}
            renderItem={renderShop}
            contentContainerStyle={styles.list}
            ListEmptyComponent={<Text style={styles.noResults}>No shops found.</Text>}
            keyboardShouldPersistTaps="handled"
          />
        </View>
      )}

      {/* Modal (unchanged) */}
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
                  <Text style={{ color: COLORS.cancelText, fontSize: 16 }}>Cancel</Text>
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
                  <Text style={{ color: COLORS.cancelText, fontSize: 16 }}>Cancel</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );

}

// Centralized color palette
const COLORS = {
  cancelText: "#9E9E9E", // Soft gray
  primary: "#43AA8B", // Electric blue
  secondary: "#518048", // Bright cyan
  border: "#4D908E", // Electric blue
  shadow: "#518048", // Blue tint
  textInput: "#263238", // Dark gray
  cardBg: "#F5F5F5", // Light gray
  cardBorder: "#E0E0E0", // Neutral border
  bookBtnGradient: ["#2575FC", "#6A11CB"], // Blue-purple gradient
  white: "#FFFFFF", // White (used for bookBtnText, notificationIconBtn, input, etc.)
  modalBg: "#F5F5F5", // White
  modalBtnBg: "#F5F5F5", // Light gray
  modalBtnActiveBg: "#E95555", // Electric blue
  modalBtnActiveBorder: "#E56B6B", // Electric blue
  shopImageBg: "#E3F2FD", // Light blue
  shopName: "#90BE6D", // Electric blue
  shopCategory: "#90BE6D", // Purple
  shopAddress: "#90BE6D", // Gray
  shopPhone: "#CDD993", // Electric blue
  shopRating: "#90BE6D", // Purple
  noResults: "#888888", // Gray
  modalOverlay: 'rgba(0,0,0,0.2)', // Modal overlay background
  placeholder: '#aaa', // Placeholder text color
  grayText: '#577590', // Used for welcomeSubtitle
};

const styles = StyleSheet.create({
  animatedSearchBox: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 10,
    marginHorizontal: 24,
  },
  welcomeContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 120,
  },
  logoLarge: {
    width: 80,
    height: 80,
    marginBottom: 18,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: COLORS.grayText,
    textAlign: 'center',
    marginBottom: 12,
    paddingHorizontal: 24,
  },

  slider: {
    width: '100%',
    maxHeight: 100,
    marginBottom: 2,
  },
  sliderContent: {
    alignItems: 'center',
    height: 20,
    visibility: 'hidden',
    display: 'none'
  },
  headerRow: {
    paddingTop: statusBarHeight,
    paddingBottom: 5,
    paddingHorizontal: 20,
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.08,
    elevation: 4,
  },
  locateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.grayText,
    borderRadius: 3,
    paddingVertical: 2,
    paddingHorizontal: 5,
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.grayText, // blue-cyan
    justifyContent: 'center',
    minWidth: 0,
    shadowColor: COLORS.grayText,
    shadowOpacity: 0.08,
    shadowRadius: 6,
    marginRight: 8,
  },
  headerFluidRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'transparent',
    gap: 0,
  },
  logo: {
    width: 36,
    height: 36,
    marginRight: 10,
    borderRadius: 8,
    backgroundColor: COLORS.cardBg,
    color: COLORS.white,
  },
  inputFluid: {
    flex: 1,
    backgroundColor: COLORS.modalBg,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 2,
    color: COLORS.textInput,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  notificationIconBtn: {
    marginLeft: 8,
    padding: 6,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  cardTouch: {
    flex: 1,
    width: '100%'
  },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  body: {
    backgroundColor: COLORS.cardBg,
  },
  header: {
    paddingTop: statusBarHeight,
    paddingBottom: 5,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.08,
    elevation: 4,
    // For React Native, use a View with a gradient background instead of backgroundColor
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 2,
    color: COLORS.textInput,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  list: {
    padding: 10,
    paddingTop: 10,
    width: '100%'
  },
  card: {
    flexDirection: 'column',
    backgroundColor: COLORS.cardBg,
    borderRadius: 3,
    marginBottom: 5,
    padding: 10,
    // Modern soft shadow (iOS & Android)
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 5,
    alignItems: 'center',
    position: 'relative',
    borderWidth: 0,
    borderColor: COLORS.cardBorder,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    gap: 8,
  },
  bookBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 3,
    paddingVertical: 2,
    paddingHorizontal: 5,
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.primary,
    marginRight: 8,
    justifyContent: 'center',
    minWidth: 0,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  bookBtnText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 0.5,
    marginLeft: 4,
  },
  chatBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.shopRating,
    borderRadius: 3,
    paddingVertical: 2,
    paddingHorizontal: 5,
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.shopRating, // green
    justifyContent: 'center',
    minWidth: 0,
    shadowColor: COLORS.shopRating,
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  actionBtnIcon: {
    marginRight: 4,
    color: COLORS.white,
  },
  actionBtnText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.modalOverlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.modalBg,
    borderRadius: 18,
    padding: 28,
    width: 320,
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 18,
    color: COLORS.textInput,
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 18,
  },
  modalBtn: {
    backgroundColor: COLORS.modalBtnBg,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 18,
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: COLORS.modalBtnActiveBorder,
  },
  modalBtnActive: {
    backgroundColor: COLORS.modalBtnActiveBg,
    borderColor: COLORS.modalBtnActiveBorder,
  },
  modalBtnText: {
    fontSize: 16,
    color: COLORS.textInput,
    fontWeight: 'bold',
  },
  modalCancel: {
    marginTop: 8,
  },
  shopImage: {
    width: 300,
    height: 150,
    borderRadius: 12,
    backgroundColor: COLORS.shopImageBg,
    resizeMode: 'cover',
    zIndex: 1,
  },
  sliderBulletsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
    gap: 1,
  },
  sliderBullet: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: COLORS.noResults,
    marginHorizontal: 2,
    opacity: 0.7,
  },
  sliderBulletActive: {
    backgroundColor: COLORS.primary,
    opacity: 1,
  },
  cardContent: {
    flex: 1,
    width: '100%'
  },
  shopName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.secondary,
    marginBottom: 2,
    letterSpacing: 0.2,
  },
  shopCategory: {
    fontSize: 14,
    color: COLORS.secondary,
    marginBottom: 2,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  shopAddress: {
    fontSize: 13,
    color: COLORS.secondary,
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shopPhone: {
    fontSize: 13,
    color: COLORS.shopPhone,
    marginRight: 10,
  },
  shopRating: {
    fontSize: 13,
    color: COLORS.shopRating,
    fontWeight: 'bold',
  },
  noResults: {
    textAlign: 'center',
    color: COLORS.noResults,
    fontSize: 16,
    marginTop: 40,
  },
  shopDistance: {
    fontSize: 12,
    color: COLORS.shopName,
    marginBottom: 2,
  },
});
