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
          `https://test.secretvisitor.co/dashboard/api/editQuestion`, 
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
          `https://test.secretvisitor.co/dashboard/api/deleteQuestion`, 
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
          `https://test.secretvisitor.co/dashboard/api/addQuestion`, 
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
        `https://test.secretvisitor.co/dashboard/api/getQuestion` ,{
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
});

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
        questionierDataDelete:{},
        focusedStep:-1
    },
    reducers: {
        ToggleDirection: (state, action) => {
        state.direction = action.payload
        },
        setCurrentStep: (state, action) => {
            state.currentStep = action.payload
        },
    
        deleteStep: (state, action) => {
          state.questionieres[state.currentQuestioneir].steps.splice(action.payload, 1);
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
            // Handle both string (old format) and object (new format with id)
            const stepData = typeof action.payload === 'string' 
                ? { name: action.payload, id: null }
                : { name: action.payload.name, id: action.payload.id };
            
            state.questionieres[state.currentQuestioneir].steps.push({...stepData, questions:[]}) 
        },
        setNewStepName: (state ,action) => {
          // Handle both string (old format) and object (new format with index and id)
          if (typeof action.payload === 'string') {
            state.questionieres[state.currentQuestioneir].steps[state.currentStep].name = action.payload
          } else {
            // New format: { index, name, id }
            state.questionieres[state.currentQuestioneir].steps[action.payload.index].name = action.payload.name
            state.questionieres[state.currentQuestioneir].steps[action.payload.index].id = action.payload.id
          }
        },
        setQuestionsInStep: (state, action) => {
      
            state.questionieres[state.currentQuestioneir].steps[state.currentStep].questions.push({type:action.payload,title:'',required:'required',options:[]}) 
       
        },
        handleMoveQuestion: (state, action) => {
          console.log('nnnnnnnnn',action);
          const [movedQuestion] = state.questionieres[state.currentQuestioneir].steps[state.currentStep].questions.splice(action.payload.fromIndex, 1); // Remove the dragged question
          state.questionieres[state.currentQuestioneir].steps[state.currentStep].questions.splice(action.payload.toIndex, 0, movedQuestion)
        },
        setFocusedStep: (state, action) => {
          state.focusedStep = action.payload

        },
        handleMoveStep: (state, action) => {
          console.log('nnnnnnnnn',action);
          const [movedQuestion] = state.questionieres[state.currentQuestioneir].steps.splice(action.payload.fromIndex, 1); // Remove the dragged question
          state.questionieres[state.currentQuestioneir].steps.splice(action.payload.toIndex, 0, movedQuestion)
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
          if (state.getQuestionnaireData?.status) {
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
    deleteStep,
    setCurrentQuestioneir,
    setNewStep,
    setNewQuestioneir
    ,setQuestionsInStep,
    setNewStepName,
    handleReadyToSend,
    setQuestionDetails,
    setNewQuestioneirName,
    handleMoveQuestion,
    handleMoveStep,
    handleDeleteQuestion , 
    setFocusedStep,
    setCurrentQuestioneirID
} = questionierSlice.actions;
  export default questionierSlice.reducer;