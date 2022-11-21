import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { COLORS } from '../../assets/colors'

interface MultipleChoiceButtonProps {
  text: string
  onPress: () => void
  disabled: boolean
  color: string
  num: number
}

const MultipleChoiceButton: React.FC<MultipleChoiceButtonProps> = ({
  text,
  onPress,
  disabled,
  color,
  num
}: MultipleChoiceButtonProps) => {
  return (
    <>
      <View style={[styles.container, { height: `${100 / num - 3}%` }]}>
        <TouchableOpacity
          onPress={onPress}
          style={[styles.button, { backgroundColor: color }]}
          disabled={disabled !== undefined && disabled}
        >
          <View style={styles.innerButtonContainer}>
            <Text style={styles.buttonText}>{text}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '22%'
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
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default MultipleChoiceButton
