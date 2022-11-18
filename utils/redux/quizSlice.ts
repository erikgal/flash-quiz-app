import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Quiz, QuizForm, UserAnswers } from '../../types'

interface InitalQuizState {
  quizzes: Quiz[]
  currentQuiz: Quiz | null
  currentQuizForm: QuizForm | null
  userAnswers: UserAnswers
}

const initialState: InitalQuizState = {
  quizzes: [],
  currentQuiz: null,
  currentQuizForm: null,
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
    setCurrentQuizWrite: (state, action: PayloadAction<QuizForm | null>) => {
      state.currentQuizForm = action.payload
    },
    saveUserAnswers: (state, action: PayloadAction<UserAnswers>) => {
      state.userAnswers = action.payload
    }
  }
})

export const { addQuiz, loadQuizzes, setCurrentQuiz, setCurrentQuizWrite, saveUserAnswers } = quizSlice.actions
export default quizSlice.reducer
