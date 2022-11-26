import React from 'react'
import { SafeAreaView, StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { COLORS } from '../../assets/colors'

interface QuestionButtonProps {
  onPress: () => void
  size: number
  text: string
  color?: string
}

const QuestionButton: React.FC<QuestionButtonProps> = ({ onPress, size, text, color }: QuestionButtonProps) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      bottom: 2,
      left: 3
    },
    questionButton: {
      width: size * 2,
      height: size / 2,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      marginHorizontal: 8,
      borderRadius: size / 10,
      backgroundColor: color !== null ? color : COLORS.cyan
    },
    icon: {
      fontSize: 32,
      color: 'white'
    }
  })

  return (
    <>
      <SafeAreaView>
        <View style={styles.container}>
          <TouchableOpacity onPress={onPress} style={styles.questionButton}>
            <Text>{text}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  )
}

export default QuestionButton
