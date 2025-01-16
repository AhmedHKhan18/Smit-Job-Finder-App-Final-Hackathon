import React, { useState, useCallback, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Platform,
  Animated,
  ScrollView
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Haptics from 'expo-haptics';
import { Swipeable } from 'react-native-gesture-handler';
import {
  Home,
  Star,
  FileText,
  MessageSquare,
  User,
  Trash2,
} from 'lucide-react-native';
// import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { router } from 'expo-router';

const INITIAL_JOBS = [
  {
    id: '1',
    title: 'Operations Manager',
    company: 'BrightPath Solutions',
    logo: '🔴',
    timeAgo: '1h ago',
    tags: ['Full Time', 'Hybrid', 'Contract'],
    saved: true,
  },
  {
    id: '2',
    title: 'Operations Manager',
    company: 'Stellar',
    logo: '🌟',
    timeAgo: '1h ago',
    tags: ['Full Time', 'Hybrid', 'Contract'],
    saved: true,
  },
  {
    id: '3',
    title: 'Operations Manager',
    company: 'BrightPath Solutions',
    logo: '🟢',
    timeAgo: '1h ago',
    tags: ['Full Time', 'Hybrid', 'Contract'],
    saved: true,
  },
  {
    id: '4',
    title: 'Operations Manager',
    company: 'BrightPath Solutions',
    logo: '⚪',
    timeAgo: '1h ago',
    tags: ['Full Time', 'Hybrid', 'Contract'],
    saved: true,
  },
  {
    id: '5',
    title: 'Operations Manager',
    company: 'BrightPath Solutions',
    logo: '🔵',
    timeAgo: '1h ago',
    tags: ['Full Time', 'Hybrid', 'Contract'],
    saved: true,
  },
];

const SavedJobs = ({ navigation }:any) => {
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const scrollY = useRef(new Animated.Value(0)).current;
//   const bottomSheetRef = useRef<BottomSheet>(null);
  const swipeableRefs = useRef<Map<string, Swipeable>>(new Map());

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleUnsave = async (jobId: string) => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setJobs(jobs.filter(job => job.id !== jobId));
    swipeableRefs.current.get(jobId)?.close();
  };

  const handleJobPress = (job:any) => {
    Haptics.selectionAsync();
    router.push('/screens/JobDetails');
  };

  const renderJobCard = ({ item }:any) => {
    const renderRightActions = (progress:any, dragX:any) => {
      const scale = dragX.interpolate({
        inputRange: [-100, 0],
        outputRange: [1, 0],
        extrapolate: 'clamp',
      });

      return (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleUnsave(item.id)}
        >
          <Animated.View style={{ transform: [{ scale }] }}>
            <Trash2 color="#fff" size={24} />
          </Animated.View>
        </TouchableOpacity>
      );
    };

    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
      <Swipeable
        ref={ref => ref && swipeableRefs.current.set(item.id, ref)}
        renderRightActions={renderRightActions}
        rightThreshold={40}
      >
        <TouchableOpacity
          style={styles.jobCard}
          onPress={() => handleJobPress(item)}
          activeOpacity={0.7}
        >
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>{item.logo}</Text>
          </View>
          <View style={styles.jobInfo}>
            <Text style={styles.jobTitle}>{item.title}</Text>
            <Text style={styles.companyName}>{item.company}</Text>
            <View style={styles.tagsContainer}>
              {item.tags.map((tag:any, index:any) => (
                <View
                  key={index}
                  style={[
                    styles.tag,
                    index === 0 && styles.fullTimeTag,
                    index === 1 && styles.hybridTag,
                    index === 2 && styles.contractTag,
                  ]}
                >
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.rightContent}>
            <Text style={styles.timeAgo}>{item.timeAgo}</Text>
            <TouchableOpacity
              onPress={() => handleUnsave(item.id)}
              style={styles.starButton}
            >
              <Star size={20} color="#FFD700" fill="#FFD700" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Swipeable>
      </GestureHandlerRootView>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#10B981"
          />
        }
      >
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Saved Jobs</Text>
      </View>

      {/* Job List */}
      {/* <FlatList
        data={jobs}
        renderItem={renderJobCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      /> */}

<View style={styles.listContainer}>
      {jobs.map((item, index) => (
        <React.Fragment key={item.id}>
          {renderJobCard({ item })}
          {index < jobs.length - 1 && <View style={styles.separator} />}
        </React.Fragment>
      ))}
    </View>

      {/* Bottom Sheet for additional actions */}
      {/* <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={['50%']}
        enablePanDownToClose
        backgroundStyle={styles.bottomSheetBackground}
      > */}
        <View style={styles.bottomSheetContent}>
          {/* Add your bottom sheet content here */}
        </View>
      {/* </BottomSheet> */}
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
    paddingBottom: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerTitle: {
      fontSize: 20,
      fontWeight: '600',
      textAlign: 'center',
      // marginRight: 24,
  },
  listContainer: {
    // padding: 16,
  },
  jobCard: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 3,
    // elevation: 3,
  },
  logoContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logoText: {
    fontSize: 24,
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  companyName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  fullTimeTag: {
    backgroundColor: '#E8F5E9',
  },
  hybridTag: {
    backgroundColor: '#E3F2FD',
  },
  contractTag: {
    backgroundColor: '#FFF3E0',
  },
  tagText: {
    fontSize: 12,
    color: '#666',
  },
  rightContent: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  timeAgo: {
    fontSize: 12,
    color: '#666',
  },
  starButton: {
    padding: 4,
  },
  separator: {
    height: 12,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingBottom: Platform.OS === 'ios' ? 24 : 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  navItem: {
    alignItems: 'center',
  },
  activeNavItem: {
    opacity: 1,
  },
  navText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  activeNavText: {
    color: '#007AFF',
  },
  bottomSheetBackground: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  bottomSheetContent: {
    flex: 1,
    padding: 16,
  },
});

export default SavedJobs;