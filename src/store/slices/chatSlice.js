import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const currentLanguage = localStorage.getItem("language") || "en";
    export const chatMessagesGet = createAsyncThunk(
      "chat/chatMessagesGet",
      async (values) => {
        const token = localStorage.getItem('token');
        try {
          const response = await axios.get(
            `https://mystery.cloudy.mohamedmansi.com/api/getMessagesWeb?mission_id=${values.missionId}&limit=10&page=${values.page}`, 
            { headers: {
                "Authorization" : token,
                "lang" : currentLanguage
            }}
          );
          return response.data ;
        } catch (error) {
          console.error(error);
        }
    });
    
    export const chatMessagesSend = createAsyncThunk(
        "chat/chatMessageSend",
        async (values) => {
            const token = localStorage.getItem('token');
        try{
            const response = await axios.post(
              "https://mystery.cloudy.mohamedmansi.com/api/sendMessageWeb" ,
              values
              ,
              { headers: {  "Authorization" : token,
              "lang" : currentLanguage}}
            );
            return response.data ;
          } catch (error) {
            console.error(error);
          }
      });
      export const getChates = createAsyncThunk(
        "chat/getChates",
        async (values) => {
          const token = localStorage.getItem('token');
          try {
            const response = await axios.get(
              `https://mystery.cloudy.mohamedmansi.com/api/getChatesWeb`, 
              { headers: {
                  "Authorization" : token,
                  "lang" : currentLanguage
              }}
            );
            return response.data ;
          } catch (error) {
            console.error(error);
          }
      });
const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatMessagesGetResponse : {} ,
    chatMessagesSendResponse : {} ,
    chatMessagesSendPages:1,
    currentChat:{} , 
    getChatesResponse : {} ,
    getChatesLoading : false

  },
  reducers: {
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload
    },
    setChatMessagesSendPages: (state, action) => {
      state.chatMessagesSendPages = 1
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(chatMessagesGet.fulfilled, (state, action) => {
        state.chatMessagesGetResponse = action.payload;
        state.chatMessagesSendPages +=1
      })
      .addCase(chatMessagesSend.fulfilled, (state, action) => {
        state.chatMessagesSendResponse = action.payload;
      })

      .addCase(getChates.fulfilled, (state, action) => {
        state.getChatesResponse = action.payload;
        state.getChatesLoading = false
      })
      .addCase(getChates.pending, (state, action) => {
        state.getChatesLoading = true
      })
      .addCase(getChates.rejected, (state, action) => {
        state.getChatesLoading = false
      })

      
     
  }
});

export const { setCurrentChat , setChatMessagesSendPages }=chatSlice.actions;

export default chatSlice.reducer;