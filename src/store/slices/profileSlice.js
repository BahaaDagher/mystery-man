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
            `https://test.secretvisitor.co/dashboard/api/getProfileDataMIssion` ,{
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
            `https://test.secretvisitor.co/dashboard/api/updateProfilemission` ,
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

export const getNotifications = createAsyncThunk(
    "profile/getNotifications", 
    async (values) => {
        const token = localStorage.getItem('token');
        try {
        const response = await axios.get(
            `https://test.secretvisitor.co/dashboard/api/getNotifications` , {
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

export const getWalletTransactions = createAsyncThunk(
    "profile/getWalletTransactions", 
    async () => {
        const token = localStorage.getItem('token');
        try {
        const response = await axios.get(
            `https://test.secretvisitor.co/dashboard/api/walletTransactions` , {
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

        getNotificationsData : {} ,
        getNotificationsLoading : false ,

        getWalletTransactionsData : {} ,
        getWalletTransactionsLoading : false ,
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
        // get notification 
        .addCase(getNotifications.fulfilled , (state, action) => {
            state.getNotificationsData = action.payload;
            state.getNotificationsLoading = false;
        }) 
        .addCase(getNotifications.pending , (state, action) => {
            state.getNotificationsLoading = true;
        }) 
        .addCase(getNotifications.rejected , (state, action) => {
            state.getNotificationsLoading = false;
        }) 
        // get wallet transactions
        .addCase(getWalletTransactions.fulfilled , (state, action) => {
            state.getWalletTransactionsData = action.payload;
            state.getWalletTransactionsLoading = false;
        }) 
        .addCase(getWalletTransactions.pending , (state, action) => {
            state.getWalletTransactionsLoading = true;
        }) 
        .addCase(getWalletTransactions.rejected , (state, action) => {
            state.getWalletTransactionsLoading = false;
        }) 

    
    }
});
export const { ProfileData }=profileSlice.actions;
export default profileSlice.reducer;