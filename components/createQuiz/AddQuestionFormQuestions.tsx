import React, { useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { TextInput } from 'react-native-paper'
import { COLORS } from '../../assets/colors'
import { AddQuestionProps, RouterProps } from '../../types'
import QuestionButton from '../buttons/QuestionButton'
import RoundButton from '../buttons/RoundButton'

const AddQuestionFormQuestions: React.FC<AddQuestionProps> = ({
  index,
  handleNewQuestion,
  handleRemoveQuestion,
  handleQuestionChange,
  handleAnswerChange,
  handleSubmitChange,
  handleColorQuestionChange,
  handleColorFormChange,
  handleQuestionIsToggledChange,
  questions,
  questionFromParent
}: AddQuestionProps & RouterProps) => {
  const handleSubmit = (): void => {
    if (questions[index].isSubmitted) {
      if (!questions[index].questionIsToggled) {
        handleAnswerChange('', index)
      }
      handleSubmitChange(false, index)
    } else if (questions[index].questions.question !== '' && questions[index].questions.answer.join(' ') !== '') {
      handleSubmitChange(true, index)
    } else if (questions[index].questions.question !== '' && !questions[index].questionIsToggled) {
      handleSubmitChange(true, index)
    }
    // else if (!questionIsToggled && questions[index].answer.join(' ') !== '') {
    //   setIsSubmitted(true)
    // }
  }

  const changeToggleColors = (): void => {
    if (!questions[index].isSubmitted) {
      if (questions[index].questionIsToggled) {
        handleColorQuestionChange(COLORS.blue, index)
        handleColorFormChange(COLORS.cyan, index)
      } else {
        handleColorQuestionChange(COLORS.cyan, index)
        handleColorFormChange(COLORS.blue, index)
        handleAnswerChange('', index)
      }
    }
  }

  const handleChangeQuestionType = (val: boolean): void => {
    if (!questions[index].isSubmitted) {
      handleQuestionIsToggledChange(val, index)
    }
  }

  useEffect(() => {
    if (!questions[index].isSubmitted) {
      changeToggleColors()
    }
  }, [questions[index].questionIsToggled])

  return (
    <View style={styles.container}>
      <View style={styles.borderBox}>
        {!questions[index].isSubmitted && (
          <View style={styles.container2}>
            <QuestionButton
              text="Question"
              onPress={() => {
                handleChangeQuestionType(true)
              }}
              size={75}
              color={questions[index].colorQuestion}
            />
            <QuestionButton
              text="Form"
              onPress={() => {
                handleChangeQuestionType(false)
              }}
              size={75}
              color={questions[index].colorForm}
            />
          </View>
        )}
        <View style={styles.questionInputs}>
          {!questions[index].isSubmitted
            ? (
            <View style={styles.questionInputs}>
              {questions[index].questionIsToggled
                ? (
                <View>
                  <TextInput
                    label="Question"
                    value={questions[index].questions.question}
                    onChangeText={val => {
                      handleQuestionChange(val, index)
                    }}
                  />
                  <TextInput
                    label="Answer"
                    value={questions[index].questions.answer[0].join(' ')}
                    editable={true}
                    onChangeText={val => {
                      handleAnswerChange(val, index)
                    }}
                  />
                </View>
                  )
                : (
                <TextInput
                  editable={true}
                  value={questions[index].questions.question}
                  style={styles.questionInputs}
                  label="Question"
                  onChangeText={val => {
                    handleQuestionChange(val, index)
                  }}
                />
                  )}
            </View>
              )
            : (
            <>
              {questions[index].questionIsToggled
                ? (
                <>
                  <View style={styles.questionTextContainer}>
                    <Text style={styles.questionSubmitted}>Question: </Text>
                  </View>
                  <Text style={styles.text}>{questions[index].questions.question}</Text>
                  <View style={styles.questionTextContainer}>
                    <Text style={styles.answerSubmitted}>Answer: </Text>
                  </View>
                  <Text style={styles.text}>{questions[index].questions.answer[0].join(' ')}</Text>
                </>
                  )
                : (
                <>
                  <View style={styles.questionTextContainer}>
                    <Text style={styles.questionSubmitted}>Question:</Text>
                  </View>
                  <View style={styles.answerFormContainer}>
                    {questions[index].questions.question.split(' ').map((questionPart, i) => {
                      return (
                        <Text
                          key={i}
                          style={
                            questionPart === questions[index].questions.answer.join(' ')
                              ? styles.formTextCorrectAnswer
                              : styles.formText
                          }
                          onPress={() => {
                            handleSubmitChange(true, index)
                            handleAnswerChange(questions[index].questions.question.split(' ')[i], index)
                          }}
                        >
                          {questionPart}
                        </Text>
                      )
                    })}
                  </View>
                  <View style={styles.questionTextContainer}>
                    <Text style={styles.answerSubmitted}>Answer:</Text>
                  </View>
                  <Text style={styles.answerSubmittedForm}>{questions[index].questions.answer}</Text>
                </>
                  )}
            </>
              )}
        </View>
        <View style={styles.submitButtonContainer}>
          <QuestionButton
            text={questions[index].isSubmitted ? 'Edit' : 'Submit'}
            onPress={() => {
              handleSubmit()
            }}
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
      <View style={styles.buttonContainerQuestion}>
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
    paddingBottom: 2,
    justifyContent: 'center',
    alignItems: 'center'
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
    width: '100%',
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
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})

export default AddQuestionFormQuestions
