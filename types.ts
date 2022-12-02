import { NavigationProp } from '@react-navigation/native'
import { Timestamp } from 'firebase/firestore'

export enum QuizType {
  FormQuiz = 'formQuiz',
  MultipleChoiceQuiz = 'multipleChoiceQuiz'
}

export interface QuestionForm {
  'question': string
  'answer': string[][]
}

export interface QuestionMultiple {
  'question': string
  'answer': string
  'incorrect_answers': string[]
}

export interface UTCEpochTime {
  nanoseconds: number
  seconds: number
}

export interface Quiz {
  'title': string
  'id': string
  'description': string
  'date': UTCEpochTime
  'difficulty': number
  'theme': string
  'creatorId': string
  'creatorName': string
  'type': QuizType
  'downloads': number
  'path'?: string
  'raitings': Raitings
  'questions': QuestionForm[] | QuestionMultiple[]
}

export interface QuizForm extends Quiz {
  'questions': QuestionForm[]
  'type': QuizType.FormQuiz
}

export interface QuizMultiple extends Quiz {
  'questions': QuestionMultiple[]
  'type': QuizType.MultipleChoiceQuiz
}

export interface FirestoreFormAnswer {
  [key: number]: string
}

export interface FirestoreFormQuestion {
  'question': string
  'answer': FirestoreFormAnswer[]
}

export interface FirestoreMultipleQuestion {
  'question': string
  'answer': string
  'incorrect_answers': string[]
}

export interface Raitings {
  [userId: string]: number
}

export interface FirestoreQuiz {
  'title': string
  'description': string
  'date': Timestamp
  'difficulty': number
  'theme': string
  'creatorId': string
  'creatorName': string
  'downloads': number
  'raitings': Raitings
  'path': string
}

export interface FirestoreQuizForm extends FirestoreQuiz {
  'questions': FirestoreFormQuestion[]
  'type': QuizType.FormQuiz
}

export interface FirestoreQuizMultiple extends FirestoreQuiz {
  'questions': FirestoreMultipleQuestion[]
  'type': QuizType.MultipleChoiceQuiz
}

export interface RouterProps {
  navigation: NavigationProp<any, any>
}

export enum Difficulties {
  Easy = 0,
  Medium = 1,
  Hard = 2
}

export interface InputMap {
  [key: number]: string
}

export interface UserAnswersForm {
  corrections: boolean[][]
  userAnswers: InputMap[]
}
export interface QuizInformation {
  name: string | undefined
  description: string | undefined
  theme: string | undefined
  difficulty: number | undefined
  isMultipleChoice: number | undefined
}
export interface UserAnswersMultiple {
  corrections: boolean[]
  userAnswers: string[]
}

export interface AddQuestionProps {
  index: number
  handleNewQuestion: () => void
  handleRemoveQuestion: (i: number) => void
  handleQuestionChange: (questionInput: string, i: number) => void
  handleAnswerChange: (questionInput: string, i: number) => void
  handleSubmitChange: (input: boolean, i: number) => void
  handleQuestionIsToggledChange: (input: boolean, i: number) => void
  handleColorQuestionChange: (input: string, i: number) => void
  handleColorFormChange: (input: string, i: number) => void
  questions: QuestionFormQuestion[]
  questionFromParent: QuestionForm
}

export interface QuestionFormQuestion {
  questions: QuestionForm
  isSubmitted: boolean
  questionIsToggled: boolean
  colorQuestion: string
  colorForm: string
}

export interface MultipleChoiceQuestion {
  questionMultiple: QuestionMultiple
  isSubmitted: boolean
}

export interface AddMultipleChoiceProps {
  index: number
  handleNewQuestion: () => void
  handleRemoveQuestion: (i: number) => void
  handleQuestionChange: (questionInput: string, i: number) => void
  handleAnswerChange: (questionInput: string, i: number) => void
  handleSubmitChange: (input: boolean, i: number) => void
  handleIncorrectAnswersChange: (input: string, i: number, j: number) => void
  handleNewIncorrectAnswer: (input: number) => void
  questions: MultipleChoiceQuestion[]
}
