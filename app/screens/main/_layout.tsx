import React from 'react';
import { Tabs } from 'expo-router';
import CustomTabBar from '@/components/TabBar';


export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' }, // Hide system tab bar
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen
        name="Home"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => 'home-outline',
        }}
      />
      <Tabs.Screen
          name="Saved"
          options={{
            tabBarLabel: 'Saved',
            tabBarIcon: () => 'star-outline',
          }}
        />
      <Tabs.Screen
        name="Applied"
        options={{
          tabBarLabel: 'Applied',
          tabBarIcon: () => 'bag-outline',
        }}
      />
        <Tabs.Screen
          name="Profile"
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: () => 'person-outline',
          }}
        />
      <Tabs.Screen
        name="PrfileComplete"
        options={{
          tabBarLabel: 'ProfileComplete',
          tabBarIcon: () => 'bag-outline',
          tabBarStyle: {display: 'none'}
        }}
      />
    </Tabs>
  );
}
