import { Dimensions, View } from "react-native";
import Onboarding from 'react-native-onboarding-swiper';
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LottieView from 'lottie-react-native';

const {width, height} = Dimensions.get('window');
export default function OnBoarding(){
const navigation = useNavigation()

  const handleDone = ()=>{
    navigation.navigate('Login')
  }

    return(
        <View style={styles.container}>
            <Onboarding
            containerStyles={{paddingHorizontal: 15}}
            onDone={handleDone}
            onSkip={handleDone}
  pages={[
    {
      backgroundColor: '#a7f3d0',
      image: <View style={styles.secondContainer}>
      <LottieView source={require('../../assets/LottieFiles/jobsearch.json')} style={styles.lottie} autoPlay loop />
      </View>,
      title: 'Find Your Dream Job',
      subtitle: 'Explore thousands of job opportunities tailored to your skills and interests.',
    },
    // ...
    {
      backgroundColor: '#fef3c7',
      image: <View style={styles.secondContainer}>
      <LottieView source={require('../../assets/LottieFiles/jobsearch.json')} style={styles.lottie} autoPlay loop />
      </View>,
      title: 'Grow Your Career with Us',
      subtitle: 'Track your applications, connect with top companies, and boost your professional journey.',
    },
    {
      backgroundColor: '#ADD8E6',
      image: <View style={styles.secondContainer}>
      <LottieView source={require('../../assets/LottieFiles/jobsearch.json')} style={styles.lottie} autoPlay loop />
      </View>,
      title: 'Connect with Top Employers',
      subtitle: 'Build strong professional connections and get hired by industry leaders.',
    },
  ]}
/>
        </View>
    )
  }
  const styles = StyleSheet.create({
      container: {
      flex: 1,
      backgroundColor: '#fff',
      // alignItems: 'center',
      // justifyContent: 'center',
          },
          lottie: {
            height: width,
            width: width*0.9,
          },
          secondContainer: {
            // flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: '#fff',
          },
        });
