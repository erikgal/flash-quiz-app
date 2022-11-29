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

export interface Quiz {
  'title': string
  'id': string
  'description': string
  'date': Timestamp
  'difficulty': number
  'theme': string
  'creatorId': string
  'creatorName': string
  'type': QuizType
  'downloads': number
  'path'?: string
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

export interface UserAnswersMultiple {
  corrections: boolean[]
  userAnswers: string[]
}
