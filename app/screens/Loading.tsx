import React from 'react';
import LottieView from 'lottie-react-native';
import { StyleSheet, View, Dimensions } from 'react-native';
import { useEffect } from 'react';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const {width, height} = Dimensions.get('window');

export default function Loading() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Onboarding');
    }, 5000);
  }, []);

  return (
    <View style={styles.container}>
      <LottieView source={require('../../assets/LottieFiles/Loading.json')} style={styles.lottie} autoPlay loop />
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