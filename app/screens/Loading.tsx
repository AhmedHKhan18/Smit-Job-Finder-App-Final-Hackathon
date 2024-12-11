import React from 'react';
import LottieView from 'lottie-react-native';
import { StyleSheet, View, Dimensions, ActivityIndicator } from 'react-native';
import { useEffect } from 'react';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { router } from 'expo-router';
import { getItem } from '../utils/asyncStorage';

const {width, height} = Dimensions.get('window');

export default function Loading() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  useEffect(() => {
    // setTimeout(() => {
    //   // navigation.navigate('home');
    //   router.push('/screens/main/home')
    // }, 5000);
    checkUser()
  }, []);

  const checkUser = async ()=>{
   await getItem('User').then((user) => {
      if(user){
        router.push('/screens/main/home');
      }else{
        router.push('/screens/auth/Login');
      }
    }).catch((err)=>{
      console.log(err);
    })
  }

  return (
    <View style={styles.container}>
      {/* <LottieView source={require('../../assets/LottieFiles/Loading.json')} style={styles.lottie} autoPlay loop /> */}
    <ActivityIndicator size={500}/>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  lottie: {
    height: width,
    width: width*0.9,
  },
});