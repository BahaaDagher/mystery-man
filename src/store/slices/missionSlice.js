import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import i18n from "../../i18n";
const currentLanguage = localStorage.getItem("language") || "en";

export const getMissions = createAsyncThunk(
"mission/getMissions", 
async (values) => {
    console.log("i18n.lang", i18n.language)
    const token = localStorage.getItem('token');
    try {
    const response = await axios.get(
        `https://mystery.cloudy.mohamedmansi.com/api/getMissions` ,{
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
export const getCompletedMissionAnswer = createAsyncThunk(
"mission/getCompletedMissionAnswer", 
async (values) => {

    const token = localStorage.getItem('token');
    try {
    const response = await axios.get(
        `https://mystery.cloudy.mohamedmansi.com/api/getAnswers?mission_id=${values}` ,{
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
export const addMissions = createAsyncThunk(
    "mission/addMissions", 
    async (values) => {
        const token = localStorage.getItem('token');
        try {
        const response = await axios.post(
            `https://mystery.cloudy.mohamedmansi.com/api/addMission` ,
            values , 
            {
                headers: {
                    "Authorization" : token ,
                    "lang" : currentLanguage ,
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
        CompletedMissionAnswer : {} ,
        SelectedMission : 0  , 
    },
    reducers: {
        setCurrentMission: (state, action) => {
            state.CurrentMission = action.payload
        },
        setSelectedMission: (state, action) => {
            state.SelectedMission = action.payload
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
        
        .addCase(getCompletedMissionAnswer.fulfilled , (state, action) => {
            state.CompletedMissionAnswer = action.payload;
       
        }) 
    }
    });
    export const { 
        setCurrentMission ,
        setSelectedMission  , 
    } = missionSlice.actions;
    
    export default missionSlice.reducer;