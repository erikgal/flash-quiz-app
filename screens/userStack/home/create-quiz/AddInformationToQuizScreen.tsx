import React, { useState } from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import AddQuestionFormQuestions from '../../../../components/createQuiz/AddQuestionFormQuestions'
import RoundButton from '../../../../components/buttons/RoundButton'
import { QuestionFormQuestion, QuizForm, QuizInformation, QuizType, RouterProps } from '../../../../types'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store'
import { COLORS } from '../../../../assets/colors'
import { v4 as uuidv4 } from 'uuid'
import { doc, setDoc, Timestamp } from 'firebase/firestore'
import { useAuthentication } from '../../../../utils/hooks/useAuthentication'
import { db } from '../../../../firebaseConfig'
import wrapAsyncFunction from '../../../../utils/functions/wrapAsyncFunction'
import quizFormToFirestore from '../../../../utils/functions/format-quiz/quizFormToFirestore'

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
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const { user } = useAuthentication()

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
  }

  const handleQuestionChange = (questionInput: string, i: number): void => {
    const list = [...questions]
    list[i].questions.question = questionInput
    setQuestions(list)
  }

  const handleSubmitChange = (input: boolean, i: number): void => {
    const list = [...questions]
    list[i].isSubmitted = input
    if (list[i].questionIsToggled) {
      list[i].questions.question = list[i].questions.question.concat(' xxx')
    }
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

  async function handleSubmitQuiz (): Promise<void> {
    if (questions.every(question => question.questions.answer.join(' ') !== '') && !isSubmitting) {
      const quizForms = questions.map(question => {
        question.questions.question = question.questions.question.replace(question.questions.answer[0][0], 'xxx')
        return question.questions
      })
      setIsSubmitting(true)
      const idQuiz: string = uuidv4()
      const quiz: QuizForm = {
        title: quizInfo!.name!,
        id: idQuiz,
        description: quizInfo!.description!,
        date: Timestamp.fromDate(new Date()),
        difficulty: quizInfo!.difficulty!,
        theme: quizInfo!.theme!,
        creatorId: user!.uid,
        creatorName: user!.displayName!,
        type: QuizType.FormQuiz,
        downloads: 0,
        raitings: {},
        path: `users/${user!.uid}/'formQuiz'`,
        questions: quizForms
      }
      const fireBase = quizFormToFirestore(quiz, `users/${user!.uid}/'formQuiz'`)
      await setDoc(doc(db, `users/${user!.uid}/${quiz.type}`, idQuiz), fireBase)
      setIsSubmitting(false)
      navigation.navigate('HomeScreen')
    }
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
          <RoundButton
            disabled={false}
            loading={false}
            text={'Submit Quiz'}
            onPress={wrapAsyncFunction(handleSubmitQuiz)}
          />
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
