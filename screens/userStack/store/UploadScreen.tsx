import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View, Text } from 'react-native'
import { ActivityIndicator, List } from 'react-native-paper'
import { Quiz, RouterProps } from '../../../types'
import 'react-native-get-random-values'
// import { v4 as uuidv4 } from 'uuid'
import { db } from '../../../firebaseConfig'
import { collection, doc, getDocs, setDoc } from 'firebase/firestore'
import { useAuthentication } from '../../../utils/hooks/useAuthentication'
import { COLORS } from '../../../assets/colors'
import formatQuizFromFirestore from '../../../utils/functions/formatQuizFromFirestore'
import formatQuizToFirestore from '../../../utils/functions/formatQuizToFirestore'
import wrapAsyncFunction from '../../../utils/functions/wrapAsyncFunction'

const UploadScreen: React.FC = ({ navigation }: RouterProps) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [quizList, setQuizList] = useState<Quiz[]>([])
  const { user } = useAuthentication()

  async function filterUploadedQuizzes (userQuizzes: Quiz[]): Promise<Quiz[]> {
    const storeQuizIds: string[] = []
    const querySnapshot = await getDocs(collection(db, 'store'))
    querySnapshot.forEach(docx => {
      storeQuizIds.push(docx.id)
    })
    return userQuizzes.filter(userQuiz => !storeQuizIds.includes(userQuiz.id))
  }

  async function fetchQuizzes (): Promise<void> {
    const userQuizzes: Quiz[] = []
    const querySnapshot = await getDocs(collection(db, `users/${user!.uid}/quizzes`))
    querySnapshot.forEach(docx => {
      userQuizzes.push(formatQuizFromFirestore(docx.data(), docx.id))
    })
    const filteredQuizzes = await filterUploadedQuizzes(userQuizzes)
    setQuizList(filteredQuizzes)
    setLoading(false)
  }

  useEffect(() => {
    if (user !== undefined) {
      void fetchQuizzes()
    }
  }, [user])

  const handleQuizPress = async (quiz: Quiz): Promise<void> => {
    const firestoreQuiz = formatQuizToFirestore(quiz)
    await setDoc(doc(db, 'store', quiz.id), firestoreQuiz)
  }

  return (
    <View style={styles.container}>
      {loading && quizList.length === 0
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
                onPress={wrapAsyncFunction(async () => await handleQuizPress(quiz))}
                style={styles.listItem}
              ></List.Item>
            )
          })}
        </ScrollView>
            )
          : (
        <View style={styles.noContentContainer}>
          <Text style={styles.noContentText}>{"You don't have any new quizzes to upload to the store"}</Text>
        </View>
            )}
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

export default UploadScreen
