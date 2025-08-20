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
import { Share } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useThemeMode } from '../../context/ThemeContext';

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
  const { theme, toggleTheme } = useThemeMode();
  // Share App logic
  const shareApp = async () => {
    try {
      const result = await Share.share({
        message:
          'Check out ParkMate! Find the best shops and parking spots nearby. Download now: https://parkmate.app',
        url: 'https://parkmate.app',
        title: 'ParkMate App',
      });
      // Optionally handle result.action
    } catch (error) {
      alert('Could not share the app.');
    }
  };
  const [menuVisible, setMenuVisible] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([] as typeof MOCK_SHOPS);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null as null | typeof MOCK_SHOPS[0]);
  const [bookingStep, setBookingStep] = useState<'date' | 'slot' | null>(null);
  const [selectedDate, setSelectedDate] = useState<'today' | 'tomorrow' | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [searchActive, setSearchActive] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [aboutModalVisible, setAboutModalVisible] = useState(false);
  const [editProfileModalVisible, setEditProfileModalVisible] = useState(false);
  const [contactModalVisible, setContactModalVisible] = useState(false);
  const [profileFirstName, setProfileFirstName] = useState('');
  const [profileMiddleName, setProfileMiddleName] = useState('');
  const [profileLastName, setProfileLastName] = useState('');
  const [profileGender, setProfileGender] = useState('');
  const [profileDOB, setProfileDOB] = useState('');
  const [profileEmail, setProfileEmail] = useState('your@email.com');
  // Favorite shops state
  const [favoriteShopIds, setFavoriteShopIds] = useState<string[]>([]);

  const toggleFavorite = (shopId: string) => {
    setFavoriteShopIds((prev) =>
      prev.includes(shopId) ? prev.filter((id) => id !== shopId) : [...prev, shopId]
    );
  };
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
    router.push(`main/shopdetails?id=${shop.id}`);
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
        {/* Header with shop name and image */}
        <View style={styles.cardHeader}>
          {/* Shop image thumbnail on the right */}
          <Image
            source={{ uri: item.images[0] }}
            style={styles.shopImageThumbnail}
          />
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              <Ionicons name="storefront-outline" size={16} color={COLORS.shopName} style={{ marginRight: 6 }} />
              <Text style={styles.shopName}>{item.name}</Text>
            </View>
        <View style={styles.cardContent}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
            <Ionicons name="location-outline" size={15} color={COLORS.shopAddress} style={{ marginRight: 6 }} />
            <Text style={styles.shopAddress}>{item.address}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
            <Ionicons name="walk-outline" size={15} color={COLORS.shopName} style={{ marginRight: 6 }} />
            <Text style={styles.shopDistance}>{item.distance} 2KM Away</Text>
          </View>
        </View>
          </View>
          
        </View>
        
        
      </TouchableOpacity>
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.bookBtn} onPress={() => openBookingModal(item)}>
          <Ionicons name="car-outline" size={18} style={styles.actionBtnIcon} />
          <Text style={styles.actionBtnText}>Live Status</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bookBtn} onPress={() => openBookingModal(item)}>
          <Ionicons name="car-outline" size={18} style={styles.actionBtnIcon} />
          <Text style={styles.actionBtnText}>Book</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.locateBtn} onPress={() => alert('Show Google Map and locate me')}>
          <Ionicons name="location-outline" size={18} style={styles.actionBtnIcon} />
          <Text style={styles.actionBtnText}>Locate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.chatBtn} onPress={() => alert(`Chat with ${item.name}`)}>
          <Ionicons name="chatbubbles-outline" size={18} style={styles.actionBtnIcon} />
          <Text style={styles.actionBtnText}>Chat</Text>
        </TouchableOpacity>
      </View>
      {/* Favorite button positioned at top-right */}
      <TouchableOpacity 
        onPress={() => toggleFavorite(item.id)} 
        style={styles.favoriteButton}
      >
        <Ionicons
          name={favoriteShopIds.includes(item.id) ? 'heart' : 'heart-outline'}
          size={22}
          color={favoriteShopIds.includes(item.id) ? COLORS.primary : COLORS.grayText}
        />
      </TouchableOpacity>
    </View>
  );


  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Side Menu Modal */}
      <Modal
        visible={menuVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setMenuVisible(false)}
      >
        <View style={styles.menuOverlay}>
          <View style={[
            styles.menuContainer,
            { backgroundColor: theme === 'dark' ? '#232136' : COLORS.white }
          ]}>
            <TouchableOpacity style={styles.menuCloseBtn} onPress={() => setMenuVisible(false)}>
              <Ionicons name="close" size={28} color={COLORS.primary} />
            </TouchableOpacity>
            <View style={styles.menuProfileSection}>
              <Ionicons name="person-circle" size={64} color={COLORS.primary} />
              <Text style={styles.menuProfileName}>Your Name</Text>
            </View>
            {/* Group 1: Account */}
            <View style={{ marginBottom: 8 }}>
              <Text style={{ fontWeight: 'bold', color: COLORS.grayText, fontSize: 13, marginBottom: 2, marginLeft: 2 }}>Account</Text>
              <TouchableOpacity style={styles.menuItem} onPress={() => setEditProfileModalVisible(true)}>
                <Ionicons name="create-outline" size={22} color={COLORS.primary} style={styles.menuItemIcon} />
                <Text style={[styles.menuItemText, {color: theme === 'dark' ? '#fff' : COLORS.primary}]}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 0 }]} onPress={() => alert('Logout')}>
                <Ionicons name="log-out-outline" size={22} color={COLORS.primary} style={styles.menuItemIcon} />
                <Text style={[styles.menuItemText, {color: theme === 'dark' ? '#fff' : COLORS.primary}]}>Logout</Text>
              </TouchableOpacity>
            </View>
            {/* Divider */}
            <View style={{ height: 1, backgroundColor: COLORS.cardBorder, marginVertical: 4 }} />
            {/* Spacer before Delete Account */}
            <View style={{ height: 32 }} />
            {/* Group: App Info & Settings */}
            <View>
              <Text style={{ fontWeight: 'bold', color: COLORS.grayText, fontSize: 13, marginBottom: 2, marginLeft: 2 }}>App Info & Settings</Text>
              {/* About Us menu item (single instance) */}
              <TouchableOpacity style={styles.menuItem} onPress={() => setAboutModalVisible(true)}>
                <Ionicons name="information-circle-outline" size={22} color={COLORS.primary} style={styles.menuItemIcon} />
                <Text style={[styles.menuItemText, {color: theme === 'dark' ? '#fff' : COLORS.primary}]}>About Us</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={shareApp}>
                <Ionicons name="share-social-outline" size={22} color={COLORS.primary} style={styles.menuItemIcon} />
                <Text style={[styles.menuItemText, {color: theme === 'dark' ? '#fff' : COLORS.primary}]}>Share App</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => setContactModalVisible(true)}>
                <Ionicons name="call-outline" size={22} color={COLORS.primary} style={styles.menuItemIcon} />
                <Text style={[styles.menuItemText, {color: theme === 'dark' ? '#fff' : COLORS.primary}]}>Contact Us</Text>
              </TouchableOpacity>
              {/* Dark Theme toggle with switch */}
              <View style={[styles.menuItem, { borderBottomWidth: 0, paddingVertical: 8 }]}> 
                <Ionicons name="moon-outline" size={22} color={COLORS.primary} style={styles.menuItemIcon} />
                <Text style={[styles.menuItemText, {color: theme === 'dark' ? '#fff' : COLORS.primary}]}>Dark Theme</Text>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                  <TouchableOpacity
                    style={{
                      width: 44,
                      height: 24,
                      borderRadius: 12,
                      backgroundColor: '#E0E0E0',
                      justifyContent: 'center',
                      padding: 2,
                    }}
                    onPress={toggleTheme}
                  >
                    <Animated.View
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        backgroundColor: theme === 'dark' ? '#fff' : COLORS.primary,
                        transform: [{ translateX: theme === 'dark' ? 20 : 0 }],
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Delete Account button at the very bottom */}
            <View style={{ marginTop: 40 }}>
              <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 0 }]} onPress={() => setDeleteModalVisible(true)}>
                <Ionicons name="trash-outline" size={22} color={COLORS.primary} style={styles.menuItemIcon} />
                <Text style={[styles.menuItemText, {color: theme === 'dark' ? '#fff' : COLORS.primary}]}>Delete Account</Text>
              </TouchableOpacity>
            </View>
      {/* Delete Account Confirmation Modal */}
      <Modal
        visible={deleteModalVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { padding: 24, width: 300 }]}>  
            <Ionicons name="warning-outline" size={48} color={COLORS.primary} style={{ marginBottom: 12 }} />
            <Text style={[styles.modalTitle, { textAlign: 'center', marginBottom: 10 }]}>Are you sure you want to delete your account?</Text>
            <Text style={{ color: COLORS.grayText, textAlign: 'center', marginBottom: 18 }}>
              This action cannot be undone. All your data will be permanently deleted.
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
              <TouchableOpacity
                style={[styles.modalBtn, { flex: 1, marginRight: 8 }]}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text style={styles.modalBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, styles.modalBtnActive, { flex: 1, marginLeft: 8 }]}
                onPress={() => {
                  setDeleteModalVisible(false);
                  setMenuVisible(false);
                  alert('Account deleted! (Implement actual delete logic here)');
                }}
              >
                <Text style={[styles.modalBtnText, { color: COLORS.white }]}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
            {/* Removed duplicate About Us menu item */}
      {/* About Us Modal */}
      <Modal
        visible={aboutModalVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setAboutModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { padding: 24, width: 300 }]}>  
            <TouchableOpacity
              style={{ position: 'absolute', top: 12, right: 12, zIndex: 2 }}
              onPress={() => setAboutModalVisible(false)}
            >
              <Ionicons name="close" size={26} color={COLORS.primary} />
            </TouchableOpacity>
            <Ionicons name="information-circle-outline" size={48} color={COLORS.primary} style={{ marginBottom: 12, marginTop: 8 }} />
            <Text style={[styles.modalTitle, { textAlign: 'center', marginBottom: 10 }]}>About ParkMate</Text>
            <Text style={{ color: COLORS.grayText, textAlign: 'center', marginBottom: 18 }}>
              ParkMate helps you find the best shops and parking spots nearby. This is a demo app.{"\n\n"}Version 1.0.0{"\n\n"}© 2025 ParkMate Team
            </Text>
          </View>
        </View>
      </Modal>

      {/* Contact Us Modal */}
      <Modal
        visible={contactModalVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setContactModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { padding: 24, width: 300 }]}>  
            <TouchableOpacity
              style={{ position: 'absolute', top: 12, right: 12, zIndex: 2 }}
              onPress={() => setContactModalVisible(false)}
            >
              <Ionicons name="close" size={26} color={COLORS.primary} />
            </TouchableOpacity>
            <Ionicons name="call-outline" size={48} color={COLORS.primary} style={{ marginBottom: 12, marginTop: 8 }} />
            <Text style={[styles.modalTitle, { textAlign: 'center', marginBottom: 10 }]}>Contact Us</Text>
            <Text style={{ color: COLORS.grayText, textAlign: 'center', marginBottom: 18 }}>
              For support or inquiries, call us at:
              {"\n"}
              <Text style={{ color: COLORS.primary, fontWeight: 'bold', fontSize: 16 }}>+91 98765 43210</Text>
              {"\n\n"}Or email: support@parkmate.com
            </Text>
          </View>
        </View>
      </Modal>

      {/* Edit Profile Modal */}
      <Modal
        visible={editProfileModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setEditProfileModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { padding: 24, width: 320, alignItems: 'flex-start' }]}>  
            <Ionicons name="person-circle-outline" size={48} color={COLORS.primary} style={{ marginBottom: 12, alignSelf: 'center' }} />
            <Text style={[styles.modalTitle, { textAlign: 'left', marginBottom: 10, alignSelf: 'flex-start' }]}>Edit Profile</Text>
            <View style={{ width: '100%' }}>
              <Text style={{ color: COLORS.textInput, fontWeight: '600', marginBottom: 2 }}>First Name</Text>
              <TextInput
                style={[styles.inputFluid, { marginBottom: 10, borderRadius: 6 }]}
                placeholder="First Name"
                value={profileFirstName}
                onChangeText={setProfileFirstName}
                placeholderTextColor={COLORS.placeholder}
              />
              <Text style={{ color: COLORS.textInput, fontWeight: '600', marginBottom: 2 }}>Middle Name</Text>
              <TextInput
                style={[styles.inputFluid, { marginBottom: 10, borderRadius: 6 }]}
                placeholder="Middle Name"
                value={profileMiddleName}
                onChangeText={setProfileMiddleName}
                placeholderTextColor={COLORS.placeholder}
              />
              <Text style={{ color: COLORS.textInput, fontWeight: '600', marginBottom: 2 }}>Last Name</Text>
              <TextInput
                style={[styles.inputFluid, { marginBottom: 10, borderRadius: 6 }]}
                placeholder="Last Name"
                value={profileLastName}
                onChangeText={setProfileLastName}
                placeholderTextColor={COLORS.placeholder}
              />
              <Text style={{ color: COLORS.textInput, fontWeight: '600', marginBottom: 2 }}>Gender</Text>
              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                {['Male', 'Female', 'Other'].map((g) => (
                  <TouchableOpacity
                    key={g}
                    style={{
                      backgroundColor: profileGender === g ? COLORS.primary : COLORS.modalBtnBg,
                      borderColor: COLORS.border,
                      borderWidth: 1,
                      borderRadius: 8,
                      paddingVertical: 8,
                      paddingHorizontal: 16,
                      marginRight: 8,
                    }}
                    onPress={() => setProfileGender(g)}
                  >
                    <Text style={{ color: profileGender === g ? COLORS.white : COLORS.textInput, fontWeight: '600' }}>{g}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Text style={{ color: COLORS.textInput, fontWeight: '600', marginBottom: 2 }}>Date of Birth</Text>
              <TextInput
                style={[styles.inputFluid, { marginBottom: 10, borderRadius: 6 }]}
                placeholder="YYYY-MM-DD"
                value={profileDOB}
                onChangeText={setProfileDOB}
                placeholderTextColor={COLORS.placeholder}
                keyboardType="numeric"
                maxLength={10}
              />
              <Text style={{ color: COLORS.textInput, fontWeight: '600', marginBottom: 2 }}>Email</Text>
              <TextInput
                style={[styles.inputFluid, { marginBottom: 18, borderRadius: 6 }]}
                placeholder="Email"
                value={profileEmail}
                onChangeText={setProfileEmail}
                placeholderTextColor={COLORS.placeholder}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <View style={{ flexDirection: 'row', width: '100%' }}>
              <TouchableOpacity
                style={[
                  styles.modalBtn,
                  {
                    flex: 1,
                    marginRight: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderColor: COLORS.border,
                  },
                ]}
                onPress={() => setEditProfileModalVisible(false)}
              >
                <Ionicons name="close-circle-outline" size={20} color={COLORS.primary} style={{ marginRight: 6 }} />
                <Text style={styles.modalBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.modalBtn,
                  { flex: 1, marginLeft: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.primary },
                ]}
                onPress={() => setEditProfileModalVisible(false)}
              >
                <Ionicons name="save-outline" size={20} color={COLORS.white} style={{ marginRight: 6 }} />
                <Text style={[styles.modalBtnText, { color: COLORS.white }]}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
             
          </View>
        </View>
      </Modal>
    {/* Welcome Content (hide when searching) */}
      {!searchActive && (
        <View style={styles.welcomeContent}>

          <Text style={styles.welcomeTitle}>Welcome to ParkMate!</Text>
          <Text style={styles.welcomeSubtitle}>Find the best shops and parking spots nearby.</Text>
        </View>
      )}
      {/* Top Row: Search Box and Profile Icon */}
      <Animated.View
        style={[
          styles.topRow,
          {
            top: searchAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [SCREEN_HEIGHT / 2 - 32, statusBarHeight + 16],
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
        <Animated.View
          style={
            [
              styles.inputRow,
              {
                marginRight: searchAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 56], // 0 when centered, 56 when at top
                })
              }
            ]
          }
        >
          <TextInput
            style={styles.inputFluidMainSearch}
            placeholder="Search shops, categories, or address..."
            placeholderTextColor={COLORS.placeholder}
            value={query}
            onChangeText={handleSearch}
            clearButtonMode="while-editing"
            onFocus={() => setSearchActive(true)}
          />
        </Animated.View>
      </Animated.View>

      {/* Profile Icon - always top right */}
      <TouchableOpacity
        style={styles.profileIconFixed}
        onPress={() => setMenuVisible(true)}
        accessibilityLabel="Open profile menu"
      >
        <Ionicons name="person-circle" size={36} color={COLORS.primary} />
      </TouchableOpacity>

  

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
                <Text style={styles.modalTitle}>Select Day</Text>
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
  primary: "#2c2455", // Electric blue
  buttonBg: "#E0E0E0", // Electric blue
  borderColor: "#B0B0B0",
  black:"#000000",
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
  shopName: "#2c2455", // Electric blue
  shopCategory: "#2c2455", // Purple
  shopAddress: "#2c2455", // Gray
  shopPhone: "#2c2455", // Electric blue
  shopRating: "#2c2455", // Purple
  noResults: "#888888", // Gray
  modalOverlay: 'rgba(0,0,0,0.2)', // Modal overlay background
  placeholder: '#aaa', // Placeholder text color
  grayText: '#577590', // Used for welcomeSubtitle
};

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.modalBg,
    borderRadius: 12,
    borderWidth: 0,
    borderColor: COLORS.border,
    marginBottom: 2,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    marginRight: 56, // Leave space for the fixed profile icon (36px icon + padding)
  },
  profileIconBtn: {
    // No longer used
  },
  // profileIconFixed: { // No longer used },
  topRow: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 10,
    marginHorizontal: 24,
  },
  inputRowWithProfile: {
    // No longer used
  },
  profileIconInline: {
    // No longer used
  },
  profileIconFixed: {
    position: 'absolute',
    top: statusBarHeight + 18,
    right: 18,
    zIndex: 20,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 2,
    elevation: 3,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.12,
    shadowRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  menuContainer: {
    width: 270,
    backgroundColor: COLORS.white,
    paddingTop: 40,
    paddingHorizontal: 18,
    paddingBottom: 24,
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
    elevation: 8,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.12,
    shadowRadius: 12,
  },
  menuCloseBtn: {
    alignSelf: 'flex-end',
    marginBottom: 8,
  },
  menuProfileSection: {
    alignItems: 'center',
    marginBottom: 18,
  },
  menuProfileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 6,
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
  },
  menuItemIcon: {
    marginRight: 14,
  },
  menuItemText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '600',
  },
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
    color: COLORS.secondary,
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
    backgroundColor: COLORS.white,
    borderRadius: 8,
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
  inputFluidMainSearch: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 0,
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
    marginBottom: 10,
    marginTop:5,
    padding: 10,
    // Modern soft shadow (iOS & Android)
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 3,
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
    locateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.buttonBg,
    borderRadius: 3,
    paddingVertical: 6,
    paddingHorizontal: 9,
    elevation: 0,
 
    color:COLORS.black,
    justifyContent: 'center',
    minWidth: 0,
    marginRight: 3,
  },
  bookBtn: {
   flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.buttonBg,
    borderRadius: 3,
    paddingVertical: 6,
    paddingHorizontal: 9,
    elevation: 0,
    //borderWidth: 1,
   // borderColor: COLORS.borderColor,
    color: COLORS.black,
    justifyContent: 'center',
    minWidth: 0,
    marginRight: 3,
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
    backgroundColor: COLORS.buttonBg,
    borderRadius: 3,
    paddingVertical: 6,
    paddingHorizontal: 9,
    elevation: 0,
 
    color: COLORS.black,
    
    justifyContent: 'center',
    minWidth: 0,
    marginRight: 3,
  },
  actionBtnIcon: {
    marginRight: 4,
    color: COLORS.black,
  },
  actionBtnText: {
    color: COLORS.black,
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
    borderRadius: 5,
    padding: 28,
    width: "90%",
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
    paddingHorizontal: 10,
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: COLORS.primary,
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
    color: COLORS.primary,
    marginBottom: 2,
    letterSpacing: 0.2,
  },
  shopCategory: {
    fontSize: 14,
    color: COLORS.primary,
    marginBottom: 2,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  shopAddress: {
    fontSize: 13,
    color: COLORS.primary,
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 8,
    width: '100%',
  },
  shopImageThumbnail: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.shopImageBg,
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: COLORS.primary,
    marginRight:10
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
    padding: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 15,
  },
});
