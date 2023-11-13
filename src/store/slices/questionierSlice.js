import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import i18n from "../../i18n";
const currentLanguage = localStorage.getItem("language") || "en";
export const editQuestioneir = createAsyncThunk(
    "questionier/editQuestioneir", 
    async (values ) => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.post(
          `https://mystery.cloudy.mohamedmansi.com/api/editQuestion`, 
          {questions:values ,question_id:values[0].id},
          { headers: {"Authorization" : token , "lang" : currentLanguage ,}}
        );
        return response.data ;
      } catch (error) {
        console.error(error);
      }
});
export const deleteQuestioneir = createAsyncThunk(
    "questionier/deleteQuestioneir", 
    async (values ) => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.post(
          `https://mystery.cloudy.mohamedmansi.com/api/deleteQuestion`, 
          {question_id:values[0].id},
          { headers: {"Authorization" : token , "lang" : currentLanguage ,}}
        );
        return response.data ;
      } catch (error) {
        console.error(error);
      }
});
export const sendQuestioneir = createAsyncThunk(
    "questionier/sendQuestioneir", 
    async (values) => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.post(
          `https://mystery.cloudy.mohamedmansi.com/api/addQuestion`, 
          {questions:values},
          { headers: {"Authorization" : token , "lang" : currentLanguage ,}}
        );
        return response.data ;
      } catch (error) {
        console.error(error);
      }
});
export const getQuestionnaire = createAsyncThunk(
  "questionnaire/getQuestionnaire", 
async (values) => {
  const token = localStorage.getItem('token');
    try {
    const response = await axios.get(
        `https://mystery.cloudy.mohamedmansi.com/api/getQuestion` ,{
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

const questionierSlice = createSlice({
    name: "questionier",
    initialState: {
        getQuestionnaireData : {} ,
        getQuestionnaireLoading : false , 
        questionieres:[],
        currentQuestioneir:-1,
        CurrentQuestioneirID : -1 ,  
        currentStep:0,
        isReadyToSend:false,
        questionierDataSent:{},
        questionierDataDelete:{}
    },
    reducers: {
        ToggleDirection: (state, action) => {
        state.direction = action.payload
        },
        setCurrentStep: (state, action) => {
            state.currentStep = action.payload
        },
        setCurrentQuestioneirID: (state, action) => {
          state.CurrentQuestioneirID += action.payload
        },
        setCurrentQuestioneir: (state, action) => {
            state.currentQuestioneir = action.payload
        },
        setNewQuestioneir: (state) => {
            state.questionieres.push({title:'',steps:[]}) 
            state.currentQuestioneir =state.questionieres.length-1
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
            else if(action.payload.data.title || action.payload.data.title === "" ) { console.log(action.payload.data);state.questionieres[state.currentQuestioneir].steps[state.currentStep].questions[action.payload.index].title =action.payload.data.title}
            else if(action.payload.data.options) {console.log(action.payload.data); state.questionieres[state.currentQuestioneir].steps[state.currentStep].questions[action.payload.index].options =action.payload.data.options}
          
       
        },
        handleReadyToSend: (state, action) => {
      
            state.isReadyToSend=action.payload
        },
       
      },

      extraReducers: (builder) => {
        builder
        .addCase(getQuestionnaire.fulfilled , (state, action) => {
          state.getQuestionnaireData = action.payload;
          if (state.getQuestionnaireData.status) {
            console.log ("bahaa " , state.getQuestionnaireData )
            state.questionieres = state.getQuestionnaireData.data.questions
            
          } 

          state.getQuestionnaireLoading = false;
        }) 
        .addCase(getQuestionnaire.pending, (state, action) => {
            state.getQuestionnaireLoading = true;
        }) 
        .addCase(getQuestionnaire.rejected , (state, action) => {
            state.getQuestionnaireLoading = false;
        })

          .addCase(sendQuestioneir.fulfilled, (state, action) => {
            state.questionierDataSent = action.payload;
           
          })
          .addCase(editQuestioneir.fulfilled, (state, action) => {
            state.questionierDataSent = action.payload;
           
          })
          .addCase(deleteQuestioneir.fulfilled, (state, action) => {
            state.questionierDataDelete = action.payload;
           
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
    handleDeleteQuestion , 
    setCurrentQuestioneirID
} = questionierSlice.actions;
  export default questionierSlice.reducer;