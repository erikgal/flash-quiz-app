import { NavigationProp } from '@react-navigation/native'
import { Timestamp } from 'firebase/firestore'

export interface Question {
  'question': string
  'answer': string[][]
}

export interface FirestoreAnswer {
  [key: number]: string
}

export interface FirestoreQuestion {
  'question': string
  'answer': FirestoreAnswer[]
}

export interface TimeDate {
  'nanoseconds': number
  'seconds': number
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
  'questions': Question[]
}

export interface FirestoreQuiz {
  'title': string
  'description': string
  'date': Timestamp
  'difficulty': number
  'theme': string
  'creatorId': string
  'creatorName': string
  'questions': FirestoreQuestion[]
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
