import { Timestamp } from 'firebase/firestore'
import { FirestoreQuizMultiple, QuizMultiple } from '../../../types'

export default function quizMultipleToFirestore (quiz: QuizMultiple, path: string): FirestoreQuizMultiple {
  const { id, ...restQuiz } = quiz
  const firestoreQuiz: FirestoreQuizMultiple = {
    ...restQuiz,
    date: new Timestamp(restQuiz.date.seconds, restQuiz.date.nanoseconds),
    raitings: {},
    path
  }
  return firestoreQuiz
}
