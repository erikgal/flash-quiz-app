import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { ListItem } from '@react-native-material/core'
import { Quiz, RouterProps } from '../../types'
import PlusButton from '../../components/buttons/PlusButton'
import { RootState } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import { loadQuizzes, setCurrentQuiz } from '../../utils/redux/quizSlice'
import 'react-native-get-random-values'
// import { v4 as uuidv4 } from 'uuid'
import { db } from '../../firebaseConfig'
import { collection, DocumentData, getDocs } from 'firebase/firestore'
import { useAuthentication } from '../../utils/hooks/useAuthentication'

function formatQuizFromFirestore (doc: DocumentData, id: string): Quiz {
  const quiz = {
    ...doc,
    id,
    questions: doc.questions.map(questionObj => {
      return {
        ...questionObj,
        answer: questionObj.answer.map(subAnswer => {
          return Object.values(subAnswer)
        })
      }
    }),
    date: {
      nanoseconds: doc.date.nanoseconds,
      seconds: doc.date.sconds
    }
  }
  return quiz as Quiz
}

const HomeScreen: React.FC = ({ navigation }: RouterProps) => {
  const quizList: Quiz[] = useSelector(
    (state: RootState) => state.quiz.quizzes
  )
  const { user } = useAuthentication()

  useEffect(() => {
    async function fetchData (): Promise<void> {
      const fetchedQuizzes: Quiz[] = []
      const querySnapshot = await getDocs(collection(db, `users/${user!.uid}/quizzes`))
      querySnapshot.forEach((docx) => {
        fetchedQuizzes.push(formatQuizFromFirestore(docx.data(), docx.id))
      })
      dispatch(loadQuizzes(fetchedQuizzes))
    }
    if (user !== undefined) {
      void fetchData()
    }
  }, [user])

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setCurrentQuiz(null))
  }, [])

  const handleQuizPress = (quiz: Quiz): void => {
    dispatch(setCurrentQuiz(quiz))
    navigation.navigate('PreviewScreen')
  }

  const handleAdd = (): void => {
    // TODO add function to create new quiz here
    navigation.navigate('PreviewScreen')
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {quizList.map(quiz => {
          return (
            <ListItem
              key={quiz.id}
              title={quiz.title}
              secondaryText={quiz.description}
              onPress={() => handleQuizPress(quiz)}
            ></ListItem>
          )
        })}
      </ScrollView>
    <PlusButton onPress={handleAdd} size = {70}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  scrollView: {},
  plus: {
    position: 'absolute',
    right: 10,
    bottom: 10
  },
  plusContainer: {
    height: 27,
    width: 27
  }
})

export default HomeScreen
