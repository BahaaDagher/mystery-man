import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import i18n from "../../i18n";
import axios from "axios";
const currentLanguage = localStorage.getItem("language") || "en";

export const getProfile = createAsyncThunk(
    "profile/getProfile", 
    async (values) => {
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
    export const updateProfile = createAsyncThunk(
        "profile/updateProfile", 
        async (values) => {
            const token = localStorage.getItem('token');
            try {
            const response = await axios.post(
                `https://mystery.cloudy.mohamedmansi.com/api/updateProfilemission` ,
                values ,
                {
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
        profileData : {} , 

        updateProfileData : {}, 
        updateProfileLoading : false ,
    },
    reducers: {
        ProfileData: (state, action) => {
          state.profileData = action.payload
        },
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
        // update profile 
        .addCase(updateProfile.fulfilled , (state, action) => {
            state.updateProfileData = action.payload;
            state.updateProfileLoading = false;
        }) 
        .addCase(updateProfile.pending , (state, action) => {
            state.updateProfileLoading = true;
        }) 
        .addCase(updateProfile.rejected , (state, action) => {
            state.updateProfileLoading = false;
        }) 
    
    }
});
export const { ProfileData }=profileSlice.actions;
export default profileSlice.reducer;