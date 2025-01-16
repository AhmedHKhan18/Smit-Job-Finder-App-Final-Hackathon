import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Platform,
  RefreshControl
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Haptics from 'expo-haptics';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Building2,
  Check,
  Bell,
} from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import { router } from 'expo-router';

interface Notification {
  id: string;
  type: 'rejected' | 'approved' | 'company';
  title: string;
  description: string;
  time: string;
  date: 'Today' | 'Yesterday';
  read: boolean;
  company: string;
}

const NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'rejected',
    title: 'Application rejected',
    description: 'Your application for the Financial...',
    time: '12:45',
    date: 'Today',
    read: false,
    company: 'Vito Technology'
  },
  {
    id: '2',
    type: 'company',
    title: 'Vito Technology',
    description: 'Applied Product roles now',
    time: '12:45',
    date: 'Today',
    read: false,
    company: 'Vito Technology'
  },
  {
    id: '3',
    type: 'company',
    title: 'ZenB',
    description: 'Explore accounting roles now',
    time: '12:45',
    date: 'Yesterday',
    read: false,
    company: 'ZenB'
  },
  {
    id: '4',
    type: 'approved',
    title: 'Application Approved',
    description: 'Your application accepted! Interview...',
    time: '12:45',
    date: 'Yesterday',
    read: true,
    company: 'Financial Co.'
  },
  {
    id: '5',
    type: 'rejected',
    title: 'Application rejected',
    description: 'Your application for the Financial...',
    time: '12:49',
    date: 'Yesterday',
    read: false,
    company: 'Financial Co.'
  },
];

export default function NotificationScreen({ navigation }:any) {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [refreshing, setRefreshing] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current
  const swipeableRefs = useRef<Map<string, Swipeable>>(new Map());

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const markAsRead = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
    swipeableRefs.current.get(id)?.close();
  };

  const markAllAsRead = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setNotifications(prev =>
      prev.filter(notif => notif.id !== id)
    );
  };

  const handleRefresh = async () => {
    setRefreshing(true)
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 2000))
    setRefreshing(false)
  }


  const renderNotificationIcon = (type: string) => {
    switch (type) {
      case 'rejected':
        return <XCircle size={24} color="#EF4444" />;
      case 'approved':
        return <CheckCircle2 size={24} color="#10B981" />;
      default:
        return <Building2 size={24} color="#6B7280" />;
    }
  };

  const renderRightActions = (id: string) => {
    return (
      <View style={styles.rightActions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.readButton]}
          onPress={() => markAsRead(id)}
        >
          <Check size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => deleteNotification(id)}
        >
          <XCircle size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  };

  const renderNotificationsByDate = (date: string) => {
    const dateNotifications = notifications.filter(n => n.date === date);
    if (dateNotifications.length === 0) return null;

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
      <View key={date} style={styles.dateSection}>
        <Text style={styles.dateHeader}>{date}</Text>
        {dateNotifications.map((notification, index) => (
          <Animated.View
            key={notification.id}
            style={[
              styles.notificationContainer,
              { opacity: fadeAnim },
              { transform: [{ translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0]
              })}] }
            ]}
          >
            <Swipeable
              ref={ref => ref && swipeableRefs.current.set(notification.id, ref)}
              renderRightActions={() => renderRightActions(notification.id)}
              rightThreshold={40}
            >
              <TouchableOpacity
                style={[
                  styles.notification,
                  notification.read && styles.readNotification
                ]}
                onPress={() => markAsRead(notification.id)}
              >
                <View style={styles.notificationContent}>
                  {renderNotificationIcon(notification.type)}
                  <View style={styles.textContainer}>
                    <Text style={styles.title}>{notification.title}</Text>
                    <Text style={styles.description}>{notification.description}</Text>
                  </View>
                  <Text style={styles.time}>{notification.time}</Text>
                </View>
              </TouchableOpacity>
            </Swipeable>
          </Animated.View>
        ))}
      </View>
        </GestureHandlerRootView>
    );
  };

  return (
    <View style={styles.container}>
      
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification</Text>
        <View style={styles.bellContainer}>
          <Bell size={24} color="#000" />
          {notifications.some(n => !n.read) && (
            <View style={styles.badge} />
          )}
        </View>
      </View>

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
      
        {renderNotificationsByDate('Today')}
        {renderNotificationsByDate('Yesterday')}

        </ScrollView>
      {notifications.some(n => !n.read) && (
        <TouchableOpacity
          style={styles.markAllButton}
          onPress={markAllAsRead}
        >
          <Text style={styles.markAllText}>Mark all as read</Text>
          <Check size={20} color="#10B981" />
        </TouchableOpacity>
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
    paddingBottom: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  bellContainer: {
    padding: 8,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  scrollView: {
    flex: 1,
  },
  dateSection: {
    marginBottom: 20,
  },
  dateHeader: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  notificationContainer: {
    marginBottom: 1,
  },
  notification: {
    backgroundColor: '#fff',
    padding: 16,
  },
  readNotification: {
    backgroundColor: '#F9FAFB',
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
  },
  time: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 8,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 64,
    height: '100%',
  },
  readButton: {
    backgroundColor: '#10B981',
  },
  deleteButton: {
    backgroundColor: '#EF4444',
  },
  markAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  markAllText: {
    color: '#10B981',
    fontSize: 16,
    fontWeight: '500',
    marginRight: 8,
  },
});

