import React, { useState } from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
// import AddQuestionFormQuestions from '../../../components/createQuiz/AddQuestionFormQuestions'
import RoundButton from '../../../../components/buttons/RoundButton'
import { MultipleChoiceQuestion, RouterProps } from '../../../../types'
import AddMultipleChoiceQuestions from '../../../../components/createQuiz/AddMultipleChoiceQuestions'
// import { useSelector } from 'react-redux'
// import { RootState } from '../../../store'
// import quizFormToFirestore from '../../../utils/functions/format-quiz/quizFormToFirestore'
// import { db } from '../../../firebaseConfig'
// import { useAuthentication } from '../../../utils/hooks/useAuthentication'
// import { doc, setDoc } from 'firebase/firestore'

const AddInformationToQuizScreen: React.FC = ({ navigation }: RouterProps) => {
  // const quizInfo: QuizInformation | null = useSelector((state: RootState) => state.createQuizSlice.quizInfo)
  const [questions, setQuestions] = useState<MultipleChoiceQuestion[]>([
    {
      questionMultiple: { question: '', answer: '', incorrect_answers: [''] },
      isSubmitted: false
    }
  ])
  // const { user } = useAuthentication()

  const handleBack = (): void => {
    navigation.navigate('CreateQuizScreen')
  }

  const handleNewQuestion = (): void => {
    setQuestions([
      ...questions,
      {
        questionMultiple: { question: '', answer: '', incorrect_answers: [''] },
        isSubmitted: false
      }
    ])
  }

  const handleNewIncorrectAnswer = (i: number): void => {
    const list = [...questions]

    list[i].questionMultiple.incorrect_answers = [...questions[i].questionMultiple.incorrect_answers, '']
    setQuestions(list)
  }

  const handleRemoveQuestion = (i: number): void => {
    setQuestions(current =>
      current.filter(question => {
        return questions.indexOf(question) !== i
      })
    )
  }

  const handleQuestionChange = (questionInput: string, i: number): void => {
    const list = [...questions]
    list[i].questionMultiple.question = questionInput
    setQuestions(list)
  }

  const handleSubmitChange = (input: boolean, i: number): void => {
    const list = [...questions]
    list[i].isSubmitted = input
    setQuestions(list)
  }

  const handleAnswerChange = (answerInput: string, i: number): void => {
    const list = [...questions]
    list[i].questionMultiple.answer = answerInput
    setQuestions(list)
  }

  const handleIncorrectAnswersChange = (incorrectAnswer: string, indexQuestion: number, indexPossibleAnswer): void => {
    const list = [...questions]
    list[indexQuestion].questionMultiple.incorrect_answers[indexPossibleAnswer] = incorrectAnswer
    setQuestions(list)
  }

  // async function handleSubmitQuiz (): Promise<void> {
  //   const firestoreQuiz = quizFormToFirestore(questions, 'store/userCreated/formQuiz')
  //   await setDoc(doc(db, 'store/userCreated/formQuiz', selectedQuiz!.id), firestoreQuiz)
  //   void fetchQuizzes()
  //   setUploadVisible(false)
  //   setVisible(true)
  // }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Here you can add all the questions for your quiz.</Text>
      {questions.map((question: MultipleChoiceQuestion, i: number) => {
        return (
          <View key={i} style={styles.questionContainer}>
            <AddMultipleChoiceQuestions
              index={i}
              handleNewQuestion={handleNewQuestion}
              handleRemoveQuestion={handleRemoveQuestion}
              handleQuestionChange={handleQuestionChange}
              handleAnswerChange={handleAnswerChange}
              handleSubmitChange={handleSubmitChange}
              handleIncorrectAnswersChange={handleIncorrectAnswersChange}
              handleNewIncorrectAnswer={handleNewIncorrectAnswer}
              questions={questions}
            />
          </View>
        )
      })}
      <View style={styles.buttonGroupContainer}>
        <View style={styles.buttonGroup}>
          <RoundButton disabled={false} loading={false} text={'Back'} onPress={handleBack} />
        </View>
        <View style={styles.buttonGroup}>
          <RoundButton disabled={false} loading={false} text={'Submit Quiz'} onPress={() => console.log('first')} />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '95%',
    height: '50%',
    alignSelf: 'center'
  },
  heading: {
    fontSize: 25
  },
  buttonGroupContainer: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  buttonGroup: {
    padding: 2
  },
  questionContainer: {
    bottom: 0,
    marginBottom: 5
  }
})

export default AddInformationToQuizScreen
