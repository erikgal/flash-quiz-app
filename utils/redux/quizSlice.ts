import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Quiz, QuizForm, QuizMultiple, UserAnswersForm, UserAnswersMultiple } from '../../types'

interface InitalQuizState {
  quizzes: Quiz[]
  currentQuiz: Quiz | null
  currentQuizForm: QuizForm | null
  currentQuizMultiple: QuizMultiple | null
  userAnswersForm: UserAnswersForm
  userAnswersMultiple: UserAnswersMultiple
}

const initialState: InitalQuizState = {
  quizzes: [],
  currentQuiz: null,
  currentQuizForm: null,
  currentQuizMultiple: null,
  userAnswersForm: {
    corrections: [],
    userAnswers: []
  },
  userAnswersMultiple: {
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
    setCurrentQuizForm: (state, action: PayloadAction<QuizForm | null>) => {
      state.currentQuizForm = action.payload
    },
    setCurrentQuizMultiple: (state, action: PayloadAction<QuizMultiple | null>) => {
      state.currentQuizMultiple = action.payload
    },
    saveUserFormAnswers: (state, action: PayloadAction<UserAnswersForm>) => {
      state.userAnswersForm = action.payload
    },
    saveUserMultipleAnswers: (state, action: PayloadAction<UserAnswersMultiple>) => {
      state.userAnswersMultiple = action.payload
    }
  }
})

export const { addQuiz, loadQuizzes, setCurrentQuiz, setCurrentQuizForm, setCurrentQuizMultiple, saveUserFormAnswers, saveUserMultipleAnswers } = quizSlice.actions
export default quizSlice.reducer
