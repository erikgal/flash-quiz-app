import { DocumentData } from 'firebase/firestore'
import { Quiz } from '../../types'

export default function formatQuizFromFirestore (doc: DocumentData, id: string): Quiz {
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
  return quiz as Quiz
}
