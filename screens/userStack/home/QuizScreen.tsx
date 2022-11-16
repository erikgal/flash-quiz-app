import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, TextInput, Keyboard } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import RoundButton from '../../../components/buttons/RoundButton'
import { RootState } from '../../../store'
import { saveUserAnswers } from '../../../utils/redux/quizSlice'

import { Quiz, Question, RouterProps, InputMap } from '../../../types'

function getNumberOfChars (index: number, question: Question): number {
  const inputIndexArray: number[] = []
  question.question.split(' ').forEach((word, i) => {
    if (word.includes('xxx')) {
      inputIndexArray.push(i)
    }
  })

  let inputNumber: number | null = null
  inputIndexArray.forEach((inputIndex, i) => {
    if (inputIndex === index) {
      inputNumber = i
    }
  })

  if (inputNumber != null) {
    const answer = question.answer[inputNumber].reduce((a, b) => (a.length > b.length ? a : b), '')
    return answer.length
  }
  console.log('ERROR: The answer corresponding to the input was not found')
  return 0
}

const QuizScreen: React.FC = ({ navigation }: RouterProps) => {
  const [questionIndex, setQuestionIndex] = useState<number>(0)
  const [userAnswers, setUserAnswers] = useState<InputMap>({})
  const [previousAnswers, setPreviousAnswers] = useState<InputMap[]>([])
  const [corrections, setCorrections] = useState<boolean[]>([])
  const [previousCorrections, setPreviousCorrections] = useState<boolean[][]>([])
  const quiz: Quiz | null = useSelector((state: RootState) => state.quiz.currentQuiz)

  const dispatch = useDispatch()

  useEffect(() => {
    if (quiz != null && questionIndex < quiz.questions.length) {
      const tempAnswers: InputMap = {}
      quiz?.questions[questionIndex]?.question.split(' ').forEach((word, i) => {
        if (word.includes('xxx')) {
          tempAnswers[i] = ''
        }
        setUserAnswers(tempAnswers)
      })
    } else {
      dispatch(saveUserAnswers({ corrections: previousCorrections, userAnswers: previousAnswers }))
      navigation.navigate('SummaryScreen')
    }
  }, [questionIndex])

  const getFormattedQuestion = (): JSX.Element[] | null => {
    return quiz != null
      ? quiz.questions[questionIndex].question.split(' ').map((word, i) => {
        // Before submission
        if (corrections.length === 0) {
          if (!word.includes('xxx')) {
            return (
                <Text key={i} style={styles.text}>
                  {word}
                </Text>
            )
          }
          const numberOfChars = getNumberOfChars(i, quiz.questions[questionIndex])
          return (
              <TextInput
                key={i}
                style={[styles.input, { minWidth: numberOfChars * 14 }]}
                onChangeText={value => handleChangeAnswers(value, i)}
                value={Object.keys(userAnswers).includes(i.toString()) ? userAnswers[i] : ''}
              />
          )
          // After submission
        } else {
          if (!word.includes('xxx')) {
            return (
                <Text key={i} style={styles.text}>
                  {word}
                </Text>
            )
          } else {
            inputCounter += 1
            return (
                <Text
                  key={i}
                  style={[styles.text, { color: corrections[inputCounter - 1] ? 'green' : 'red' }]}
                >
                  {userAnswers[i] !== '' ? userAnswers[i] : '__'}
                </Text>
            )
          }
        }
      })
      : null
  }

  const getCorrectionText = (): JSX.Element | null => {
    return corrections.length > 0
      ? (
          corrections.every(bool => bool)
            ? (
        <Text style={styles.correctText}>Correct</Text>
              )
            : (
        <>
          <Text> Correct answers: </Text>
          {quiz?.questions[questionIndex].answer.map((answer, i) => {
            if (corrections[i]) {
              return null
            } else if (Array.isArray(answer)) {
              return <Text key={i}>{answer.join('/')}</Text>
            }
            return <Text key={i}>{answer}</Text>
          })}
        </>
              )
        )
      : null
  }

  const handleChangeAnswers = (value: string, index: number): void => {
    setUserAnswers(prevAnswers => {
      return {
        ...prevAnswers,
        [index]: value
      }
    })
  }

  const handleSubmit = (): void => {
    const correctedAnswers: boolean[] = Object.keys(userAnswers).map((answerKey, i) => {
      if (quiz === null) {
        return false
      }

      return (quiz.questions[questionIndex].answer[i]).some(
        possibleAnswer => possibleAnswer.toLowerCase() === userAnswers[answerKey].toLowerCase()
      )
    })
    setCorrections(correctedAnswers)
    Keyboard.dismiss()
  }

  const handleNext = (): void => {
    setPreviousAnswers(prevAnswers => {
      return [...prevAnswers, userAnswers]
    })
    setPreviousCorrections(prevCorrection => {
      return [...prevCorrection, corrections]
    })
    setUserAnswers({})
    setCorrections([])
    setQuestionIndex(questionIndex + 1)
  }

  let inputCounter = 0

  return (
    <View style={styles.container}>
      {questionIndex < quiz!.questions.length && (
        <>
          <View style={styles.textContainer}>
            <View style={styles.answerTextContainer}>
              <View style={styles.textWrap}>{getFormattedQuestion()}</View>
              {getCorrectionText()}
            </View>
          </View>
          <RoundButton
            text={
              corrections.length === 0
                ? 'Submit'
                : questionIndex < quiz!.questions.length - 1
                  ? 'Next'
                  : 'Finish'
            }
            onPress={corrections.length === 0 ? handleSubmit : handleNext}
            disabled={Object.values(userAnswers).every(value => value === '')}
            loading={false}
          />
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: '75%',
    maxWidth: '90%'
    // borderWidth: 2,
    // borderColor: 'red'
  },
  answerTextContainer: {
    flex: 1,
    alignItems: 'center'
    // borderWidth: 2,
    // borderColor: 'blue'
  },
  textWrap: {
    flex: 0,
    height: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap'
    // borderWidth: 2,
    // borderColor: 'green'
  },
  text: {
    fontSize: 28,
    paddingRight: 5
    // borderWidth: 2,
    // borderColor: 'red'
  },
  correctText: {
    marginTop: 5,
    fontSize: 20,
    color: 'green'
  },
  falseText: {
    marginTop: 5,
    fontSize: 20,
    color: 'red'
  },
  input: {
    height: 41.4,
    borderBottomWidth: 2,
    paddingRight: 5,
    fontSize: 28
    // borderWidth: 2,
    // borderColor: 'green'
  }
})

export default QuizScreen
