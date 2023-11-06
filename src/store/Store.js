import { configureStore } from '@reduxjs/toolkit'
import directionSlice from './slices/directionSlice'
import authSlice from './slices/authSlice'
import branchSlice from './slices/branchSlice'
import questionerSlice from './slices/questionierSlice'
import missionSlice from './slices/missionSlice'
import profileSlice from './slices/profileSlice'
import chatSlice from './slices/chatSlice'



export const store = configureStore({
  reducer: {
    directionData : directionSlice ,
    authData : authSlice ,
    branchData : branchSlice , 
    questioneirData : questionerSlice , 
    missionData : missionSlice, 
    profileData : profileSlice ,
    chatData:chatSlice

  },
})