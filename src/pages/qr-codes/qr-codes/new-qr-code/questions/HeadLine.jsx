import React, { useEffect, useState } from 'react'
import RequiredOptional from './RequiredOptional'
import QuestionInput from './QuestionInput'
import styled from '@emotion/styled';
import { Colors } from '../../../Theme';
import { Box, Rating } from '@mui/material';
import { Flex } from '../../../components/Flex';
import { FlexCenter } from '../../../components/FlexCenter';
import DeleteIcon from './DeleteIcon';
import { useDispatch, useSelector } from 'react-redux';
import { setQuestionDetails } from '../../../store/slices/questionierSlice';


const Parent = styled("div")(({ theme }) => ({
  backgroundColor : "#fff" ,
  padding : "20px" ,
  margin : "15px 0 " ,
  borderRadius : "10px" ,
  position : "relative" , 
}));

const Input = styled("input")(({ theme }) => ({
  backgroundColor : "transparent" ,
  width : "80%" ,
  border: "1px solid transparent" , 
  borderBottom: `1px solid ${Colors.input}` , 
  outline : "none" ,
  fontSize : "16px" ,
  "::placeholder": {
    color: Colors.gray_l
  },
  padding : "0 10px" ,
}));


const HeadLine = ({questionData,index ,setIsApplyFocus}) => {
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
  return (
    <Parent>
       <DeleteIcon index={index} setIsApplyFocus={setIsApplyFocus}/>
      <RequiredOptional radio={questionData} setRadio= {setRadio} />
      <QuestionInput question= {questionData} setQuestion= {setQuestion}/>
      
    </Parent>
  )
}

export default HeadLine





