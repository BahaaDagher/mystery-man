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

const qrCodeSlice = createSlice({
    name: "qrCode",
    initialState: {
        qrCodeQuestionnaireStoreData: {},
        qrCodeQuestionnaireStoreLoading: false,
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
            });
    }
});

export default qrCodeSlice.reducer;
