import { collection, getDocs, onSnapshot } from 'firebase/firestore'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { View, ActivityIndicator, StyleSheet, FlatList, Text } from 'react-native'
import { List, Searchbar } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { COLORS } from '../../../assets/colors'
import UploadButton from '../../../components/buttons/UploadButton'
import { db } from '../../../firebaseConfig'
import { FirestoreQuizForm, FirestoreQuizMultiple, Quiz, RouterProps } from '../../../types'
import quizFormFromFirestore from '../../../utils/functions/format-quiz/quizFormFromFirestore'
import quizMultipleFromFirestore from '../../../utils/functions/format-quiz/quizMultipleFromFirestore'
import { setCurrentQuiz } from '../../../utils/redux/storeSlice'
import debounce from 'lodash.debounce'

const StoreScreen: React.FC = ({ navigation }: RouterProps) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [quizList, setQuizList] = useState<Quiz[]>([])
  const [filteredQuizList, setFilteredQuizList] = useState<Quiz[]>([])
  const [search, setSearch] = useState<string>('')
  const dispatch = useDispatch()

  async function fetchQuizzes (): Promise<void> {
    const fetchedQuizzes: Quiz[] = []
    const formSnapshot = await getDocs(collection(db, 'store/userCreated/formQuiz'))
    formSnapshot.forEach(docx => {
      fetchedQuizzes.push(quizFormFromFirestore(docx.data() as FirestoreQuizForm, docx.id))
    })
    const apiSnapshot = await getDocs(collection(db, 'store/api/multipleChoiceQuiz'))
    apiSnapshot.forEach(docx => {
      fetchedQuizzes.push(quizMultipleFromFirestore(docx.data() as FirestoreQuizMultiple, docx.id))
    })
    setQuizList(fetchedQuizzes)
    setLoading(false)
  }

  useEffect(() => {
    if (quizList.length === 0) {
      void fetchQuizzes()
    }
    // add event listener for real time update
    onSnapshot(collection(db, 'store/userCreated/formQuiz'), snapshot => {
      void fetchQuizzes()
    })
    onSnapshot(collection(db, 'store/api/multipleChoiceQuiz'), snapshot => {
      void fetchQuizzes()
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

  const filterContent = (text): void => {
    if (text !== '') {
      setFilteredQuizList(
        quizList.filter(quiz => {
          return quiz.title.includes(text) || quiz.description.includes(text) || quiz.theme.includes(text)
        })
      )
    } else {
      setFilteredQuizList([])
    }
    setLoading(false)
  }

  const debouncedSearch = useMemo(
    () =>
      debounce(async text => {
        filterContent(text)
      }, 250),
    [filterContent]
  )

  const handleChange = useCallback(
    text => {
      setSearch(text)
      setLoading(true)
      debouncedSearch(text)
    },
    [debouncedSearch]
  )

  const displayQuizList = search !== '' ? filteredQuizList : quizList

  return (
    <View style={styles.container}>
      <View style={styles.autocompleteContainer}>
        <Searchbar style={{ borderRadius: 0 }} placeholder="Search" onChangeText={handleChange} value={search} />
      </View>
      {loading
        ? (
        <View style={styles.activityContainer}>
          <ActivityIndicator size={45} color={COLORS.cyan} />
        </View>
          )
        : displayQuizList.length > 0
          ? (
        <FlatList
          style={styles.flatList}
          data={displayQuizList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
            )
          : (
        <View style={styles.noContentContainer}>
          <Text style={styles.noContentText}>{"You don't have any quizzes, create or download some!"}</Text>
        </View>
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
    justifyContent: 'flex-end',
    maxHeight: 0
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
  },
  autocompleteContainer: {
    minWidth: '99.5%'
  }
})

export default StoreScreen
