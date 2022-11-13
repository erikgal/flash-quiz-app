import { configureStore } from '@reduxjs/toolkit'
import quizReducer from './utils/redux/quizSlice'

const store = configureStore({
  reducer: { quiz: quizReducer }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
