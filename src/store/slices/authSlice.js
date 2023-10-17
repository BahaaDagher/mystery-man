import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userRegister = createAsyncThunk(
    "auth/userRegister", 
    async (values) => {
      try {
        const response = await axios.post(
          "https://mystery.cloudy.mohamedmansi.com/api/registerMission" ,
            values
        );
        return response.data ;
      } catch (error) {
        console.error(error);
      }
  });

const authSlice = createSlice({
  name: "auth",
  initialState: {
    RegisterData: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.fulfilled, (state, action) => {
        state.RegisterData = action.payload;
      })
  }
});

export default authSlice.reducer;