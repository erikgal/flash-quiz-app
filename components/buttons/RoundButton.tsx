import React from 'react'
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { COLORS } from '../../assets/colors'

interface RoundButtonProps {
  text: string
  onPress: () => void
  disabled: boolean
  loading?: boolean
}

const RoundButton: React.FC<RoundButtonProps> = ({ text, onPress, disabled, loading }: RoundButtonProps) => {
  return (
    <>
      <SafeAreaView>
        <View style={styles.container}>
          <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor: disabled ? 'grey' : COLORS.cyan }]} disabled={disabled !== undefined && disabled}>
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
    width: 180,
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
    borderRadius: 30
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
    paddingRight: 8
  }
})

export default RoundButton
