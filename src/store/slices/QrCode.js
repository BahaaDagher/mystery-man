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

const qrCodeSlice = createSlice({
    name: "qrCode",
    initialState: {
        qrCodeQuestionnaireStoreData: {},
        qrCodeQuestionnaireStoreLoading: false,
        qrCodeBranchesData: {},
        qrCodeBranchesLoading: false,
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
            });
    }
});

export default qrCodeSlice.reducer;
