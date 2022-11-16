import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { Difficulties, Quiz, RouterProps } from '../../../types'
import Button from '../../../components/buttons/RoundButton'
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore'
import { db } from '../../../firebaseConfig'
import { useAuthentication } from '../../../utils/hooks/useAuthentication'
import wrapAsyncFunction from '../../../utils/functions/wrapAsyncFunction'

const StorePreviewScreen: React.FC = ({ navigation }: RouterProps) => {
  const quiz: Quiz | null = useSelector((state: RootState) => state.store.currentQuiz)
  const [loading, setLoading] = useState<boolean>(false)
  const [isDownloaded, setIsDownloaded] = useState<boolean>(false)
  const { user } = useAuthentication()

  useEffect(() => {
    async function fetchData (): Promise<void> {
      const document = await getDoc(doc(db, `users/${user!.uid}/quizzes/${quiz!.id}`))
      setIsDownloaded(document !== undefined)
    }
    if (user != null) {
      void fetchData()
    }
  }, [user])

  console.log(isDownloaded)

  const handleDownload = async (): Promise<void> => {
    setLoading(true)
    const docSnap = await getDoc(doc(db, `store/${quiz!.id}`))
    if (docSnap.exists() && user != null) {
      await setDoc(doc(db, `users/${user.uid}/quizzes`, quiz!.id), docSnap.data())
    } else {
      console.log('No such document!')
    }
    setLoading(false)
  }

  return (
    <>
      {quiz != null
        ? (
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <View style={styles.textTop}>
              <Text style={styles.title}>{quiz.title}</Text>
              <Text style={styles.creatorDate}>{`${quiz.creatorName}; ${new Timestamp(
                quiz.date.seconds,
                quiz.date.nanoseconds
              )
                .toDate()
                .toDateString()}`}</Text>
              <Text style={styles.download}>
                {isDownloaded ? 'Downloaded' : ''}
              </Text>
              <Text style={styles.description}>{quiz.description}</Text>
            </View>
            <View style={styles.textBottom}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.themeDiff}>{'Theme: '}</Text>
                <Text style={styles.theme}>{quiz.theme}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.themeDiff}>{'Difficulty: '}</Text>
                <Text style={styles.theme}>{Object.values(Difficulties)[quiz.difficulty]}</Text>
              </View>
            </View>
          </View>
          <View style={styles.settings}>
            <Button text={'Download'} loading={loading} onPress={wrapAsyncFunction(handleDownload)} disabled={isDownloaded}></Button>
          </View>
        </View>
          )
        : (
        <View style={styles.textContainer}>
          <Text style={styles.title}>ERROR: The quiz was properly loaded</Text>
        </View>
          )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  textContainer: {
    flex: 2,
    alignItems: 'center',
    padding: 10
  },
  textTop: {
    width: '95%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 10
    // borderWidth: 2,
    // borderColor: 'red',
  },
  title: {
    fontSize: 30
  },
  creatorDate: {
    fontSize: 12,
    padding: 3
  },
  download: {
    fontSize: 15,
    color: 'green'
  },
  description: {
    fontSize: 15
  },
  textBottom: {
    width: '95%',
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
    // borderWidth: 2,
    // borderColor: 'green'
  },
  themeDiff: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  theme: {
    fontSize: 20
  },
  settings: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
    // borderWidth: 2,
    // borderColor: 'green'
  },
  button: {
    padding: 100
  }
})

export default StorePreviewScreen
