import { useState, useRef, useEffect } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  Platform,
  Animated,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import {
  User,
  Mail,
  ChevronRight,
  Globe2,
  Bell,
  Shield,
  HelpCircle,
  FileText,
  LogOut,
  Briefcase,
  BookmarkCheck,
  Calendar,
  CheckCircle2,
  Camera,
  Settings,
  Home,
  Star,
  MessageSquare,
} from 'lucide-react-native'
import { BlurView } from 'expo-blur'
import * as Haptics from 'expo-haptics'
import { LinearGradient } from 'expo-linear-gradient'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { router } from 'expo-router'
import { getItem, removeItem } from '@/app/utils/AsyncStorage'
import LottieView from 'lottie-react-native'
import { getDocs, collection, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/app/utils/firebaseConfig';
import { signOut } from 'firebase/auth'


export default function Profile() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isPushEnabled, setIsPushEnabled] = useState(true)
  const [user, setUser] = useState<any>({})
  const scrollY = useRef(new Animated.Value(0)).current


  function handleLogout(){
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    removeItem('User')
    router.push('/screens/auth/Login')
  }

  useEffect(()=>{
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

  const stats = [
    { id: 1, label: 'Applied', value: 12, icon: Briefcase },
    { id: 2, label: 'Saved', value: 6, icon: BookmarkCheck },
    { id: 3, label: 'Interviews', value: 9, icon: Calendar },
    { id: 4, label: 'Hired', value: 3, icon: CheckCircle2 },
  ]

  const generalSettings = [
    { id: 1, title: 'Edit Profile', icon: User, badge: 'Incomplete' },
    { id: 2, title: 'My Application Profile', icon: Briefcase },
    { id: 3, title: 'Language', icon: Globe2, value: 'English' },
    { id: 4, title: 'Dark Mode', icon: Settings, toggle: true },
  ]

  const otherSettings = [
    { id: 1, title: 'Security Settings', icon: Shield },
    { id: 2, title: 'Notification', icon: Bell, toggle: true },
    { id: 3, title: 'Help Center', icon: HelpCircle },
    { id: 4, title: 'Privacy Policy', icon: FileText },
  ]

  const recentActivity = [
    {
      id: 1,
      type: 'application',
      title: 'Applied for Senior Developer position',
      company: 'Tesla',
      time: '2 hours ago',
    },
    {
      id: 2,
      type: 'interview',
      title: 'Interview scheduled with Design Lead',
      company: 'Apple',
      time: '1 day ago',
    },
  ]

  // const headerHeight = scrollY.interpolate({
  //   inputRange: [0, 100],
  //   outputRange: [200, 200],
  //   extrapolate: 'clamp',
  // })

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar style="dark" />
     
     
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >

      {/* Animated Header */}
      {/* <Animated.View
        style={{
          height: headerHeight,
          backgroundColor: '#fff',
          paddingTop: Platform.OS === 'ios' ? 30 : 20,
          borderBottomWidth: 1,
          borderBottomColor: '#F3F4F6',
        }}
      > */}
        {/* <LinearGradient
          colors={['rgba(16, 185, 129, 0.1)', 'transparent']}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 200,
          }}
        /> */}
        <View style={{ 
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 20,
        }}>
          <View style={{
            position: 'relative',
            marginBottom: 12,
          }}>
             <LottieView
                  loop={true}
                  source={require('../../../assets/LottieFiles/avatar.json')}
                  style={{ height: 80, width: 80, top: 5, right: 10, position: 'absolute', zIndex: -10,}} 
                  autoPlay
                  // type="Circle Animation"
                />
            <LottieView autoPlay loop={true} style={{height: 100, width: 100}} source={require('../../../assets/LottieFiles/circle2.json')}/>

            {/* <Image
              source={{ uri: '/placeholder.svg' }}
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                borderWidth: 3,
                borderColor: '#fff',
              }}
            /> */}
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: -4,
                bottom: -4,
                backgroundColor: '#10B981',
                borderRadius: 16,
                padding: 6,
                borderWidth: 2,
                borderColor: '#fff',
              }}
              onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
            >
              <Camera size={16} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={{
            fontSize: 20,
            fontWeight: '600',
            marginBottom: 4,
          }}>
            {user.name}
          </Text>
          <Text style={{ color: '#6B7280' }}>
            {user.email}
          </Text>
        </View>
      {/* </Animated.View> */}

     
        {/* Profile Completion */}
        <View style={{ padding: 16 }}>
          <View style={{
            backgroundColor: '#F9FAFB',
            borderRadius: 16,
            padding: 16,
            marginBottom: 24,
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 12,
            }}>
              <Text style={{
                fontSize: 16,
                fontWeight: '600',
              }}>
                Profile Completion
              </Text>
              <AnimatedCircularProgress
                size={32}
                width={3}
                fill={40}
                tintColor="#10B981"
                backgroundColor="#E5E7EB"
                style={{justifyContent: 'center', alignItems: 'center'}}
              >
                {(fill) => (
                  <Text style={{
                    fontSize: 12,
                    fontWeight: '500',
                    textAlign: 'center',
                    margin: 5,
                  }}>
                    {fill}%
                  </Text>
                )}
              </AnimatedCircularProgress>
            </View>
            <View style={{
              height: 6,
              backgroundColor: '#E5E7EB',
              borderRadius: 3,
              marginBottom: 12,
            }}>
              <View style={{
                width: '40%',
                height: '100%',
                backgroundColor: '#10B981',
                borderRadius: 3,
              }} />
            </View>
            <Text style={{
              fontSize: 14,
              color: '#6B7280',
            }}>
              Complete your profile to increase job matches
            </Text>
          </View>
        </View>

        {/* Stats */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 24,
            gap: 12,
          }}
        >
          {stats.map(stat => (
            <View
              key={stat.id}
              style={{
                backgroundColor: '#F9FAFB',
                borderRadius: 16,
                padding: 16,
                alignItems: 'center',
                minWidth: 100,
              }}
            >
              <stat.icon size={24} color="#10B981" />
              <Text style={{
                fontSize: 24,
                fontWeight: '600',
                marginVertical: 8,
              }}>
                {stat.value}
              </Text>
              <Text style={{
                fontSize: 14,
                color: '#6B7280',
              }}>
                {stat.label}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* Recent Activity */}
        <View style={{ padding: 16 }}>
          <Text style={{
            fontSize: 18,
            fontWeight: '600',
            marginBottom: 12,
          }}>
            Recent Activity
          </Text>
          {recentActivity.map(activity => (
            <TouchableOpacity
              key={activity.id}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 12,
                backgroundColor: '#F9FAFB',
                borderRadius: 12,
                marginBottom: 8,
              }}
            >
              <View style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#E5E7EB',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 12,
              }}>
                {activity.type === 'application' ? (
                  <Briefcase size={20} color="#6B7280" />
                ) : (
                  <Calendar size={20} color="#6B7280" />
                )}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{
                  fontSize: 14,
                  fontWeight: '500',
                  marginBottom: 4,
                }}>
                  {activity.title}
                </Text>
                <Text style={{
                  fontSize: 12,
                  color: '#6B7280',
                }}>
                  {activity.company} • {activity.time}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Settings Sections */}
        <View style={{ padding: 16 }}>
          <Text style={{
            fontSize: 16,
            fontWeight: '600',
            marginBottom: 12,
            color: '#6B7280',
          }}>
            General
          </Text>
          <View style={{
            backgroundColor: '#F9FAFB',
            borderRadius: 16,
            marginBottom: 24,
          }}>
            {generalSettings.map((setting, index) => (
              <TouchableOpacity
                key={setting.id}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 16,
                  borderBottomWidth: index < generalSettings.length - 1 ? 1 : 0,
                  borderBottomColor: '#E5E7EB',
                }}
                onPress={() => {
                  if (!setting.toggle) {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                  }
                }}
              >
                <setting.icon size={20} color="#374151" />
                <View style={{
                  flex: 1,
                  marginLeft: 12,
                }}>
                  <Text style={{
                    fontSize: 16,
                    color: '#374151',
                  }}>
                    {setting.title}
                  </Text>
                </View>
                {setting.toggle ? (
                  <Switch
                    value={setting.title === 'Dark Mode' ? isDarkMode : isPushEnabled}
                    onValueChange={(value) => {
                      if (setting.title === 'Dark Mode') {
                        setIsDarkMode(value)
                      } else {
                        setIsPushEnabled(value)
                      }
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                    }}
                    trackColor={{ false: '#E5E7EB', true: '#10B981' }}
                    thumbColor="#fff"
                  />
                ) : (
                  <>
                    {setting.value && (
                      <Text style={{
                        marginRight: 8,
                        color: '#6B7280',
                      }}>
                        {setting.value}
                      </Text>
                    )}
                    {setting.badge && (
                      <View style={{
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        backgroundColor: '#FEF3C7',
                        borderRadius: 12,
                        marginRight: 8,
                      }}>
                        <Text style={{
                          fontSize: 12,
                          color: '#D97706',
                        }}>
                          {setting.badge}
                        </Text>
                      </View>
                    )}
                    <ChevronRight size={20} color="#9CA3AF" />
                  </>
                )}
              </TouchableOpacity>
            ))}
          </View>

          <Text style={{
            fontSize: 16,
            fontWeight: '600',
            marginBottom: 12,
            color: '#6B7280',
          }}>
            Other
          </Text>
          <View style={{
            backgroundColor: '#F9FAFB',
            borderRadius: 16,
            marginBottom: 24,
          }}>
            {otherSettings.map((setting, index) => (
              <TouchableOpacity
                key={setting.id}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 16,
                  borderBottomWidth: index < otherSettings.length - 1 ? 1 : 0,
                  borderBottomColor: '#E5E7EB',
                }}
                onPress={() => {
                  if (!setting.toggle) {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                  }
                }}
              >
                <setting.icon size={20} color="#374151" />
                <Text style={{
                  flex: 1,
                  marginLeft: 12,
                  fontSize: 16,
                  color: '#374151',
                }}>
                  {setting.title}
                </Text>
                {setting.toggle ? (
                  <Switch
                    value={isPushEnabled}
                    onValueChange={(value) => {
                      setIsPushEnabled(value)
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                    }}
                    trackColor={{ false: '#E5E7EB', true: '#10B981' }}
                    thumbColor="#fff"
                  />
                ) : (
                  <ChevronRight size={20} color="#9CA3AF" />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Logout Button */}
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 16,
              backgroundColor: '#FEE2E2',
              borderRadius: 16,
              marginBottom: 72,
            }}
            onPress={handleLogout}
          >
            <LogOut size={20} color="#EF4444" />
            <Text style={{
              marginLeft: 8,
              fontSize: 16,
              fontWeight: '600',
              color: '#EF4444',
            }}>
              Log Out
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

