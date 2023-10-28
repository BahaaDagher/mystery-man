import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const sendQuestioneir = createAsyncThunk(
    "questionier/sendQuestioneir", 
    async (values) => {
      const token = "Bearer 106|ddRf53vaVG6Apq6GCAaUya7JTSxOfnq7nedqH13T6c6850c8";
      try {
        const response = await axios.post(
          `https://mystery.cloudy.mohamedmansi.com/api/addQuestion`, 
          {questions:values},
          { headers: {"Authorization" : token}}
        );
        return response.data ;
      } catch (error) {
        console.error(error);
      }
  });

const questionierSlice = createSlice({
    name: "questionier",
    initialState: {
        questionieres:[],
        currentQuestioneir:-1,
        currentStep:0,
        isReadyToSend:false,
        questionierDataSent:{}
    },
    reducers: {
        ToggleDirection: (state, action) => {
        state.direction = action.payload
        },
        setCurrentStep: (state, action) => {
            state.currentStep = action.payload
        },
        setCurrentQuestioneir: (state, action) => {
            state.currentQuestioneir += action.payload
        },
        setNewQuestioneir: (state) => {
            state.questionieres.push({title:'',steps:[]}) 
        },
        setNewQuestioneirName: (state ,action) => {
            state.questionieres[state.currentQuestioneir].title =action.payload
        },
        setNewStep: (state, action) => {
            console.log(state.questionieres[state.currentQuestioneir]);
            state.questionieres[state.currentQuestioneir].steps.push({name:action.payload ,questions:[]}) 
        },
        setQuestionsInStep: (state, action) => {
      
            state.questionieres[state.currentQuestioneir].steps[state.currentStep].questions.push({type:action.payload,title:'',required:'required',options:[]}) 
       
        },
        handleDeleteQuestion: (state, action) => {
      
            state.questionieres[state.currentQuestioneir].steps[state.currentStep].questions.splice(action.payload, 1);
       
        },
        setQuestionDetails: (state, action) => {
            if(action.payload.data.required) {console.log(action.payload.data); state.questionieres[state.currentQuestioneir].steps[state.currentStep].questions[action.payload.index].required =action.payload.data.required;}
            else if(action.payload.data.title) { console.log(action.payload.data);state.questionieres[state.currentQuestioneir].steps[state.currentStep].questions[action.payload.index].title =action.payload.data.title}
            else if(action.payload.data.options) {console.log(action.payload.data); state.questionieres[state.currentQuestioneir].steps[state.currentStep].questions[action.payload.index].options =action.payload.data.options}
          
       
        },
        handleReadyToSend: (state, action) => {
      
            state.isReadyToSend=action.payload
        },
       
      },

      extraReducers: (builder) => {
        builder
         
          .addCase(sendQuestioneir.fulfilled, (state, action) => {
            state.questionierDataSent = action.payload;
           
          })
         
      }
  });
  export const { 
    ToggleDirection ,
    setCurrentStep,
    setCurrentQuestioneir,
    setNewStep,
    setNewQuestioneir
    ,setQuestionsInStep,
    handleReadyToSend,
    setQuestionDetails,
    setNewQuestioneirName,
    handleDeleteQuestion
} = questionierSlice.actions;
  export default questionierSlice.reducer;