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


export const deleteBranch = createAsyncThunk(
    "branch/deleteBranch", 
    async (values) => {
        const token = localStorage.getItem('token');
        try {
        const response = await axios.get(
            `https://test.secretvisitor.co/dashboard/api/deleteBranch?branch_id=${values.id}` ,{
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

export const getBranches = createAsyncThunk(
    "branch/getBranches", 
    async (values) => {
        const token = localStorage.getItem('token');
        try {
        const response = await axios.get(
            "https://test.secretvisitor.co/dashboard/api/getBranches" ,{
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


const reportSlice = createSlice({
name: "branch",
initialState: {
    oneBranchReportData: {},
    oneBranchReportLoading : false ,

    
    getBranchesData : {} ,
    getBranchesDataLoading : false ,
    deleteBranchData : {} ,
    deleteBranchLoading : false , 
    
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

    .addCase(getBranches.fulfilled, (state, action) => {
        state.getBranchesData = action.payload;
        state.getBranchesDataLoading = false;
    }) 
    .addCase(getBranches.pending, (state, action) => {
        state.getBranchesDataLoading = true;
    }) 
    .addCase(getBranches.rejected , (state, action) => {
        state.getBranchesDataLoading = false;
    })

    .addCase(deleteBranch.fulfilled , (state, action) => {
        state.deleteBranchData = action.payload;
        state.deleteBranchLoading = false;
    }) 
    .addCase(deleteBranch.pending, (state, action) => {
        state.deleteBranchLoading = true;
    }) 
    .addCase(deleteBranch.rejected , (state, action) => {
        state.deleteBranchLoading = false;
    })

}
});

export default reportSlice.reducer;


