import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Loading from './screens/Loading';
import Onboarding from './screens/onboarding';
import Login from './screens/auth/Login';
import Signup from './screens/auth/Signup';
import CompanyOwner from './screens/auth/CompanyOwner';
import { getItem } from './utils/AsyncStorage';
import Home from '../app/screens/main/Home';
import Profile from '../app/screens/main/Profile'
import Saved from '../app/screens/main/Saved'
import NotificationScreen from './screens/NotificationScreen';
import ProfileComplete from './screens/ProfileComplete';
import { AppProvider } from '../context/AppContext'; // Adjust the path



export type RootStackParamList = {
  Login: undefined; // No params for Login screen
  Signup: undefined; // No params for Signup screen
  Loading: undefined;
  Onboarding: undefined;
  Home: undefined;
  Saved: undefined;
  Profile: undefined;
  NotificationScreen: undefined;
  ProfileComplete: undefined;
  CompanyOwner: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const opt = { headerShown: false };


const MainNavigator = () => {
  const [showOnboarding, setShowOnboarding]:any = useState(null)

useEffect(() => {
    checkIfAlreadyOnboarded();
  }, []);

  const checkIfAlreadyOnboarded = async () => {
    const onboarded:any = await getItem('onboarded');
    if (onboarded == 1) {
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
    <AppProvider>
    <Stack.Navigator initialRouteName='Onboarding'>
      <Stack.Screen name="Loading" component={Loading} options={opt}/>
      <Stack.Screen name="Onboarding" component={Onboarding} options={opt}/>
      <Stack.Screen name="Login" component={Login} options={opt}/>
      <Stack.Screen name="Signup" component={Signup} options={opt}/>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Profile" component={Profile} options={opt} /> 
      <Stack.Screen name="Saved" component={Saved} options={opt} /> 
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} options={opt} /> 
      <Stack.Screen name="ProfileComplete" component={ProfileComplete} options={opt} /> 
      <Stack.Screen name="CompanyOwner" component={CompanyOwner} options={opt}/>
    </Stack.Navigator>
    </AppProvider>
  );
}else{
  return (
    <AppProvider>
    <Stack.Navigator initialRouteName='Loading'>
      <Stack.Screen name="Loading" component={Loading} options={opt}/>
      <Stack.Screen name="Login" component={Login} options={opt}/>
      <Stack.Screen name="Signup" component={Signup} options={opt}/>
      <Stack.Screen name="Home" component={Home} /> 
      <Stack.Screen name="Profile" component={Profile} options={opt}/> 
      <Stack.Screen name="Saved" component={Saved} options={opt} /> 
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} options={opt} /> 
      <Stack.Screen name="ProfileComplete" component={ProfileComplete} options={opt} /> 
      <Stack.Screen name="CompanyOwner" component={CompanyOwner} options={opt}/>
    </Stack.Navigator>
    </AppProvider>
  );
}

};

export default MainNavigator;
