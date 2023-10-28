import React, { useState } from 'react'
import { Colors } from '../../Theme'
import { Flex } from '../../components/Flex'
import {FlexCenter} from "../../components/FlexCenter"
import styled from '@emotion/styled';
import { FlexSpaceBetween } from '../../components/FlexSpaceBetween';
import { SmallContainer } from '../../components/SmallContainer';
import { SubmitButton } from '../../components/SubmitButton';
import health from "../../assets/icons/health.svg"
import { Box } from '@mui/material';
import QuestionnaireSettings from './QuestionnaireSettings';
import { useDispatch } from 'react-redux';
import { setCurrentQuestioneir, setNewQuestioneir } from '../../store/slices/questionierSlice';

const MainContent = styled(FlexSpaceBetween)(({ theme }) => ({
  [theme.breakpoints.down('800')]: {
    flexDirection : "column-reverse" ,
    gap : "20px" ,
  },
}));

const CreateQuestionnaire = styled("div")(({ theme }) => ({
  display : "flex" ,
  alignItems : "center" ,
  justifyContent : "center" ,
  width : '100%'
}));
const PreviousQuestionnaire = styled(Flex)(({ theme }) => ({
  flexDirection : "column" , 
  width : "425px" , 
  height : "500px" , 
  borderRadius : "10px" ,
  backgroundColor : "#fff" , 
  padding : "10px 0 " ,
  [theme.breakpoints.down('800')]: {
    width : "96%" ,
    height : "200px" , 
    margin : "0 auto" ,
  },
}));
const Divider = styled("div")(({ theme }) => ({
  width : "100%" ,
  height : "1px" ,
  backgroundColor : Colors.grayDC ,
  margin : "10px 0"
}));


const Questionnaires = () => {
  const [pressCreateQuestionnaire , setPressCreateQuestionnaire] = useState(true)

  const dispatch = useDispatch() ; 
  const handleAddNewQuestionnaire =()=>{
    dispatch(setNewQuestioneir())
    dispatch(setCurrentQuestioneir(1))
    setPressCreateQuestionnaire(false)
  }

  return (
    <>
      <SmallContainer>
        <div style = {{color : Colors.gray_l , marginBottom : "20px"}}>Questionnaires</div>
        <MainContent>
          {pressCreateQuestionnaire == true 
            ? 
            <CreateQuestionnaire>
          
          </CreateQuestionnaire>
            :
            <QuestionnaireSettings>
              
            </QuestionnaireSettings>
          }
            <PreviousQuestionnaire>
              <FlexCenter style = {{fontSize : "20px"}}>Saved_Questioners</FlexCenter>
              <Divider/>
              <CreateQuestionnaire>
              <Box>
         
                <SubmitButton style = {{padding : "20px"}} onClick = {()=>{handleAddNewQuestionnaire()}}>Create_New_Questionnaire</SubmitButton>
              </Box>
            </CreateQuestionnaire>
            </PreviousQuestionnaire>
        </MainContent>
      </SmallContainer>
    </>
  )
}

export default Questionnaires