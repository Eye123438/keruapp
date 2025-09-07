import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ShoppingBag, Briefcase, Chrome as HomeIcon, GraduationCap, User } from 'lucide-react-native';
import { router } from 'expo-router';

interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const serviceCategories: ServiceCategory[] = [
  {
    id: 'shopping',
    title: 'Shopping & Delivery',
    description: 'Groceries, food, and package pickup',
    icon: <ShoppingBag size={32} color="#FFFFFF" />,
    color: '#2D7D32',
  },
  {
    id: 'business',
    title: 'Business & Office',
    description: 'Documents, meetings, office errands',
    icon: <Briefcase size={32} color="#FFFFFF" />,
    color: '#1976D2',
  },
  {
    id: 'household',
    title: 'Household Support',
    description: 'Bills, laundry, gas, prescriptions',
    icon: <HomeIcon size={32} color="#FFFFFF" />,
    color: '#FF8F00',
  },
  {
    id: 'student',
    title: 'Student Support',
    description: 'Assignments, stationery, printing',
    icon: <GraduationCap size={32} color="#FFFFFF" />,
    color: '#7B1FA2',
  },
  {
    id: 'personal',
    title: 'Personal Errands',
    description: 'Tickets, airtime, parcels',
    icon: <User size={32} color="#FFFFFF" />,
    color: '#E64A19',
  },
];

export default function HomeScreen() {
  const handleServiceSelect = (categoryId: string) => {
    router.push(`/service-request?category=${categoryId}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning!</Text>
            <Text style={styles.tagline}>Your errands, done fast.</Text>
          </View>
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>SA</Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>In Progress</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>4.9</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>

        {/* Service Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose a Service</Text>
          <View style={styles.categoriesGrid}>
            {serviceCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[styles.categoryCard, { backgroundColor: category.color }]}
                onPress={() => handleServiceSelect(category.id)}
                activeOpacity={0.8}
              >
                <View style={styles.categoryIcon}>
                  {category.icon}
                </View>
                <Text style={styles.categoryTitle}>{category.title}</Text>
                <Text style={styles.categoryDescription}>{category.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityCard}>
            <View style={styles.activityIcon}>
              <ShoppingBag size={20} color="#2D7D32" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Grocery Shopping</Text>
              <Text style={styles.activityDescription}>Delivered to your doorstep</Text>
            </View>
            <View style={styles.activityStatus}>
              <Text style={styles.completedText}>Completed</Text>
            </View>
          </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333333',
  },
  tagline: {
    fontSize: 14,
    color: '#666666',
    marginTop: 2,
  },
  logoContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#2D7D32',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
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
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
  },
  categoryIcon: {
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 16,
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F5E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  activityDescription: {
    fontSize: 14,
    color: '#666666',
    marginTop: 2,
  },
  activityStatus: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#E8F5E8',
  },
  completedText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2D7D32',
  },
});