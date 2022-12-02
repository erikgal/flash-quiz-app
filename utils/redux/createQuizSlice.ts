import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { QuizInformation } from '../../types'

interface InitialCreateQuizState {
  quizInfo: QuizInformation
}

const initialState: InitialCreateQuizState = {
  quizInfo: {
    name: undefined,
    description: undefined,
    theme: undefined,
    difficulty: undefined,
    isMultipleChoice: undefined
  }
}

export const createQuizSlice = createSlice({
  name: 'CreateQuizSlice',
  initialState,
  reducers: {
    setQuizInfo: (state, action: PayloadAction<QuizInformation>) => {
      state.quizInfo = action.payload
    },
    setIsMultiplechoice: (state, action: PayloadAction<number>) => {
      state.quizInfo.isMultipleChoice = action.payload
    }
  }
})

export const { setQuizInfo, setIsMultiplechoice } = createQuizSlice.actions
export default createQuizSlice.reducer
