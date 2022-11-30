import { FirestoreQuizMultiple, QuizMultiple } from '../../../types'

export default function quizMultipleFromFirestore (doc: FirestoreQuizMultiple, id: string): QuizMultiple {
  const quiz: QuizMultiple = {
    ...doc,
    id,
    date: {
      nanoseconds: doc.date.nanoseconds,
      seconds: doc.date.seconds
    }
  }
  return quiz
}
