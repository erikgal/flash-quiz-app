import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { TextInput } from 'react-native-paper'
import { COLORS } from '../assets/colors'
import { RouterProps, QuestionsCreateQuizProps } from '../types'
import QuestionButton from './buttons/QuestionButton'
import RoundButton from './buttons/RoundButton'

const QuestionsCreateQuiz: React.FC<QuestionsCreateQuizProps> = ({
  index,
  handleNewQuestion,
  handleRemoveQuestion,
  handleQuestionChange,
  handleAnswerChange,
  questions,
  questionFromParent
}: QuestionsCreateQuizProps & RouterProps) => {
  const [questionIsToggled, setQuestionIsToggled] = useState<boolean>(true)
  const [colorQuestion, setColorQuestion] = useState<string>(COLORS.blue)
  const [colorForm, setColorForm] = useState<string>(COLORS.cyan)
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [question, setQuestion] = useState<string>('')
  const [answer, setAnswer] = useState<string>('')

  const submitQuestion = (): void => {
    if (question.length !== 0 && !isSubmitted && answer.length >= 1 && questionIsToggled) {
      if (!question.endsWith('?')) {
        setQuestion(question + '?')
      }
      setIsSubmitted(true)
      handleAnswerChange(answer, index)
    } else if (question.length !== 0 && !isSubmitted && !questionIsToggled) {
      setIsSubmitted(true)
      handleQuestionChange(question, index)
    } else if (isSubmitted) {
      setIsSubmitted(false)
      if (!questionIsToggled) {
        setAnswer('')
      }
    }
  }

  const changeToggleColors = (): void => {
    if (!isSubmitted) {
      if (questionIsToggled) {
        setColorQuestion(COLORS.blue)
        setColorForm(COLORS.cyan)
      } else {
        setColorQuestion(COLORS.cyan)
        setColorForm(COLORS.blue)
      }
      setAnswer('')
    }
  }

  const handleChangeQuestionType = (val: boolean): void => {
    if (!isSubmitted) {
      setQuestionIsToggled(val)
    }
  }

  useEffect(() => {
    if (!isSubmitted) {
      changeToggleColors()
      if (questionFromParent.question !== question && questionFromParent.question !== null) {
        setQuestion(questionFromParent.question)
        console.log('hei')
      } else if (questionFromParent.answer.join(' ') !== answer && questionFromParent.answer !== null) {
        setAnswer(questionFromParent.answer.join(' '))
      }
    }
  }, [questions, questionFromParent, questionIsToggled, handleRemoveQuestion])

  return (
    <View style={styles.container}>
      <View style={styles.borderBox}>
        {!isSubmitted && (
          <View style={styles.container2}>
            <QuestionButton
              text="Question"
              onPress={() => handleChangeQuestionType(true)}
              size={75}
              color={colorQuestion}
            />
            <QuestionButton text="Form" onPress={() => handleChangeQuestionType(false)} size={75} color={colorForm} />
          </View>
        )}
        <View style={styles.questionInputs}>
          {!isSubmitted
            ? (
            <View style={styles.questionInputs}>
              {questionIsToggled
                ? (
                <View>
                  <TextInput label="Question" value={question} onChangeText={val => {
                    setQuestion(val)
                    handleQuestionChange(val, index)
                  }} />
                  <TextInput label="Answer" value={answer} editable={true} onChangeText={val => setAnswer(val)} />
                </View>
                  )
                : (
                <TextInput
                  editable={true}
                  style={styles.questionInputs}
                  label="Question"
                  value={question}
                  onChangeText={val => setQuestion(val)}
                />
                  )}
            </View>
              )
            : (
            <>
              {questionIsToggled
                ? (
                <>
                  <View style={styles.questionTextContainer}>
                    <Text style={styles.questionSubmitted}>Question: </Text>
                  </View>
                  <Text style={styles.text}>{question}</Text>
                  <View style={styles.questionTextContainer}>
                    <Text style={styles.answerSubmitted}>Answer: </Text>
                  </View>
                  <Text style={styles.text}>{answer}</Text>
                </>
                  )
                : (
                <>
                  <View style={styles.questionTextContainer}>
                    <Text style={styles.questionSubmitted}>Question:</Text>
                  </View>
                  <View style={styles.answerFormContainer}>
                    {question.split(' ').map((questionPart, i) => {
                      return (
                        <View key={i} style={questionPart === answer ? styles.formTextCorrectAnswer : styles.formText}>
                          <Text style={styles.questionSubmitted} onPress={() => setAnswer(question.split(' ')[i])}>
                            {questionPart}
                          </Text>
                        </View>
                      )
                    })}
                  </View>
                  <View style={styles.questionTextContainer}>
                    <Text style={styles.answerSubmitted}>Answer:</Text>
                  </View>
                  <Text style={styles.answerSubmittedForm}>{answer}</Text>
                </>
                  )}
            </>
              )}
        </View>
        <View style={styles.submitButtonContainer}>
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
      <View style={styles.buttonContainerQuestion} key={question}>
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
  container2: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 2
  },
  questionContainer: {
    marginBottom: 5
  },
  buttonContainerQuestion: {
    marginTop: 50
  },
  submitButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    marginTop: 10
  },
  buttonGroup: {
    flex: 0,
    flexDirection: 'row'
  },
  questionText: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  text: {
    fontSize: 22,
    paddingRight: 5
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
    flex: 4,
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
    flexDirection: 'row'
  }
})

export default QuestionsCreateQuiz
