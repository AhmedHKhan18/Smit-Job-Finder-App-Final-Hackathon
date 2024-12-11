import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { getItem, removeItem } from '@/app/utils/asyncStorage';
import { router } from 'expo-router';
import { getDocs, collection, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/app/utils/firebase.config'

export default function App() {
const [userId, setUserId] = useState<any>()
const [user, setUser] = useState<any>({})

useEffect(()=>{
  const getUser = async ()=>{
  const userData:any = await getItem('User')
  setUserId(userData)
  }
  getUser()
  getMyData()
},[])

const getMyData = async ()=>{
  const list:any[] = []
  const dbSnap = await getDocs(collection(db, "users"))
  dbSnap.forEach((item)=>{
    list.push(item.data())
  })
  let myUid = await getItem('User');
    const filteredUsers = list.filter(users => users.Uid == myUid);
    setUser(Object.assign({}, filteredUsers[0]))
}


function handleLogout(){
  removeItem('User')
  router.push('/screens/auth/Login')
}

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      {/* <StatusBar style="dark" /> */}
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image
            source={user.img || { uri: 'https://via.placeholder.com/40' }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.userName}>{user.name}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Filters */}
      <View style={styles.filters}>
        <TouchableOpacity style={styles.filterChip}>
          <MaterialIcons name="work-outline" size={20} color="#4CAF50" />
          <Text style={styles.filterText}>Full Time</Text>
          <MaterialIcons name="keyboard-arrow-down" size={20} color="#4CAF50" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterChip}>
          <MaterialIcons name="location-on" size={20} color="#4CAF50" />
          <Text style={styles.filterText}>Remote</Text>
          <MaterialIcons name="keyboard-arrow-down" size={20} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#666" />
          <TextInput
            placeholder="Search Job name or company"
            placeholderTextColor="#666"
            style={styles.searchInput}
          />
        </View>
        <TouchableOpacity style={styles.searchButton} onPress={handleLogout}>
          <Text style={styles.searchButtonText}>Search Job</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Completion */}
      <View style={styles.profileCompletion}>
        <View style={styles.profileCompletionHeader}>
          <Text style={styles.profileCompletionTitle}>Let's Complete Your Profile!</Text>
          <TouchableOpacity>
            <Text style={styles.percentage}>40%</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.profileCompletionSubtitle}>Get a high-paid job with us!</Text>
      </View>

      {/* Suggested Jobs */}
      <View style={styles.suggestedJobs}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Suggested Jobs</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        
          <TouchableOpacity style={styles.jobCard}>
            <Image
              source={{ uri: 'https://via.placeholder.com/40' }}
              style={styles.companyLogo}
            />
            <View style={styles.jobInfo}>
              <Text style={styles.jobTitle}>Operations Manager</Text>
              <Text style={styles.jobCompany}>Tesla Inc</Text>
              <Text style={styles.jobLocation}>California, USA</Text>
            </View>
            <MaterialIcons name="bookmark-outline" size={24} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.jobCard}>
            <Image
              source={{ uri: 'https://via.placeholder.com/40' }}
              style={styles.companyLogo}
            />
            <View style={styles.jobInfo}>
              <Text style={styles.jobTitle}>Financial Planner</Text>
              <Text style={styles.jobCompany}>Goldman Sachs</Text>
              <Text style={styles.jobLocation}>New York, USA</Text>
            </View>
            <MaterialIcons name="bookmark-outline" size={24} color="#666" />
          </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      {/* <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="home" size={24} color="#4CAF50" />
          <Text style={[styles.navText, styles.activeNavText]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="search" size={24} color="#666" />
          <Text style={styles.navText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="work-outline" size={24} color="#666" />
          <Text style={styles.navText}>Post</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="chat-bubble-outline" size={24} color="#666" />
          <Text style={styles.navText}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="person-outline" size={24} color="#666" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View> */}
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  welcomeText: {
    fontSize: 14,
    color: '#666',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  filters: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#E8F5E9',
    gap: 4,
  },
  filterText: {
    color: '#4CAF50',
    marginHorizontal: 4,
  },
  searchContainer: {
    padding: 16,
    gap: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    gap: 8,
  },
  searchInput: {
    flex: 1,
  },
  searchButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  profileCompletion: {
    margin: 16,
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
  },
  profileCompletionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileCompletionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  percentage: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  profileCompletionSubtitle: {
    color: '#666',
    marginTop: 4,
  },
  suggestedJobs: {
    flex: 1,
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  seeAll: {
    color: '#4CAF50',
  },
  jobCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    marginBottom: 12,
  },
  companyLogo: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  jobCompany: {
    color: '#666',
    marginTop: 4,
  },
  jobLocation: {
    color: '#666',
    marginTop: 2,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  activeNavText: {
    color: '#4CAF50',
  },
});