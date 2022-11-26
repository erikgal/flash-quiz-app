import React, { useState } from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import AddQuestions from '../../../components/QuestionsCreateQuiz'
import RoundButton from '../../../components/buttons/RoundButton'
import { AddInformationToQuizScreenProps, QuestionForm, RouterProps } from '../../../types'

const AddInformationToQuizScreen: React.FC = ({
  name,
  description,
  difficulty,
  theme,
  navigation
}: AddInformationToQuizScreenProps & RouterProps) => {
  const q: QuestionForm = { question: '', answer: [['']] }
  const [questions, setQuestions] = useState<QuestionForm[]>([q])

  const handleBack = (): void => {
    navigation.navigate('CreateQuizScreen')
  }

  const handleNewQuestion = (): void => {
    setQuestions([...questions, { question: '', answer: [['']] }])
  }

  const handleRemoveQuestion = (i: number): void => {
    const list = [...questions]
    list.splice(i, 1)
    console.log(list.length)
    setQuestions(list)
    console.log(questions.length)
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

  return (
    <ScrollView>
      <Text style={styles.heading}>Here you can add all the questions for your quiz.</Text>
      {questions.map((question: QuestionForm, i: number) => {
        return (
          <View key={i}>
            <AddQuestions
              index={i}
              handleNewQuestion={handleNewQuestion}
              handleRemoveQuestion={handleRemoveQuestion}
              handleQuestionChange={handleQuestionChange}
              handleAnswerChange={handleAnswerChange}
              questions={questions}
              questionFromParent={question}
            />
          </View>
        )
      })}
      <View style={styles.buttonGroup}>
        <RoundButton disabled={false} loading={false} text={'Back'} onPress={handleBack} />
        <RoundButton disabled={false} loading={false} text={'Submit Quiz'} onPress={() => console.log('hei')} />
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
  }
})

export default AddInformationToQuizScreen
