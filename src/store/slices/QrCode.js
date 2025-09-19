import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import i18n from "../../i18n";
import { API_BASE_URL } from "../../config/api";
const currentLanguage = localStorage.getItem("language") || "en";

export const storeQrCodeQuestionnaire = createAsyncThunk(
    "qrCode/storeQrCodeQuestionnaire", 
    async (values) => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.post(
          `${API_BASE_URL}/qrCodeQuestion/store`, 
          values,
          { headers: {"Authorization" : token , "lang" : currentLanguage ,}}
        );
        return response.data ;
      } catch (error) {
        console.error("storeQrCodeQuestionnaire::", error);
        return error.response.data ;
      }
});

export const getQrCodeBranches = createAsyncThunk(
    "qrCode/getQrCodeBranches", 
    async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(
          `${API_BASE_URL}/qrCodeBranch/all`, 
          { headers: {"Authorization" : token , "lang" : currentLanguage ,}}
        );
        return response.data ;
      } catch (error) {
        console.error("getQrCodeBranches::", error);
      }
});

export const getQrCodeBranchResponses = createAsyncThunk(
    "qrCode/getQrCodeBranchResponses", 
    async (values = {}) => {
      const token = localStorage.getItem('token');
      try {
        // Build query parameters
        const params = new URLSearchParams();
        if (values.branch_id) params.append('branch_id', values.branch_id);
        if (values.from_date) params.append('date_from', values.from_date);
        if (values.to_date) params.append('date_to', values.to_date);
        
        const url = `${API_BASE_URL}/qrCodeBranch/responses?${params.toString()}`;
        
        const response = await axios.get(
          url, 
          { headers: {"Authorization" : token , "lang" : currentLanguage ,}}
        );
        return response.data ;
      } catch (error) {
        console.error("getQrCodeBranchResponses::", error);
      }
});

export const getResponseDetails = createAsyncThunk(
    "qrCode/getResponseDetails", 
    async (responseId) => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(
          `${API_BASE_URL}/qrCodeBranch/responses/${responseId}`, 
          { headers: {"Authorization" : token , "lang" : currentLanguage ,}}
        );
        return response.data ;
      } catch (error) {
        console.error("getResponseDetails::", error);
      }
});

export const deleteQrCodeBranch = createAsyncThunk(
    "qrCode/deleteQrCodeBranch", 
    async (branchId) => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.post(
          `${API_BASE_URL}/qrCodeBranch/${branchId}/delete`, 
          {},
          { headers: {"Authorization" : token , "lang" : currentLanguage ,}}
        );
        return response.data ;
      } catch (error) {
        console.error("deleteQrCodeBranch::", error);
      }
});

const qrCodeSlice = createSlice({
    name: "qrCode",
    initialState: {
        qrCodeQuestionnaireStoreData: {},
        qrCodeQuestionnaireStoreLoading: false,
        qrCodeBranchesData: {},
        qrCodeBranchesLoading: false,
        qrCodeBranchResponsesData: {},
        qrCodeBranchResponsesLoading: false,
        responseDetailsData: {},
        responseDetailsLoading: false,
        deleteQrCodeBranchData: {},
        deleteQrCodeBranchLoading: false,
    },
    reducers: {
        // Add any additional reducers here if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(storeQrCodeQuestionnaire.fulfilled, (state, action) => {
                state.qrCodeQuestionnaireStoreData = action.payload;
                state.qrCodeQuestionnaireStoreLoading = false;
            })
            .addCase(storeQrCodeQuestionnaire.pending, (state, action) => {
                state.qrCodeQuestionnaireStoreLoading = true;
            })
            .addCase(storeQrCodeQuestionnaire.rejected, (state, action) => {
              state.qrCodeQuestionnaireStoreData = action.payload;
                state.qrCodeQuestionnaireStoreLoading = false;
            })
            .addCase(getQrCodeBranches.fulfilled, (state, action) => {
                state.qrCodeBranchesData = action.payload;
                state.qrCodeBranchesLoading = false;
            })
            .addCase(getQrCodeBranches.pending, (state, action) => {
                state.qrCodeBranchesLoading = true;
            })
            .addCase(getQrCodeBranches.rejected, (state, action) => {
                state.qrCodeBranchesLoading = false;
            })
            .addCase(getQrCodeBranchResponses.fulfilled, (state, action) => {
                state.qrCodeBranchResponsesData = action.payload;
                state.qrCodeBranchResponsesLoading = false;
            })
            .addCase(getQrCodeBranchResponses.pending, (state, action) => {
                state.qrCodeBranchResponsesLoading = true;
            })
            .addCase(getQrCodeBranchResponses.rejected, (state, action) => {
                state.qrCodeBranchResponsesLoading = false;
            })
            .addCase(getResponseDetails.fulfilled, (state, action) => {
                state.responseDetailsData = action.payload;
                state.responseDetailsLoading = false;
            })
            .addCase(getResponseDetails.pending, (state, action) => {
                state.responseDetailsLoading = true;
            })
            .addCase(getResponseDetails.rejected, (state, action) => {
                state.responseDetailsLoading = false;
            })
            .addCase(deleteQrCodeBranch.fulfilled, (state, action) => {
                state.deleteQrCodeBranchData = action.payload;
                state.deleteQrCodeBranchLoading = false;
            })
            .addCase(deleteQrCodeBranch.pending, (state, action) => {
                state.deleteQrCodeBranchLoading = true;
            })
            .addCase(deleteQrCodeBranch.rejected, (state, action) => {
                state.deleteQrCodeBranchLoading = false;
            });
    }
});

export default qrCodeSlice.reducer;
