import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  StyleSheet,
  Platform,
  RefreshControl
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Haptics from 'expo-haptics';
import { BlurView } from 'expo-blur';
import {
  ArrowLeft,
  Mail,
  MoreVertical,
  Search,
  Check,
  CheckCheck,
  Clock,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

// Sample message data
const MESSAGES = [
  {
    id: '1',
    sender: 'Tesla Inc.',
    avatar: '/placeholder.svg',
    lastMessage: 'Thank you for your application! We would like to invite you for an interview...',
    time: '2m ago',
    unread: true,
    isVerified: true,
  },
  {
    id: '2',
    sender: 'Google',
    avatar: '/placeholder.svg',
    lastMessage: 'Your application for the position of Senior Product Designer has been received...',
    time: '1h ago',
    unread: true,
    isVerified: true,
  },
  {
    id: '3',
    sender: 'Apple',
    avatar: '/placeholder.svg',
    lastMessage: 'We have reviewed your application and would like to proceed with...',
    time: '3h ago',
    unread: false,
    isVerified: true,
  },
];

export default function MessageList() {
  const [messages, setMessages] = useState(MESSAGES);
  const [showEmpty, setShowEmpty] = useState(false); // Toggle this to show empty state
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const emptyStateAnim = useRef(new Animated.Value(0)).current;
  const [refreshing, setRefreshing] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    Animated.spring(emptyStateAnim, {
      toValue: 1,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleMessagePress = (messageId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId ? { ...msg, unread: false } : msg
      )
    );
    router.push({
      pathname: '/screens/ChatScreen',
      params: { messageId },
    });  
  };

  const handleRefresh = async () => {
    setRefreshing(true)
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 2000))
    setRefreshing(false)
  }


  const renderEmptyState = () => (
    <Animated.View
      style={[
        styles.emptyContainer,
        {
          opacity: emptyStateAnim,
          transform: [
            {
              scale: emptyStateAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.9, 1],
              }),
            },
          ],
        },
      ]}
    >
      <View style={styles.emptyIconContainer}>
        <Mail size={40} color="#9CA3AF" />
      </View>
      <Text style={styles.emptyTitle}>No Messages Received</Text>
      <Text style={styles.emptyDescription}>
        You haven't received any messages yet.
      </Text>
      <TouchableOpacity
        style={styles.exploreButton}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          setShowEmpty(false);
        }}
      >
        <Text style={styles.exploreButtonText}>Explore Jobs</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderMessageList = () => (
    <ScrollView
      style={styles.scrollView}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {messages.map((message, index) => (
        <Animated.View
          key={message.id}
          style={[
            styles.messageContainer,
            {
              opacity: fadeAnim,
              transform: [
                {
                  translateY: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50 * (index + 1), 0],
                  }),
                },
              ],
            },
          ]}
        >
          <TouchableOpacity
            style={[
              styles.messageCard,
              message.unread && styles.unreadMessage,
            ]}
            onPress={() => handleMessagePress(message.id)}
          >
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: message.avatar }}
                style={styles.avatar}
              />
              {message.isVerified && (
                <View style={styles.verifiedBadge}>
                  <Check size={12} color="#fff" />
                </View>
              )}
            </View>
            <View style={styles.messageContent}>
              <View style={styles.messageHeader}>
                <Text style={styles.senderName}>{message.sender}</Text>
                <Text style={styles.messageTime}>{message.time}</Text>
              </View>
              <Text
                style={[
                  styles.messageText,
                  message.unread && styles.unreadMessageText,
                ]}
                numberOfLines={2}
              >
                {message.lastMessage}
              </Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      ))}
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setShowEmpty(!showEmpty);
          }}
        >
          <MoreVertical size={24} color="#000" />
        </TouchableOpacity>
      </View>


      {/* Search Bar */}
      {!showEmpty && (
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#6B7280" />
            <Text style={styles.searchPlaceholder}>Search messages...</Text>
          </View>
        </View>
      )}

     <ScrollView style={styles.scrollView}
         showsVerticalScrollIndicator={false}
         onScroll={Animated.event(
         [{ nativeEvent: { contentOffset: { y: scrollY } } }],
         { useNativeDriver: false }
         )}
         scrollEventThrottle={16}
         refreshControl={
         <RefreshControl
         refreshing={refreshing}
         onRefresh={handleRefresh}
         tintColor="#10B981"
         />
         }
         >

      {/* Content */}
      {showEmpty ? renderEmptyState() : renderMessageList()}

      </ScrollView>

      {/* Message Status Indicator */}
      {!showEmpty && messages.some(m => m.unread) && (
        <LinearGradient
          colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
          style={styles.statusContainer}
        >
          <View style={styles.statusCard}>
            <Clock size={16} color="#6B7280" />
            <Text style={styles.statusText}>
              {messages.filter(m => m.unread).length} unread messages
            </Text>
          </View>
        </LinearGradient>
      )}
    </View>
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
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 25 : 20,
    paddingBottom: 5,
    paddingHorizontal: 16,
    // borderBottomWidth: 1,
    // borderBottomColor: '#E5E7EB',
  },
  headerButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  searchContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
  },
  searchPlaceholder: {
    marginLeft: 8,
    color: '#6B7280',
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  exploreButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#10B981',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  exploreButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  messageContainer: {
    marginBottom: 12,
  },
  messageCard: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  unreadMessage: {
    backgroundColor: '#F3F4F6',
    borderColor: '#D1D5DB',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#10B981',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  senderName: {
    fontSize: 16,
    fontWeight: '600',
  },
  messageTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  messageText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  unreadMessageText: {
    color: '#111827',
    fontWeight: '500',
  },
  statusContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 16,
  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statusText: {
    marginLeft: 8,
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '500',
  },
});

