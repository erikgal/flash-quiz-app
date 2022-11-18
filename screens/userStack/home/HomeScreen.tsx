import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View, Text } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { Quiz, RouterProps } from '../../../types'
import PlusButton from '../../../components/buttons/PlusButton'
import { RootState } from '../../../store'
import { useDispatch, useSelector } from 'react-redux'
import { loadQuizzes, setCurrentQuiz } from '../../../utils/redux/quizSlice'
import 'react-native-get-random-values'
// import { v4 as uuidv4 } from 'uuid'
import { db } from '../../../firebaseConfig'
import { collection, deleteDoc, doc, getDocs, onSnapshot } from 'firebase/firestore'
import { useAuthentication } from '../../../utils/hooks/useAuthentication'
import { COLORS } from '../../../assets/colors'
import formatQuizFromFirestore from '../../../utils/functions/format-quiz/quizFormFromFirestore'
import CancelEditDeleteModal from '../../../components/modals/CancelEditDeleteModal'
import wrapAsyncFunction from '../../../utils/functions/wrapAsyncFunction'
import QuizList from '../../../components/list/QuizList'
import AreYouSureModal from '../../../components/modals/AreYouSureDeleteModal'

const HomeScreen: React.FC = ({ navigation }: RouterProps) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [visible, setVisible] = useState(false)
  const [visibleDelete, setVisibleDelete] = useState(false)
  const [longPressQuiz, setLongPressQuiz] = useState<Quiz>()
  const quizList: Quiz[] = useSelector((state: RootState) => state.quiz.quizzes)
  const { user } = useAuthentication()
  const dispatch = useDispatch()

  async function initialFetch (): Promise<void> {
    const fetchedQuizzes: Quiz[] = []
    const querySnapshot = await getDocs(collection(db, `users/${user!.uid}/formQuiz`))
    querySnapshot.forEach(docx => {
      fetchedQuizzes.push(formatQuizFromFirestore(docx.data(), docx.id))
    })
    dispatch(loadQuizzes(fetchedQuizzes))
    setLoading(false)
  }

  useEffect(() => {
    if (user !== undefined) {
      if (quizList.length === 0) {
        void initialFetch()
      }
      // add event listener for real time update
      onSnapshot(collection(db, `users/${user.uid}/formQuiz`), (snapshot) => {
        dispatch(loadQuizzes(snapshot.docs.map((docx) =>
          formatQuizFromFirestore(docx.data(), docx.id)
        )))
      })
    }
  }, [user])

  useEffect(() => {
    dispatch(setCurrentQuiz(null))
  }, [])

  const handleQuizPress = (quiz: Quiz): void => {
    dispatch(setCurrentQuiz(quiz))
    navigation.navigate('HomePreviewScreen')
  }

  const handleLongPress = (quiz: Quiz): void => {
    setVisible(true)
    setLongPressQuiz(quiz)
  }

  const handleDelete = async (): Promise<void> => {
    setVisibleDelete(false)
    await deleteDoc(doc(db, `users/${user!.uid}/formQuiz/${longPressQuiz!.id}`))
  }

  const handlePressDelete = (): void => {
    setVisible(false)
    setVisibleDelete(true)
  }

  const handleAdd = (): void => {
    // TODO add function to create new quiz here
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
          <QuizList quizList={quizList} onPress={handleQuizPress} onLongPress={handleLongPress}/>
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
      <CancelEditDeleteModal
        onDismiss={() => setVisible(false)}
        visible={visible}
        quizName={(longPressQuiz != null) ? longPressQuiz.title : ''}
        onCancel={() => setVisible(false)}
        onDelete={handlePressDelete}
      />
      <AreYouSureModal
      onDismiss={() => setVisibleDelete(false)}
      visible={visibleDelete}
      onCancel={() => setVisibleDelete(false)}
      onDelete = {wrapAsyncFunction(handleDelete)}
      action= {'delete this quiz'}
      />
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
    borderWidth: 2,
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
