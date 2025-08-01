import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import i18n from "../../i18n";
const currentLanguage = localStorage.getItem("language") || "en";

export const getSteps = createAsyncThunk(
"report/getSteps", 
async (values) => {
    try {
        const token = localStorage.getItem('token');
        
        const url = `https://test.secretvisitor.co/dashboard/api/steps/all`;
        
        const response = await axios.get(url, {
            headers: {
                "Authorization" : token , 
                "lang" : currentLanguage ,
            },
        });
        return response.data ;
    } catch (error) {
        console.error(error);
    }
}
);

export const addStep = createAsyncThunk(
    "step/addStep", 
    async (values) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
            "https://test.secretvisitor.co/dashboard/api/steps/store" ,{
                name:values.name,
            },{
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

export const updateStep = createAsyncThunk(
    "step/updateStep", 
    async (values) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
            `https://test.secretvisitor.co/dashboard/api/steps/${values.id}/update` ,{
                name:values.name,
            },{
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

export const deleteStep = createAsyncThunk(
    "step/deleteStep", 
    async (values) => {
        try {
            debugger;
            const token = localStorage.getItem('token');
            const response = await axios.post(
            `https://test.secretvisitor.co/dashboard/api/steps/${values.id}/delete` ,{},{
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





const stepSlice = createSlice({
name: "step",
initialState: {
    getStepsData: {},
    getStepsLoading : false , 

    addStepData: {},
    addStepLoading : false ,

    updateStepData: {},
    updateStepLoading : false ,

    deleteStepData: {},
    deleteStepLoading : false ,
    
},
extraReducers: (builder) => {
    builder
    // getSteps
    .addCase(getSteps.fulfilled, (state, action) => {
        state.getStepsData = action.payload;
        state.getStepsLoading = false;
    }) 
    .addCase(getSteps.pending, (state, action) => {
        state.getStepsLoading = true;
    }) 
    .addCase(getSteps.rejected , (state, action) => {
        state.getStepsLoading = false;
    })
    // addStep
    .addCase(addStep.fulfilled, (state, action) => {
        state.addStepData = action.payload;
        state.addStepLoading = false;
    })
    .addCase(addStep.pending, (state, action) => {
        state.addStepLoading = true;
    })
    .addCase(addStep.rejected, (state, action) => {
        state.addStepLoading = false;
    })
    // updateStep
    .addCase(updateStep.fulfilled, (state, action) => {
        state.updateStepData = action.payload;
        state.updateStepLoading = false;
    })
    .addCase(updateStep.pending, (state, action) => {
        state.updateStepLoading = true;
    })
    .addCase(updateStep.rejected, (state, action) => {
        state.updateStepLoading = false;
    })
    // deleteStep
    .addCase(deleteStep.fulfilled, (state, action) => {
        state.deleteStepData = action.payload;
        state.deleteStepLoading = false;
    })
    .addCase(deleteStep.pending, (state, action) => {
        state.deleteStepLoading = true;
    })
    .addCase(deleteStep.rejected, (state, action) => {
        state.deleteStepLoading = false;
    })

        

}
});

export default stepSlice.reducer;


