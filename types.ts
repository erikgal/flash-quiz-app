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
  'answer': string[]
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
  'raitings': Raiting[]
}

export interface QuizForm extends Quiz {
  'questions': QuestionForm[]
  'type': QuizType.FormQuiz
}

export interface QuizMultiple extends Quiz {
  'questions': QuestionMultiple []
  'type': QuizType.MultipleChoiceQuiz
}

export interface FirestoreFormAnswer {
  [key: number]: string
}

export interface FirestoreQuestion {
  'question': string
  'answer': FirestoreFormAnswer[]
}

export interface Raiting {
  'creatorId': number
}

export interface FirestoreQuiz {
  'title': string
  'description': string
  'date': Timestamp
  'difficulty': number
  'theme': string
  'creatorId': string
  'creatorName': string
}

export interface FirestoreQuizForm extends FirestoreQuiz {
  'questions': FirestoreQuestion[]
  'downloads': number
  'raitings': Raiting[]
  'type': QuizType.FormQuiz
}

export interface FirestoreQuizMultiple extends FirestoreQuiz {
  'questions': FirestoreQuestion[]
  'downloads': number
  'raitings': Raiting[]
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

export interface UserAnswers {
  corrections: boolean[][]
  userAnswers: InputMap[]
}
