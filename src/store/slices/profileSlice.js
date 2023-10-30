import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import i18n from "../../i18n";
import axios from "axios";
const currentLanguage = localStorage.getItem("language") || "en";

export const getProfile = createAsyncThunk(
    "profile/getProfile", 
    async (values) => {
        console.log("i18n.lang", i18n.language)
        const token = localStorage.getItem('token');
        try {
        const response = await axios.get(
            `https://mystery.cloudy.mohamedmansi.com/api/getProfileDataMIssion` ,{
                headers: {
                    "Authorization" : token , 
                    "lang" : currentLanguage
                },
            }
        );
        return response.data ;
        } catch (error) {
        console.error(error);
        }
    }
    );
const profileSlice = createSlice({
    name: "profile",
    initialState: {
        getProfileData : {} ,
        getProfileLoading : false ,
    },
    extraReducers: (builder) => {
        builder
        .addCase(getProfile.fulfilled , (state, action) => {
            state.getProfileData = action.payload;
            state.getProfileLoading = false;
        }) 
        .addCase(getProfile.pending , (state, action) => {
            state.getProfileLoading = true;
        }) 
        .addCase(getProfile.rejected , (state, action) => {
            state.getProfileLoading = false;
        }) 
    
    }
});

export default profileSlice.reducer;