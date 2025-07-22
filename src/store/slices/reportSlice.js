import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import i18n from "../../i18n";
const currentLanguage = localStorage.getItem("language") || "en";

export const oneBranchReport = createAsyncThunk(
"report/oneBranchReport", 
async (values) => {
    try {
        const token = localStorage.getItem('token');
        
        // Build query parameters
        const params = new URLSearchParams();
        if (values.branch_id) params.append('branch_id', values.branch_id);
        if (values.from_date) params.append('from_date', values.from_date);
        if (values.to_date) params.append('to_date', values.to_date);
        if (values.step_ids && values.step_ids.length > 0) {
            params.append('step_ids', JSON.stringify(values.step_ids));
        }
        
        const url = `https://test.secretvisitor.co/dashboard/api/report/oneBranch?${params.toString()}`;
        
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

export const moreThanBranchReport = createAsyncThunk(
    "report/moreThanBranchReport", 
    async (values) => {
        try {
            const token = localStorage.getItem('token');
            
            // Build query parameters
            const params = new URLSearchParams();
            console.log("values::::" , values)
            if (values.branch_ids) params.append('branch_ids', JSON.stringify(values.branch_ids));
            if (values.from_date) params.append('from_date', values.from_date);
            if (values.to_date) params.append('to_date', values.to_date);
            if (values.step_ids && values.step_ids.length > 0) {
                params.append('step_ids', JSON.stringify(values.step_ids));
            }
            
            const url = `https://test.secretvisitor.co/dashboard/api/report/moreThanBranch?${params.toString()}`;
            
            const response = await axios.get(url, {
                headers: {
                    "Authorization" : token , 
                    "lang" : currentLanguage ,
                },
            });
            return response.data ;
        } catch (error) {
            console.error("moreThanBranchReport::" , error);
        }
    }
    );


const reportSlice = createSlice({
name: "branch",
initialState: {
    oneBranchReportData: {},
    oneBranchReportLoading : false ,

    moreThanBranchReportData: {},
    moreThanBranchReportLoading : false ,

    
},
extraReducers: (builder) => {
    builder
    // onBranchReport
    .addCase(oneBranchReport.fulfilled, (state, action) => {
        state.oneBranchReportData = action.payload;
        state.oneBranchReportLoading = false;
    }) 
    .addCase(oneBranchReport.pending, (state, action) => {
        state.oneBranchReportLoading = true;
    }) 
    .addCase(oneBranchReport.rejected , (state, action) => {
        state.oneBranchReportLoading = false;
    })
    // moreThanBranchReport
    .addCase(moreThanBranchReport.fulfilled, (state, action) => {
        state.moreThanBranchReportData = action.payload;
        state.moreThanBranchReportLoading = false;
    }) 
    .addCase(moreThanBranchReport.pending, (state, action) => {
        state.moreThanBranchReportLoading = true;
    }) 
    .addCase(moreThanBranchReport.rejected , (state, action) => {
        state.moreThanBranchReportLoading = false;
    })
    

}
});

export default reportSlice.reducer;


