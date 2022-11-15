import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Quiz } from '../../types'

interface InitalQuizState {
  currentQuiz: Quiz | null
}

const initialState: InitalQuizState = {
  currentQuiz: null
}

export const storeSlice = createSlice({
  name: 'QuizActions',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setCurrentQuiz: (state, action: PayloadAction<Quiz | null>) => {
      state.currentQuiz = action.payload
    }
  }
})

export const { setCurrentQuiz } = storeSlice.actions
export default storeSlice.reducer
