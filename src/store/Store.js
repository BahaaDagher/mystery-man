import { configureStore } from '@reduxjs/toolkit'
import directionSlice from './slices/directionSlice'


export const store = configureStore({
  reducer: {
    directionData : directionSlice ,
  },
})