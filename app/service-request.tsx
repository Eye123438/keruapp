import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, MapPin, Clock, DollarSign, Plus, Minus } from 'lucide-react-native';

interface ServiceRequest {
  category: string;
  title: string;
  description: string;
  pickupAddress: string;
  deliveryAddress: string;
  preferredTime: string;
  estimatedCost: number;
  urgency: 'normal' | 'urgent' | 'express';
}

const urgencyOptions = [
  { id: 'normal', label: 'Normal', time: '2-4 hours', multiplier: 1 },
  { id: 'urgent', label: 'Urgent', time: '1-2 hours', multiplier: 1.5 },
  { id: 'express', label: 'Express', time: '30-60 mins', multiplier: 2 },
];

const serviceCategories = {
  shopping: { title: 'Shopping & Delivery', baseCost: 500 },
  business: { title: 'Business & Office', baseCost: 300 },
  household: { title: 'Household Support', baseCost: 400 },
  student: { title: 'Student Support', baseCost: 200 },
  personal: { title: 'Personal Errands', baseCost: 350 },
};

export default function ServiceRequestScreen() {
  const { category } = useLocalSearchParams<{ category: string }>();
  const [request, setRequest] = useState<ServiceRequest>({
    category: category || 'shopping',
    title: '',
    description: '',
    pickupAddress: '',
    deliveryAddress: '',
    preferredTime: '',
    estimatedCost: 0,
    urgency: 'normal',
  });

  const categoryInfo = serviceCategories[request.category as keyof typeof serviceCategories];
  const urgencyInfo = urgencyOptions.find(opt => opt.id === request.urgency);

  React.useEffect(() => {
    const baseCost = categoryInfo?.baseCost || 500;
    const multiplier = urgencyInfo?.multiplier || 1;
    setRequest(prev => ({
      ...prev,
      estimatedCost: Math.round(baseCost * multiplier),
    }));
  }, [request.urgency, categoryInfo]);

  const handleSubmit = () => {
    if (!request.title.trim() || !request.pickupAddress.trim() || !request.deliveryAddress.trim()) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }

    Alert.alert(
      'Request Submitted',
      'Your service request has been submitted. You will be notified when a rider accepts your request.',
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  const updateUrgency = (urgencyId: string) => {
    setRequest(prev => ({ ...prev, urgency: urgencyId as 'normal' | 'urgent' | 'express' }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
          activeOpacity={0.8}
        >
          <ArrowLeft size={24} color="#333333" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Request Service</Text>
          <Text style={styles.headerSubtitle}>{categoryInfo?.title}</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* Service Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Service Details</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Service Title *</Text>
            <TextInput
              style={styles.input}
              placeholder="What do you need help with?"
              value={request.title}
              onChangeText={(text) => setRequest(prev => ({ ...prev, title: text }))}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Provide additional details about your request..."
              value={request.description}
              onChangeText={(text) => setRequest(prev => ({ ...prev, description: text }))}
              multiline
              numberOfLines={4}
            />
          </View>
        </View>

        {/* Location Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location Details</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Pickup Address *</Text>
            <View style={styles.addressInput}>
              <MapPin size={20} color="#666666" />
              <TextInput
                style={styles.addressTextInput}
                placeholder="Enter pickup location"
                value={request.pickupAddress}
                onChangeText={(text) => setRequest(prev => ({ ...prev, pickupAddress: text }))}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Delivery Address *</Text>
            <View style={styles.addressInput}>
              <MapPin size={20} color="#666666" />
              <TextInput
                style={styles.addressTextInput}
                placeholder="Enter delivery location"
                value={request.deliveryAddress}
                onChangeText={(text) => setRequest(prev => ({ ...prev, deliveryAddress: text }))}
              />
            </View>
          </View>
        </View>

        {/* Urgency Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Service Priority</Text>
          {urgencyOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.urgencyOption,
                request.urgency === option.id && styles.selectedUrgency
              ]}
              onPress={() => updateUrgency(option.id)}
              activeOpacity={0.8}
            >
              <View style={styles.urgencyInfo}>
                <Text style={[
                  styles.urgencyLabel,
                  request.urgency === option.id && styles.selectedUrgencyText
                ]}>
                  {option.label}
                </Text>
                <Text style={styles.urgencyTime}>{option.time}</Text>
              </View>
              <Text style={[
                styles.urgencyMultiplier,
                request.urgency === option.id && styles.selectedUrgencyText
              ]}>
                {option.multiplier === 1 ? 'Standard' : `${option.multiplier}x cost`}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Time Preference */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferred Time (Optional)</Text>
          <View style={styles.inputContainer}>
            <View style={styles.timeInput}>
              <Clock size={20} color="#666666" />
              <TextInput
                style={styles.timeTextInput}
                placeholder="e.g., Before 3 PM, ASAP, etc."
                value={request.preferredTime}
                onChangeText={(text) => setRequest(prev => ({ ...prev, preferredTime: text }))}
              />
            </View>
          </View>
        </View>

        {/* Cost Estimate */}
        <View style={styles.section}>
          <View style={styles.costCard}>
            <View style={styles.costHeader}>
              <DollarSign size={24} color="#2D7D32" />
              <Text style={styles.costTitle}>Estimated Cost</Text>
            </View>
            <Text style={styles.costAmount}>KSh {request.estimatedCost.toLocaleString()}</Text>
            <Text style={styles.costNote}>
              Final cost may vary based on actual service requirements
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Submit Button */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.submitButton} 
          onPress={handleSubmit}
          activeOpacity={0.8}
        >
          <Text style={styles.submitText}>Submit Request</Text>
        </TouchableOpacity>
      </View>
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333333',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  addressInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  addressTextInput: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
    marginLeft: 12,
  },
  timeInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  timeTextInput: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
    marginLeft: 12,
  },
  urgencyOption: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedUrgency: {
    borderColor: '#2D7D32',
    backgroundColor: '#F0F8F0',
  },
  urgencyInfo: {
    flex: 1,
  },
  urgencyLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  urgencyTime: {
    fontSize: 14,
    color: '#666666',
    marginTop: 2,
  },
  urgencyMultiplier: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
  },
  selectedUrgencyText: {
    color: '#2D7D32',
  },
  costCard: {
    backgroundColor: '#E8F5E8',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  costHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  costTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D7D32',
    marginLeft: 8,
  },
  costAmount: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2D7D32',
    marginBottom: 8,
  },
  costNote: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 16,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  submitButton: {
    backgroundColor: '#2D7D32',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});