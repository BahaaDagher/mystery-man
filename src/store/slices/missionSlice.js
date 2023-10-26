import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getMissions = createAsyncThunk(
"mission/getMissions", 
async (values) => {
    try {
    const response = await axios.get(
        `https://mystery.cloudy.mohamedmansi.com/api/getMissions` ,{
            headers: {
                "Authorization" : "Bearer 64|gEqIzAnQDN6oe8YVOYwWqoYjATsHdzFIAdUGHx5Wd8f490fd" , 
                "lang" : "en"
            },
        }
    );
    return response.data ;
    } catch (error) {
    console.error(error);
    }
}
);

const missionSlice = createSlice({
    name: "mission",
    initialState: {
        getMissionsData : {} ,
        getMissionsLoading : false , 
    },
    extraReducers: (builder) => {
        builder
        .addCase(getMissions.fulfilled , (state, action) => {
            state.getMissionsData = action.payload;
            state.getMissionsLoading = false;
        }) 
        .addCase(getMissions.pending, (state, action) => {
            state.getMissionsLoading = true;
        }) 
        .addCase(getMissions.rejected , (state, action) => {
            state.getMissionsLoading = false;
        })
    
    }
    });
    
    export default missionSlice.reducer;