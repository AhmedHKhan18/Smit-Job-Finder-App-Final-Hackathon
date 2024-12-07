import { Dimensions, View, TouchableOpacity, Text } from "react-native";
import Onboarding from 'react-native-onboarding-swiper';
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LottieView from 'lottie-react-native';
import { setItem } from "../utils/asyncStorage";

const {width, height} = Dimensions.get('window');
export default function OnBoarding(){
const navigation = useNavigation()

  const handleDone = ()=>{
    navigation.navigate('Login')
    setItem('onboarded', '1')
  }

  const DoneButton = ({...props})=>{
    return(
      <TouchableOpacity style={styles.doneButton} {...props}>
        <Text>Done</Text>
      </TouchableOpacity>
    )
  }

    return(
        <View style={styles.container}>
            <Onboarding
            containerStyles={{paddingHorizontal: 15, paddingVertical: 100, color: '#fff'}}
            onDone={handleDone}
            onSkip={handleDone}
            DoneButtonComponent={DoneButton}
            bottomBarHighlight={false}
            titleStyles={styles.title}
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
      <LottieView source={require('../../assets/LottieFiles/graph.json')} style={styles.lottie} autoPlay loop />
      </View>,
      title: 'Grow Your Career with Us',
      subtitle: 'Track your applications, connect with top companies, and boost your professional journey.',
    },
    {
      backgroundColor: '#a78bfa',
      image: <View style={styles.secondContainer}>
      <LottieView source={require('../../assets/LottieFiles/connections.json')} style={styles.lottie} autoPlay loop />
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
          doneButton:{
            padding: 20,     
          },
          title:{
            fontWeight: 'bold',            
          }
        });
