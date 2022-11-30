import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { Difficulties, Quiz, RouterProps } from '../../../types'
import Button from '../../../components/buttons/RoundButton'
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore'
import { db } from '../../../firebaseConfig'
import { useAuthentication } from '../../../utils/hooks/useAuthentication'
import wrapAsyncFunction from '../../../utils/functions/wrapAsyncFunction'
import { Snackbar } from 'react-native-paper'
import { COLORS } from '../../../assets/colors'
import Stars from 'react-native-stars'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'

const StorePreviewScreen: React.FC = ({ navigation }: RouterProps) => {
  const quiz: Quiz | null = useSelector((state: RootState) => state.store.currentQuiz)
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [isDownloaded, setIsDownloaded] = useState<boolean>(false)
  const [raitingVisible, setRaitingVisible] = useState<boolean>(false)
  const [visible, setVisible] = useState(false)
  const { user } = useAuthentication()

  useEffect(() => {
    async function checkIfDownloaded (): Promise<void> {
      const formDocument = await getDoc(doc(db, `users/${user!.uid}/formQuiz/${quiz!.id}`))
      const multipleDocument = await getDoc(doc(db, `users/${user!.uid}/multipleChoiceQuiz/${quiz!.id}`))
      setIsDownloaded(formDocument.data() !== undefined || multipleDocument.data() !== undefined)
      setIsMounted(true)
    }
    if (user != null) {
      void checkIfDownloaded()
    }
  }, [user])

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [visible])

  useEffect(() => {
    const timer = setTimeout(() => {
      setRaitingVisible(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [raitingVisible])

  const handleDownload = async (): Promise<void> => {
    setLoading(true)
    const docSnap = await getDoc(doc(db, `${quiz!.path!}/${quiz!.id}`))
    if (docSnap.exists() && user != null) {
      await setDoc(doc(db, `users/${user.uid}/${quiz!.type}`, quiz!.id), {
        ...docSnap.data(),
        downloads: docSnap.data().downloads as number + 1
      })
      await setDoc(doc(db, `${quiz!.path!}`, quiz!.id), {
        ...docSnap.data(),
        downloads: docSnap.data().downloads as number + 1
      })
      setIsDownloaded(true)
      setVisible(true)
    } else {
      console.log('No such document!')
      setIsDownloaded(false)
    }
    setLoading(false)
  }

  const handleRaiting = async (raiting: number): Promise<void> => {
    const docSnap = await getDoc(doc(db, `${quiz!.path!}/${quiz!.id}`))
    if (docSnap.exists() && user != null) {
      await setDoc(doc(db, `${quiz!.path!}`, quiz!.id), {
        ...docSnap.data(),
        raitings: { ...docSnap.data().raiting, [user.uid]: raiting }
      })
      setRaitingVisible(true)
    } else {
      console.log('No such document!')
    }
  }
  function mean (array: number[]): string {
    return (array.reduce((a, b) => a + b, 0) / array.length).toFixed(1)
  }

  return (
    <>
      {quiz != null
        ? (
        <View style={styles.container}>
          {isMounted
            ? (
            <View style={styles.textContainer}>
              <View style={styles.textTop}>
                <Text style={styles.title}>{quiz.title}</Text>
                <Text style={styles.creatorDate}>{`${quiz.creatorName}; ${new Timestamp(
                  quiz.date.seconds,
                  quiz.date.nanoseconds
                )
                  .toDate()
                  .toDateString()}`}</Text>
                <Text style={styles.download}>{isDownloaded ? 'Downloaded' : ''}</Text>
                <Text style={styles.description}>{quiz.description}</Text>
                <View style={styles.textBottom}>
                  <View style={styles.themeDiffContainer}>
                    <Text style={styles.themeDiff}>{'Theme: '}</Text>
                    <Text style={styles.theme}>{quiz.theme}</Text>
                  </View>
                  <View style={styles.themeDiffContainer}>
                    <Text style={styles.themeDiff}>{'Downloads: '}</Text>
                    <Text style={styles.theme}>{quiz.downloads}</Text>
                  </View>
                  <View style={styles.themeDiffContainer}>
                    <Text style={styles.themeDiff}>{'Difficulty: '}</Text>
                    <Text style={styles.theme}>{Object.values(Difficulties)[quiz.difficulty]}</Text>
                  </View>
                </View>
                <View style={styles.raitingContainer}>
                  <Text style={styles.raiting}>
                    {quiz.raitings != null && Object.values(quiz.raitings).length > 0
                      ? mean(Object.values(quiz.raitings))
                      : '-'}
                  </Text>
                  <Stars
                    display={3.67}
                    spacing={8}
                    count={1}
                    starSize={10}
                    fullStar={<Icon name={'star'} size={40} style={[styles.myStarStyle, { color: COLORS.cyan }]} />}
                  />
                </View>
                {isDownloaded && (
                  <View>
                    <Text style={styles.rateThisApp}>Rate this quiz</Text>
                    <Stars
                      half={false}
                      default={user != null ? quiz.raitings[user.uid] : 0}
                      update={async raiting => await handleRaiting(raiting)}
                      spacing={8}
                      starSize={50}
                      count={5}
                      fullStar={<Icon name={'star'} size={40} style={[styles.myStarStyle]} />}
                      emptyStar={
                        <Icon name={'star-outline'} size={40} style={[styles.myStarStyle, styles.myEmptyStarStyle]} />
                      }
                    />
                  </View>
                )}
              </View>
            </View>
              )
            : (
            <View style={styles.activityContainer}>
              <ActivityIndicator size={45} color={COLORS.cyan} />
            </View>
              )}
          <View style={styles.settings}>
            <Button
              text={'Download'}
              loading={loading}
              onPress={wrapAsyncFunction(handleDownload)}
              disabled={isDownloaded || !isMounted}
            ></Button>
          </View>
        </View>
          )
        : (
        <View style={styles.textContainer}>
          <Text style={styles.title}>ERROR: The quiz was properly loaded</Text>
        </View>
          )}
      <Snackbar visible={visible} onDismiss={() => setVisible(false)}>
        {`Succesfully downloaded ${quiz!.title}!`}
      </Snackbar>
      <Snackbar visible={raitingVisible} onDismiss={() => setRaitingVisible(false)}>
        {'Thanks for raiting our app!'}
      </Snackbar>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  textContainer: {
    flex: 5,
    alignItems: 'center',
    padding: 10
  },
  textTop: {
    flex: 1,
    width: '95%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 10
    // borderWidth: 2,
    // borderColor: 'red',
  },
  title: {
    fontSize: 30,
    textAlign: 'center'
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
    maxHeight: '10%',
    flex: 2,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
    // borderWidth: 2,
    // borderColor: 'green'
  },
  themeDiffContainer: {
    flex: 1,
    alignItems: 'center'
    // borderWidth: 2,
    // borderColor: 'yellow'
  },
  themeDiff: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  theme: {
    fontSize: 16,
    textAlign: 'center'
  },
  settings: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  button: {
    padding: 100
  },
  activityContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  myStarStyle: {
    color: COLORS.cyan,
    backgroundColor: 'transparent',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2
  },
  myEmptyStarStyle: {
    color: 'white'
  },
  rateThisApp: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    padding: 8
  },
  raitingContainer: {
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center'
    // borderWidth: 2,
    // borderColor: 'green'
  },
  raiting: {
    fontWeight: 'bold',
    fontSize: 50,
    textAlign: 'center',
    color: COLORS.cyan
  }
})

export default StorePreviewScreen
