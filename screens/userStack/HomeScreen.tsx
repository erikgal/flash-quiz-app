import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View, Text } from 'react-native'
import { ActivityIndicator, List } from 'react-native-paper'
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
import { COLORS } from '../../assets/colors'

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
      seconds: doc.date.seconds
    }
  }
  return quiz as Quiz
}

const HomeScreen: React.FC = ({ navigation }: RouterProps) => {
  const [loading, setLoading] = useState<boolean>(true)
  const quizList: Quiz[] = useSelector((state: RootState) => state.quiz.quizzes)
  const { user } = useAuthentication()

  useEffect(() => {
    async function fetchData (): Promise<void> {
      const fetchedQuizzes: Quiz[] = []
      const querySnapshot = await getDocs(collection(db, `users/${user!.uid}/quizzes`))
      querySnapshot.forEach(docx => {
        fetchedQuizzes.push(formatQuizFromFirestore(docx.data(), docx.id))
      })
      dispatch(loadQuizzes(fetchedQuizzes))
      setLoading(false)
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
      {loading
        ? (
        <View style={styles.activityContainer}>
          <ActivityIndicator size={45} color={COLORS.cyan} />
        </View>
          )
        : quizList.length > 0
          ? (
        <ScrollView style={styles.scrollView}>
          {quizList.map(quiz => {
            return (
              <List.Item
                key={quiz.id}
                title={quiz.title}
                description={quiz.description}
                onPress={() => handleQuizPress(quiz)}
                style={styles.listItem}
              ></List.Item>
            )
          })}
        </ScrollView>
            )
          : (
        <View style={styles.noContentContainer}>
          <Text style={styles.noContentText}>{"You don't have any quizzes, create or download some!"}</Text>
        </View>
            )}
      <View style={styles.buttonContainer}>
        <PlusButton onPress={handleAdd} size={70} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  scrollView: {
    flex: 1,
    width: '100%'
  },
  plus: {
    position: 'absolute',
    right: 10,
    bottom: 10
  },
  plusContainer: {
    height: 27,
    width: 27
  },
  listItem: {
    borderWidth: 1,
    borderColor: 'grey'
  },
  activityContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  noContentContainer: {
    flex: 1,
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  noContentText: {
    fontSize: 18,
    textAlign: 'center'
  }
})

export default HomeScreen
