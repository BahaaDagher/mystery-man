import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react'
import plusSign from '../../assets/icons/plusSign.svg'
import {Colors} from "../../Theme"
import { Box, ListItemText, Popover } from '@mui/material';
import { FlexSpaceBetween } from '../../components/FlexSpaceBetween';
import { Flex } from '../../components/Flex';
import { FlexCenter } from '../../components/FlexCenter';
import QuestionsTypes from './QuestionsTypes';
import QuestionComponent from './QuestionComponent';
import { useDispatch, useSelector } from 'react-redux';
import { handleReadyToSend, handleReadyToSend2, sendQuestioneir, setCurrentQuestioneir, setCurrentStep, setNewQuestioneirName, setNewStep } from '../../store/slices/questionierSlice';
import Swal from 'sweetalert2';

const Parent = styled(Box)(({ theme }) => ({
  width : "100%" ,
  margin  : "0 10px" ,
  [theme.breakpoints.down('800')]: {
    margin  : "0" ,
  },
}));

const Settings = styled("div")(({ theme }) => ({
  backgroundColor : "#fff" ,
  padding : "20px" ,
  borderRadius : "10px" ,
  [theme.breakpoints.down('800')]: {
    width : "100%" ,
    margin : "0 auto" ,
  },
}));
const InputAndButtons = styled(FlexSpaceBetween)(({ theme }) => ({
  alignItems : "center" ,
  [theme.breakpoints.down('1500')]: {
    alignItems : "flex-start" ,
    flexDirection : "column" ,
    gap : "10px" ,
  },
}));
const InputContainer = styled("div")(({ theme }) => ({
  backgroundColor : Colors.main ,
  padding : "20px" ,
  borderRadius : "10px" ,
  height : "80px" , 
  width : "80%" , 
  [theme.breakpoints.down('1500')]: {
    width : "100%" ,
  },
}));
const Input = styled("input")(({ theme }) => ({
  backgroundColor : "transparent" ,
  width : "100%" ,
  color : "#fff" ,
  border: "1px solid transparent" , 
  borderBottom: "1px solid #fff" , 
  outline : "none" ,
  fontSize : "20px" ,
  "::placeholder": {
    color: Colors.gray_l
  },
  '::selection': {
    backgroundColor: Colors.hoverMain, 
  },
}));

const ButtonsContainer = styled(Flex)(({ theme }) => ({
  [theme.breakpoints.down('1500')]: {
    flexWrap : "wrap" ,
     gap : "10px" 
  },
}));
const AddQuestionContainer = styled("div")(({ theme }) => ({
  padding : "20px" ,
  borderRadius: '10px',
  display : "flex" , 
  justifyContent : "space-between" ,
  alignItems : "center" ,
  backgroundColor : Colors.grayDC ,
  margin : "0 10px" , 
  height : "60px" , 
  cursor : "pointer" ,
  transition : "all 0.3s ease" , 
  "&:hover" : {
    backgroundColor : Colors.hoverGray ,
  } , 
  [theme.breakpoints.down('1500')]: {
    marginLeft : theme.direction == "ltr" ? "0" : "10px" ,
    marginRight : theme.direction == "rtl" ? "0" : "10px" , 
  },
  [theme.breakpoints.down('800')]: {
    width : "80%" ,
    justifyContent : "center" ,
  },
}));
const AddQuestionButton = styled("div")(({ theme }) => ({
  fontSize: '18px',
  fontWeight: 500,
  lineHeight: '21px',
  letterSpacing: '0.02em',
  textAlign: 'center',
}));
const ActionButton = styled(FlexCenter)(({ theme }) => ({
  width: '76px',
  height: '60px',
  padding: '10px 12px 10px 12px',
  borderRadius: '10px',
  backgroundColor: Colors.green,
  color : "#fff" , 
  cursor : "pointer" ,
  transition : "all 0.3s ease" , 
  marginLeft : "10px" ,
  "&:hover" : {
    backgroundColor : Colors.hoverGreen ,
  },
  "&.cancel" : {
    backgroundColor : Colors.red , 
    "&:hover" : {
      backgroundColor : Colors.hoverRed ,
    }
  },
  [theme.breakpoints.down('800')]: {
    marginLeft : theme.direction == "ltr" ? "0" : "10px" ,
    marginRight : theme.direction == "rtl" ? "0" : "10px" ,
  },
}));
const AddStepButton = styled(FlexCenter)(({ theme }) => ({
  padding: '5px 20px',
  borderRadius: '10px',
  gap: '10px',
  backgroundColor: Colors.bg,
  margin : "10px 10px" , 
  fontSize : "20px" ,
  color : Colors.gray_l ,
  cursor : "pointer" ,
  transition : "all 0.3s ease" ,
  "&:hover" : {
    backgroundColor : Colors.grayDC ,
  } , 
}));
const QuestionView = styled("div")(({ theme }) => ({
  
}));

const AddButton = styled("div")(({ theme }) => ({
  backgroundColor : Colors.main ,
  display : "inline" ,
  padding : "5px 10px" ,
  borderRadius : "10px" ,
  color : "#fff" ,
  cursor : "pointer" ,
  marginRight : theme.direction == "ltr" ? "10px" : "0" ,
  marginLeft : theme.direction == "rtl" ? "10px" : "0" ,
  transition : "all .3s ease-in-out" ,
  "&:hover" : {
    backgroundColor : Colors.hoverMain ,
  },
  textAlign : "center" ,
  width : "50px" , 
}));

const AnswerInput = styled("input")(({ theme }) => ({
  backgroundColor : "transparent" ,
  width : "80%" ,
  border: "1px solid transparent" , 
  borderBottom: `1px solid ${Colors.input}` , 
  outline : "none" ,
  "::placeholder": {
    color: Colors.gray_l
  },
  margin : "0 10px" ,
}));

const QuestionnaireSettings = () => {
  // pop over when click on the button the list of questions type will appear
  const questionieres = useSelector((state) => state.questioneirData.questionieres);
  const currentQuestioneir = useSelector((state) => state.questioneirData.currentQuestioneir);
  const currentStep = useSelector((state) => state.questioneirData.currentStep);
  const isReadyToSend = useSelector((state) => state.questioneirData.isReadyToSend);
  const [anchorEl, setAnchorEl] = useState(null);

  const [answersStep, setAnswersStep] = useState([]); 
  const [showNewStep, setShowNewStep] = useState(false); 

  const showTypes = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const [chosenType , setChosenType] = useState(null) ; 
  const [newAnswer, setNewAnswer] = useState('');

  const dispatch = useDispatch() ; 


 
  const handleAddAnswerStep = () => {
    if (newAnswer.trim() !== '') {
      dispatch(setNewStep(newAnswer))

      setNewAnswer('');
      setShowNewStep(false)
    }
  };
  const handleQuestioneirTitle = (value) => {
    dispatch(setNewQuestioneirName(value))
  };

  const handleAddStep = () => {
    setShowNewStep(true)
  };


  const handleClickStep = (index,questions) => {
    dispatch(setCurrentStep(index))
    console.log(questionieres[currentQuestioneir].steps);
 
  };
  const questionierDataSent = useSelector((state) => state.questioneirData.questionierDataSent);
  const [pressSave , setPressSave] = useState(false) ;
  useEffect(() => {
    if (questionierDataSent&& pressSave){
      Swal.fire('branch deleted successfully', '', 'success')
    }
  },[questionierDataSent])

  const handleSaveQuestioneir = () => {
    console.log(questionieres[currentQuestioneir]);
    setPressSave(true)
    Swal.fire({
      title: 'are you sure you want to delete this branch?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(sendQuestioneir([questionieres[currentQuestioneir]]))
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  };

  const sendToApi = () => {
    console.log(questionieres[currentQuestioneir]);
    dispatch(sendQuestioneir([questionieres[currentQuestioneir]]))
  };
 
  return (
    <>
    <QuestionsTypes  setAnchorEl= {setAnchorEl} anchorEl={anchorEl} setChosenType = {setChosenType}/>

    <Parent>
        <Settings>
          <InputAndButtons>
            <InputContainer>
              <Input 
              value={questionieres[currentQuestioneir].title} 
              placeholder= "Title"
              onChange={(e) => handleQuestioneirTitle(e.target.value)}
              />
            </InputContainer>
            <ButtonsContainer>
              <AddQuestionContainer onClick = {showTypes}>
                <img src = {plusSign} style = {{margin : "10px" }} />
                <AddQuestionButton > Add_Question</AddQuestionButton>
              </AddQuestionContainer>
              <ActionButton onClick={()=>handleSaveQuestioneir()} > Save</ActionButton>
              <ActionButton onClick={()=>sendToApi()} className = "cancel">Cancel</ActionButton>
            </ButtonsContainer>
          </InputAndButtons>
          <FlexCenter style={{justifyContent:'start'}}>

            {questionieres[currentQuestioneir] ? questionieres[currentQuestioneir].steps.map((answer ,index)=>

               <AddStepButton onClick={()=>handleClickStep(index,answer.questions)} style={{color:'white' ,background:`${Colors.gray_l}`}}>{answer.name}</AddStepButton>
            ): ''}
         
          <AddStepButton onClick={handleAddStep}>+</AddStepButton>



          </FlexCenter>
          {showNewStep ?  
          
          <FlexCenter style={{justifyContent:'start' ,flexWrap:'wrap'}}>
            {/* <AnswerInput></AnswerInput> */}
            <AddButton onClick={handleAddAnswerStep}>Save </AddButton>
              <AnswerInput
                type="text"
                placeholder="Write a new step"
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
              />
          </FlexCenter>
          : ''}
        </Settings>
        <QuestionView>
          {
            questionieres[currentQuestioneir].steps.length>0 ?
            
            <QuestionComponent questions ={questionieres[currentQuestioneir].steps[currentStep].questions}></QuestionComponent>
            :''

          }
        </QuestionView>
    </Parent>
    </>
  )
}

export default QuestionnaireSettings