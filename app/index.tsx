import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Loading from './screens/Loading';
import Onboarding from './screens/onboarding';
import Login from './screens/auth/Login';
import Signup from './screens/auth/Signup';
import { getItem } from './utils/asyncStorage';
// import Home from '../screens/main/Home';

export type RootStackParamList = {
  Login: undefined; // No params for Login screen
  Signup: undefined; // No params for Signup screen
  Loading: undefined;
  Onboarding: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const opt = { headerShown: false };


const MainNavigator = () => {
  const [showOnboarding, setShowOnboarding]:any = useState(null)

useEffect(() => {
    checkIfAlreadyOnboarded();
  }, []);

  const checkIfAlreadyOnboarded = async () => {
    const alreadyOnboarded:any = await getItem('alreadyOnboarded');
    if (alreadyOnboarded == 1) {
      setShowOnboarding(false)
      // Navigate to the home screen if the user has already onboarded
    }else{
      setShowOnboarding(true)
      // Navigate to the onboarding screen if the user hasn't onboarded yet
    }
    }

    if(showOnboarding === null){
      return null
    }

if(showOnboarding){
  return (
    <Stack.Navigator initialRouteName='Onboarding'>
      <Stack.Screen name="Loading" component={Loading} options={opt}/>
      <Stack.Screen name="Onboarding" component={Onboarding} options={opt}/>
      <Stack.Screen name="Login" component={Login} options={opt}/>
      <Stack.Screen name="Signup" component={Signup} options={opt}/>
      {/* <Stack.Screen name="Home" component={Home} /> */}
    </Stack.Navigator>
  );
}else{
  return (
    <Stack.Navigator initialRouteName='Loading'>
      <Stack.Screen name="Loading" component={Loading} options={opt}/>
      <Stack.Screen name="Login" component={Login} options={opt}/>
      <Stack.Screen name="Signup" component={Signup} options={opt}/>
      {/* <Stack.Screen name="Home" component={Home} /> */}
    </Stack.Navigator>
  );
}
};

export default MainNavigator;
