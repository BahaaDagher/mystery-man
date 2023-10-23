import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react'
import plusSign from '../../assets/icons/plusSign.svg'
import {Colors} from "../../Theme"
import { Box, ListItemText, Popover } from '@mui/material';
import { FlexSpaceBetween } from '../../components/FlexSpaceBetween';
import { Flex } from '../../components/Flex';
import { FlexCenter } from '../../components/FlexCenter';
import QuestionsTypes from './QuestionsTypes';
import MultiChoice from './questions/MultiChoice';
import Choices from './questions/Choices';
import YesOrNo from './questions/YesOrNo';
import RatingQuestion from './questions/RatingQuestion';
import OpenQuestion from './questions/OpenQuestion';
import UploadImages from './questions/UploadImages';
import HeadLine from './questions/HeadLine';

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
  width: '50px',
  height: '42px',
  padding: '30px',
  borderRadius: '10px',
  gap: '10px',
  backgroundColor: Colors.bg,
  margin : "10px 0" , 
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



const QuestionnaireSettings = () => {
  // pop over when click on the button the list of questions type will appear
  const [anchorEl, setAnchorEl] = useState(null);
  const showTypes = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const [chosenType , setChosenType] = useState(null) ; 
  const [questionsArray , setQuestionsArray] = useState([ ]) ;

  return (
    <>
    <QuestionsTypes setAnchorEl= {setAnchorEl} anchorEl={anchorEl} setChosenType = {setChosenType}/>

    <Parent width = "100%">
        <Settings>
          <InputAndButtons>
            <InputContainer>
              <Input placeholder= "Title"/>
            </InputContainer>
            <ButtonsContainer>
              <AddQuestionContainer onClick = {showTypes}>
                <img src = {plusSign} style = {{margin : "10px" }} />
                <AddQuestionButton > Add_Question</AddQuestionButton>
              </AddQuestionContainer>
              <ActionButton>Save</ActionButton>
              <ActionButton className = "cancel">Cancel</ActionButton>
            </ButtonsContainer>
          </InputAndButtons>
          <AddStepButton>+</AddStepButton>
        </Settings>
        <QuestionView>
          <Choices/>
          <YesOrNo/>
          <RatingQuestion/>
          <OpenQuestion/>
          <UploadImages/>
          <HeadLine/>
        </QuestionView>
    </Parent>
    </>
  )
}

export default QuestionnaireSettings