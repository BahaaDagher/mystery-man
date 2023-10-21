import { configureStore } from '@reduxjs/toolkit'
import directionSlice from './slices/directionSlice'
import authSlice from './slices/authSlice'
import branchSlice from './slices/branchSlice'


export const store = configureStore({
  reducer: {
    directionData : directionSlice ,
    authData : authSlice ,
    branchData : branchSlice , 
  },
})