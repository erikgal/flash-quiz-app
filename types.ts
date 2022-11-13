import { NavigationProp } from '@react-navigation/native'

export interface Question {
  'question': string
  'answer': string[][]
}

export interface Timestamp {
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
