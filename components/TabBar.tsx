import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable, LayoutChangeEvent } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import TabBarButton from './TabBarButton';
import { transform } from '@babel/core';

const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  const router = useRouter();
  const [dimensions, setDimensions] = useState({height: 20, width: 100})
  const buttonWidth = dimensions.width / state.routes.length;

  const onTabbarLayout = (e: LayoutChangeEvent)=>{
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    })
  }

  const tabPositionX = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(()=>{
    return{
      transform: [{translateX: tabPositionX.value}]
    }
  })

  return (
    <View onLayout={onTabbarLayout} style={styles.tabBar}>
      <Animated.View style={[animatedStyle,{
        position: 'absolute',
        backgroundColor: '#A8C7FA',
        borderRadius: 30,
        marginHorizontal: 12,
        height: dimensions.height - 15,
        width: buttonWidth - 25
      }]}/>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          tabPositionX.value = withSpring(buttonWidth * index, {duration: 1500})
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        // Tab Bar Icon and Label
        const iconName = options.tabBarIcon?.() || 'home';
        const label = options.tabBarLabel || route.name;

        return (
          <TabBarButton
          key={route.key}
          onPress={onPress}
          onLongPress={onLongPress}
          isFocused={isFocused}
          label={label}
          accessibilityRole="button"
          accessibilityState={isFocused ? { selected: true } : {}}
          accessibilityLabel={options.tabBarAccessibilityLabel}
          testID={options.tabBarTestID}
          iconName={iconName}
          >

          </TabBarButton>
          // <Pressable
          //   key={route.key}
          //   accessibilityRole="button"
          //   accessibilityState={isFocused ? { selected: true } : {}}
          //   accessibilityLabel={options.tabBarAccessibilityLabel}
          //   testID={options.tabBarTestID}
          //   onPress={onPress}
          //   onLongPress={onLongPress}
          //   style={[styles.tabItem, {backgroundColor : isFocused ? '#A8C7FA' : '#fff'}]}
          // >
          //   <Animated.View>
          //   <Ionicons
          //     name={iconName}
          //     size={24}
          //     color={isFocused ? '#0F7DFD' : '#AAA'}
          //   />
          //   </Animated.View>
          //   <Animated.Text
          //     style={[
          //       styles.tabLabel,
          //       { color: isFocused ? '#0F7DFD' : '#AAA' },
          //     ]}
          //   >
          //     {label}
          //   </Animated.Text>
          // </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EDEDED',
    // height: 60,
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 8,
    elevation: 5,
    marginHorizontal: 20,
    // paddingVertical: 10,
    borderRadius: 100,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    flex: 1,
    borderRadius: 100,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default CustomTabBar;
