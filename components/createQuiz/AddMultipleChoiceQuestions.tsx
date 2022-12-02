import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { TextInput } from 'react-native-paper'
import { COLORS } from '../../assets/colors'
import { AddMultipleChoiceProps } from '../../types'
import QuestionButton from '../buttons/QuestionButton'
import RoundButton from '../buttons/RoundButton'

const AddMultipleChoiceQuestions: React.FC<AddMultipleChoiceProps> = ({
  index,
  handleNewQuestion,
  handleRemoveQuestion,
  handleQuestionChange,
  handleAnswerChange,
  handleIncorrectAnswersChange,
  handleSubmitChange,
  handleNewIncorrectAnswer,
  questions
}: AddMultipleChoiceProps) => {
  const alphabet: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

  const submitQuestion = (): void => {
    if (
      questions[index].questionMultiple.question.length !== 0 &&
      !questions[index].isSubmitted &&
      !questions[index].questionMultiple.incorrect_answers.includes('') &&
      questions[index].questionMultiple.incorrect_answers.length >= 2
    ) {
      if (!questions[index].questionMultiple.question.endsWith('?')) {
        handleQuestionChange(questions[index].questionMultiple.question + '?', index)
      }
      handleSubmitChange(true, index)
    } else if (questions[index].isSubmitted) {
      handleSubmitChange(false, index)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.borderBox}>
        <View style={styles.questionInputs}>
          {!questions[index].isSubmitted
            ? (
            <View style={styles.questionInputs}>
              <View>
                <TextInput
                  label="Question"
                  value={questions[index].questionMultiple.question}
                  onChangeText={val => handleQuestionChange(val, index)}
                />
                {questions[index].questionMultiple.incorrect_answers.map((answer, i) => {
                  return (
                    <View key={i}>
                      <TextInput
                        key={i}
                        value={answer}
                        label="Possible answer"
                        onChangeText={val => {
                          handleIncorrectAnswersChange(val, index, i)
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
              <Text style={styles.text}>{questions[index].questionMultiple.question}</Text>
              <View style={styles.questionTextContainer}>
                <View style={styles.questionTextContainer}>
                  <Text style={styles.answerSubmitted}>Answer: </Text>
                </View>
                <View style={styles.answerFormContainer}>
                  {questions[index].questionMultiple.incorrect_answers.map((answer, i) => {
                    return (
                      <View
                        key={i}
                        style={
                          answer === questions[index].questionMultiple.answer
                            ? styles.formTextCorrectAnswer
                            : styles.formText
                        }
                      >
                        <Text
                          style={styles.answerSubmittedText}
                          onPress={() => {
                            handleAnswerChange(answer, index)
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
          {questions[index].questionMultiple.incorrect_answers.length < 6 && !questions[index].isSubmitted && (
            <QuestionButton
              text={'Add answer alternative'}
              onPress={() => handleNewIncorrectAnswer(index)}
              size={75}
              color={COLORS.cyan}
            />
          )}
          <QuestionButton
            text={questions[index].isSubmitted ? 'Edit' : 'Submit'}
            onPress={submitQuestion}
            size={75}
            color={COLORS.cyan}
          />
          {questions.length > 1 && questions[index].isSubmitted && (
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
      <View key={questions[index].questionMultiple.question} style={styles.addQuestionButton}>
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
