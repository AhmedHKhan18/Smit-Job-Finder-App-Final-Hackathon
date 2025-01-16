import { Pressable, StyleSheet } from "react-native";
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from "react";

export default function TabBarButton({onPress, onLongPress, isFocused, iconName, label}:any){
    const scale = useSharedValue(0)

useEffect(()=>{
    scale.value = withSpring(typeof isFocused === 'boolean' ? (isFocused ? 1 : 0) : isFocused, {duration: 350})
},[scale, isFocused])

const AnimatedTextStyles = useAnimatedStyle(()=>{
    const opacity = interpolate(scale.value, [0, 1], [1, 0])
    return {
        opacity
    }
})

const AnimatedIconStyles = useAnimatedStyle(()=>{
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2])
    const top = interpolate(scale.value, [0, 1], [0, 9])
    return{
        transform:[{
            scale: scaleValue
        }],
        top
    }
})

    return (
            <Pressable
            //   key={route.key}
            //   accessibilityRole="button"
            //   accessibilityState={isFocused ? { selected: true } : {}}
            //   accessibilityLabel={options.tabBarAccessibilityLabel}
            //   testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabItem}
            >
            <Animated.View style={AnimatedIconStyles}>
            <Ionicons 
              name={iconName}
              size={24}
              color={isFocused ? '#10B981' : '#AAA'}
            />
            </Animated.View>
            <Animated.Text
              style={[
                styles.tabLabel,
                { color: isFocused ? '#10B981' : '#AAA' },
                AnimatedTextStyles
              ]}
            >
              {label}
            </Animated.Text>
            </Pressable>
    )
}

const styles = StyleSheet.create({
    tabLabel: {
        fontSize: 12,
        marginTop: 4,
      },
      tabItem: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        flex: 1,
        borderRadius: 100,
      },
})
