import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import i18n from "../../i18n";
const currentLanguage = localStorage.getItem("language") || "en";

export const getMissions = createAsyncThunk(
"mission/getMissions", 
async (values = {}) => {
    console.log("i18n.lang", i18n.language)
    const token = localStorage.getItem('token');
    try {
        // Build query parameters
        const params = new URLSearchParams();
        if (values.branch_id) params.append('branch_id', values.branch_id);
        if (values.date_from) params.append('date_from', values.date_from);
        if (values.date_to) params.append('date_to', values.date_to);
        
        const url = `https://test.secretvisitor.co/dashboard/api/getMissions?${params.toString()}`;
        
        const response = await axios.get(
            url, 
            {
                headers: {
                    "Authorization": token,
                    "lang": currentLanguage
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
);
export const getQuestionsMissions = createAsyncThunk(
"mission/getQuestionsMissions", 
async (values) => {
    console.log("i18n.lang", i18n.language)
    const token = localStorage.getItem('token');
    try {
    const response = await axios.get(
        `https://test.secretvisitor.co/dashboard/api/getQuestionsMissions?mission_id=${values}` ,{
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
        `https://test.secretvisitor.co/dashboard/api/getAnswers?mission_id=${values}` ,{
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
export const accepetRequest = createAsyncThunk(
"mission/accepetRequest", 
async (values) => {

    const token = localStorage.getItem('token');
    try {
    const response = await axios.post(
        `https://test.secretvisitor.co/dashboard/api/accepetRequest`,
        {
            mission_id: values.mission_id  ,
            order_id: values.order_id
        } ,
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
export const addMissions = createAsyncThunk(
    "mission/addMissions", 
    async (values) => {
        const token = localStorage.getItem('token');
        try {
        const response = await axios.post(
            `https://test.secretvisitor.co/dashboard/api/addMission` ,
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
export const deleteMission = createAsyncThunk(
    "mission/deleteMission", 
    async (values) => {
        const token = localStorage.getItem('token');
        try {
        const response = await axios.post(
            `https://test.secretvisitor.co/dashboard/api/deleteMission` ,
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
    export const RateVisitor = createAsyncThunk(
        "mission/RateVisitor", 
        async (values) => {
            const token = localStorage.getItem('token');
            try {
            const response = await axios.post(
                `https://test.secretvisitor.co/dashboard/api/rate_vistors` ,
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

export const sendMissionPdf = createAsyncThunk(
    "mission/sendMissionPdf", 
    async (values) => {
        const token = localStorage.getItem('token');
        try {
        const formData = new FormData();
        formData.append('pdf', values.pdfBlob, 'mission_certificate.pdf');
        
        const response = await axios.post(
            `https://test.secretvisitor.co/dashboard/api/missionPdf/${values.missionId}` ,
            formData , 
            {
                headers: {
                    "Authorization" : token ,
                    "lang" : currentLanguage ,
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return response.data ;
        } catch (error) {
        console.error(error);
        return { error: error.message };
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
        missionDetails : {} , 
        accepetRequestData:{},
        accepetRequestDataLoading:{},
        questionsMissionsData:{},
        deleteMissionData:{},
        deleteMissionLoading:false , 

        rateVisitorData:{},
        rateVisitorLoading:false ,
        sendMissionPdfData:{},
        sendMissionPdfLoading:false ,
    },
    reducers: {
        setCurrentMission: (state, action) => {
            state.CurrentMission = action.payload
        },
        setSelectedMission: (state, action) => {
            state.SelectedMission = action.payload
        },
        viewMission: (state, action) => {
            state.missionDetails = action.payload
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
        .addCase(accepetRequest.fulfilled , (state, action) => {
            state.accepetRequestData = action.payload;
            state.accepetRequestDataLoading = false;
        }) 
         .addCase(accepetRequest.pending , (state, action) => {
            state.accepetRequestDataLoading = true;
        }) 
        .addCase(accepetRequest.rejected , (state, action) => {
            state.accepetRequestDataLoading = false;

        }) 
        .addCase(getQuestionsMissions.fulfilled , (state, action) => {
            state.questionsMissionsData = action.payload;
       
        }) 
        // delete mission 
        .addCase(deleteMission.fulfilled , (state, action) => {
            state.deleteMissionData = action.payload;
            state.deleteMissionLoading = false;
        }) 
        .addCase(deleteMission.pending , (state, action) => {
            state.deleteMissionLoading = true;
        }) 
        .addCase(deleteMission.rejected , (state, action) => {
            state.deleteMissionLoading = false;
        }) 
        // rate visitor
        .addCase(RateVisitor.fulfilled , (state, action) => {
            state.rateVisitorData = action.payload;
            state.rateVisitorLoading = false;
        }) 
        .addCase(RateVisitor.pending, (state, action) => {
            state.rateVisitorLoading = true;
        }) 
        .addCase(RateVisitor.rejected , (state, action) => {
            state.rateVisitorLoading = false;
        })
        // send mission pdf
        .addCase(sendMissionPdf.fulfilled , (state, action) => {
            state.sendMissionPdfData = action.payload;
            state.sendMissionPdfLoading = false;
        }) 
        .addCase(sendMissionPdf.pending, (state, action) => {
            state.sendMissionPdfLoading = true;
        }) 
        .addCase(sendMissionPdf.rejected , (state, action) => {
            state.sendMissionPdfLoading = false;
        })
    }
    });
    export const { 
        setCurrentMission ,
        setSelectedMission  , 
        viewMission , 
    } = missionSlice.actions;
    
    export default missionSlice.reducer;