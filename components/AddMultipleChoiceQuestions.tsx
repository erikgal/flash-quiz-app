import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'
import { TextInput } from 'react-native-paper'
import { COLORS } from '../assets/colors'
import { AddMultipleChoiceQuestionsProps } from '../types'
import QuestionButton from './buttons/QuestionButton'
import RoundButton from './buttons/RoundButton'

const AddMultipleChoiceQuestions: React.FC<AddMultipleChoiceQuestionsProps> = ({
  index,
  handleNewQuestion,
  handleRemoveQuestion,
  handleQuestionChange,
  handleAnswerChange,
  questions,
  questionFromParent
}: AddMultipleChoiceQuestionsProps) => {
  const [question, setQuestion] = useState<string>('')
  const [correctAnswer, setCorrectAnswer] = useState<string>('')
  const [possibleAnswers, setPossibleAnswers] = useState<string[]>([])
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  const alphabet: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

  const submitQuestion = (): void => {
    if (question.length !== 0 && !isSubmitted && !possibleAnswers.includes('') && possibleAnswers.length >= 2) {
      if (!question.endsWith('?')) {
        setQuestion(question + '?')
      }
      setIsSubmitted(true)
    } else if (isSubmitted) {
      setIsSubmitted(false)
    }
  }

  const handleNewPossibleAnswer = (): void => {
    setPossibleAnswers([...possibleAnswers, ''])
  }

  const handleChangePossibleAnswers = (e: NativeSyntheticEvent<TextInputChangeEventData>, index: number): void => {
    const list = [...possibleAnswers]
    list[index] = e.nativeEvent.text
    setPossibleAnswers(list)
  }

  useEffect(() => {
    if (questionFromParent.question !== question) {
      setQuestion(questionFromParent.question)
    }
    if (questionFromParent.answer.join(' ') !== correctAnswer) {
      setCorrectAnswer(questionFromParent.answer.join(' '))
    }
  }, [questions])

  useEffect(() => {
    if (questionFromParent.question !== question) {
      handleQuestionChange(question, index)
    }
  }, [question])

  return (
    <View style={styles.container}>
      <View style={styles.borderBox}>
        <View style={styles.questionInputs}>
          {!isSubmitted
            ? (
            <View style={styles.questionInputs}>
              <View>
                <TextInput label="Question" value={question} onChangeText={val => setQuestion(val)} />
                {possibleAnswers.map((answer, i) => {
                  return (
                    <View key={i}>
                      <TextInput
                        key={i}
                        value={answer}
                        label="Possible answer"
                        onChange={e => {
                          e.preventDefault()
                          handleChangePossibleAnswers(e, i)
                        }}
                      />
                    </View>
                  )
                })}
              </View>
            </View>
              )
            : (
            <>
              <View style={styles.questionTextContainer}>
                <Text style={styles.questionSubmitted}>Question: </Text>
              </View>
              <Text style={styles.text}>{question}</Text>
              <View style={styles.questionTextContainer}>
                <View style={styles.questionTextContainer}>
                  <Text style={styles.answerSubmitted}>Answer: </Text>
                </View>
                <View style={styles.answerFormContainer}>
                  {possibleAnswers.map((answer, i) => {
                    return (
                      <View key={i} style={answer === correctAnswer ? styles.formTextCorrectAnswer : styles.formText}>
                        <Text
                          style={styles.answerSubmittedText}
                          onPress={() => {
                            setCorrectAnswer(answer)
                          }}
                        >
                          {alphabet[i]}: {answer}
                        </Text>
                      </View>
                    )
                  })}
                </View>
              </View>
            </>
              )}
        </View>
        <View style={styles.submitButtonContainer}>
          {possibleAnswers.length < 6 && !isSubmitted && (
            <QuestionButton
              text={'Add answer alternative'}
              onPress={handleNewPossibleAnswer}
              size={75}
              color={COLORS.cyan}
            />
          )}
          <QuestionButton
            text={isSubmitted ? 'Edit' : 'Submit'}
            onPress={submitQuestion}
            size={75}
            color={COLORS.cyan}
          />
          {questions.length > 1 && isSubmitted && (
            <QuestionButton
              text={'Remove question'}
              onPress={() => {
                handleRemoveQuestion(index)
              }}
              size={75}
              color={COLORS.cyan}
            />
          )}
        </View>
      </View>
      <View key={question} style={styles.addQuestionButton}>
        {questions.length - 1 === index && (
          <RoundButton disabled={false} loading={false} text={'Add question'} onPress={handleNewQuestion} />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  submitButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    marginTop: 10
  },
  addQuestionButton: {
    bottom: 0
  },
  questionText: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  text: {
    fontSize: 22,
    paddingRight: 5,
    marginLeft: '2%'
  },
  formText: {
    backgroundColor: COLORS.lightGrey,
    fontSize: 22,
    paddingRight: 5,
    margin: 2
  },
  formTextCorrectAnswer: {
    backgroundColor: COLORS.green,
    fontSize: 22,
    paddingRight: 5,
    margin: 2
  },
  questionInputs: {
    flex: 1,
    flexDirection: 'column'
  },
  questionSubmitted: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  questionSubmittedTitle: {
    flex: 1,
    alignContent: 'center'
  },
  answerSubmitted: {
    fontSize: 22,
    marginRight: 13,
    fontWeight: 'bold'
  },
  borderBox: {
    backgroundColor: COLORS.grey,
    borderRadius: 20,
    padding: 10,
    width: '98%',
    alignSelf: 'center'
  },
  answerSubmittedText: {
    fontSize: 22
  },
  answerSubmittedForm: {
    fontSize: 22,
    left: 13
  },
  submittedQuestion: {
    flexWrap: 'wrap'
  },
  questionTextContainer: {
    alignItems: 'center',
    padding: '2%'
  },
  answerFormContainer: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'flex-start'
  }
})

export default AddMultipleChoiceQuestions
