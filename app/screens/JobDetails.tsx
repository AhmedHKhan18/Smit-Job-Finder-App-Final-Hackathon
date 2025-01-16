import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Share,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { 
  ArrowLeft, 
  Bookmark, 
  Share2, 
  MapPin, 
  Clock, 
  Building2,
  ChevronRight,
  Users
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const JobDetails = ({ navigation, route }:any) => {
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');
  const scrollY = new Animated.Value(0);

  // Animation for header opacity
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const shareJob = async () => {
    try {
      await Share.share({
        message: 'Check out this Operations Manager position at Elco Technology!',
        url: 'https://jobfinder.app/jobs/operations-manager',
        title: 'Operations Manager Position',
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView 
        style={styles.scrollView}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
      
      {/* Animated Header */}
      {/* <Animated.View style={[styles.header, { opacity: headerOpacity }]}> */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Job Details</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={shareJob} style={styles.headerIcon}>
            <Share2 size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setSaved(!saved)} 
            style={styles.headerIcon}
          >
            <Bookmark 
              size={24} 
              color="#000" 
              fill={saved ? "#000" : "none"} 
            />
          </TouchableOpacity>
        </View>
        </View>
      {/* </Animated.View> */}

      
        {/* Company Logo & Basic Info */}
        <View style={styles.companyHeader}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>ELCO</Text>
          </View>
          <Text style={styles.jobTitle}>Operations Manager</Text>
          <View style={styles.locationContainer}>
            <MapPin size={16} color="#666" />
            <Text style={styles.locationText}>
              Elco Technology, in California
            </Text>
          </View>
          
          {/* Job Tags */}
          <View style={styles.tagsContainer}>
            <View style={[styles.tag, styles.tagFullTime]}>
              <Text style={styles.tagText}>Full Time</Text>
            </View>
            <View style={[styles.tag, styles.tagHybrid]}>
              <Text style={styles.tagText}>Hybrid</Text>
            </View>
            <View style={[styles.tag, styles.tagContract]}>
              <Text style={styles.tagText}>Contract</Text>
            </View>
          </View>

          {/* Quick Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Clock size={16} color="#666" />
              <Text style={styles.statText}>1 week ago</Text>
            </View>
            <View style={styles.stat}>
              <Users size={16} color="#666" />
              <Text style={styles.statText}>500+ applicants</Text>
            </View>
            <View style={styles.stat}>
              <Building2 size={16} color="#666" />
              <Text style={styles.statText}>Mid-senior level</Text>
            </View>
          </View>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          {['Overview', 'Detail', 'Company'].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[
                styles.tab,
                activeTab === tab && styles.activeTab
              ]}
            >
              <Text style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText
              ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Job Content */}
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>About the job</Text>
          <Text style={styles.description}>
            We are seeking an experienced Operations Manager to lead and streamline daily operations, ensuring optimal efficiency and productivity. The ideal candidate will excel in team leadership, process improvement, and strategic planning.
          </Text>

          <Text style={styles.sectionTitle}>Requirements</Text>
          <View style={styles.requirementsList}>
            <Text style={styles.requirement}>
              • Bachelor's degree in Business Administration, Management, or related field
            </Text>
            <Text style={styles.requirement}>
              • 5+ years of experience in operations management
            </Text>
            <Text style={styles.requirement}>
              • Strong leadership and team management skills
            </Text>
            <Text style={styles.requirement}>
              • Excellent problem-solving and analytical abilities
            </Text>
          </View>

          {/* Application Progress */}
          <View style={styles.progressContainer}>
            <Text style={styles.progressTitle}>Application Steps</Text>
            <View style={styles.progressStep}>
              <View style={[styles.stepIndicator, styles.stepComplete]} />
              <Text style={styles.stepText}>Review Job Details</Text>
              <ChevronRight size={20} color="#666" />
            </View>
            <View style={styles.progressStep}>
              <View style={styles.stepIndicator} />
              <Text style={styles.stepText}>Upload Resume</Text>
              <ChevronRight size={20} color="#666" />
            </View>
            <View style={styles.progressStep}>
              <View style={styles.stepIndicator} />
              <Text style={styles.stepText}>Additional Information</Text>
              <ChevronRight size={20} color="#666" />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Apply Button */}
      <LinearGradient
        colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
        style={styles.buttonContainer}
      >
        <TouchableOpacity 
          style={styles.applyButton}
          onPress={() => navigation.navigate('ApplicationForm')}
        >
          <Text style={styles.applyButtonText}>Apply for This Job</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 30 : 20,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginLeft: 15,
  },
  scrollView: {
    flex: 1,
  },
  companyHeader: {
    padding: 20,
    alignItems: 'center',
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  jobTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  locationText: {
    marginLeft: 5,
    color: '#666',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 15,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  tagFullTime: {
    backgroundColor: '#e8f5e9',
  },
  tagHybrid: {
    backgroundColor: '#e3f2fd',
  },
  tagContract: {
    backgroundColor: '#fff3e0',
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    marginLeft: 5,
    color: '#666',
    fontSize: 12,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    paddingVertical: 15,
    marginRight: 20,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#4CAF50',
  },
  tabText: {
    color: '#666',
  },
  activeTabText: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  description: {
    color: '#666',
    lineHeight: 24,
    marginBottom: 20,
  },
  requirementsList: {
    marginBottom: 20,
  },
  requirement: {
    color: '#666',
    lineHeight: 24,
    marginBottom: 5,
  },
  progressContainer: {
    marginTop: 20,
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 60,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
  },
  progressStep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  stepIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ddd',
    marginRight: 10,
  },
  stepComplete: {
    backgroundColor: '#4CAF50',
  },
  stepText: {
    flex: 1,
    color: '#666',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 28 : 20,
  },
  applyButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default JobDetails;