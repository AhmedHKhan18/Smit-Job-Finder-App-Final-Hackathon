// import React, { useEffect, useState } from 'react';
// import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
// import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
// import { getItem, removeItem } from '@/app/utils/asyncStorage';
// import { router } from 'expo-router';
// import { getDocs, collection, updateDoc, doc } from 'firebase/firestore';
// import { db } from '@/app/utils/firebase.config';
// import DropDownPicker from 'react-native-dropdown-picker';

// export default function App() {
// const [userId, setUserId] = useState<any>()
// const [user, setUser] = useState<any>({})

// useEffect(()=>{
//   const getUser = async ()=>{
//   const userData:any = await getItem('User')
//   setUserId(userData)
//   }
//   getUser()
//   getMyData()
// },[])

// const getMyData = async ()=>{
//   const list:any[] = []
//   const dbSnap = await getDocs(collection(db, "users"))
//   dbSnap.forEach((item)=>{
//     list.push(item.data())
//   })
//   let myUid = await getItem('User');
//     const filteredUsers = list.filter(users => users.Uid == myUid);
//     setUser(Object.assign({}, filteredUsers[0]))
// }


// function handleLogout(){
//   removeItem('User')
//   router.push('/screens/auth/Login')
// }

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView>
//       {/* <StatusBar style="dark" /> */}
      
//       {/* Header */}
//       <View style={styles.header}>
//         <View style={styles.userInfo}>
//           <Image
//             source={user.img || { uri: 'https://via.placeholder.com/40' }}
//             style={styles.avatar}
//           />
//           <View>
//             <Text style={styles.welcomeText}>Welcome back,</Text>
//             <Text style={styles.userName}>{user.name}</Text>
//           </View>
//         </View>
//         <TouchableOpacity>
//           <Ionicons name="notifications-outline" size={24} color="#000" />
//         </TouchableOpacity>
//       </View>

//       {/* Filters */}
//       <View style={styles.filters}>
//         <TouchableOpacity style={styles.filterChip}>
//           <MaterialIcons name="work-outline" size={20} color="#4CAF50" />
//           <Text style={styles.filterText}>Full Time</Text>
//           <MaterialIcons name="keyboard-arrow-down" size={20} color="#4CAF50" />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.filterChip}>
//           <MaterialIcons name="location-on" size={20} color="#4CAF50" />
//           <Text style={styles.filterText}>Remote</Text>
//           <MaterialIcons name="keyboard-arrow-down" size={20} color="#4CAF50" />
//         </TouchableOpacity>
{/* <DropDownPicker
    items={[
        {label: 'USA', value: 'usa', hidden: true},
        {label: 'UK', value: 'uk' />},
        // {label: 'France', value: 'france', icon: () => <Icon name="flag" size={18} color="#900" />},
    ]}
    defaultValue={this.state.country}
    containerStyle={{height: 40}}
    style={{backgroundColor: '#fafafa'}}
    onChangeItem={item => this.setState({
        country: item.value
    })}
/>      */}
// </View> 

//       {/* Search Bar */}
//       <View style={styles.searchContainer}>
//         <View style={styles.searchBar}>
//           <Ionicons name="search" size={20} color="#666" />
//           <TextInput
//             placeholder="Search Job name or company"
//             placeholderTextColor="#666"
//             style={styles.searchInput}
//           />
//         </View>
//         <TouchableOpacity style={styles.searchButton} onPress={handleLogout}>
//           <Text style={styles.searchButtonText}>Search Job</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Profile Completion */}
//       <View style={styles.profileCompletion}>
//           <TouchableOpacity onPress={()=>router.push('/screens/main/Profile')}>
//         <View style={styles.profileCompletionHeader}>
//           <Text style={styles.profileCompletionTitle}>Let's Complete Your Profile!</Text>
//             <Text style={styles.percentage}>40%</Text>
//         </View>
//         <Text style={styles.profileCompletionSubtitle}>Get a high-paid job with us!</Text>
//           </TouchableOpacity>
//       </View>

//       {/* Suggested Jobs */}
//       <View style={styles.suggestedJobs}>
//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>Suggested Jobs</Text>
//           <TouchableOpacity>
//             <Text style={styles.seeAll}>See all</Text>
//           </TouchableOpacity>
//         </View>
        
//           <TouchableOpacity style={styles.jobCard}>
//             <Image
//               source={{ uri: 'https://via.placeholder.com/40' }}
//               style={styles.companyLogo}
//             />
//             <View style={styles.jobInfo}>
//               <Text style={styles.jobTitle}>Operations Manager</Text>
//               <Text style={styles.jobCompany}>Tesla Inc</Text>
//               <Text style={styles.jobLocation}>California, USA</Text>
//             </View>
//             <MaterialIcons name="bookmark-outline" size={24} color="#666" />
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.jobCard}>
//             <Image
//               source={{ uri: 'https://via.placeholder.com/40' }}
//               style={styles.companyLogo}
//             />
//             <View style={styles.jobInfo}>
//               <Text style={styles.jobTitle}>Financial Planner</Text>
//               <Text style={styles.jobCompany}>Goldman Sachs</Text>
//               <Text style={styles.jobLocation}>New York, USA</Text>
//             </View>
//             <MaterialIcons name="bookmark-outline" size={24} color="#666" />
//           </TouchableOpacity>
//       </View>

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
//         </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 16,
//   },
//   userInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   avatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     marginRight: 12,
//   },
//   welcomeText: {
//     fontSize: 14,
//     color: '#666',
//   },
//   userName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   filters: {
//     flexDirection: 'row',
//     padding: 16,
//     gap: 12,
//   },
//   filterChip: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 8,
//     paddingHorizontal: 12,
//     borderRadius: 20,
//     backgroundColor: '#E8F5E9',
//     gap: 4,
//   },
//   filterText: {
//     color: '#4CAF50',
//     marginHorizontal: 4,
//   },
//   searchContainer: {
//     padding: 16,
//     gap: 12,
//   },
//   searchBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 12,
//     backgroundColor: '#F5F5F5',
//     borderRadius: 8,
//     gap: 8,
//   },
//   searchInput: {
//     flex: 1,
//   },
//   searchButton: {
//     backgroundColor: '#4CAF50',
//     padding: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   searchButtonText: {
//     color: '#fff',
//     fontWeight: '600',
//   },
//   profileCompletion: {
//     margin: 16,
//     padding: 16,
//     backgroundColor: '#F5F5F5',
//     borderRadius: 12,
//   },
//   profileCompletionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   profileCompletionTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   percentage: {
//     color: '#4CAF50',
//     fontWeight: '600',
//   },
//   profileCompletionSubtitle: {
//     color: '#666',
//     marginTop: 4,
//   },
//   suggestedJobs: {
//     flex: 1,
//     padding: 16,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   seeAll: {
//     color: '#4CAF50',
//   },
//   jobCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//     backgroundColor: '#F5F5F5',
//     borderRadius: 12,
//     marginBottom: 12,
//   },
//   companyLogo: {
//     width: 40,
//     height: 40,
//     borderRadius: 8,
//     marginRight: 12,
//   },
//   jobInfo: {
//     flex: 1,
//   },
//   jobTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   jobCompany: {
//     color: '#666',
//     marginTop: 4,
//   },
//   jobLocation: {
//     color: '#666',
//     marginTop: 2,
//   },
//   bottomNav: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     padding: 12,
//     backgroundColor: '#fff',
//     borderTopWidth: 1,
//     borderTopColor: '#eee',
//   },
//   navItem: {
//     alignItems: 'center',
//   },
//   navText: {
//     fontSize: 12,
//     color: '#666',
//     marginTop: 4,
//   },
//   activeNavText: {
//     color: '#4CAF50',
//   },
// });




import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Animated,
  RefreshControl,
  Platform,
  StyleSheet
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import {
  Bell,
  MapPin,
  Briefcase,
  Search,
  Mic,
  ChevronRight,
  Star,
  TrendingUp,
  Plus,
  MessageCircle
} from 'lucide-react-native'
import { BlurView } from 'expo-blur'
import * as Haptics from 'expo-haptics'
import { getItem, removeItem } from '@/app/utils/AsyncStorage';
import { router } from 'expo-router';
import { getDocs, collection, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/app/utils/firebaseConfig';
import React, { useEffect, useState, useRef, useContext } from 'react';
import LottieView from 'lottie-react-native'
import SearchBar from '@/components/SearchFilter'
import Dropdown from '@/components/Filter'
import { AppContext } from '../../../context/AppContext';
import { useColorScheme } from 'react-native';


export default function HomeScreen() {
  const { jobs, loading, error } = useContext<any>(AppContext);
  const [refreshing, setRefreshing] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const scrollY = useRef(new Animated.Value(0)).current
  const [userId, setUserId] = useState<any>()
  const [user, setUser] = useState<any>({})
  const [isFocused, setIsFocused] = useState(false);
  const [theme, setTheme] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current; // Animation state

const getTheme:any = useColorScheme()


useEffect(()=>{
  const getUser = async ()=>{
    const userData:any = await getItem('User')
    setUserId(userData)
  }
  if(getTheme === 'dark'){
    setTheme(true)
  }else{
    setTheme(false)
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
      const filteredUsers = list.filter(users => users.Uid == myUid)
      setUser(Object.assign({}, filteredUsers[0]))
  }

  
  const categories = [
    { id: 1, name: 'Technology', icon: '💻', count: 235 },
    { id: 2, name: 'Finance', icon: '💰', count: 186 },
    { id: 3, name: 'Healthcare', icon: '🏥', count: 142 },
    { id: 4, name: 'Education', icon: '📚', count: 98 },
    { id: 5, name: 'Marketing', icon: '📢', count: 167 },
  ]

  const recentSearches = [
    'UI/UX Designer',
    'Product Manager',
    'React Native Developer',
    'Data Scientist',
  ]

  const trendingKeywords = [
    'Remote Work',
    'AI Engineer',
    'Blockchain',
    'DevOps',
  ]

  const suggestedJobs = [
    {
      id: 1,
      title: 'Operations Manager',
      company: 'Tesla',
      location: 'San Francisco, CA',
      salary: '$120k - $150k',
      logo: '/assets/images/tesla.png',
      matchScore: 95,
      posted: '2h ago',
      type: 'Full Time',
    },
    {
      id: 2,
      title: 'Financial Planner',
      company: 'Goldman Sachs',
      location: 'New York, NY',
      salary: '$90k - $120k',
      logo: '/placeholder.svg',
      matchScore: 88,
      posted: '4h ago',
      type: 'Remote',
    },
  ]

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [120, 80],
    extrapolate: 'clamp',
  })

  const handleRefresh = async () => {
    setRefreshing(true)
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 2000))
    setRefreshing(false)
  }

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
  const jobOptions = [
    { id: '1', label: 'Remote', icon: <MapPin size={20} color="#6B7280" /> },
    { id: '2', label: 'Full Time', icon: <Briefcase size={20} color="#6B7280" /> },
    { id: '3', label: 'Part Time', icon: <Briefcase size={20} color="#6B7280" /> },
  ];

  const handleSelect = (option: string) => {
    console.log('Selected Option:', option);
  };


  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar style={theme ? 'light' : 'dark'}/>

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
            onRefresh={handleRefresh}
            tintColor="#10B981"
          />
        }
      >
      
      {/* Animated Header */}
      {/* <Animated.View
        style={{
          height: headerHeight,
          backgroundColor: '#fff',
          paddingTop: Platform.OS === 'ios' ? 30 : 20,
          paddingHorizontal: 16,
          borderBottomWidth: 1,
          borderBottomColor: '#F3F4F6',
        }}
      > */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 10 }}>
        <View style={{
            position: 'relative',
            marginBottom: 10,
            marginRight: 8,
          }}>
        <LottieView
                  loop={true}
                  source={require('../../../assets/LottieFiles/avatar.json')}
                  style={{ height: 50, width: 50, top: 1, left: 5, position: 'absolute', zIndex: -10,}} 
                  autoPlay
                  // type="Circle Animation"
                />
            <LottieView autoPlay loop={true} style={{height: 60, width: 60}} source={require('../../../assets/LottieFiles/circle2.json')}/>
            </View>
          {/* <Image
            source={{ uri: '/placeholder.svg' }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              marginRight: 12,
            }}
          /> */}
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#6B7280', fontSize: 14 }}>
              Welcome back,
            </Text>
            <Text style={{ fontSize: 18, fontWeight: '600' }}>
            {user.name}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: '#F3F4F6',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light), router.push('/screens/NotificationScreen')}}
          >
            <Bell size={20} color="#374151" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: '#F3F4F6',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 6,
            }}
            onPress={() => {Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light), router.push('/screens/MessagesList')}}
          >
            <MessageCircle size={20} color="#374151" />
          </TouchableOpacity>
        </View>
      {/* </Animated.View> */}

      
        {/* Filters */}
        <View style={{ 
          flexDirection: 'row', 
          padding: 16,
          gap: 8,
        }}>
          <Dropdown name='Fulltime'/>          
        <Dropdown name='Remote'/>          
         {/* <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              padding: 12,
              backgroundColor: '#F9FAFB',
              borderRadius: 12,
            }}
          >
            <MapPin size={20} color="#6B7280" />
            <Text style={{ marginLeft: 8, color: '#374151' }}>Remote</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              padding: 12,
              backgroundColor: '#F9FAFB',
              borderRadius: 12,
            }}
          >
            <Briefcase size={20} color="#6B7280" />
            <Text style={{ marginLeft: 8, color: '#374151' }}>Full Time</Text>
          </TouchableOpacity> */}
        </View>

        {/* Search Bar */}
        {/* <SearchBar/> */}
        <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#F9FAFB',
              borderRadius: 12,
              padding: 12,
            }}
          >
            <Search size={20} color="#6B7280" />
            <TextInput
              placeholder="Search jobs or companies"
              style={{
                flex: 1,
                marginLeft: 8,
                fontSize: 16,
                color: '#374151',
              }}
              placeholderTextColor={'#374151'}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <TouchableOpacity
              onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
            >
              <Mic size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories Carousel */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          style={{ marginBottom: 24 }}
        >
           {/* {isFocused && (
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            { backgroundColor: 'rgba(0, 0, 0, 0.5)', opacity: opacity },
          ]}
        >
          <BlurView intensity={20} style={{ flex: 1 }} />
        </Animated.View>
      )} */}
          {categories.map((category, index) => (
            <TouchableOpacity
              key={category.id}
              style={{
                marginRight: 12,
                padding: 16,
                backgroundColor: '#F3F4F6',
                borderRadius: 16,
                minWidth: 120,
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 24, marginBottom: 8 }}>
                {category.icon}
              </Text>
              <Text style={{ 
                fontSize: 14,
                fontWeight: '600',
                color: '#374151',
                marginBottom: 4,
              }}>
                {category.name}
              </Text>
              <Text style={{ fontSize: 12, color: '#6B7280' }}>
                {category.count} jobs
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Recent Searches */}
        <View style={{ marginBottom: 24 }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            marginBottom: 12,
          }}>
            <Text style={{ fontSize: 18, fontWeight: '600' }}>
              Recent Searches
            </Text>
            <TouchableOpacity>
              <Text style={{ color: '#10B981', fontSize: 14 }}>
                See all
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          >
            {recentSearches.map((search, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  marginRight: 8,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  backgroundColor: '#F3F4F6',
                  borderRadius: 20,
                }}
              >
                <Text style={{ color: '#374151' }}>{search}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Trending Keywords */}
        <View style={{ marginBottom: 24 }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            marginBottom: 12,
          }}>
            <TrendingUp size={20} color="#10B981" />
            <Text style={{ 
              fontSize: 18,
              fontWeight: '600',
              marginLeft: 8,
            }}>
              Trending
            </Text>
          </View>
          <View style={{ 
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingHorizontal: 16,
            gap: 8,
          }}>
            {trendingKeywords.map((keyword, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  backgroundColor: '#ECFDF5',
                  borderRadius: 16,
                }}
              >
                <Text style={{ color: '#10B981' }}>{keyword}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Profile Completion Card */}
        <TouchableOpacity
          style={{
            margin: 16,
            padding: 16,
            backgroundColor: '#F3F4F6',
            borderRadius: 16,
          }}
          onPress={()=>router.push('/screens/ProfileComplete')}
        >
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 8,
          }}>
            <Text style={{ fontSize: 16, fontWeight: '600' }}>
              Let's Complete Your Profile!
            </Text>
            <Text style={{ color: '#10B981' }}>40%</Text>
          </View>
          <View style={{
            height: 4,
            backgroundColor: '#E5E7EB',
            borderRadius: 2,
          }}>
            <View style={{
              width: '40%',
              height: '100%',
              backgroundColor: '#10B981',
              borderRadius: 2,
            }} />
          </View>
          <Text style={{ 
            marginTop: 8,
            fontSize: 14,
            color: '#6B7280',
          }}>
            Get more job matches by completing your profile
          </Text>
        </TouchableOpacity>

        {/* Suggested Jobs */}
        <View style={{ paddingBottom: 32 }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            marginBottom: 16,
          }}>
            <Text style={{ fontSize: 18, fontWeight: '600' }}>
              Suggested Jobs
            </Text>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <Text style={{ color: '#10B981', marginRight: 4 }}>
                See all
              </Text>
              <ChevronRight size={16} color="#10B981" />
            </TouchableOpacity>
          </View>
          
          {suggestedJobs.map(job => (
            <TouchableOpacity
              key={job.id}
              style={{
                marginHorizontal: 16,
                marginBottom: 16,
                padding: 16,
                backgroundColor: '#fff',
                borderRadius: 16,
                borderWidth: 1,
                borderColor: '#F3F4F6',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.05,
                shadowRadius: 15,
                elevation: 2,
              }}
              onPress={()=>router.push('/screens/JobDetails')}
            >
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 12,
              }}>
                <Image
                  source={{uri: job.logo}}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    marginRight: 12,
                  }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '600',
                    marginBottom: 4,
                  }}>
                    {job.title}
                  </Text>
                  <Text style={{ color: '#6B7280' }}>
                    {job.company}
                  </Text>
                </View>
                <View style={{
                  backgroundColor: '#ECFDF5',
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 12,
                }}>
                  <Text style={{ color: '#10B981', fontWeight: '600' }}>
                    {job.matchScore}% Match
                  </Text>
                </View>
              </View>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <MapPin size={16} color="#6B7280" />
                  <Text style={{
                    marginLeft: 4,
                    color: '#6B7280',
                    fontSize: 14,
                  }}>
                    {job.location}
                  </Text>
                </View>
                <Text style={{ color: '#6B7280', fontSize: 14 }}>
                  {job.posted}
                </Text>
              </View>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 12,
              }}>
                <Text style={{
                  color: '#10B981',
                  fontWeight: '600',
                  fontSize: 16,
                }}>
                  {job.salary}
                </Text>
                <View style={{
                  backgroundColor: '#F3F4F6',
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 12,
                }}>
                  <Text style={{ color: '#374151' }}>{job.type}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 16,
          bottom: 90,
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: '#10B981',
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#10B981',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 5,
        }}
        onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
      >
        <Plus size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  )
}
