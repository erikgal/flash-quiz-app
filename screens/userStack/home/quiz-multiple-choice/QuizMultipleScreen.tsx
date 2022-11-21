import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { COLORS } from '../../../../assets/colors'
import MultipleChoiceButton from '../../../../components/buttons/MultipleChoiceButton'
import { RootState } from '../../../../store'
import { RouterProps, QuizMultiple } from '../../../../types'
import durstenfeldShuffle from '../../../../utils/functions/durstenfeldShuffle'
import { saveUserMultipleAnswers } from '../../../../utils/redux/quizSlice'
import { decode } from 'html-entities'

interface ColorMap {
  [key: number]: string
}

function getMultipleChoices (quiz: QuizMultiple, questionIndex: number): string[] {
  return [...quiz.questions[questionIndex].incorrect_answers, quiz.questions[questionIndex].answer]
}

function initiateColorMap (number: number): ColorMap {
  const map: ColorMap = {}
  Array.from(Array(number).keys()).forEach(num => {
    map[num] = COLORS.cyan
  }
  )
  return map
}

const QuizMultipleScreen: React.FC = ({ navigation }: RouterProps) => {
  const [questionIndex, setQuestionIndex] = useState<number>(0)
  const [answerIndices, setAnswerIndices] = useState<number[]>([])
  const [visible, setVisible] = useState<boolean>(false)
  const [colorMap, setColorMap] = useState<ColorMap>({})
  const [correctAnswered, setCorrectAnswered] = useState<boolean[]>([])
  const [userAnswers, setUserAnswers] = useState<string[]>([])
  const quiz: QuizMultiple | null = useSelector((state: RootState) => state.quiz.currentQuizMultiple)
  const multipleChoices = quiz != null ? getMultipleChoices(quiz, questionIndex) : null
  const dispatch = useDispatch()

  useEffect(() => {
    if (quiz != null) {
      setAnswerIndices(durstenfeldShuffle([...Array(getMultipleChoices(quiz, questionIndex).length).keys()]))
      setColorMap(initiateColorMap(getMultipleChoices(quiz, questionIndex).length))
    }
  }, [quiz])

  const handlePressedAnswer = (answerIndex: number): void => {
    const correctAnswer = multipleChoices![answerIndex] === quiz!.questions[questionIndex].answer
    const tempMap: ColorMap = initiateColorMap(getMultipleChoices(quiz!, questionIndex).length)
    answerIndices.forEach(choice => {
      if (multipleChoices![choice] === quiz!.questions[questionIndex].answer) {
        tempMap[choice] = 'green'
      } else if (answerIndex === choice && !correctAnswer) {
        tempMap[choice] = 'red'
      }
    })
    setCorrectAnswered([...correctAnswered, correctAnswer])
    setUserAnswers([...userAnswers, multipleChoices![answerIndex]])
    setColorMap(tempMap)
    setVisible(true)
  }

  const handleNext = (): void => {
    if (questionIndex + 1 < quiz!.questions.length) {
      setQuestionIndex(questionIndex + 1)
      setVisible(false)
      setAnswerIndices(durstenfeldShuffle([...Array(getMultipleChoices(quiz!, questionIndex + 1).length).keys()]))
      setColorMap(initiateColorMap(getMultipleChoices(quiz!, questionIndex + 1).length))
    } else {
      dispatch(saveUserMultipleAnswers({ corrections: correctAnswered, userAnswers }))
      navigation.navigate('SummaryMultipleScreen')
    }
  }

  return (
    <View style={styles.container}>
      {questionIndex < quiz!.questions.length && (
        <>
          <View style={styles.textContainer}>
            {quiz != null && <Text style={styles.questionText}>{decode(quiz.questions[questionIndex].question)}</Text>}
          </View>
          <View style={styles.buttonContainer}>
            {answerIndices.map(answerIndex => (
              <MultipleChoiceButton
                key={answerIndex}
                text={multipleChoices != null ? decode(multipleChoices[answerIndex]) : ''}
                disabled={false}
                onPress={() => handlePressedAnswer(answerIndex)}
                color={colorMap[answerIndex]}
                num={answerIndices.length}
              />
            ))}
          </View>
        </>
      )}
      {visible && <TouchableOpacity onPress={handleNext} style={styles.invisibleNextOpacity}/>}
      <Text style={styles.questionNumber}>
        {`${questionIndex + 1}/${quiz!.questions.length}`}
      </Text>
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
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '93%'
    // borderWidth: 2,
    // borderColor: 'red'
  },
  questionText: {
    fontSize: 22,
    paddingRight: 5,
    alignContent: 'center'
  },
  buttonContainer: {
    flex: 3,
    width: '95%',
    justifyContent: 'space-evenly'
  },
  invisibleNextOpacity: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(52, 52, 52, 0.05)',
    position: 'absolute'
  },
  questionNumber: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 5,
    fontSize: 20
  }
})

export default QuizMultipleScreen
