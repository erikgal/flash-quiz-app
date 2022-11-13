import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { Difficulties, Quiz, RouterProps } from '../../types'
import Button from '../../components/buttons/RoundButton'
import { Timestamp } from 'firebase/firestore'

const PreviewScreen: React.FC = ({ navigation }: RouterProps) => {
  const quiz: Quiz | null = useSelector((state: RootState) => state.quiz.currentQuiz)

  const handleStart = (): void => {
    navigation.navigate('QuizScreen')
  }

  return (
    <>
      {quiz != null
        ? (
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <View style={styles.textTop}>
              <Text style={styles.title}>{quiz.title}</Text>
              <Text style={styles.creatorDate}>{`${quiz.creatorName}; ${new Timestamp(
                quiz.date.seconds,
                quiz.date.nanoseconds
              )
                .toDate()
                .toDateString()}`}</Text>
              <Text style={styles.description}>{quiz.description}</Text>
            </View>
            <View style={styles.textBottom}>
              <Text style={styles.theme}>{`Theme: ${quiz.theme}`}</Text>
              <Text style={styles.theme}>{`Difficulty: ${
                Object.values(Difficulties)[quiz.difficulty]
              }`}</Text>
            </View>
          </View>
          <View style={styles.settings}>
            <Button text={'Start'} onPress={handleStart}></Button>
          </View>
        </View>
          )
        : (
        <View style={styles.textContainer}>
          <Text style={styles.title}>ERROR: The quiz was properly loaded</Text>
        </View>
          )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  textContainer: {
    flex: 2,
    alignItems: 'center',
    padding: 10
  },
  textTop: {
    width: '95%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 10
    // borderWidth: 2,
    // borderColor: 'red',
  },
  title: {
    fontSize: 30
  },
  creatorDate: {
    fontSize: 12,
    padding: 3
  },
  description: {
    fontSize: 15
  },
  textBottom: {
    width: '95%',
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
    // borderWidth: 2,
    // borderColor: 'green'
  },
  theme: {
    fontSize: 20
  },
  settings: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
    // borderWidth: 2,
    // borderColor: 'green'
  },
  button: {
    padding: 100
  }
})

export default PreviewScreen
