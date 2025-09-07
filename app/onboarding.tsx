import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Smartphone, Mail, Eye, EyeOff, CircleCheck as CheckCircle } from 'lucide-react-native';

interface AuthForm {
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
}

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'signup' | 'login'>('welcome');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState<AuthForm>({
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
  });

  const handleSignUp = () => {
    if (!form.fullName.trim() || !form.phone.trim() || !form.email.trim() || !form.password.trim()) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match.');
      return;
    }

    if (form.password.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters long.');
      return;
    }

    // Here you would typically call your authentication API
    Alert.alert(
      'Welcome to Swift Assist!',
      'Your account has been created successfully.',
      [{ text: 'Get Started', onPress: () => router.replace('/(tabs)') }]
    );
  };

  const handleLogin = () => {
    if (!form.email.trim() || !form.password.trim()) {
      Alert.alert('Missing Information', 'Please enter your email and password.');
      return;
    }

    // Here you would typically call your authentication API
    Alert.alert(
      'Welcome Back!',
      'You have been logged in successfully.',
      [{ text: 'Continue', onPress: () => router.replace('/(tabs)') }]
    );
  };

  const handleGoogleSignIn = () => {
    // Here you would integrate with Google Sign-In
    Alert.alert(
      'Google Sign-In',
      'Google sign-in integration would be implemented here.',
      [{ text: 'OK', onPress: () => router.replace('/(tabs)') }]
    );
  };

  const renderWelcomeScreen = () => (
    <View style={styles.welcomeContainer}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>Swift Assist</Text>
        <Text style={styles.tagline}>Your errands, done fast.</Text>
      </View>
      
      <View style={styles.featuresContainer}>
        <View style={styles.feature}>
          <CheckCircle size={24} color="#2D7D32" />
          <Text style={styles.featureText}>Quick & reliable service</Text>
        </View>
        <View style={styles.feature}>
          <CheckCircle size={24} color="#2D7D32" />
          <Text style={styles.featureText}>Real-time tracking</Text>
        </View>
        <View style={styles.feature}>
          <CheckCircle size={24} color="#2D7D32" />
          <Text style={styles.featureText}>Secure M-Pesa payments</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.primaryButton} 
          onPress={() => setCurrentStep('signup')}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>Get Started</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.secondaryButton} 
          onPress={() => setCurrentStep('login')}
          activeOpacity={0.8}
        >
          <Text style={styles.secondaryButtonText}>I have an account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSignUpScreen = () => (
    <View style={styles.formContainer}>
      <View style={styles.formHeader}>
        <Text style={styles.formTitle}>Create Account</Text>
        <Text style={styles.formSubtitle}>Join Swift Assist and get things done faster</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          value={form.fullName}
          onChangeText={(text) => setForm(prev => ({ ...prev, fullName: text }))}
          autoCapitalize="words"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <View style={styles.phoneInput}>
          <Smartphone size={20} color="#666666" />
          <TextInput
            style={styles.phoneTextInput}
            placeholder="+254 712 345 678"
            value={form.phone}
            onChangeText={(text) => setForm(prev => ({ ...prev, phone: text }))}
            keyboardType="phone-pad"
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email Address</Text>
        <View style={styles.emailInput}>
          <Mail size={20} color="#666666" />
          <TextInput
            style={styles.emailTextInput}
            placeholder="your.email@example.com"
            value={form.email}
            onChangeText={(text) => setForm(prev => ({ ...prev, email: text }))}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordInput}>
          <TextInput
            style={styles.passwordTextInput}
            placeholder="Create a strong password"
            value={form.password}
            onChangeText={(text) => setForm(prev => ({ ...prev, password: text }))}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} activeOpacity={0.8}>
            {showPassword ? <EyeOff size={20} color="#666666" /> : <Eye size={20} color="#666666" />}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.passwordInput}>
          <TextInput
            style={styles.passwordTextInput}
            placeholder="Confirm your password"
            value={form.confirmPassword}
            onChangeText={(text) => setForm(prev => ({ ...prev, confirmPassword: text }))}
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} activeOpacity={0.8}>
            {showConfirmPassword ? <EyeOff size={20} color="#666666" /> : <Eye size={20} color="#666666" />}
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.primaryButton} 
        onPress={handleSignUp}
        activeOpacity={0.8}
      >
        <Text style={styles.primaryButtonText}>Create Account</Text>
      </TouchableOpacity>

      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>or</Text>
        <View style={styles.dividerLine} />
      </View>

      <TouchableOpacity 
        style={styles.googleButton} 
        onPress={handleGoogleSignIn}
        activeOpacity={0.8}
      >
        <Text style={styles.googleButtonText}>Continue with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.switchButton} 
        onPress={() => setCurrentStep('login')}
        activeOpacity={0.8}
      >
        <Text style={styles.switchButtonText}>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );

  const renderLoginScreen = () => (
    <View style={styles.formContainer}>
      <View style={styles.formHeader}>
        <Text style={styles.formTitle}>Welcome Back</Text>
        <Text style={styles.formSubtitle}>Sign in to your Swift Assist account</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email Address</Text>
        <View style={styles.emailInput}>
          <Mail size={20} color="#666666" />
          <TextInput
            style={styles.emailTextInput}
            placeholder="your.email@example.com"
            value={form.email}
            onChangeText={(text) => setForm(prev => ({ ...prev, email: text }))}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordInput}>
          <TextInput
            style={styles.passwordTextInput}
            placeholder="Enter your password"
            value={form.password}
            onChangeText={(text) => setForm(prev => ({ ...prev, password: text }))}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} activeOpacity={0.8}>
            {showPassword ? <EyeOff size={20} color="#666666" /> : <Eye size={20} color="#666666" />}
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.forgotPassword} activeOpacity={0.8}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.primaryButton} 
        onPress={handleLogin}
        activeOpacity={0.8}
      >
        <Text style={styles.primaryButtonText}>Sign In</Text>
      </TouchableOpacity>

      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>or</Text>
        <View style={styles.dividerLine} />
      </View>

      <TouchableOpacity 
        style={styles.googleButton} 
        onPress={handleGoogleSignIn}
        activeOpacity={0.8}
      >
        <Text style={styles.googleButtonText}>Continue with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.switchButton} 
        onPress={() => setCurrentStep('signup')}
        activeOpacity={0.8}
      >
        <Text style={styles.switchButtonText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {currentStep === 'welcome' && renderWelcomeScreen()}
      {currentStep === 'signup' && renderSignUpScreen()}
      {currentStep === 'login' && renderLoginScreen()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  welcomeContainer: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logo: {
    fontSize: 36,
    fontWeight: '700',
    color: '#2D7D32',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  featuresContainer: {
    marginBottom: 60,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  featureText: {
    fontSize: 16,
    color: '#333333',
    marginLeft: 12,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 60,
  },
  formHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  formTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 8,
  },
  formSubtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#333333',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  phoneInput: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  phoneTextInput: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
    marginLeft: 12,
  },
  emailInput: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  emailTextInput: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
    marginLeft: 12,
  },
  passwordInput: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  passwordTextInput: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#2D7D32',
    fontWeight: '600',
  },
  buttonContainer: {
    marginTop: 40,
  },
  primaryButton: {
    backgroundColor: '#2D7D32',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  secondaryButton: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    fontSize: 14,
    color: '#666666',
    paddingHorizontal: 16,
  },
  googleButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 30,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  switchButton: {
    alignItems: 'center',
  },
  switchButtonText: {
    fontSize: 14,
    color: '#2D7D32',
    fontWeight: '600',
  },
});