import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getMissions = createAsyncThunk(
"mission/getMissions", 
async (values) => {
    try {
    const response = await axios.get(
        `https://mystery.cloudy.mohamedmansi.com/api/getMissions` ,{
            headers: {
                "Authorization" : "Bearer 112|nZSbjQaMv0nJkmfw2puEbR6O1LGN6g1tQ9XgWdYo3fba4d22" , 
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
        const response = await axios.post(
            `https://mystery.cloudy.mohamedmansi.com/api/addMission` ,
            values , 
            {
                headers: {
                    "Authorization" : "Bearer 112|nZSbjQaMv0nJkmfw2puEbR6O1LGN6g1tQ9XgWdYo3fba4d22" , 
                
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
        CurrentMission : {} ,
    },
    reducers: {
        setCurrentMission: (state, action) => {
            state.CurrentMission = action.payload
        },
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
    export const { 
        setCurrentMission ,
    } = missionSlice.actions;
    
    export default missionSlice.reducer;