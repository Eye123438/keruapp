import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CreditCard, Smartphone, DollarSign, History, Plus, Wallet } from 'lucide-react-native';

interface PaymentMethod {
  id: string;
  type: 'mpesa' | 'card' | 'cash';
  name: string;
  details: string;
  icon: React.ReactNode;
  isDefault?: boolean;
}

interface Transaction {
  id: string;
  service: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  paymentMethod: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: '1',
    type: 'mpesa',
    name: 'M-Pesa',
    details: '254 712 345 678',
    icon: <Smartphone size={24} color="#00C853" />,
    isDefault: true,
  },
  {
    id: '2',
    type: 'card',
    name: 'Visa Card',
    details: '**** **** **** 1234',
    icon: <CreditCard size={24} color="#1976D2" />,
  },
  {
    id: '3',
    type: 'cash',
    name: 'Cash on Delivery',
    details: 'Pay when service is completed',
    icon: <DollarSign size={24} color="#FF8F00" />,
  },
];

const transactions: Transaction[] = [
  {
    id: '1',
    service: 'Grocery Shopping',
    amount: 2500,
    date: '2024-01-15',
    status: 'completed',
    paymentMethod: 'M-Pesa',
  },
  {
    id: '2',
    service: 'Document Pickup',
    amount: 500,
    date: '2024-01-14',
    status: 'completed',
    paymentMethod: 'Cash',
  },
  {
    id: '3',
    service: 'Prescription Collection',
    amount: 1200,
    date: '2024-01-13',
    status: 'pending',
    paymentMethod: 'M-Pesa',
  },
];

export default function PaymentsScreen() {
  const [selectedMethod, setSelectedMethod] = useState('1');

  const formatAmount = (amount: number) => {
    return `KSh ${amount.toLocaleString()}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#4CAF50';
      case 'pending': return '#FF8F00';
      case 'failed': return '#F44336';
      default: return '#666666';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Payment Methods</Text>
          <Text style={styles.headerSubtitle}>Manage your payment options</Text>
        </View>

        {/* Wallet Balance */}
        <View style={styles.section}>
          <View style={styles.walletCard}>
            <View style={styles.walletHeader}>
              <Wallet size={28} color="#2D7D32" />
              <Text style={styles.walletTitle}>Swift Assist Wallet</Text>
            </View>
            <Text style={styles.walletBalance}>KSh 1,500.00</Text>
            <TouchableOpacity style={styles.topUpButton} activeOpacity={0.8}>
              <Plus size={16} color="#FFFFFF" />
              <Text style={styles.topUpText}>Top Up</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Payment Methods */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Payment Methods</Text>
            <TouchableOpacity style={styles.addButton} activeOpacity={0.8}>
              <Plus size={16} color="#2D7D32" />
              <Text style={styles.addText}>Add New</Text>
            </TouchableOpacity>
          </View>

          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.paymentCard,
                selectedMethod === method.id && styles.selectedPaymentCard,
                method.isDefault && styles.defaultCard
              ]}
              onPress={() => setSelectedMethod(method.id)}
              activeOpacity={0.8}
            >
              <View style={styles.paymentInfo}>
                <View style={styles.paymentIcon}>
                  {method.icon}
                </View>
                <View style={styles.paymentDetails}>
                  <View style={styles.paymentNameRow}>
                    <Text style={styles.paymentName}>{method.name}</Text>
                    {method.isDefault && (
                      <View style={styles.defaultBadge}>
                        <Text style={styles.defaultText}>Default</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.paymentDetailsText}>{method.details}</Text>
                </View>
              </View>
              <View style={[
                styles.radioButton,
                selectedMethod === method.id && styles.selectedRadio
              ]} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Transaction History */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Transaction History</Text>
            <TouchableOpacity activeOpacity={0.8}>
              <History size={20} color="#2D7D32" />
            </TouchableOpacity>
          </View>

          {transactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionCard}>
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionService}>{transaction.service}</Text>
                <Text style={styles.transactionMethod}>{transaction.paymentMethod}</Text>
              </View>
              <View style={styles.transactionRight}>
                <Text style={styles.transactionAmount}>
                  {formatAmount(transaction.amount)}
                </Text>
                <View style={styles.transactionStatus}>
                  <View
                    style={[
                      styles.statusDot,
                      { backgroundColor: getStatusColor(transaction.status) }
                    ]}
                  />
                  <Text
                    style={[
                      styles.statusText,
                      { color: getStatusColor(transaction.status) }
                    ]}
                  >
                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* M-Pesa Integration Info */}
        <View style={styles.section}>
          <View style={styles.infoCard}>
            <Smartphone size={24} color="#00C853" />
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>M-Pesa Integration</Text>
              <Text style={styles.infoText}>
                Secure payments through Safaricom M-Pesa. No card details required.
              </Text>
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333333',
  },
  walletCard: {
    backgroundColor: '#E8F5E8',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  walletHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  walletTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D7D32',
    marginLeft: 8,
  },
  walletBalance: {
    fontSize: 32,
    fontWeight: '700',
    color: '#2D7D32',
    marginBottom: 16,
  },
  topUpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2D7D32',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  topUpText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 8,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addText: {
    color: '#2D7D32',
    fontWeight: '600',
    marginLeft: 4,
  },
  paymentCard: {
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
  selectedPaymentCard: {
    borderColor: '#2D7D32',
  },
  defaultCard: {
    backgroundColor: '#F0F8F0',
  },
  paymentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  paymentIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  paymentDetails: {
    flex: 1,
  },
  paymentNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginRight: 8,
  },
  defaultBadge: {
    backgroundColor: '#2D7D32',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  defaultText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  paymentDetailsText: {
    fontSize: 14,
    color: '#666666',
    marginTop: 2,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  selectedRadio: {
    backgroundColor: '#2D7D32',
    borderColor: '#2D7D32',
  },
  transactionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionInfo: {
    flex: 1,
  },
  transactionService: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  transactionMethod: {
    fontSize: 14,
    color: '#666666',
    marginTop: 2,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  transactionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  infoText: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
    lineHeight: 20,
  },
});