import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import i18n from "../../i18n";
const currentLanguage = localStorage.getItem("language") || "en";


export const userRegister = createAsyncThunk(
  "auth/userRegister", 
  async (values) => {
      
      try {
        const response = await axios.post(
          "https://mystery.cloudy.mohamedmansi.com/api/registerMission" ,
            values, 
            {
              headers: {
                "lang" : currentLanguage ,
              },
            }
        );
        return response.data ;
      } catch (error) {
        console.error(error);
      }
  });

  export const userLogin = createAsyncThunk(
    "auth/userLogin", 
    async (values) => {
      
      try {
        const response = await axios.post(
          "https://mystery.cloudy.mohamedmansi.com/api/loginMission" ,{
              phone:values.phone,
              password:values.password
          } , 
          {
            headers: {
              "lang" : currentLanguage ,
            },
          }
        );
        return response.data ;
      } catch (error) {
        console.error(error);
      }
  });
  export const userLogout = createAsyncThunk(
    "auth/userLogout", 
    async (values) => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.post(
          "http://mystery.cloudy.mohamedmansi.com/api/logout" ,{
              phone:values.phone,
              password:values.password
          },
          {
            headers: {
              "lang" : currentLanguage ,
              Authorization : token , 
            },
          }
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
    LoginData: {},
    userLogoutData: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.fulfilled, (state, action) => {
        state.RegisterData = action.payload;
      }) 
      .addCase(userLogin.fulfilled, (state, action) => {
        state.LoginData = action.payload;
      })
  }
});

export default authSlice.reducer;