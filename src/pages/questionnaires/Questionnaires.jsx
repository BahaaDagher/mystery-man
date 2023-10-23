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
  width : `calc(100% - 450px)` 
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
  const [pressCreateQuestionnaire , setPressCreateQuestionnaire] = useState(false)
  return (
    <>
      <SmallContainer>
        <div style = {{color : Colors.gray_l , marginBottom : "20px"}}>Questionnaires</div>
        <MainContent>
          {pressCreateQuestionnaire == true 
            ? 
          <CreateQuestionnaire>
              <Box>
                <FlexCenter>
                  <img src = {health}  alt = "icon" style = {{textAlign : "center"}}/>
                </FlexCenter>
                <SubmitButton style = {{padding : "20px"}} onClick = {()=>{setPressCreateQuestionnaire(true)}}>Create_New_Questionnaire</SubmitButton>
              </Box>
            </CreateQuestionnaire>
            :
            <QuestionnaireSettings>
              
            </QuestionnaireSettings>
          }
            <PreviousQuestionnaire>
              <FlexCenter style = {{fontSize : "20px"}}>Saved_Questioners</FlexCenter>
              <Divider/>
            </PreviousQuestionnaire>
        </MainContent>
      </SmallContainer>
    </>
  )
}

export default Questionnaires