import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import { COLORS } from '../../assets/colors'

interface RoundButtonProps {
  text: string
  onPress: () => void
  disabled?: boolean
}

const RoundButton: React.FC<RoundButtonProps> = ({ text, onPress, disabled }: RoundButtonProps) => {
  return (
    <>
      <SafeAreaView>
        <View style={styles.container}>
          <TouchableOpacity onPress={onPress} style={styles.button} disabled={disabled !== undefined && disabled}>
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
    width: 180,
    marginBottom: 20
    // borderWidth: 2,
    // borderColor: 'red',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.cyan,
    borderRadius: 30
  },
  buttonText: {
    color: 'white',
    fontSize: 20
  }
})

export default RoundButton
