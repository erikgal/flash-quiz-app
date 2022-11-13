import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { COLORS } from '../../assets/colors'

interface SignInProps {
  text: string
  onPress: () => void
  disabled?: boolean
  loading: boolean
}

const SignUpButton: React.FC<SignInProps> = ({ text, onPress, loading }: SignInProps) => {
  return (
    <>
      <SafeAreaView>
        <View style={styles.container}>
          <TouchableOpacity onPress={onPress} style={styles.button} >
            <View style={styles.innerButtonContainer}>
              <ActivityIndicator style={styles.activityIndicator} animating={false} color={'white'} />
              <Text style={styles.buttonText}>{text}</Text>
              <ActivityIndicator style={styles.activityIndicator} animating={loading} color={'white'} />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 65,
    width: 300,
    marginBottom: 20
    // borderWidth: 2,
    // borderColor: 'red',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.cyan,
    borderRadius: 10
  },
  buttonText: {
    color: 'white',
    fontSize: 20
  },
  innerButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'stretch'
  },
  activityContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    borderWidth: 2,
    borderColor: 'red'
  },
  activityIndicator: {

  }
})

export default SignUpButton
