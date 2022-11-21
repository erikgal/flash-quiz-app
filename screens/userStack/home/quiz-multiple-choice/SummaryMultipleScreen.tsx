import Button from '../../../../components/buttons/RoundButton'
import React, { useEffect } from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { QuizMultiple, RouterProps, UserAnswersMultiple } from '../../../../types'
import { StackActions } from '@react-navigation/native'
import { RootState } from '../../../../store'
import { useSelector } from 'react-redux'
import { decode } from 'html-entities'

const SummaryMultipleScreen: React.FC = ({ navigation }: RouterProps) => {
  const quiz: QuizMultiple | null = useSelector((state: RootState) => state.quiz.currentQuizMultiple)
  const { corrections, userAnswers }: UserAnswersMultiple = useSelector(
    (state: RootState) => state.quiz.userAnswersMultiple
  )
  const numOfCorrect = corrections.filter(correction => correction).length
  const numOfWrong = corrections.filter(correction => !correction).length

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

  const handleClose = (): void => {
    navigation.dispatch(StackActions.popToTop())
  }

  const getScrollViewContent = (): Array<JSX.Element | null> => {
    return quiz!.questions.map((question, i) => {
      if (!corrections[i]) {
        const formattedAnswers = [<Text key={'wrong answer'} style={{ color: 'red' }}>{`${userAnswers[i]}`}</Text>,
        <Text key={'correct answer'}>{' (Correct answer: '}</Text>,
        <Text key={'answer'} style={{ color: 'green' }} >{`${decode(question.answer)}`}</Text>,
        <Text key={')'} >{')'}</Text>]

        return (
          <View style={styles.textWrap} key={i}>
            {question.question
              .split(' ')
              .map((word, j) => (
                <Text key={j} style={styles.word}>
                  {decode(word)}
                </Text>
              ))
              .concat(formattedAnswers)}
          </View>
        )
      } else {
        return null
      }
    })
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
    fontSize: 19,
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

export default SummaryMultipleScreen
