import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { signInWithEmailAndPassword } from "firebase/auth";
import { router } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { setItem } from '@/app/utils/AsyncStorage';
import { AppContext } from '@/context/AppContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, loading } = useContext(AppContext);
  console.log("🚀 ~ LoginScreen ~ loading:", loading)


 function handleLogin(){
  //  setLoading(true)
  //   signInWithEmailAndPassword(auth, email, password)
  //   .then((userCredential) => {
  //   const user = userCredential.user.uid;
  //   setItem('User', user)
  //   router.push('/screens/main/Home')
  // })
  // .catch((error) => {
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  // });

  }



  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView>
      <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.content}>
        <Image source={require('@/assets/images/SMIT-logo.png')} style={styles.Image}/>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>
          Welcome back! Please log in to access your account.
        </Text>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, styles.passwordInput]}
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={24}
                  color="#666"
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity onPress={()=>router.push('/screens/auth/ForgotPsw')}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={()=>signIn(email, password)}>
            {loading ? 
            <ActivityIndicator size={200} color={'#fff'}/>:
            <Text style={styles.loginButtonText}>Login</Text>
            }
          </TouchableOpacity>

          <View style={styles.orContainer}>
            <View style={styles.orLine} />
            <Text style={styles.orText}>Or</Text>
            <View style={styles.orLine} />
          </View>

          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-google" size={24} color="#000" />
            <Text style={styles.socialButtonText}>Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-apple" size={24} color="#000" />
            <Text style={styles.socialButtonText}>Apple</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signupContainer} onPress={()=>router.push('/screens/auth/Signup')}>
            <Text style={styles.signupText}>Don't have an account?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signupContainer} onPress={()=>router.push('/screens/auth/CompanyOwner')}>
            <Text style={styles.signupText}>Are you a Company Owner?</Text>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECFDF5',
  },
  content: {
    padding: 24,
  },
  scrollContent: {
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 32,
    textAlign: 'center',
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    color: '#333',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  forgotPassword: {
    color: '#666',
    textAlign: 'right',
    fontSize: 14,
  },
  loginButton: {
    // backgroundColor: '#4CAF50',
    backgroundColor: '#10B981',
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  orText: {
    color: '#666',
    paddingHorizontal: 16,
  },
  socialButton: {
    flexDirection: 'row',
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  socialButtonText: {
    fontSize: 16,
    color: '#333',
  },
  signupContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  signupText: {
    color: '#666',
    fontSize: 14,
  },
  Image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 16,
    alignSelf: 'center',
  }
});