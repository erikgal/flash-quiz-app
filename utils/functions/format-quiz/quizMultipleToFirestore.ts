import { Timestamp } from 'firebase/firestore'
import { FirestoreQuizMultiple, QuizMultiple } from '../../../types'

export default function quizFormToFirestore (quiz: QuizMultiple): FirestoreQuizMultiple {
  const { id, ...restQuiz } = quiz
  const firestoreQuiz: FirestoreQuizMultiple = {
    ...restQuiz,
    date: new Timestamp(restQuiz.date.seconds, restQuiz.date.nanoseconds)
  }
  return firestoreQuiz
}
