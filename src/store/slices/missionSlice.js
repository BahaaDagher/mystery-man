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
export const addMissions = createAsyncThunk(
    "mission/addMissions", 
    async (values) => {
        try {
        const response = await axios.get(
            `https://mystery.cloudy.mohamedmansi.com/api/addMission` ,
            values , 
            {
                headers: {
                    "Authorization" : "109|cILufr8ALMtQIquXIouhMJGEkPYdilbuNTZjbIGfa023db49" , 
                    "lang" : "ar"
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
        addMissionsData : {} ,
        addMissionsLoading : false ,  
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

        .addCase(addMissions.fulfilled , (state, action) => {
            state.addMissionsData = action.payload;
            state.addMissionsLoading = false;
        }) 
        .addCase(addMissions.pending, (state, action) => {
            state.addMissionsLoading = true;
        }) 
        .addCase(addMissions.rejected , (state, action) => {
            state.addMissionsLoading = false;
        })
    
    }
    });
    
    export default missionSlice.reducer;