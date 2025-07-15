import React, { useEffect, useState } from 'react'
import RequiredOptional from './RequiredOptional'
import QuestionInput from './QuestionInput'
import styled from '@emotion/styled';
import { Colors } from '../../../Theme';
import { Box } from '@mui/material';
import { Flex } from '../../../components/Flex';
import { FlexCenter } from '../../../components/FlexCenter';
import DeleteIcon from './DeleteIcon';
import { useDispatch, useSelector } from 'react-redux';
import { setQuestionDetails } from '../../../store/slices/questionierSlice';
import { useTranslation } from 'react-i18next';

const Parent = styled("div")(({ theme }) => ({
  backgroundColor : "#fff" ,
  padding : "20px" ,
  margin : "15px 0 " ,
  borderRadius : "10px" ,
  position : "relative" , 
}));

const Circle = styled("div")(({ theme }) => ({
  width : "20px" , 
  height : "20px" ,
  borderRadius : "50%" ,
  backgroundColor : "#fff" ,
  border : `1px solid ${Colors.gray_l } ` ,
  margin :"0 20px"
}));
const FlexCenterP = styled(FlexCenter)(({ theme }) => ({
  margin  : "0 30px" , 
}));

const P = styled("p")(({ theme }) => ({
  fontSize: '20px',
  color: Colors.gray , 
  padding : "0" , 
  margin :"0" , 
}));

const YesOrNo = ({questionData,index ,setIsApplyFocus}) => {
  const [radio,  setRadio] = useState (questionData.required);
  const [question, setQuestion] = useState(questionData.title);
  const isReadyToSend = useSelector((state) => state.questioneirData.isReadyToSend);
  const dispatch = useDispatch() ; 
  useEffect(()=>{
    const data ={
      type:questionData.type,
     
      title:question,
    }
    dispatch(setQuestionDetails({index:index ,data:data}))
  },[question])
  useEffect(()=>{
    const data ={
      type:questionData.type,
      required:radio,

    }
    dispatch(setQuestionDetails({index:index ,data:data}))
  },[radio])
  const {t } = useTranslation();
  return (
    <Parent>
      <DeleteIcon index={index} setIsApplyFocus={setIsApplyFocus}/>
      <RequiredOptional radio={questionData} setRadio= {setRadio} />
      <QuestionInput question= {questionData} setQuestion= {setQuestion}/>
      <Flex>
        <FlexCenterP>
          <Circle/>
          <P for="no">{t("text.Yes")}</P>
        </FlexCenterP>
        <FlexCenterP>
          <Circle/>
          <P for="no">{t("text.No")}</P>
        </FlexCenterP>
      </Flex>
    </Parent>
  )
}

export default YesOrNo