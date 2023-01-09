import React, { useEffect, useState } from 'react'
import { getAuth, signOut, updateProfile } from 'firebase/auth'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import SignOutButton from '../../../components/buttons/SignOutButton'
import wrapAsyncFunction from '../../../utils/functions/wrapAsyncFunction'
import { useAuthentication } from '../../../utils/hooks/useAuthentication'
import { FirestoreQuizForm, FirestoreQuizMultiple, Quiz } from '../../../types'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../firebaseConfig'
import quizFormFromFirestore from '../../../utils/functions/format-quiz/quizFormFromFirestore'
import quizMultipleFromFirestore from '../../../utils/functions/format-quiz/quizMultipleFromFirestore'
import QuestionButton from '../../../components/buttons/QuestionButton'
import { COLORS } from '../../../assets/colors'
import { TextInput } from 'react-native-paper'

const ProfileScreen: React.FC = () => {
  const auth = getAuth()
  const { user } = useAuthentication()
  const [loading, setLoading] = useState<boolean>(true)
  const [editName, setEditName] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [quizList, setQuizList] = useState<Quiz[]>([])
  const [numberOfDownloads, setNumberOfDownloads] = useState<number>()
  const [rating, setRating] = useState<number>()
  const [numberOfQuizzesMade, setNumberOfQuizzesMade] = useState<number>()

  async function filterUploadedQuizzes(userQuizzes: Quiz[]): Promise<Quiz[]> {
    const storeQuizIds: string[] = []
    const querySnapshot = await getDocs(collection(db, 'store/userCreated/formQuiz'))
    querySnapshot.forEach(docx => {
      storeQuizIds.push(docx.id)
    })
    return userQuizzes.filter(userQuiz => !storeQuizIds.includes(userQuiz.id))
  }

  async function fetchQuizzes(): Promise<void> {
    const fetchedQuizzes: Quiz[] = []
    const formSnapshot = await getDocs(collection(db, `users/${user!.uid}/formQuiz`))
    console.log(formSnapshot)
    formSnapshot.forEach(docx => {
      fetchedQuizzes.push(quizFormFromFirestore(docx.data() as FirestoreQuizForm, docx.id))
    })
    const apiSnapshot = await getDocs(collection(db, `users/${user!.uid}/multipleQuiz`))
    apiSnapshot.forEach(docx => {
      fetchedQuizzes.push(quizMultipleFromFirestore(docx.data() as FirestoreQuizMultiple, docx.id))
    })
    const filteredQuizzes = await filterUploadedQuizzes(fetchedQuizzes)
    setQuizList(filteredQuizzes)
    console.log(quizList)
  }

  function mean(array: number[]): string {
    return (array.reduce((a, b) => a + b, 0) / array.length).toFixed(1)
  }

  const getNumberOfDownloads = (): void => {
    const numberOfDownloads: number = 0
    quizList.filter((quiz) => quiz.creatorId === user?.uid).forEach((quiz) => numberOfDownloads + quiz.downloads)
    setNumberOfDownloads(numberOfDownloads)
  }

  const getRating = (): void => {
    const rating: number = 0
    quizList.filter((quiz) => quiz.creatorId === user?.uid).forEach((quiz) => rating + parseInt(mean(Object.values(quiz.raitings))))
    console.log(rating)
    setRating(rating)
  }

  const getNumberOfQuizzesMade = (): void => {
    const total: number = quizList.filter((quiz) => quiz.creatorId === user?.uid).length
    setNumberOfQuizzesMade(total)
  }

  const handleChangeDisplayName = (newName: string): void => {
    if (newName.length > 0) {
      updateProfile(auth.currentUser!, {
        displayName: newName
      })
        .catch(error => {
          console.log(error)
        })
      setEditName(false)
    }
  }

  useEffect(() => {
    setName(name)
  }, [name])

  useEffect(() => {
    if (user !== undefined) {
      void fetchQuizzes()
      getNumberOfDownloads()
      getNumberOfQuizzesMade()
      getRating()
      setLoading(false)
    }
  }, [user])

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.informationContainer}>
          <Text style={styles.infoHeader}>Information</Text>
          {editName
            ? <View style={styles.editNameContainer}>
              <TextInput
                onChangeText={val => setName(val)}
                value={name}
                label="Name"
                mode="outlined"
                style={styles.editNameInput}
                activeOutlineColor={COLORS.cyan}
              />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoText}>E-mail:</Text>
                <Text style={styles.infoText}>{user?.email}</Text>
              </View>
              <QuestionButton text={'Submit name change'}
                onPress={() => {
                  handleChangeDisplayName(name)
                }}
                size={75}
                color={COLORS.cyan} />
            </View>
            : <>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoText}>Name:</Text>
                <Text style={styles.infoText}>{name === '' ? user?.displayName : name}</Text>
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoText}>E-mail:</Text>
                <Text style={styles.infoText}>{user?.email}</Text>
              </View>
              <QuestionButton text={'Edit name'}
                onPress={() => {
                  setEditName(true)
                }}
                size={75}
                color={COLORS.cyan} />
            </>
          }
        </View>
        {/* <Text style={styles.infoHeader}>Statistics</Text>
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoText}>Number of quizzes made:</Text>
          <Text style={styles.infoText}>{numberOfQuizzesMade}</Text>
        </View>
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoText}>Average rating for your quizzes:</Text>
          <Text style={styles.infoText}>{rating}</Text>
        </View>
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoText}>Number of downloads:</Text>
          <Text style={styles.infoText}>{numberOfDownloads}</Text>
        </View> */}
        <View style={styles.signOutButton} >
          <SignOutButton text={'Sign Out'} onPress={wrapAsyncFunction(async () => await signOut(auth))} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  innerContainer: {
    alignSelf: 'center',
    width: '95%'
  },
  infoHeader: {
    fontSize: 28,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: '2%'
  },
  informationContainer: {
    marginTop: '4%',
    backgroundColor: COLORS.lightGrey,
    borderRadius: 5,
    minHeight: '23%'
  },
  infoTextContainer: {
    flex: 0,
    flexDirection: 'row',
    marginLeft: '3%',
    marginBottom: 5
  },
  infoText: {
    fontSize: 26,
    marginRight: 10
  },
  editName: {
    flex: 1
  },
  editNameInput: {
    width: '95%',
    alignSelf: 'center',
    marginBottom: 10
  },
  editNameContainer: {
    minHeight: '20%'
  },
  signOutButton: {
    position: 'relative',
    bottom: 100,
    alignSelf: 'center',
    marginTop: '130%'
  },
  container2: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 10
  },
  header: {
    textAlign: 'center',
    fontSize: 18,
    padding: 16,
    marginTop: 16
  }
})

export default ProfileScreen
