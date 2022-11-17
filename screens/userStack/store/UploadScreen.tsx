import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View, Text } from 'react-native'
import { ActivityIndicator, Snackbar } from 'react-native-paper'
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
import QuizList from '../../../components/list/QuizList'
import AreYouSureUploadModal from '../../../components/modals/AreYouSureUploadModal'

const UploadScreen: React.FC = ({ navigation }: RouterProps) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [quizList, setQuizList] = useState<Quiz[]>([])
  const [uploadVisible, setUploadVisible] = useState(false)
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz>()
  const [visible, setVisible] = useState(false)
  const { user } = useAuthentication()

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [visible])

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
    setSelectedQuiz(quiz)
    setUploadVisible(true)
  }

  const handleUpload = async (): Promise<void> => {
    const firestoreQuiz = formatQuizToFirestore(selectedQuiz!)
    await setDoc(doc(db, 'store', selectedQuiz!.id), firestoreQuiz)
    void fetchQuizzes()
    setUploadVisible(false)
    setVisible(true)
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
          <QuizList quizList={quizList} onPress={wrapAsyncFunction(handleQuizPress)} />
        </ScrollView>
            )
          : (
        <View style={styles.noContentContainer}>
          <Text style={styles.noContentText}>{"You don't have any new quizzes to upload to the store"}</Text>
        </View>
            )}
      <AreYouSureUploadModal
        onDismiss={() => setUploadVisible(false)}
        visible={uploadVisible}
        onCancel={() => setUploadVisible(false)}
        onUpload={wrapAsyncFunction(handleUpload)}
        action={'upload this quiz'}
      />
      <Snackbar visible={visible} onDismiss={() => setVisible(false)}>
        Succesfully uploaded quiz!
      </Snackbar>
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
