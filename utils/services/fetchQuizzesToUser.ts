import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebaseConfig'
import { Quiz } from '../../types'
import quizFormFromFirestore from '../functions/format-quiz/quizFormFromFirestore'
import quizMultipleFromFirestore from '../functions/format-quiz/quizMultipleFromFirestore'

export default async function fetchQuizzesToUser (userUid: string): Promise<Quiz[]> {
  const fetchedQuizzes: Quiz[] = []
  const formSnapshot = await getDocs(collection(db, `users/${userUid}/formQuiz`))
  formSnapshot.forEach(docx => {
    fetchedQuizzes.push(quizFormFromFirestore(docx.data(), docx.id))
  })
  const apiSnapshot = await getDocs(collection(db, `users/${userUid}/multipleChoiceQuiz`))
  apiSnapshot.forEach(docx => {
    fetchedQuizzes.push(quizMultipleFromFirestore(docx.data(), docx.id))
  })
  return fetchedQuizzes
}
