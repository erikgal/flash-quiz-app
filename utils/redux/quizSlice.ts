import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Quiz, UserAnswers } from '../../types'

interface InitalQuizState {
  quizzes: Quiz[]
  currentQuiz: Quiz | null
  userAnswers: UserAnswers
}

const initialState: InitalQuizState = {
  quizzes: [],
  currentQuiz: null,
  userAnswers: {
    corrections: [],
    userAnswers: []
  }
}

export const quizSlice = createSlice({
  name: 'QuizActions',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    addQuiz: (state, action: PayloadAction<Quiz>) => {
      state.quizzes.push(action.payload)
    },
    loadQuizzes: (state, action: PayloadAction<Quiz[]>) => {
      state.quizzes = action.payload
    },
    setCurrentQuiz: (state, action: PayloadAction<Quiz | null>) => {
      state.currentQuiz = action.payload
    },
    saveUserAnswers: (state, action: PayloadAction<UserAnswers>) => {
      state.userAnswers = action.payload
    }
  }
})

export const { addQuiz, loadQuizzes, setCurrentQuiz, saveUserAnswers } = quizSlice.actions
export default quizSlice.reducer
