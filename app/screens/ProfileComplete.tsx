import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { ChevronLeft, ChevronRight, Check } from 'lucide-react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useState } from 'react'
import { router } from 'expo-router'

export default function ProfileComplete() {
  const insets = useSafeAreaInsets()
  const [sections] = useState([
    {
      id: 1,
      title: 'Personal Info',
      subtitle: 'Your full name, contact email, phone, address',
      completed: true,
    },
    {
      id: 2,
      title: 'Education',
      subtitle: 'Fill in your educational history till present',
      completed: false,
    },
    {
      id: 3,
      title: 'Experience',
      subtitle: 'Add your professional experience to be more noticeable',
      completed: false,
    },
    {
      id: 4,
      title: 'Application Profile',
      subtitle: 'Fill your application profile to apply to positions that match you',
      completed: false,
    },
  ])

  const completedSections = sections.filter(section => section.completed).length
  const progress = (completedSections / sections.length) * 100

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: insets.top }}>
      {/* Header */}
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingHorizontal: 16,
        height: 56,
      }}>
        <TouchableOpacity onPress={()=>router.push('/screens/main/Home')}>
          <ChevronLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={{ 
          fontSize: 16,
          fontWeight: '600',
          marginLeft: 16,
        }}>
          Complete Profile
        </Text>
      </View>

      <ScrollView style={{ flex: 1 }}>
        {/* Progress Section */}
        <View style={{ padding: 16, alignItems: 'center' }}>
          <View style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            borderWidth: 3,
            borderColor: '#E5E7EB',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <View style={{
              position: 'absolute',
              width: 60,
              height: 60,
              borderRadius: 30,
              borderWidth: 3,
              borderLeftColor: 'transparent',
              borderRightColor: 'transparent',
              borderBottomColor: 'transparent',
              borderTopColor: '#10B981',
              transform: [{ rotateZ: `${(progress / 100) * 360}deg` }],
            }} />
            <Text style={{ fontSize: 16, fontWeight: '600' }}>{progress}%</Text>
          </View>
          <Text style={{ 
            marginTop: 8,
            fontSize: 14,
            color: '#6B7280',
          }}>
            {completedSections}/4 Completed
          </Text>
        </View>

        {/* Profile Sections */}
        <View style={{ paddingHorizontal: 16 }}>
          {sections.map((section, index) => (
            <TouchableOpacity
              key={section.id}
              style={{
                marginBottom: 12,
                borderRadius: 12,
                backgroundColor: section.completed ? '#ECFDF5' : '#F9FAFB',
                padding: 16,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ 
                      fontSize: 16,
                      fontWeight: '600',
                      color: '#111827',
                      marginRight: 8,
                    }}>
                      {section.title}
                    </Text>
                    {section.completed && (
                      <View style={{
                        backgroundColor: '#10B981',
                        borderRadius: 12,
                        padding: 4,
                      }}>
                        <Check size={12} color="#fff" />
                      </View>
                    )}
                  </View>
                  <Text style={{ 
                    marginTop: 4,
                    fontSize: 14,
                    color: '#6B7280',
                  }}>
                    {section.subtitle}
                  </Text>
                </View>
                <ChevronRight size={20} color="#9CA3AF" />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

