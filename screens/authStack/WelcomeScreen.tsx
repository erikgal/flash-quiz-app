import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import SignIn from '../../components/buttons/SignInButton'
import SignUp from '../../components/buttons/SignUpButton'
import { RouterProps } from '../../types'

const WelcomeScreen: React.FC = ({ navigation }: RouterProps) => {
  const signUp = (): void => {
    navigation.navigate('SignUpScreen')
  }

  const signIn = (): void => {
    navigation.navigate('SignInScreen')
  }

  return (
    <View style={styles.container}>
      <View style={styles.welcomeContainer}>
        <View style={styles.imageContainer}>
          <View style={styles.imagePadding}></View>
          <View style={styles.image}>
            <Image source={require('../../assets/student-studying.png')} style={styles.imageStyle}></Image>
          </View>
        </View>
        <View style={styles.welcomeParagraph}>
          <Text style={styles.welcomeText}>
            Welcome to FlashQuiz!
          </Text>
          <Text style={styles.welcomeDesc}>
            This app was developed as a student project to make learning and memorization fun and easy!
          </Text>
        </View>
      </View>
      <View style={styles.signInUpContainer}>
        <SignUp onPress={signUp} text={'Sign up'} loading={false}/>
        <SignIn onPress={signIn} text={'Sign in'} backgroundColor={'#f7f7f7'}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7'
  },
  welcomeContainer: {
    flex: 6,
    alignItems: 'center'
    // borderWidth: 2,
    // borderColor: 'red'
  },
  imageContainer: {
    flex: 5
    // borderWidth: 2,
    // borderColor: 'blue'
  },
  imagePadding: {
    flex: 1
    // borderWidth: 2,
    // borderColor: 'black'
  },
  image: {
    flex: 3,
    alignItems: 'center'
    // borderWidth: 2,
    // borderColor: 'cyan'
  },
  imageStyle: {
    width: undefined,
    height: '100%',
    aspectRatio: 1
  },
  welcomeParagraph: {
    maxWidth: '90%',
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
    // borderWidth: 2,
    // borderColor: 'yellow'
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  welcomeDesc: {
    fontSize: 15,
    alignContent: 'center',
    justifyContent: 'center'
  },
  signInUpContainer: {
    flex: 2,
    alignItems: 'center'
    // borderWidth: 2,
    // borderColor: 'green'
  }
})
export default WelcomeScreen
