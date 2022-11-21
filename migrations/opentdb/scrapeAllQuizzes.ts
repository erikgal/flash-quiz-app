import axios from 'axios'
import { doc, setDoc, Timestamp } from 'firebase/firestore'
import { Difficulties, QuizMultiple, QuizType } from '../../types'
import quizMultipleToFirestore from '../../utils/functions/format-quiz/quizMultipleToFirestore'
import { db } from '../../firebaseConfig'
import getUuid from 'uuid-by-string'

interface Result {
  category: string
  correct_answer: string
  difficulty: string
  incorrect_answers: string[]
  question: string
  type: string
}

interface SortedResults {
  [key: string]: Result[]
}

interface Category {
  id: number
  name: string
}

function capitalizeFirstLetter (string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export default async function scrapeAllQuizzes (): Promise<void> {
  const categoryResponse = await axios.get('https://opentdb.com/api_category.php')
  const categories: Category[] = categoryResponse.data.trivia_categories

  categories.map(async category => {
    const response = await axios.get('https://opentdb.com/api_token.php?command=request')
    const token: string = response.data.token
    const numOfQuestions = await axios.get(`https://opentdb.com/api_count.php?category=${category.id}`)

    const questionsSortByDiff: SortedResults = { easy: [], medium: [], hard: [] }
    let restQuestions = numOfQuestions.data.category_question_count.total_question_count as number
    console.log(category.name, restQuestions)

    while (true) {
      const amount = restQuestions >= 50 ? 50 : restQuestions

      const quizResponse = await axios.get(`https://opentdb.com/api.php?amount=${amount}&category=${category.id}&token=${token}`)
      if (quizResponse.data.response_code !== 0) {
        console.log('response code', quizResponse.data.response_code)
        break
      }

      const results: Result[] = quizResponse.data.results
      results.forEach((quizQuestion) => {
        questionsSortByDiff[quizQuestion.difficulty].push(quizQuestion)
      })

      restQuestions -= amount
    }

    const formattedTheme = category.name.includes(':') ? category.name.split(': ')[1] : category.name
    const stringTitleToCreateIdFrom = `${formattedTheme} from Open Trivia Database`
    const path = 'store/api/multipleChoiceQuiz'

    const formattedQuestions = Object.keys(questionsSortByDiff).map((key, i) => {
      const formattedQuestion: QuizMultiple = {
        id: getUuid(stringTitleToCreateIdFrom + key),
        title: `${formattedTheme} from Open Trivia Database`,
        description: `This is ${i === 0 ? 'an' : 'a'} ${Object.keys(questionsSortByDiff)[i]} multiple choice and yes/no quiz from Open Trivia Database, and is about ${formattedTheme}.`,
        date: Timestamp.fromDate(new Date()),
        difficulty: Difficulties[capitalizeFirstLetter(Object.keys(questionsSortByDiff)[i])],
        theme: formattedTheme,
        creatorId: 'https://opentdb.com/',
        creatorName: 'Open Trivia Database',
        downloads: 0,
        raitings: [],
        type: QuizType.MultipleChoiceQuiz,
        questions: questionsSortByDiff[key].map(thisQuestion => {
          return {
            question: thisQuestion.question,
            answer: thisQuestion.correct_answer,
            incorrect_answers: thisQuestion.incorrect_answers
          }
        }),
        path
      }
      return formattedQuestion
    })
    console.log(formattedQuestions[0].difficulty, formattedQuestions[0].questions.length)
    console.log(formattedQuestions[1].difficulty, formattedQuestions[1].questions.length)
    console.log(formattedQuestions[2].difficulty, formattedQuestions[2].questions.length)

    formattedQuestions.map(async quiz => {
      const firestoreQuiz = quizMultipleToFirestore(quiz, path)
      await setDoc(doc(db, path, quiz.id), firestoreQuiz)
    })
  })
}
