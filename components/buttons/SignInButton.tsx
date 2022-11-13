import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import { COLORS } from '../../assets/colors'

interface SignInProps {
  text: string
  onPress: () => void
  backgroundColor: string
}

const SignInButton: React.FC<SignInProps> = ({ text, onPress, backgroundColor }: SignInProps) => {
  return (
    <>
      <SafeAreaView>
        <View style={[styles.container, { backgroundColor }]}>
          <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor }]} >
            <Text style={styles.buttonText}>{text}</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10
  },
  buttonText: {
    color: COLORS.cyan,
    fontSize: 20
  }
})

export default SignInButton
