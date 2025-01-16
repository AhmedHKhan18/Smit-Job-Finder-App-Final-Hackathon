import { useState, useRef } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  Platform,
  RefreshControl,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import {
  ChevronLeft,
  MessageCircle,
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Home,
  BookmarkCheck,
  Mail,
  User,
} from 'lucide-react-native'
import { BlurView } from 'expo-blur'
import * as Haptics from 'expo-haptics'
import { AnimatedCircularProgress } from 'react-native-circular-progress'

export default function Applied() {
  const [activeTab, setActiveTab] = useState('in-progress')
  const [refreshing, setRefreshing] = useState(false)
  const scrollY = useRef(new Animated.Value(0)).current

  const tabs = [
    { id: 'in-progress', label: 'In Progress', count: 2 },
    { id: 'accepted', label: 'Accepted', count: 1 },
    { id: 'declined', label: 'Declined', count: 1 },
  ]

  const timeline = ['Applied', 'Selected', 'Interview', 'Hired']

  const jobs = [
    {
      id: 1,
      title: 'Webflow Developer',
      company: 'Workflowy',
      location: 'Sydney',
      type: 'Full-Time',
      workMode: 'Hybrid',
      logo: '/placeholder.svg',
      status: 'applied',
      appliedDate: '2 days ago',
      nextStep: 'Technical Interview on 15th Dec',
      matchScore: 92,
      salary: '$90k - $120k',
      applicationProgress: 25,
    },
    {
      id: 2,
      title: 'Webflow Developer',
      company: 'Workflowy',
      location: 'Sydney',
      type: 'Full-Time',
      workMode: 'Hybrid',
      logo: '/placeholder.svg',
      status: 'selected',
      appliedDate: '2 days ago',
      nextStep: 'HR Interview scheduled',
      matchScore: 88,
      salary: '$85k - $110k',
      applicationProgress: 50,
    },
    {
      id: 3,
      title: 'Webflow Developer',
      company: 'Workflowy',
      location: 'Sydney',
      type: 'Full-Time',
      workMode: 'Hybrid',
      logo: '/placeholder.svg',
      status: 'rejected',
      appliedDate: '2 days ago',
      feedback: 'Position has been filled',
      matchScore: 75,
      applicationProgress: 100,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied':
        return '#10B981'
      case 'selected':
        return '#6366F1'
      case 'rejected':
        return '#EF4444'
      default:
        return '#6B7280'
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 2000))
    setRefreshing(false)
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar style="dark" />

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#10B981"
          />
        }
        contentContainerStyle={{ paddingBottom: 100 }}
      >

      {/* Header */}
      <View style={{
        paddingTop: Platform.OS === 'ios' ? 50 : 20,
        paddingHorizontal: 10,
        paddingBottom: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
      }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 25,
          justifyContent: 'center',
        }}>
          {/* <TouchableOpacity>
            <ChevronLeft size={24} color="#374151" />
          </TouchableOpacity> */}
          <Text style={{
            flex: 1,
            fontSize: 20,
            fontWeight: '600',
            textAlign: 'center',
            // marginRight: 24,
          }}>
            Applied Jobs
          </Text>
        </View>

        {/* Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 12 }}
        >
          {tabs.map(tab => (
            <TouchableOpacity
              key={tab.id}
              style={{
                paddingHorizontal: 20,
                paddingVertical: 8,
                borderRadius: 20,
                backgroundColor: activeTab === tab.id ? '#10B981' : '#F3F4F6',
              }}
              onPress={() => {
                setActiveTab(tab.id)
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Text style={{
                  fontSize: 14,
                  fontWeight: '500',
                  color: activeTab === tab.id ? '#fff' : '#374151',
                }}>
                  {tab.label}
                </Text>
                <View style={{
                  paddingHorizontal: 6,
                  paddingVertical: 2,
                  borderRadius: 10,
                  backgroundColor: activeTab === tab.id ? '#064E3B' : '#E5E7EB',
                }}>
                  <Text style={{
                    fontSize: 12,
                    color: activeTab === tab.id ? '#fff' : '#374151',
                  }}>
                    {tab.count}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

     
        {/* Timeline */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            padding: 16,
            gap: 32,
          }}
        >
          {timeline.map((step, index) => (
            <View
              key={step}
              style={{
                alignItems: 'center',
                opacity: index === 0 ? 1 : 0.5,
              }}
            >
              <View style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: index === 0 ? '#ECFDF5' : '#F3F4F6',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 8,
              }}>
                {index === 0 && (
                  <CheckCircle2 size={24} color="#10B981" />
                )}
              </View>
              <Text style={{
                fontSize: 14,
                color: index === 0 ? '#10B981' : '#6B7280',
                fontWeight: index === 0 ? '500' : '400',
              }}>
                {step}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* Job Cards */}
        <View style={{ padding: 16, gap: 16 }}>
          {jobs.map(job => (
            <TouchableOpacity
              key={job.id}
              style={{
                backgroundColor: '#fff',
                borderRadius: 16,
                padding: 16,
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
            >
              <View style={{
                flexDirection: 'row',
                marginBottom: 12,
              }}>
                <Image
                  source={{ uri: job.logo }}
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
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 4,
                    gap: 12,
                  }}>
                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                      <MapPin size={14} color="#6B7280" />
                      <Text style={{
                        marginLeft: 4,
                        fontSize: 12,
                        color: '#6B7280',
                      }}>
                        {job.location}
                      </Text>
                    </View>
                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                      <Clock size={14} color="#6B7280" />
                      <Text style={{
                        marginLeft: 4,
                        fontSize: 12,
                        color: '#6B7280',
                      }}>
                        {job.appliedDate}
                      </Text>
                    </View>
                  </View>
                </View>
                <AnimatedCircularProgress
                  size={40}
                  width={3}
                  fill={job.applicationProgress}
                  tintColor="#10B981"
                  backgroundColor="#F3F4F6"
                >
                  {() => (
                    <Text style={{
                      fontSize: 12,
                      fontWeight: '500',
                      color: '#10B981',
                    }}>
                      {job.applicationProgress}%
                    </Text>
                  )}
                </AnimatedCircularProgress>
              </View>

              <View style={{
                flexDirection: 'row',
                marginBottom: 12,
                gap: 8,
              }}>
                <View style={{
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  backgroundColor: '#F3F4F6',
                  borderRadius: 12,
                }}>
                  <Text style={{ fontSize: 12, color: '#374151' }}>
                    {job.type}
                  </Text>
                </View>
                <View style={{
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  backgroundColor: '#F3F4F6',
                  borderRadius: 12,
                }}>
                  <Text style={{ fontSize: 12, color: '#374151' }}>
                    {job.workMode}
                  </Text>
                </View>
                <View style={{
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  backgroundColor: '#ECFDF5',
                  borderRadius: 12,
                }}>
                  <Text style={{ fontSize: 12, color: '#10B981' }}>
                    {job.matchScore}% Match
                  </Text>
                </View>
              </View>

              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                }}>
                  <View style={{
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    backgroundColor: '#F3F4F6',
                    borderRadius: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 4,
                  }}>
                    <Calendar size={14} color="#374151" />
                    <Text style={{ fontSize: 12, color: '#374151' }}>
                      {job.nextStep || job.feedback}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    backgroundColor: '#10B981',
                    borderRadius: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 4,
                  }}
                  onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
                >
                  <MessageCircle size={16} color="#fff" />
                  <Text style={{ fontSize: 12, color: '#fff' }}>
                    Contact
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      </View>
  )
}

