import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Settings, Bell, MapPin, CreditCard, CircleHelp as HelpCircle, LogOut, CreditCard as Edit3, Star, Clock, Shield, Smartphone } from 'lucide-react-native';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  memberSince: string;
  completedOrders: number;
  rating: number;
}

const userProfile: UserProfile = {
  name: 'John Kamau',
  email: 'john.kamau@email.com',
  phone: '+254 712 345 678',
  location: 'Kerugoya, Kirinyaga',
  memberSince: 'January 2024',
  completedOrders: 24,
  rating: 4.9,
};

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logging out...');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>JK</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{userProfile.name}</Text>
              <Text style={styles.profileEmail}>{userProfile.email}</Text>
              <View style={styles.ratingContainer}>
                <Star size={16} color="#FFD700" />
                <Text style={styles.ratingText}>{userProfile.rating} Rating</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.editButton} activeOpacity={0.8}>
              <Edit3 size={20} color="#2D7D32" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{userProfile.completedOrders}</Text>
            <Text style={styles.statLabel}>Completed Orders</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Active Orders</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{userProfile.rating}</Text>
            <Text style={styles.statLabel}>Average Rating</Text>
          </View>
        </View>

        {/* Account Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.8}>
            <View style={styles.menuItemLeft}>
              <User size={20} color="#666666" />
              <Text style={styles.menuItemText}>Personal Information</Text>
            </View>
            <Edit3 size={16} color="#999999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} activeOpacity={0.8}>
            <View style={styles.menuItemLeft}>
              <MapPin size={20} color="#666666" />
              <Text style={styles.menuItemText}>Delivery Addresses</Text>
            </View>
            <Edit3 size={16} color="#999999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} activeOpacity={0.8}>
            <View style={styles.menuItemLeft}>
              <CreditCard size={20} color="#666666" />
              <Text style={styles.menuItemText}>Payment Methods</Text>
            </View>
            <Edit3 size={16} color="#999999" />
          </TouchableOpacity>
        </View>

        {/* App Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          
          <View style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Bell size={20} color="#666666" />
              <Text style={styles.menuItemText}>Push Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#E0E0E0', true: '#C8E6C9' }}
              thumbColor={notificationsEnabled ? '#2D7D32' : '#FFFFFF'}
            />
          </View>

          <View style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <MapPin size={20} color="#666666" />
              <Text style={styles.menuItemText}>Location Services</Text>
            </View>
            <Switch
              value={locationEnabled}
              onValueChange={setLocationEnabled}
              trackColor={{ false: '#E0E0E0', true: '#C8E6C9' }}
              thumbColor={locationEnabled ? '#2D7D32' : '#FFFFFF'}
            />
          </View>

          <TouchableOpacity style={styles.menuItem} activeOpacity={0.8}>
            <View style={styles.menuItemLeft}>
              <Smartphone size={20} color="#666666" />
              <Text style={styles.menuItemText}>App Preferences</Text>
            </View>
            <Edit3 size={16} color="#999999" />
          </TouchableOpacity>
        </View>

        {/* Support & Legal */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support & Legal</Text>
          
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.8}>
            <View style={styles.menuItemLeft}>
              <HelpCircle size={20} color="#666666" />
              <Text style={styles.menuItemText}>Help Center</Text>
            </View>
            <Edit3 size={16} color="#999999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} activeOpacity={0.8}>
            <View style={styles.menuItemLeft}>
              <Shield size={20} color="#666666" />
              <Text style={styles.menuItemText}>Privacy Policy</Text>
            </View>
            <Edit3 size={16} color="#999999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} activeOpacity={0.8}>
            <View style={styles.menuItemLeft}>
              <Settings size={20} color="#666666" />
              <Text style={styles.menuItemText}>Terms of Service</Text>
            </View>
            <Edit3 size={16} color="#999999" />
          </TouchableOpacity>
        </View>

        {/* Membership Info */}
        <View style={styles.section}>
          <View style={styles.membershipCard}>
            <View style={styles.membershipInfo}>
              <Text style={styles.membershipTitle}>Swift Assist Member</Text>
              <Text style={styles.membershipSince}>Member since {userProfile.memberSince}</Text>
            </View>
            <View style={styles.membershipBadge}>
              <Star size={16} color="#FFD700" />
              <Text style={styles.membershipLevel}>Gold</Text>
            </View>
          </View>
        </View>

        {/* Logout Button */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.logoutButton} 
            onPress={handleLogout}
            activeOpacity={0.8}
          >
            <LogOut size={20} color="#F44336" />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>

        {/* App Version */}
        <View style={styles.footer}>
          <Text style={styles.versionText}>Swift Assist v1.0.0</Text>
          <Text style={styles.footerText}>Made with ❤️ in Kenya</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 10,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#2D7D32',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333333',
  },
  profileEmail: {
    fontSize: 14,
    color: '#666666',
    marginTop: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 4,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D7D32',
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 16,
  },
  menuItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemText: {
    fontSize: 16,
    color: '#333333',
    marginLeft: 12,
    fontWeight: '500',
  },
  membershipCard: {
    backgroundColor: '#FFF8E1',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFD54F',
  },
  membershipInfo: {
    flex: 1,
  },
  membershipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  membershipSince: {
    fontSize: 14,
    color: '#666666',
    marginTop: 2,
  },
  membershipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  membershipLevel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginLeft: 4,
  },
  logoutButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFEBEE',
  },
  logoutText: {
    fontSize: 16,
    color: '#F44336',
    fontWeight: '600',
    marginLeft: 8,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 12,
    color: '#999999',
  },
  footerText: {
    fontSize: 12,
    color: '#999999',
    marginTop: 4,
  },
});