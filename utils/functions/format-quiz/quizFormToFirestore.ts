import { Timestamp } from 'firebase/firestore'
import { FirestoreQuizForm, QuizForm } from '../../../types'

export default function quizFormToFirestore (quiz: QuizForm, path: string): FirestoreQuizForm {
  const { id, ...restQuiz } = quiz
  const firestoreQuiz: FirestoreQuizForm = {
    ...restQuiz,
    questions: restQuiz.questions.map(questionObj => {
      return {
        ...questionObj,
        answer: questionObj.answer.map(subAnswer => {
          return { ...subAnswer }
        })
      }
    }),
    date: new Timestamp(restQuiz.date.seconds, restQuiz.date.nanoseconds),
    path
  }
  return firestoreQuiz
}
