import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MessageCircle, Phone, Mail, CircleHelp as HelpCircle, Send, Star, Clock } from 'lucide-react-native';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface SupportMessage {
  id: string;
  message: string;
  timestamp: string;
  isUser: boolean;
  status?: 'sent' | 'delivered' | 'read';
}

const faqs: FAQ[] = [
  {
    id: '1',
    question: 'How do I track my errand?',
    answer: 'You can track your errand in real-time using the Track tab. You\'ll receive notifications at each step of the process.',
    category: 'tracking',
  },
  {
    id: '2',
    question: 'What payment methods do you accept?',
    answer: 'We accept M-Pesa, Visa/Mastercard, and cash on delivery. M-Pesa is our most popular option.',
    category: 'payment',
  },
  {
    id: '3',
    question: 'How much does delivery cost?',
    answer: 'Delivery costs vary based on distance and service type. You\'ll see the exact cost before confirming your request.',
    category: 'pricing',
  },
  {
    id: '4',
    question: 'What if my rider is delayed?',
    answer: 'If there are any delays, you\'ll receive automatic notifications. You can also chat with your rider directly through the app.',
    category: 'service',
  },
];

const chatMessages: SupportMessage[] = [
  {
    id: '1',
    message: 'Hello! How can we help you today?',
    timestamp: '10:30 AM',
    isUser: false,
  },
  {
    id: '2',
    message: 'I have a question about my recent order',
    timestamp: '10:32 AM',
    isUser: true,
    status: 'read',
  },
  {
    id: '3',
    message: 'I\'d be happy to help! Can you share your order number?',
    timestamp: '10:33 AM',
    isUser: false,
  },
];

export default function SupportScreen() {
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [activeTab, setActiveTab] = useState<'help' | 'chat' | 'contact'>('help');

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const sendMessage = () => {
    if (chatInput.trim()) {
      // Here you would typically send the message to your backend
      console.log('Sending message:', chatInput);
      setChatInput('');
    }
  };

  const renderHelpTab = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        {faqs.map((faq) => (
          <TouchableOpacity
            key={faq.id}
            style={styles.faqCard}
            onPress={() => toggleFAQ(faq.id)}
            activeOpacity={0.8}
          >
            <View style={styles.faqHeader}>
              <Text style={styles.faqQuestion}>{faq.question}</Text>
              <HelpCircle 
                size={20} 
                color={expandedFAQ === faq.id ? '#2D7D32' : '#666666'} 
              />
            </View>
            {expandedFAQ === faq.id && (
              <View style={styles.faqAnswer}>
                <Text style={styles.faqAnswerText}>{faq.answer}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickActionCard} activeOpacity={0.8}>
            <Clock size={24} color="#FF8F00" />
            <Text style={styles.quickActionText}>Report Delay</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionCard} activeOpacity={0.8}>
            <Star size={24} color="#FFD700" />
            <Text style={styles.quickActionText}>Rate Service</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );

  const renderChatTab = () => (
    <View style={styles.chatContainer}>
      <ScrollView style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
        {chatMessages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageCard,
              message.isUser ? styles.userMessage : styles.supportMessage
            ]}
          >
            <Text style={[
              styles.messageText,
              message.isUser ? styles.userMessageText : styles.supportMessageText
            ]}>
              {message.message}
            </Text>
            <Text style={styles.messageTime}>{message.timestamp}</Text>
          </View>
        ))}
      </ScrollView>
      
      <View style={styles.chatInput}>
        <TextInput
          style={styles.messageInput}
          placeholder="Type your message..."
          value={chatInput}
          onChangeText={setChatInput}
          multiline
        />
        <TouchableOpacity 
          style={styles.sendButton} 
          onPress={sendMessage}
          activeOpacity={0.8}
        >
          <Send size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderContactTab = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        
        <TouchableOpacity style={styles.contactCard} activeOpacity={0.8}>
          <View style={styles.contactIcon}>
            <Phone size={24} color="#2D7D32" />
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactTitle}>Phone Support</Text>
            <Text style={styles.contactDetail}>+254 712 345 678</Text>
            <Text style={styles.contactHours}>Mon-Fri: 8AM-6PM</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactCard} activeOpacity={0.8}>
          <View style={styles.contactIcon}>
            <Mail size={24} color="#1976D2" />
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactTitle}>Email Support</Text>
            <Text style={styles.contactDetail}>support@swiftassist.co.ke</Text>
            <Text style={styles.contactHours}>24/7 Response</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactCard} activeOpacity={0.8}>
          <View style={styles.contactIcon}>
            <MessageCircle size={24} color="#FF8F00" />
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactTitle}>Live Chat</Text>
            <Text style={styles.contactDetail}>Instant messaging support</Text>
            <Text style={styles.contactHours}>Available now</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Office Location</Text>
        <View style={styles.locationCard}>
          <Text style={styles.locationTitle}>Swift Assist Kerugoya</Text>
          <Text style={styles.locationAddress}>
            Town Center Building, 2nd Floor{'\n'}
            Kerugoya, Kirinyaga County{'\n'}
            Kenya
          </Text>
        </View>
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Support Center</Text>
        <Text style={styles.headerSubtitle}>We're here to help you 24/7</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'help' && styles.activeTab]}
          onPress={() => setActiveTab('help')}
          activeOpacity={0.8}
        >
          <HelpCircle size={20} color={activeTab === 'help' ? '#FFFFFF' : '#666666'} />
          <Text style={[styles.tabText, activeTab === 'help' && styles.activeTabText]}>
            Help
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'chat' && styles.activeTab]}
          onPress={() => setActiveTab('chat')}
          activeOpacity={0.8}
        >
          <MessageCircle size={20} color={activeTab === 'chat' ? '#FFFFFF' : '#666666'} />
          <Text style={[styles.tabText, activeTab === 'chat' && styles.activeTabText]}>
            Chat
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'contact' && styles.activeTab]}
          onPress={() => setActiveTab('contact')}
          activeOpacity={0.8}
        >
          <Phone size={20} color={activeTab === 'contact' ? '#FFFFFF' : '#666666'} />
          <Text style={[styles.tabText, activeTab === 'contact' && styles.activeTabText]}>
            Contact
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {activeTab === 'help' && renderHelpTab()}
        {activeTab === 'chat' && renderChatTab()}
        {activeTab === 'contact' && renderContactTab()}
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
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 25,
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: '#2D7D32',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
    marginLeft: 8,
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingTop: 10,
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
  faqCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    flex: 1,
    marginRight: 12,
  },
  faqAnswer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  faqAnswerText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 8,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginTop: 8,
    textAlign: 'center',
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  messagesContainer: {
    flex: 1,
    marginBottom: 20,
  },
  messageCard: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#2D7D32',
  },
  supportMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  messageText: {
    fontSize: 14,
    lineHeight: 18,
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  supportMessageText: {
    color: '#333333',
  },
  messageTime: {
    fontSize: 11,
    color: '#999999',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  chatInput: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  messageInput: {
    flex: 1,
    maxHeight: 100,
    fontSize: 14,
    color: '#333333',
    paddingVertical: 8,
  },
  sendButton: {
    backgroundColor: '#2D7D32',
    borderRadius: 20,
    padding: 8,
    marginLeft: 8,
  },
  contactCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  contactDetail: {
    fontSize: 14,
    color: '#2D7D32',
    fontWeight: '500',
    marginTop: 2,
  },
  contactHours: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
  locationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  locationAddress: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
});