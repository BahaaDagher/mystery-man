import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import i18n from "../../i18n";
import { API_BASE_URL } from "../../config/api";

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
        
        const url = `${API_BASE_URL}/report/oneBranch?${params.toString()}`;
        
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
            
            const url = `${API_BASE_URL}/report/moreThanBranch?${params.toString()}`;
            
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

export const qrCodeReport = createAsyncThunk(
    "report/qrCodeReport", 
    async (values) => {
        try {
            const token = localStorage.getItem('token');
            
            // Build query parameters
            const params = new URLSearchParams();
            if (values.from_date) params.append('from_date', values.from_date);
            if (values.to_date) params.append('to_date', values.to_date);
            if (values.qr_code_id) params.append('qr_code_id', values.qr_code_id);
            
            const url = `${API_BASE_URL}/report/qrCode?${params.toString()}`;
            
            const response = await axios.get(url, {
                headers: {
                    "Authorization" : token , 
                    "lang" : currentLanguage ,
                },
            });
            return response.data ;
        } catch (error) {
            console.error("qrCodeReport::" , error);
        }
    }
    );

export const getHomeData = createAsyncThunk(
    "report/getHomeData", 
    async () => {
        try {
            const token = localStorage.getItem('token');
            
            const response = await axios.get(
                "https://test.secretvisitor.co/dashboard/api/statics/getHomeData", 
                {
                    headers: {
                        "Authorization" : token , 
                        "lang" : currentLanguage ,
                    },
                }
            );
            return response.data ;
        } catch (error) {
            console.error("getHomeData::" , error);
        }
    }
);

export const getCitiesBranches = createAsyncThunk(
    "report/getCitiesBranches", 
    async () => {
        try {
            const token = localStorage.getItem('token');
            
            const response = await axios.get(
                "https://test.secretvisitor.co/dashboard/api/statics/citiesBranches", 
                {
                    headers: {
                        "Authorization" : token , 
                        "lang" : currentLanguage ,
                    },
                }
            );
            return response.data ;
        } catch (error) {
            console.error("getCitiesBranches::" , error);
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

    qrCodeReportData: {},
    qrCodeReportLoading : false ,

    getHomeDataData: {},
    getHomeDataLoading : false ,

    getCitiesBranchesData: {},
    getCitiesBranchesLoading : false ,

    
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
    // qrCodeReport
    .addCase(qrCodeReport.fulfilled, (state, action) => {
        state.qrCodeReportData = action.payload;
        state.qrCodeReportLoading = false;
    }) 
    .addCase(qrCodeReport.pending, (state, action) => {
        state.qrCodeReportLoading = true;
    }) 
    .addCase(qrCodeReport.rejected , (state, action) => {
        state.qrCodeReportLoading = false;
    })
    // getHomeData
    .addCase(getHomeData.fulfilled, (state, action) => {
        state.getHomeDataData = action.payload;
        state.getHomeDataLoading = false;
    }) 
    .addCase(getHomeData.pending, (state, action) => {
        state.getHomeDataLoading = true;
    }) 
    .addCase(getHomeData.rejected , (state, action) => {
        state.getHomeDataLoading = false;
    })
    // getCitiesBranches
    .addCase(getCitiesBranches.fulfilled, (state, action) => {
        state.getCitiesBranchesData = action.payload;
        state.getCitiesBranchesLoading = false;
    }) 
    .addCase(getCitiesBranches.pending, (state, action) => {
        state.getCitiesBranchesLoading = true;
    }) 
    .addCase(getCitiesBranches.rejected , (state, action) => {
        state.getCitiesBranchesLoading = false;
    })
    

}
});

export default reportSlice.reducer;


