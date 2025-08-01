import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Share } from 'react-native';
import { useRouter } from 'expo-router';

const menuItems = [
  { label: 'Profile Edit', route: '/ProfileCreation' },
  { label: 'Settings', route: '/Settings' },
  { label: 'Share', action: 'share' },
  { label: 'About', route: '/About' },
  { label: 'Logout', route: '/Logout' },
];

export default function Sidebar({ visible = true, onClose }: { visible?: boolean; onClose?: () => void }) {
  const router = useRouter();

  if (!visible) return null;

  const handleMenu = async (item: any) => {
    if (item.action === 'share') {
      await Share.share({
        message: 'Check out ParkMate! The smart way to park.',
        url: 'https://parkmate.app',
        title: 'ParkMate App',
      });
      if (onClose) onClose();
      return;
    }
    if (item.route) {
      router.push(item.route);
      if (onClose) onClose();
    }
  };

  return (
    <View style={styles.sidebar}>
      <Text style={styles.title}>☰ Menu</Text>
      {menuItems.map((item) => (
        <TouchableOpacity
          key={item.label}
          style={styles.menuItem}
          onPress={() => handleMenu(item)}
        >
          <Text style={styles.menuText}>{item.label}</Text>
        </TouchableOpacity>
      ))}
      {onClose && (
        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 240,
    backgroundColor: '#23263A',
    flex: 1,
    paddingTop: 48,
    paddingHorizontal: 18,
    borderRightWidth: 1,
    borderRightColor: '#333',
    height: '100%',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6C38FF',
    marginBottom: 32,
    textAlign: 'left',
  },
  menuItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2e2e3e',
  },
  menuText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
});
