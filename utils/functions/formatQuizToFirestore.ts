import { Timestamp } from 'firebase/firestore'
import { FirestoreQuiz, Quiz } from '../../types'

export default function formatQuizToFirestore (quiz: Quiz): FirestoreQuiz {
  const { id, ...restQuiz } = quiz
  const firestoreQuiz: FirestoreQuiz = {
    ...restQuiz,
    questions: restQuiz.questions.map(questionObj => {
      return {
        ...questionObj,
        answer: questionObj.answer.map(subAnswer => {
          return { ...subAnswer }
        })
      }
    }),
    date: new Timestamp(restQuiz.date.seconds, restQuiz.date.nanoseconds)
  }
  return firestoreQuiz
}
