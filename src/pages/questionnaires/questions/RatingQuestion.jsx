
import React, { useEffect, useState } from 'react'
import RequiredOptional from './RequiredOptional'
import QuestionInput from './QuestionInput'
import styled from '@emotion/styled';
import { Colors } from '../../../Theme';
import { Box, Rating } from '@mui/material';
import { Flex } from '../../../components/Flex';
import { FlexCenter } from '../../../components/FlexCenter';
import DeleteIcon from './DeleteIcon';
import { setQuestionDetails } from '../../../store/slices/questionierSlice';
import { useDispatch, useSelector } from 'react-redux';


const Parent = styled("div")(({ theme }) => ({
  backgroundColor : "#fff" ,
  padding : "20px" ,
  margin : "15px 0 " ,
  borderRadius : "10px" ,
  position : "relative" , 
}));



const RatingQuestion = ({questionData,index ,setIsApplyFocus}) => {
  const [radio,  setRadio] = useState (questionData.required === 'optional' ? 'optional' : 'required');
  const [question, setQuestion] = useState(questionData.title);
  const isReadyToSend = useSelector((state) => state.questioneirData.isReadyToSend);
  const dispatch = useDispatch() ;
  useEffect(() => {
    setRadio(questionData.required === 'optional' ? 'optional' : 'required');
  }, [questionData.required, index]);
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
  },[radio, index])
  return (
    <Parent>
       <DeleteIcon index={index} setIsApplyFocus={setIsApplyFocus}/>
      <RequiredOptional value={radio} onChange={setRadio} name={`required-optional-${index}`} />
      <QuestionInput question= {questionData} setQuestion= {setQuestion}/>
      <FlexCenter>
        <Rating  readOnly />
      </FlexCenter>
    </Parent>
  )
}

export default RatingQuestion





