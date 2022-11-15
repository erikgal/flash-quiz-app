import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native'
import { List } from 'react-native-paper'
import { COLORS } from '../../../assets/colors'
import DownloadButton from '../../../components/buttons/DownloadButton'
import { db } from '../../../firebaseConfig'
import { Quiz } from '../../../types'
import formatQuizFromFirestore from '../../../utils/functions/formatQuizFromFirestore'

const StoreScreen: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [quizList, setQuizList] = useState<Quiz[]>([])

  useEffect(() => {
    async function fetchData (): Promise<void> {
      const fetchedQuizzes: Quiz[] = []
      const querySnapshot = await getDocs(collection(db, 'users/OLml9cQ08DMHY1c0KU7yRcCTGaS2/quizzes'))
      querySnapshot.forEach(docx => {
        fetchedQuizzes.push(formatQuizFromFirestore(docx.data(), docx.id))
      })
      setQuizList(fetchedQuizzes)
      setLoading(false)
    }
    void fetchData()
  }, [])

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
              onPress={() => console.log('yo')}
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
      <DownloadButton onPress={() => console.log('hei')} size={70} />
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

export default StoreScreen
