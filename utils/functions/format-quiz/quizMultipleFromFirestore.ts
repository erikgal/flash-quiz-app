import { DocumentData } from 'firebase/firestore'
import { QuizMultiple } from '../../../types'

export default function quizMultipleFromFirestore (doc: DocumentData, id: string): QuizMultiple {
  const quiz = {
    ...doc,
    id,
    date: {
      nanoseconds: doc.date.nanoseconds,
      seconds: doc.date.seconds
    }
  }
  return quiz as QuizMultiple
}
