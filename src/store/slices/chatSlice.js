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

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatMessagesGetResponse : {} ,
    chatMessagesSendResponse : {} ,
    chatMessagesSendPages:1,
    currentChat:{}

  },
  reducers: {
    setCurrentChat: (state, action) => {
    state.currentChat = action.payload
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
      
     
  }
});

export const { setCurrentChat }=chatSlice.actions;

export default chatSlice.reducer;