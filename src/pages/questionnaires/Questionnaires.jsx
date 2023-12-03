import React, { useEffect, useState } from 'react'
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
import { useDispatch, useSelector } from 'react-redux';
import { getQuestionnaire, setCurrentQuestioneir, setCurrentQuestioneirID, setNewQuestioneir } from '../../store/slices/questionierSlice';
import { use } from 'i18next';
import { useTranslation } from 'react-i18next';

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
const PreviousQuestionnaires = styled(Flex)(({ theme }) => ({
  flexDirection : "column" , 
  width : "425px" , 
  maxHeight : "500px" ,
  overflowY : "auto" , 
  borderRadius : "10px" ,
  backgroundColor : "#fff" , 
  [theme.breakpoints.down('800')]: {
    width : "96%" ,
    height : "200px" , 
    margin : "0 auto" ,
  },
  overflowX : "hidden" , 

}));
const PreviousQuestionnaire = styled(FlexSpaceBetween)(({ theme }) => ({
  borderRadius : "10px" ,
  padding : "10px" ,
  width : "96%" ,
  alignItems : "center" ,
  marginBottom : "10px" ,
  backgroundColor : Colors.bg  ,
  margin : "5px auto" ,
  cursor:'pointer',
  transition : "all 0.3s ease-in-out" , 
  
  "&:hover":{
    background:Colors.input , 
  } ,
  "&.active":{
    background:Colors.input , 
  } ,
  
}));
const QuestionnaireName = styled("div")(({ theme }) => ({
  fontSize : "20px" ,
}));
const QuestionnaireLengthDiv = styled(FlexSpaceBetween)(({ theme }) => ({
  backgroundColor : Colors.lightMain ,
  width : "75px" , 
  height : "40px" ,
  borderRadius : "10px" ,
  padding: "0 10px" ,
  alignItems : "center" , 
}));

const SpanQ = styled("span")(({ theme }) => ({
  fontSize : "32px" , 
  color : Colors.main
  
}));

const SpanNum = styled("span")(({ theme }) => ({
  fontSize : "20px"
}));


const Divider = styled("div")(({ theme }) => ({
  width : "100%" ,
  height : "1px" ,
  backgroundColor : Colors.grayDC ,
  margin : "10px 0"
}));

const NewQuestionnaire = styled(SubmitButton)(({ theme }) => ({
  padding : "20px", 
  margin : "10px  auto" , 
  textAlign : "center" ,
  fontSize : "18px" ,
}));


const Questionnaires = () => {
  const [pressCreateQuestionnaire , setPressCreateQuestionnaire] = useState(true)
  const [ isAddNew , setIsAddNew ] = useState(false)

  const dispatch = useDispatch() ; 

  const handleAddNewQuestionnaire =()=>{
    setIsAddNew(true)
    dispatch(setNewQuestioneir())
    setPressCreateQuestionnaire(false)
  }
  const handleQuestionierChange =(id ,index)=>{
    setIsAddNew(false)
    dispatch(setCurrentQuestioneir(index))
    dispatch(setCurrentQuestioneirID(id))
    setPressCreateQuestionnaire(false)
    
  }
  const questionieres = useSelector((state) => state.questioneirData.questionieres);
  useEffect(() => {
    dispatch(getQuestionnaire())
  }, [])
  useEffect(() => {
    dispatch(setCurrentQuestioneir(0))
    setPressCreateQuestionnaire(false)
  }, [])


const numberOFQuestioners = (item)=>{ 
  let count = 0 ;
  item.steps.map((step)=>{
    count += step.questions.length
  })
  return count
}

  const [active , setActive] = useState(0)
  const {t} = useTranslation() ; 
  return (
    <>
      <SmallContainer >
        <div style = {{color : Colors.gray_l , marginBottom : "20px"}}>{t("text.questionnaires")} </div>
        <MainContent>
          {pressCreateQuestionnaire == true 
            ? 
            <div>
          
            </div>
            :
            <QuestionnaireSettings isAddNew = {isAddNew}>
              
            </QuestionnaireSettings>
          }
            <PreviousQuestionnaires style = {{padding : "10px"}}>
              <CreateQuestionnaire>
                <Box style = {{width : "100%"}}>
                  <NewQuestionnaire  onClick = {()=>{handleAddNewQuestionnaire()}}>{t("text.Create_New_Questionnaire")} </NewQuestionnaire>
                </Box>
              </CreateQuestionnaire>
              <Divider/>
              <FlexCenter style = {{fontSize : "20px"}}>{t("text.Saved_Questioners")}</FlexCenter>
              <Divider/>
              {
                questionieres.map((item , index)=>{
                return (
                  <>
                    <PreviousQuestionnaire className = {active == index ? "active" : ""}
                    onClick={()=> {handleQuestionierChange(item.id ,index)  ; setActive(index) }} >

                      <QuestionnaireName>{item.title}</QuestionnaireName>
                      <QuestionnaireLengthDiv>
                        <SpanQ>Q</SpanQ>
                        <SpanNum>
                          {numberOFQuestioners(item)}
                        </SpanNum>
                      </QuestionnaireLengthDiv>
                    </PreviousQuestionnaire>

                  </>
                )
              })}
              
            </PreviousQuestionnaires>
        </MainContent>
      </SmallContainer>
    </>
  )
}

export default Questionnaires