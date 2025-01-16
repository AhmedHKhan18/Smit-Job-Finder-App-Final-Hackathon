import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function ForgotPassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [strength, setStrength] = useState(0);
  const [showRules, setShowRules] = useState(false);

  const buttonScale = new Animated.Value(1);
  const successOpacity = new Animated.Value(0);

  const passwordRules = [
    { rule: 'At least 8 characters', met: newPassword.length >= 8 },
    { rule: 'Contains uppercase letter', met: /[A-Z]/.test(newPassword) },
    { rule: 'Contains number', met: /[0-9]/.test(newPassword) },
    { rule: 'Contains special character', met: /[!@#$%^&*]/.test(newPassword) },
  ];

  const calculateStrength = (password: string) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[!@#$%^&*]/.test(password)) score++;
    setStrength(score);
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }

    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(successOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    router.back();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Change Password</Text>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Enter Current Password"
            secureTextEntry={!showCurrent}
            value={currentPassword}
            onChangeText={setCurrentPassword}
            placeholderTextColor="#999"
          />
          <TouchableOpacity 
            onPress={() => setShowCurrent(!showCurrent)}
            style={styles.eyeIcon}
          >
            <Ionicons 
              name={showCurrent ? "eye-outline" : "eye-off-outline"} 
              size={20} 
              color="#999" 
            />
          </TouchableOpacity>
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Enter New Password"
            secureTextEntry={!showNew}
            value={newPassword}
            onChangeText={(text) => {
              setNewPassword(text);
              calculateStrength(text);
            }}
            onFocus={() => setShowRules(true)}
            placeholderTextColor="#999"
          />
          <TouchableOpacity 
            onPress={() => setShowNew(!showNew)}
            style={styles.eyeIcon}
          >
            <Ionicons 
              name={showNew ? "eye-outline" : "eye-off-outline"} 
              size={20} 
              color="#999" 
            />
          </TouchableOpacity>
        </View>

        {showRules && (
          <View style={styles.rulesContainer}>
            {passwordRules.map((item, index) => (
              <View key={index} style={styles.ruleItem}>
                <Ionicons 
                  name={item.met ? "checkmark-circle" : "circle-outline" as any} 
                  size={16} 
                  color={item.met ? "#4CAF50" : "#999"} 
                />
                <Text style={[styles.ruleText, item.met && styles.ruleMet]}>
                  {item.rule}
                </Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.strengthContainer}>
          {[...Array(4)].map((_, index) => (
            <View 
              key={index}
              style={[
                styles.strengthBar,
                index < strength && styles.strengthActive,
                index < strength && { backgroundColor: 
                  strength === 1 ? '#FF6B6B' :
                  strength === 2 ? '#FFD93D' :
                  strength === 3 ? '#6BCB77' :
                  strength === 4 ? '#4D96FF' : '#e0e0e0'
                }
              ]}
            />
          ))}
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Confirm New Password"
            secureTextEntry={!showConfirm}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholderTextColor="#999"
          />
          <TouchableOpacity 
            onPress={() => setShowConfirm(!showConfirm)}
            style={styles.eyeIcon}
          >
            <Ionicons 
              name={showConfirm ? "eye-outline" : "eye-off-outline"} 
              size={20} 
              color="#999" 
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        onPress={handleChangePassword}
        activeOpacity={0.8}
      >
        <Animated.View style={[
          styles.button,
          { transform: [{ scale: buttonScale }] }
        ]}>
          <LinearGradient
            colors={['#10B981', '#10B981']}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.buttonText}>Change Password</Text>
          </LinearGradient>
        </Animated.View>
      </TouchableOpacity>

      <Animated.View style={[styles.successMessage, { opacity: successOpacity }]}>
        <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
        <Text style={styles.successText}>Password changed successfully!</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECFDF5',
    paddingTop: Platform.OS === 'ios' ? 30 : 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 40,
    gap: 80,
    // justifyContent: 'center',
},
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 20,
  },
  inputContainer: {
    paddingHorizontal: 20,
  },
  inputWrapper: {
    marginBottom: 20,
    position: 'relative',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    // backgroundColor: '#f8f8f8',
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  button: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 25,
    backgroundColor: '#10B981',
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  gradient: {
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  strengthContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 2,
  },
  strengthBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 2,
    borderRadius: 2,
  },
  strengthActive: {
    backgroundColor: '#4CAF50',
  },
  rulesContainer: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ruleText: {
    marginLeft: 8,
    color: '#666',
    fontSize: 14,
  },
  ruleMet: {
    color: '#4CAF50',
  },
  successMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  successText: {
    marginLeft: 8,
    color: '#4CAF50',
    fontSize: 16,
  },
});

