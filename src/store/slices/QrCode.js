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
    async (branchId = null) => {
      const token = localStorage.getItem('token');
      try {
        const url = branchId 
          ? `${API_BASE_URL}/qrCodeBranch/responses?branch_id=${branchId}`
          : `${API_BASE_URL}/qrCodeBranch/responses`;
        
        const response = await axios.get(
          url, 
          { headers: {"Authorization" : token , "lang" : currentLanguage ,}}
        );
        return response.data ;
      } catch (error) {
        console.error("getQrCodeBranchResponses::", error);
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
            });
    }
});

export default qrCodeSlice.reducer;
