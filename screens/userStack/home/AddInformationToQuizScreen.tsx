import React, { useState } from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
// import AddQuestions from '../../../components/QuestionsCreateQuiz'
import RoundButton from '../../../components/buttons/RoundButton'
import { AddInformationToQuizScreenProps, QuestionForm, Quiz, RouterProps } from '../../../types'
import { loadQuizzes } from '../../../utils/redux/quizSlice'
import { collection, getDocs } from 'firebase/firestore'
import { useDispatch } from 'react-redux'
import { db } from '../../../firebaseConfig'
import { useAuthentication } from '../../../utils/hooks/useAuthentication'
import AddMultipleChoiceQuestions from '../../../components/AddMultipleChoiceQuestions'
import formatQuizFromFirestore from '../../../utils/functions/format-quiz/quizFormFromFirestore'

const AddInformationToQuizScreen: React.FC = ({
  name,
  description,
  difficulty,
  theme,
  navigation,
  isMultipleChoice
}: AddInformationToQuizScreenProps & RouterProps) => {
  const [questions, setQuestions] = useState<QuestionForm[]>([{ question: '', answer: [['']] }])
  const dispatch = useDispatch()
  const { user } = useAuthentication()

  const handleBack = (): void => {
    navigation.navigate('CreateQuizScreen')
  }

  const handleNewQuestion = (): void => {
    setQuestions([...questions, { question: '', answer: [['']] }])
  }

  const handleRemoveQuestion = (i: number): void => {
    const list = [...questions]
    list.splice(i, 1)
    setQuestions(list)
  }

  const handleQuestionChange = (questionInput: string, i: number): void => {
    const list = [...questions]
    list[i].question = questionInput
    setQuestions(list)
  }

  const handleAnswerChange = (answerInput: string, i: number): void => {
    const answer: string[][] = [answerInput.split(' ')]
    const list = [...questions]
    list[i].answer = answer
    setQuestions(list)
  }

  async function handleSubmitQuiz (): Promise<void> {
    const fetchedQuizzes: Quiz[] = []
    const querySnapshot = await getDocs(collection(db, `users/${user!.uid}/formQuiz`))
    querySnapshot.forEach(docx => {
      fetchedQuizzes.push(formatQuizFromFirestore(docx.data(), docx.id))
    })
    dispatch(loadQuizzes(fetchedQuizzes))
    // setLoading(false)
  }

  return (
    <ScrollView>
      <Text style={styles.heading}>Here you can add all the questions for your quiz.</Text>
        {questions.map((question: QuestionForm, i: number) => {
          return (
            <View key={i} style={styles.questionContainer}>
              {/* {isMultipleChoice */}
              <AddMultipleChoiceQuestions
                index={i}
                handleNewQuestion={handleNewQuestion}
                handleRemoveQuestion={handleRemoveQuestion}
                handleQuestionChange={handleQuestionChange}
                handleAnswerChange={handleAnswerChange}
                questions={questions}
                questionFromParent={question}
              />
              {/* ?   : <AddQuestions
            //   index={i}
            //   handleNewQuestion={handleNewQuestion}
            //   handleRemoveQuestion={handleRemoveQuestion}
            //   handleQuestionChange={handleQuestionChange}
            //   handleAnswerChange={handleAnswerChange}
            //   questions={questions}
            //   questionFromParent={question}
        // /> */}
            </View>
          )
        })}
      <View style={styles.buttonGroup}>
        <RoundButton disabled={false} loading={false} text={'Back'} onPress={handleBack} />
        <RoundButton disabled={false} loading={false} text={'Submit Quiz'} onPress={() => handleSubmitQuiz} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 25
  },
  buttonGroup: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  questionContainer: {
    marginBottom: 5
  }
})

export default AddInformationToQuizScreen
