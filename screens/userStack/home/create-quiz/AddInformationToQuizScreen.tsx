import React, { useState } from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import AddQuestionFormQuestions from '../../../../components/createQuiz/AddQuestionFormQuestions'
import RoundButton from '../../../../components/buttons/RoundButton'
import { QuestionForm, QuestionFormQuestion, QuizInformation, RouterProps } from '../../../../types'
// // import AddMultipleChoiceQuestions from '../../../components/createQuiz/AddMultipleChoiceQuestions'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store'
import { COLORS } from '../../../../assets/colors'
import quizFormToFirestore from '../../../../utils/functions/format-quiz/quizFormToFirestore'
// import { db } from '../../../../firebaseConfig'
// import { useAuthentication } from '../../../../utils/hooks/useAuthentication'
// import { doc, setDoc } from 'firebase/firestore'

const AddInformationToQuizScreen: React.FC = ({ navigation }: RouterProps) => {
  const quizInfo: QuizInformation | null = useSelector((state: RootState) => state.createQuizSlice.quizInfo)
  const [questions, setQuestions] = useState<QuestionFormQuestion[]>([
    {
      questions: { question: '', answer: [['']] },
      isSubmitted: false,
      questionIsToggled: true,
      colorForm: COLORS.blue,
      colorQuestion: COLORS.cyan
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
        questions: { question: '', answer: [['']] },
        isSubmitted: false,
        questionIsToggled: true,
        colorForm: COLORS.blue,
        colorQuestion: COLORS.cyan
      }
    ])
  }

  const handleRemoveQuestion = (i: number): void => {
    setQuestions(current =>
      current.filter(question => {
        return questions.indexOf(question) !== i
      })
    )
    console.log('Questions after delete', questions)
  }

  const handleQuestionChange = (questionInput: string, i: number): void => {
    const list = [...questions]
    list[i].questions.question = questionInput
    setQuestions(list)
  }

  const handleSubmitChange = (input: boolean, i: number): void => {
    const list = [...questions]
    list[i].isSubmitted = input
    setQuestions(list)
  }

  const handleQuestionIsToggledChange = (input: boolean, i: number): void => {
    const list = [...questions]
    list[i].questionIsToggled = input
    setQuestions(list)
  }

  const handleAnswerChange = (answerInput: string, i: number): void => {
    const answer: string[][] = [answerInput.split(' ')]
    const list = [...questions]
    list[i].questions.answer = answer
    setQuestions(list)
  }

  const handleColorFormChange = (answerInput: string, i: number): void => {
    const list = [...questions]
    list[i].colorForm = answerInput
    setQuestions(list)
  }

  const handleColorQuestionChange = (answerInput: string, i: number): void => {
    const list = [...questions]
    list[i].colorQuestion = answerInput
    setQuestions(list)
  }

  function handleSubmitQuiz (): void {
    const quizForms2: QuestionForm[] = []
    const quizForms = [questions.forEach(question => quizForms2.push(question.questions))]
    const firestoreQuiz = quizFormToFirestore(quizForms2, 'store/userCreated/formQuiz')
    // await setDoc(doc(db, 'store/userCreated/formQuiz', selectedQuiz!.id), firestoreQuiz)
    // void fetchQuizzes()
    // setUploadVisible(false)
    // setVisible(true)
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Here you can add all the questions for your quiz.</Text>
      {questions.map((question: QuestionFormQuestion, i: number) => {
        return (
          <View key={i} style={styles.questionContainer}>
            <AddQuestionFormQuestions
              index={i}
              handleNewQuestion={handleNewQuestion}
              handleRemoveQuestion={handleRemoveQuestion}
              handleQuestionChange={handleQuestionChange}
              handleAnswerChange={handleAnswerChange}
              handleSubmitChange={handleSubmitChange}
              handleColorFormChange={handleColorFormChange}
              handleColorQuestionChange={handleColorQuestionChange}
              handleQuestionIsToggledChange={handleQuestionIsToggledChange}
              questions={questions}
              questionFromParent={question.questions}
            />
          </View>
        )
      })}
      <View style={styles.buttonGroupContainer}>
        <View style={styles.buttonGroup}>
          <RoundButton disabled={false} loading={false} text={'Back'} onPress={handleBack} />
        </View>
        <View style={styles.buttonGroup}>
          <RoundButton disabled={false} loading={false} text={'Submit Quiz'} onPress={handleSubmitQuiz} />
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
