import { collection, getDocs, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator, StyleSheet, FlatList } from 'react-native'
import { List } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { COLORS } from '../../../assets/colors'
import UploadButton from '../../../components/buttons/UploadButtonButton'
import { db } from '../../../firebaseConfig'
import { Quiz, QuizForm, RouterProps } from '../../../types'
import quizFormFromFirestore from '../../../utils/functions/format-quiz/quizFormFromFirestore'
import { setCurrentQuiz } from '../../../utils/redux/storeSlice'

const StoreScreen: React.FC = ({ navigation }: RouterProps) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [quizList, setQuizList] = useState<Quiz[]>([])
  const dispatch = useDispatch()

  async function initialFetch (): Promise<void> {
    const fetchedQuizzes: QuizForm[] = []
    const querySnapshot = await getDocs(collection(db, 'store/userCreated/formQuiz'))
    querySnapshot.forEach(docx => {
      fetchedQuizzes.push(quizFormFromFirestore(docx.data(), docx.id))
    })
    setQuizList(fetchedQuizzes)
    setLoading(false)
  }

  useEffect(() => {
    if (quizList.length === 0) {
      void initialFetch()
    }
    // add event listener for real time update
    onSnapshot(collection(db, 'store/userCreated/formQuiz'), snapshot => {
      setQuizList(snapshot.docs.map(docx => quizFormFromFirestore(docx.data(), docx.id)))
    })
  }, [])

  const handleQuizPress = (quiz: Quiz): void => {
    dispatch(setCurrentQuiz(quiz))
    navigation.navigate('StorePreviewScreen')
  }

  const renderItem = ({ item, index }): JSX.Element => {
    const backgroundColor = index % 2 === 0 ? COLORS.lightGrey : 'white'
    const borderTopWidth = index !== 0 ? 0 : 1
    return (
      <List.Item
        key={item.id}
        title={item.title}
        description={item.description}
        onPress={() => handleQuizPress(item)}
        style={[styles.listItem, { backgroundColor, borderTopWidth }]}
      />
    )
  }

  return (
    <View style={styles.container}>
      {loading
        ? (
        <View style={styles.activityContainer}>
          <ActivityIndicator size={45} color={COLORS.cyan} />
        </View>
          )
        : (
            quizList.length > 0 && (
          <FlatList style={styles.flatList} data={quizList} renderItem={renderItem} keyExtractor={item => item.id} />
            )
          )}
      <View style={styles.buttonContainer}>
        <UploadButton onPress={() => navigation.navigate('UploadScreen')} size={70} />
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
  flatList: {
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

export default StoreScreen
