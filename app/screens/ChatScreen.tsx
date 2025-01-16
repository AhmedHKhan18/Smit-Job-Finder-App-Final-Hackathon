import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Platform,
  Animated,
  Image,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Audio } from 'expo-av';
import { BlurView } from 'expo-blur';
import { router } from 'expo-router';
import { useLocalSearchParams, useSearchParams } from 'expo-router/build/hooks';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'other';
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  reactions?: string[];
  isVoice?: boolean;
  duration?: number;
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "That's great to hear! Remote work is indeed a wonderful choice nowadays. Can you share how you've managed remote or distributed teams in the past?",
      sender: 'other',
      timestamp: new Date(2024, 0, 21, 14, 30),
      status: 'read',
    },
    {
      id: '2',
      text: "Hi I'm doing well, thank you. I appreciate the opportunity to speak with you.",
      sender: 'user',
      timestamp: new Date(2024, 0, 21, 14, 35),
      status: 'read',
    },
    {
      id: '3',
      text: "Hi I'm doing well, thank you. I appreciate the opportunity to speak with you.",
      sender: 'other',
      timestamp: new Date(2024, 0, 21, 14, 40),
      status: 'delivered',
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { messageId }:any = useLocalSearchParams();
  console.log("🚀 ~ ChatScreen ~ messageId:", messageId)

  const flatListRef = useRef<FlatList>(null);
  const recording = useRef<Audio.Recording | null>(null);
  const typingTimeout = useRef<NodeJS.Timeout>();
  const messageAnimations = useRef<{ [key: string]: Animated.Value }>({});

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording }:any = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      
      recording.current = recording;
      setIsRecording(true);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      // Start duration counter
      const interval = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);

      return () => clearInterval(interval);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    if (!recording.current) return;

    try {
      await recording.current.stopAndUnloadAsync();
      const uri = recording.current.getURI();
      
      // Add voice message to chat
      const newMessage: Message = {
        id: Date.now().toString(),
        text: '🎤 Voice Message',
        sender: 'user',
        timestamp: new Date(),
        status: 'sent',
        isVoice: true,
        duration: recordingDuration,
      };

      addMessage(newMessage);
      setIsRecording(false);
      setRecordingDuration(0);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (err) {
      console.error('Failed to stop recording', err);
    }
  };

  const addMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
    messageAnimations.current[message.id] = new Animated.Value(0);
    
    // Animate new message
    Animated.spring(messageAnimations.current[message.id], {
      toValue: 1,
      useNativeDriver: true,
      tension: 50,
      friction: 7,
    }).start();

    // Simulate typing indicator for response
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 3000);
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
      status: 'sent',
    };

    addMessage(newMessage);
    setInputText('');
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const renderMessage = ({ item, index }: { item: Message; index: number }) => {
    const animation = messageAnimations.current[item.id] || new Animated.Value(1);

    return (
      <Animated.View
        style={[
          styles.messageContainer,
          item.sender === 'user' ? styles.userMessage : styles.otherMessage,
          {
            opacity: animation,
            transform: [{
              translateY: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            }],
          },
        ]}
      >
        {/* {item.sender === 'other' && (
          <Image
            source={{ uri: '/placeholder.svg?height=32&width=32' }}
            style={styles.avatar}
          />
        )} */}
        <View style={[
          styles.messageBubble,
          item.sender === 'user' ? styles.userBubble : styles.otherBubble,
        ]}>
          {item.isVoice ? (
            <View style={styles.voiceMessageContainer}>
              <Ionicons name="mic" size={20} color="#fff" />
              <View style={styles.voiceWaveform}>
                {[...Array(10)].map((_, i) => (
                  <View
                    key={i}
                    style={[
                      styles.waveformBar,
                      { height: Math.random() * 20 + 5 },
                    ]}
                  />
                ))}
              </View>
              <Text style={styles.voiceDuration}>
                {Math.floor(item.duration! / 60)}:{(item.duration! % 60).toString().padStart(2, '0')}
              </Text>
            </View>
          ) : (
            <Text style={[
              styles.messageText,
              item.sender === 'user' ? styles.userText : styles.otherText,
            ]}>
              {item.text}
            </Text>
          )}
          <Text style={[styles.timestamp,{ color: item.sender === 'user' ? 'black' : '#8e8e8e' }]}>
            {new Date(item.timestamp).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </Text>
          {item.sender === 'user' && (
            <View style={styles.statusContainer}>
              {item.status === 'sent' && <Ionicons name="checkmark" size={16} color="#8e8e8e" />}
              {item.status === 'delivered' && <Ionicons name="checkmark-done" size={16} color="#8e8e8e" />}
              {item.status === 'read' && <Ionicons name="checkmark-done" size={16} color="#0084ff" />}
            </View>
          )}
        </View>
      </Animated.View>
    );
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        
        <Image
          source={{ uri: '/placeholder.svg?height=40&width=40' }}
          style={styles.headerAvatar}
        />
        
        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>Dianne Russell</Text>
          <Text style={styles.headerStatus}>
            {isTyping ? 'typing...' : 'Active'}
          </Text>
        </View>

        <TouchableOpacity 
          onPress={() => setSearchVisible(!searchVisible)}
          style={styles.searchButton}
        >
          <Ionicons name="search" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {searchVisible && (
        <BlurView intensity={100} style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search in conversation..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </BlurView>
      )}

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messagesList}
        inverted={false}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
      />

      {isTyping && (
        <View style={styles.typingIndicator}>
          <View style={styles.typingDots}>
            {[0, 1, 2].map(i => (
              <View key={i} style={styles.typingDot} />
            ))}
          </View>
        </View>
      )}

      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.attachButton}>
          <Ionicons name="add" size={24} color="#666" />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Type here..."
          value={inputText}
          onChangeText={setInputText}
          multiline
        />

        {inputText ? (
          <TouchableOpacity 
            style={styles.sendButton} 
            onPress={handleSend}
          >
            <Ionicons name="send" size={24} color="#0084ff" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.micButton}
            onPressIn={startRecording}
            onPressOut={stopRecording}
          >
            <Ionicons 
              name="mic" 
              size={24} 
              color={isRecording ? "#ff3b30" : "#666"} 
            />
            {isRecording && (
              <View style={styles.recordingIndicator}>
                <ActivityIndicator color="#ff3b30" size="small" />
                <Text style={styles.recordingTimer}>
                  {Math.floor(recordingDuration / 60)}:{(recordingDuration % 60).toString().padStart(2, '0')}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingTop: Platform.OS === 'ios' ? 25 : 16,
  },
  backButton: {
    padding: 8,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 8,
  },
  headerInfo: {
    marginLeft: 12,
    flex: 1,
  },
  headerName: {
    fontSize: 16,
    fontWeight: '600',
  },
  headerStatus: {
    fontSize: 12,
    color: '#666',
  },
  searchButton: {
    padding: 8,
  },
  searchContainer: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 16,
  },
  messagesList: {
    padding: 20,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  otherMessage: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  messageBubble: {
    maxWidth: '70%',
    padding: 12,
    borderRadius: 20,
    position: 'relative',
  },
  userBubble: {
    backgroundColor: '#0084ff',
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: '#f0f0f0',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  userText: {
    color: '#fff',
  },
  otherText: {
    color: '#000',
  },
  timestamp: {
    fontSize: 11,
    // color: '#8e8e8e',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  statusContainer: {
    position: 'absolute',
    right: -20,
    bottom: 0,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  attachButton: {
    padding: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
    maxHeight: 100,
  },
  sendButton: {
    padding: 8,
  },
  micButton: {
    padding: 8,
  },
  typingIndicator: {
    padding: 8,
    marginLeft: 48,
  },
  typingDots: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 16,
    width: 64,
    justifyContent: 'center',
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#666',
    marginHorizontal: 2,
    opacity: 0.5,
  },
  voiceMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 120,
  },
  voiceWaveform: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
    height: 30,
  },
  waveformBar: {
    width: 3,
    backgroundColor: '#fff',
    marginHorizontal: 1,
    borderRadius: 1.5,
  },
  voiceDuration: {
    color: '#fff',
    fontSize: 12,
  },
  recordingIndicator: {
    position: 'absolute',
    right: 40,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 4,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  recordingTimer: {
    marginLeft: 8,
    color: '#ff3b30',
    fontSize: 12,
    fontWeight: '600',
  },
});

