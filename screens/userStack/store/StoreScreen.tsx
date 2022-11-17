import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator, StyleSheet, FlatList } from 'react-native'
import { List } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { COLORS } from '../../../assets/colors'
import DownloadButton from '../../../components/buttons/DownloadButton'
import { db } from '../../../firebaseConfig'
import { Quiz, RouterProps } from '../../../types'
import formatQuizFromFirestore from '../../../utils/functions/formatQuizFromFirestore'
import { setCurrentQuiz } from '../../../utils/redux/storeSlice'

const StoreScreen: React.FC = ({ navigation }: RouterProps) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [quizList, setQuizList] = useState<Quiz[]>([])
  const dispatch = useDispatch()

  useEffect(() => {
    async function fetchData (): Promise<void> {
      const fetchedQuizzes: Quiz[] = []
      const querySnapshot = await getDocs(collection(db, 'store'))
      querySnapshot.forEach(docx => {
        fetchedQuizzes.push(formatQuizFromFirestore(docx.data(), docx.id))
      })
      setQuizList(fetchedQuizzes)
      setLoading(false)
    }
    void fetchData()
  }, [])

  const handleQuizPress = (quiz: Quiz): void => {
    dispatch(setCurrentQuiz(quiz))
    navigation.navigate('StorePreviewScreen')
  }

  const renderItem = ({ item }): JSX.Element => (
    <List.Item
      key={item.id}
      title={item.title}
      description={item.description}
      onPress={() => handleQuizPress(item)}
      style={styles.listItem}
    />
  )

  return (
    <View style={styles.container}>
      {loading
        ? (
        <View style={styles.activityContainer}>
          <ActivityIndicator size={45} color={COLORS.cyan} />
        </View>
          )
        : quizList.length > 0 &&
          (
        <FlatList
          style={styles.flatList}
          data={quizList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
          )}
      <View style={styles.buttonContainer}>
        <DownloadButton onPress={() => console.log('')} size={70} />
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
