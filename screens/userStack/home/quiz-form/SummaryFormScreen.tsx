import Button from '../../../../components/buttons/RoundButton'
import React, { useEffect } from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { QuizForm, RouterProps, UserAnswersForm } from '../../../../types'
import { StackActions } from '@react-navigation/native'
import { RootState } from '../../../../store'
import { useSelector } from 'react-redux'

const SummaryFormScreen: React.FC = ({ navigation }: RouterProps) => {
  const quiz: QuizForm | null = useSelector((state: RootState) => state.quiz.currentQuizForm)
  const { corrections, userAnswers }: UserAnswersForm = useSelector((state: RootState) => state.quiz.userAnswersForm)
  const numOfCorrect = corrections.flat().filter(correction => correction).length
  const numOfWrong = corrections.flat().filter(correction => !correction).length

  useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        if (e.data.action.type === 'GO_BACK') {
          e.preventDefault()
          navigation.dispatch(StackActions.popToTop())
        }
      }),

    [navigation]
  )

  const getScrollViewContent = (): Array<JSX.Element | null> => {
    return quiz!.questions.map((question, i) => {
      let answerCounter = 0

      if (corrections[i].some(correction => !correction)) {
        const correctAnswers: string[] = []
        quiz?.questions[i].answer.forEach((answer, j) => {
          if (!corrections[i][j]) {
            correctAnswers.push(answer.join('/'))
          }
        })

        const formattedAnswers = (
          <Text key={'formattedAnswers'}>{`(Correct answer: ${correctAnswers.join(', ')})`}</Text>
        )

        return (
          <View style={styles.textWrap} key={i}>
            {question.question
              .split(' ')
              .map((word, j) => {
                if (word.includes('xxx')) {
                  answerCounter += 1
                  return (
                    <Text key={j} style={[styles.word, { color: corrections[i][answerCounter - 1] ? 'green' : 'red' }]}>
                      {userAnswers[i][j] !== '' ? userAnswers[i][j] : '__'}
                    </Text>
                  )
                }
                return (
                  <Text key={j} style={styles.word}>
                    {word}
                  </Text>
                )
              })
              .concat(formattedAnswers)}
          </View>
        )
      } else {
        return null
      }
    })
  }

  const handleClose = (): void => {
    navigation.dispatch(StackActions.popToTop())
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <View style={styles.textTop}>
            <View style={styles.correctWrongContainer}>
              <Text style={styles.statsText}>{`Correct answers: ${numOfCorrect}`}</Text>
              <Text style={styles.statsText}>{`Wrong answers: ${numOfWrong}`}</Text>
            </View>
            <View style={styles.accuracyContainer}>
              <Text style={styles.statsText}>{`Accuracy: ${Math.round(
                (numOfCorrect / (numOfCorrect + numOfWrong)) * 100
              )}%`}</Text>
            </View>
          </View>
          <View style={styles.textBottom}>
            <Text style={[styles.statsText, { fontWeight: 'normal' }]}>Wrongly answered questions:</Text>
            <ScrollView persistentScrollbar={true}>{getScrollViewContent()}</ScrollView>
          </View>
        </View>
        <View style={styles.settings}>
          <Button text={'Close'} onPress={handleClose} disabled={false} loading={false}></Button>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  textContainer: {
    flex: 5,
    alignItems: 'center',
    padding: 10
    // borderWidth: 2,
    // borderColor: 'red'
  },
  textTop: {
    flex: 1,
    width: '95%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingBottom: 10
    // borderWidth: 2,
    // borderColor: 'magenta'
  },
  correctWrongContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
    // borderWidth: 2,
    // borderColor: 'purple'
  },
  accuracyContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
    // borderWidth: 2,
    // borderColor: 'yellow'
  },
  statsText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  textBottom: {
    width: '95%',
    flex: 5,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center'
    // borderWidth: 2,
    // borderColor: 'pink'
  },
  word: {
    fontSize: 15,
    paddingRight: 5
  },
  textWrap: {
    flex: 0,
    height: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 30
    // borderWidth: 2,
    // borderColor: 'green'
  },
  settings: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
    // borderWidth: 2,
    // borderColor: 'black'
  },
  button: {
    padding: 100
  }
})

export default SummaryFormScreen
