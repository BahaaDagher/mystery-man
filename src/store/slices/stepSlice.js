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





const stepSlice = createSlice({
name: "branch",
initialState: {
    getStepsData: {},
    getStepsLoading : false ,    
},
extraReducers: (builder) => {
    builder
    // onBranchReport
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


        

}
});

export default stepSlice.reducer;


