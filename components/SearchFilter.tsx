import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { Search, Mic } from 'lucide-react-native';

interface SearchBarProps {
  placeholder?: string; // Allows custom placeholder text
}

export default function SearchBar({ placeholder = 'Search...' }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current; // Animation state

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleBlur = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setIsFocused(false));
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Shadow/Blur Background */}
      {isFocused && (
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            { backgroundColor: 'rgba(0, 0, 0, 0.5)', opacity: opacity },
          ]}
        >
          <BlurView intensity={20} style={{ flex: 1 }} />
        </Animated.View>
      )}

      {/* Search Input */}
      <View style={{ zIndex: 3, paddingHorizontal: 16, marginTop: 12 }}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#6B7280" />
          <TextInput
            placeholder={placeholder}
            style={styles.input}
            placeholderTextColor="#374151"
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <TouchableOpacity>
            <Mic size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 12,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#374151',
  },
});
