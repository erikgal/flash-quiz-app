import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import { COLORS } from '../../assets/colors'

interface SignOutProps {
  text: string
  onPress: () => void
  disabled?: boolean
}

const SignOutButton: React.FC<SignOutProps> = ({ text, onPress }: SignOutProps) => {
  return (
    <>
      <SafeAreaView>
        <View style={styles.container}>
          <TouchableOpacity onPress={onPress} style={styles.button} >
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
    backgroundColor: COLORS.cyan,
    borderRadius: 10
  },
  buttonText: {
    color: 'white',
    fontSize: 20
  }
})

export default SignOutButton
