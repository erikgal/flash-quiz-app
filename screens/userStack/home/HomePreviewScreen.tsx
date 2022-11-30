import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { Difficulties, Quiz, QuizType, QuizForm, RouterProps, QuizMultiple, QuestionForm, QuestionMultiple } from '../../../types'
import RoundButton from '../../../components/buttons/RoundButton'
import { Timestamp } from 'firebase/firestore'
import { setCurrentQuizForm, setCurrentQuizMultiple } from '../../../utils/redux/quizSlice'
import RNPickerSelect from 'react-native-picker-select'
import { COLORS } from '../../../assets/colors'
import { Chevron } from 'react-native-shapes'
import durstenfeldShuffle from '../../../utils/functions/durstenfeldShuffle'
import { generateDropdownData } from '../../../utils/functions/generateDropdownData'

const HomePreviewScreen: React.FC = ({ navigation }: RouterProps) => {
  const quiz: Quiz | null = useSelector((state: RootState) => state.quiz.currentQuiz)
  const [selected, setSelected] = useState<number>()

  const dispatch = useDispatch()

  const handleStart = (): void => {
    let editedQuiz: Quiz = quiz!
    if (selected !== null) {
      const shuffeledQuestions = durstenfeldShuffle([...quiz!.questions] as any[]) as QuestionForm[] | QuestionMultiple[]
      editedQuiz = { ...quiz!, questions: shuffeledQuestions.slice(0, selected) }
    }
    if (editedQuiz.type === QuizType.FormQuiz) {
      dispatch(setCurrentQuizForm(editedQuiz as QuizForm))
      navigation.navigate('QuizFormScreen')
    } else if (editedQuiz.type === QuizType.MultipleChoiceQuiz) {
      dispatch(setCurrentQuizMultiple(editedQuiz as QuizMultiple))
      navigation.navigate('QuizMultipleScreen')
    }
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
              <View style={styles.themeDiffContainer}>
                <Text style={styles.themeDiff}>{'Theme: '}</Text>
                <Text style={styles.theme}>{quiz.theme}</Text>
              </View>
              <View style={styles.themeDiffContainer}>
                <Text style={styles.themeDiff}>{'Difficulty: '}</Text>
                <Text style={styles.theme}>{Object.values(Difficulties)[quiz.difficulty]}</Text>
              </View>
            </View>
            <RNPickerSelect
              placeholder={{ value: quiz.questions.length, label: 'Select number of questions...          ' }}
              onValueChange={value => setSelected(value)}
              items={generateDropdownData(quiz.questions.length)}
              style={pickerSelectStyles}
              // @ts-expect-error
              Icon={() => <Chevron size={1.5} color="gray" onPress = {() => console.log('hei')
              }/>}
              useNativeAndroidPickerStyle={false}
              fixAndroidTouchableBug={true}
              />
          </View>
          <View style={styles.settings}>
            <RoundButton text={'Start'} onPress={handleStart} loading={false} disabled={false}></RoundButton>
          </View>
        </View>
          )
        : (
        <View style={styles.textContainer}>
          <Text style={styles.title}>ERROR; The quiz was properly loaded</Text>
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
    fontSize: 30,
    textAlign: 'center'
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
  themeDiffContainer: {
    flex: 1,
    alignItems: 'center'
  },
  themeDiff: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  theme: {
    fontSize: 20
  },
  settings: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  button: {
    padding: 100
  }
})

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 16,
    textAlign: 'center',
    minWidth: '85%',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: COLORS.cyan,
    borderRadius: 8,
    color: 'black',
    paddingRight: 30 // to ensure the text is never behind the icon
  },
  iconContainer: {
    top: 15,
    right: 15
  }
})

export default HomePreviewScreen
