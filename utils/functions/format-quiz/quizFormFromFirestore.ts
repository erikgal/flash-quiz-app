import { DocumentData } from 'firebase/firestore'
import { QuizForm } from '../../../types'

export default function quizFormFromFirestore (doc: DocumentData, id: string): QuizForm {
  const quiz = {
    ...doc,
    id,
    questions: doc.questions.map(questionObj => {
      return {
        ...questionObj,
        answer: questionObj.answer.map(subAnswer => {
          return Object.values(subAnswer)
        })
      }
    }),
    date: {
      nanoseconds: doc.date.nanoseconds,
      seconds: doc.date.seconds
    }
  }
  return quiz as QuizForm
}
