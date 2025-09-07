import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Clock, CircleCheck as CheckCircle, Truck, Package } from 'lucide-react-native';

interface TrackingItem {
  id: string;
  service: string;
  status: 'pending' | 'accepted' | 'in-progress' | 'completed';
  estimatedTime: string;
  location: string;
  rider?: string;
}

const trackingData: TrackingItem[] = [
  {
    id: '1',
    service: 'Grocery Shopping',
    status: 'in-progress',
    estimatedTime: '20 mins',
    location: 'Kerugoya Market',
    rider: 'John Kamau',
  },
  {
    id: '2',
    service: 'Document Pickup',
    status: 'accepted',
    estimatedTime: '45 mins',
    location: 'County Offices',
    rider: 'Mary Wanjiku',
  },
  {
    id: '3',
    service: 'Prescription Collection',
    status: 'completed',
    estimatedTime: 'Completed',
    location: 'Kerugoya Hospital',
    rider: 'Peter Mwangi',
  },
];

const statusConfig = {
  pending: { color: '#FF8F00', icon: Clock, text: 'Pending' },
  accepted: { color: '#1976D2', icon: Package, text: 'Accepted' },
  'in-progress': { color: '#2D7D32', icon: Truck, text: 'In Progress' },
  completed: { color: '#4CAF50', icon: CheckCircle, text: 'Completed' },
};

export default function TrackingScreen() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const getStatusInfo = (status: string) => {
    return statusConfig[status as keyof typeof statusConfig];
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Track Your Errands</Text>
          <Text style={styles.headerSubtitle}>Real-time updates on your requests</Text>
        </View>

        {/* Active Tracking Card */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Active Errands</Text>
          {trackingData
            .filter(item => item.status !== 'completed')
            .map((item) => {
              const statusInfo = getStatusInfo(item.status);
              const StatusIcon = statusInfo.icon;

              return (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.trackingCard,
                    selectedItem === item.id && styles.selectedCard
                  ]}
                  onPress={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
                  activeOpacity={0.8}
                >
                  <View style={styles.cardHeader}>
                    <View style={styles.serviceInfo}>
                      <Text style={styles.serviceName}>{item.service}</Text>
                      <Text style={styles.riderName}>Rider: {item.rider}</Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: statusInfo.color }]}>
                      <StatusIcon size={16} color="#FFFFFF" />
                      <Text style={styles.statusText}>{statusInfo.text}</Text>
                    </View>
                  </View>

                  <View style={styles.locationInfo}>
                    <MapPin size={16} color="#666666" />
                    <Text style={styles.locationText}>{item.location}</Text>
                  </View>

                  <View style={styles.timeInfo}>
                    <Clock size={16} color="#666666" />
                    <Text style={styles.timeText}>ETA: {item.estimatedTime}</Text>
                  </View>

                  {selectedItem === item.id && (
                    <View style={styles.expandedInfo}>
                      <View style={styles.progressSteps}>
                        <View style={[styles.step, styles.activeStep]}>
                          <View style={styles.stepIcon}>
                            <CheckCircle size={12} color="#FFFFFF" />
                          </View>
                          <Text style={styles.stepText}>Request Placed</Text>
                        </View>
                        <View style={[styles.step, styles.activeStep]}>
                          <View style={styles.stepIcon}>
                            <CheckCircle size={12} color="#FFFFFF" />
                          </View>
                          <Text style={styles.stepText}>Rider Assigned</Text>
                        </View>
                        <View style={[styles.step, item.status === 'in-progress' ? styles.activeStep : styles.inactiveStep]}>
                          <View style={styles.stepIcon}>
                            {item.status === 'in-progress' ? 
                              <Truck size={12} color="#FFFFFF" /> : 
                              <Clock size={12} color="#999999" />
                            }
                          </View>
                          <Text style={[styles.stepText, item.status !== 'in-progress' && styles.inactiveText]}>
                            En Route
                          </Text>
                        </View>
                        <View style={styles.inactiveStep}>
                          <View style={styles.stepIcon}>
                            <Package size={12} color="#999999" />
                          </View>
                          <Text style={[styles.stepText, styles.inactiveText]}>Delivered</Text>
                        </View>
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
        </View>

        {/* Completed Orders */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Completions</Text>
          {trackingData
            .filter(item => item.status === 'completed')
            .map((item) => {
              const statusInfo = getStatusInfo(item.status);
              const StatusIcon = statusInfo.icon;

              return (
                <View key={item.id} style={styles.completedCard}>
                  <View style={styles.cardHeader}>
                    <View style={styles.serviceInfo}>
                      <Text style={styles.serviceName}>{item.service}</Text>
                      <Text style={styles.riderName}>Completed by: {item.rider}</Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: statusInfo.color }]}>
                      <StatusIcon size={16} color="#FFFFFF" />
                      <Text style={styles.statusText}>{statusInfo.text}</Text>
                    </View>
                  </View>
                  <View style={styles.locationInfo}>
                    <MapPin size={16} color="#666666" />
                    <Text style={styles.locationText}>{item.location}</Text>
                  </View>
                </View>
              );
            })}
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
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333333',
  },
  headerSubtitle: {
    fontSize: 14,
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
  trackingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCard: {
    borderColor: '#2D7D32',
  },
  completedCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    opacity: 0.8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  riderName: {
    fontSize: 14,
    color: '#666666',
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 8,
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 8,
    fontWeight: '500',
  },
  expandedInfo: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  progressSteps: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  step: {
    alignItems: 'center',
    flex: 1,
  },
  activeStep: {},
  inactiveStep: {},
  stepIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#2D7D32',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  stepText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#333333',
    textAlign: 'center',
  },
  inactiveText: {
    color: '#999999',
  },
});