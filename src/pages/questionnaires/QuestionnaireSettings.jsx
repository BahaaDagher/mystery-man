import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react'
import plusSign from '../../assets/icons/plusSign.svg'
import {Colors} from "../../Theme"
import { Box, ListItemText, Popover } from '@mui/material';
import { FlexSpaceBetween } from '../../components/FlexSpaceBetween';
import Loading  from '../../components/Loading';
import { Flex } from '../../components/Flex';
import { FlexCenter } from '../../components/FlexCenter';
import QuestionsTypes from './QuestionsTypes';
import QuestionComponent from './QuestionComponent';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { deleteQuestioneir, deleteStep, editQuestioneir, getQuestionnaire, handleMoveStep, handleReadyToSend, handleReadyToSend2, sendQuestioneir, setCurrentQuestioneir, setCurrentStep, setFocusedStep, setNewQuestioneirName, setNewStep, setNewStepName } from '../../store/slices/questionierSlice';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';
import { useDrag, useDrop } from 'react-dnd';

const Parent = styled(Box)(({ theme }) => ({
  width : "100%" ,
  margin  : "0 50px" ,

  [theme.breakpoints.down('800')]: {
    margin  : "0" ,
  },
}));

const Settings = styled("div")(({ theme }) => ({
  backgroundColor : "#fff" ,
  position:'relative',
  padding : "20px" ,
  borderRadius : "10px" ,
  [theme.breakpoints.down('800')]: {
    width : "100%" ,
    margin : "0 auto" ,
  },
}));
const SaveAdminButton = styled("div")(({ theme }) => ({
  textAlign:'center',
  backgroundColor: Colors.green,
  color : "#fff" , 
  cursor : "pointer" ,
  transition : "all 0.3s ease" , 
  padding : "10px" ,
  borderRadius : "10px" ,
  marginBottom:'20px',
  [theme.breakpoints.down('800')]: {
    width : "100%" ,
    margin : "10 auto" ,
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
const StepInput = styled("input")(({ theme }) => ({
  backgroundColor: "transparent",
  width: "100%",
  color: Colors.gray_l,
  border: "1px solid transparent",
  borderBottom: "1px solid #fff",
  outline: "none",
  fontSize: "20px",
  "::placeholder": {
    color: Colors.gray_l,
  },
  '::selection': {
    backgroundColor: Colors.hoverMain,
  },
  "&.active": {
    color: 'white',
    backgroundColor: Colors.second,
  },
}));

const ButtonsContainer = styled(Flex)(({ theme }) => ({
  [theme.breakpoints.down('1500')]: {
    flexWrap : "wrap" ,
     gap : "10px" 
  },
}));
const AddQuestionContainer = styled("div")(({ theme }) => ({
  padding : "10px" ,
  borderRadius: '10px',
  display : "flex" , 
  justifyContent : "space-between" ,
  alignItems : "center" ,
  backgroundColor : Colors.grayDC ,
  margin : "0 10px" , 
  height : "60px" , 
  cursor : "pointer" ,
  transition : "all 0.3s ease" , 
  width : "200px" ,
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
  textAlign: 'center',
  width : "100%" ,
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
const AddStepButton = styled(FlexSpaceBetween)(({ theme }) => ({
  position : "relative" , 
  padding: '5px 20px',
  borderRadius: '10px',
  gap: '10px',
  width:'30%',
  backgroundColor: Colors.bg,
  margin : "10px 10px" , 
  fontSize : "20px" ,
  color : Colors.gray_l ,
  cursor : "pointer" ,
  transition : "all 0.3s ease" ,
  "&:hover" : {
    backgroundColor : Colors.grayDC ,
  } , 
  "&.active" : {
    color:'white' , 
  backgroundColor : Colors.second ,
} , 
[theme.breakpoints.down('350')]: {
  width : "100%" , 
  },
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
const StepsContainer = styled(FlexCenter)(({ theme }) => ({
  flexWrap : "wrap" , 
}));
const StepName = styled("span")(({ theme }) => ({
  width : "fit-content" , 

}));

const DeleteStep = styled(FlexCenter)(({ theme }) => ({
  position : "absolute" ,
  fontSize : "12px" , 
  fontWeight : "bold" , 
  border : "2px solid #fff" ,
  borderRadius : "50%" ,
  width : "20px" , 
  height : "20px" ,
  right : theme.direction == "rtl" ?  "-10px" : "auto" ,
  left : theme.direction == "ltr" ?  "-10px" : "auto" ,
  top : "-7px" , 
  backgroundColor : Colors.red ,
  color : "#fff" , 
  cursor : "pointer" , 
  transition : "all 0.3s ease" ,
  "&:hover" :{
    backgroundColor : Colors.hoverRed ,
  }

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

const QuestionnaireSettings = ({isAddNew}) => {
  // pop over when click on the button the list of questions type will appear
  const questionierDataSent = useSelector((state) => state.questioneirData.questionierDataSent);
  const questionierDataDelete = useSelector((state) => state.questioneirData.questionierDataDelete);
  const questionieres = useSelector((state) => state.questioneirData.questionieres);
  const currentQuestioneir = useSelector((state) => state.questioneirData.currentQuestioneir);
  const currentStep = useSelector((state) => state.questioneirData.currentStep);
  const isReadyToSend = useSelector((state) => state.questioneirData.isReadyToSend);
  const [anchorEl, setAnchorEl] = useState(null);

  const [answersStep, setAnswersStep] = useState([]); 
  const [showNewStep, setShowNewStep] = useState(false); 
  const [isAdminQues, setIsAdminQues] = useState(false); 

  const showTypes = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  useEffect(() => {
    if(!isAddNew)dispatch(getQuestionnaire())
  },[isAddNew])
  useEffect(() => {
    if(isAdminQues){

      console.log('yyyy' ,isAdminQues);
      handleSaveQuestioneir()
    }
  },[isAdminQues])
  const getQuestionnaireLoading = useSelector((state) => state.questioneirData.getQuestionnaireLoading);

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
  const handleStepTitle = (value) => {
    dispatch(setNewStepName(value))
  };

  const handleAddStep = () => {
    setShowNewStep(true)
  };


  const handleClickStep = (index,questions) => {
    dispatch(setCurrentStep(index))
    dispatch(setFocusedStep(index))
    console.log(questionieres[currentQuestioneir].steps);
 
  };
  const handleRemoveStep = (index,questions) => {
    dispatch(deleteStep(index))
    // console.log(questionieres[currentQuestioneir].steps);
 
  };
  const [pressSave , setPressSave] = useState(false) ;
  useEffect(() => {
    if (questionierDataSent&& pressSave){
      Swal.fire(questionierDataSent.message, '', 'success')
      .then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      })
    }
  },[questionierDataSent])
  
  useEffect(() => {
    if (questionierDataDelete&& pressSave){
      Swal.fire(questionierDataDelete.message, '', 'success')
      .then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      })
      
    }
  },[questionierDataDelete])

  const handleSaveQuestioneir = () => {
    console.log(questionieres[currentQuestioneir]);
    setPressSave(true)
    Swal.fire({
      title: t("text.are_you_sure_you_want_to_save_this_Questionnaire"),
      showDenyButton: true,
      confirmButtonText: t("text.Yes"),
      denyButtonText: t("text.No"),
    }).then((result) => {
      if (result.isConfirmed) {
        if(questionieres[currentQuestioneir].id){
          console.log('mmmm' ,isAdminQues);
          if(isAdminQues){
            dispatch(sendQuestioneir([questionieres[currentQuestioneir]]))
          }
          else dispatch(editQuestioneir([questionieres[currentQuestioneir]]))
        }
        else dispatch(sendQuestioneir([questionieres[currentQuestioneir]]))

        setIsAdminQues(false)
      } else if (result.isDenied) {
        Swal.fire(t("text.Changes_are_not_saved"), '', 'info')
      }
    })
  };
  const focusedStep = useSelector((state) => state.questioneirData.focusedStep);
  const handleDeleteQuestioneir = () => {
    console.log(questionieres[currentQuestioneir]);
    setPressSave(true)
    Swal.fire({
      title: t("text.are_you_sure_you_want_to_delete_this_Questionnaire"),
      showDenyButton: true,
      confirmButtonText: t("text.Yes"),
      denyButtonText: t("text.No"),
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteQuestioneir([questionieres[currentQuestioneir]]))
      } else if (result.isDenied) {
        Swal.fire(t("text.Changes_are_not_saved"), '', 'info')
      }
    })

  };
  const [activeStep, setActiveStep] = useState(0);
  const {t} = useTranslation() ; 
  const moveStep = (fromIndex, toIndex) => {
    console.log('llllllllllll',fromIndex,toIndex);
    dispatch(handleMoveStep({fromIndex, toIndex}))
  };

  const StepComponent = ({ answer, index , focusedStep}) => {
    const ref = useRef(null);
    // useEffect(() => {
    //   // Focus on the input element when the activeStep changes
    //   if (activeStep === index && ref.current) {
    //     ref.current.focus();
    //   }
    // }, [activeStep, index]);
    useEffect(() => {
      if (focusedStep === index && ref.current) {
        console.log('mmmmmmmmmmm', ref.current);
        ref.current.focus();
      }
    }, [focusedStep, index]);

    const [, drop] = useDrop({
      accept: 'STEP',
      hover: (item) => {
        const draggedIndex = item.index;
        const targetIndex = index;

        if (draggedIndex === targetIndex) {
          return;
        }

        moveStep(draggedIndex, targetIndex);
        item.index = targetIndex;
      },
    });

    const [, drag] = useDrag({
      type: 'STEP',
      item: { type: 'STEP', index },
    });

    drag(drop(ref));

    return (
        <>
        
        <StepName  onClick={()=>{ handleClickStep(index,answer.questions); setActiveStep(index) ;  }} >
          <StepInput
            value={answer.name}
            ref={ref}
            placeholder="Step Title"
            onChange={(e) =>{
           
              handleStepTitle(e.target.value)}
            }
            onMouseDown={(e) => e.stopPropagation()} // Prevent onClick from interfering
            className={activeStep === index ? 'active' : ''}
          />
        </StepName>
        <DeleteStep onClick={() => handleRemoveStep(index, answer.questions)} >
          x
        </DeleteStep>
        </>
   
    );
  };
  
  return (
    <>
    <QuestionsTypes  setAnchorEl= {setAnchorEl} anchorEl={anchorEl} setChosenType = {setChosenType}/>
    {getQuestionnaireLoading ? <Loading/> : 
    <Parent>
        <Settings>
          {
            questionieres[currentQuestioneir].isAdmin ?  
            
            <SaveAdminButton onClick={()=>{
              setIsAdminQues(true)
            
              }}
             > 
            {t("text.SaveAdmin")}
            </SaveAdminButton>
            :''
          }
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
                <AddQuestionButton > {t("text.Add_Question")}</AddQuestionButton>
              </AddQuestionContainer>
              <ActionButton onClick={()=>handleSaveQuestioneir()} > {t("text.Save")}</ActionButton>
              <ActionButton onClick={()=>handleDeleteQuestioneir()} className = "cancel">{t("text.Delete")}</ActionButton>
            </ButtonsContainer>
          </InputAndButtons>
          <DndProvider backend={HTML5Backend}>

            <StepsContainer style={{ justifyContent: 'start' }}>
              {questionieres[currentQuestioneir] ? questionieres[currentQuestioneir].steps.map((answer, index) => (
                <AddStepButton   className= {activeStep==index ? 'active' : ''}>

                  <StepComponent
                    key={index}
                    answer={answer}
                    index={index}
                    moveStep={moveStep}
                    focusedStep={focusedStep}
                    
                  
                  />
                </AddStepButton>
              )) : ''}
              <AddStepButton onClick={handleAddStep}>+</AddStepButton>
            </StepsContainer>
          </DndProvider>
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
            questionieres[currentQuestioneir].steps[currentStep]?.questions.length>0 ?
            <DndProvider backend={HTML5Backend}>

              <QuestionComponent questions ={questionieres[currentQuestioneir].steps[currentStep]?.questions} ></QuestionComponent>
            </DndProvider>
            
            :''

          }
        </QuestionView>
    </Parent>
    
    }
    </>
  )
}

export default QuestionnaireSettings