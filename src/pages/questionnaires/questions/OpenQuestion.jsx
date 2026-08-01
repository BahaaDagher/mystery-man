import React, { useEffect, useState } from 'react'
import RequiredOptional from './RequiredOptional'
import QuestionInput from './QuestionInput'
import styled from '@emotion/styled';
import { FlexCenter } from '../../../components/FlexCenter';
import DeleteIcon from './DeleteIcon';
import { Colors } from '../../../Theme';
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

const HintContainer = styled("input")(({ theme }) => ({
  width : "80%" , 
  height:"60px",
  padding:"18px",
  borderRadius:"10px",
  border:`1px solid ${Colors.input}`,
  color : Colors.second , 
  fontSize : "16px" ,
  outline : "none" ,
  "::placeholder": {
    color: Colors.input
  },

}));


const OpenQuestion = ({questionData,index ,setIsApplyFocus}) => {
  const [radio,  setRadio] = useState(questionData.required === 'optional' ? 'optional' : 'required');
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
  const {t} = useTranslation() ; 
  return (
    <Parent>
      <DeleteIcon index={index} setIsApplyFocus={setIsApplyFocus}/>
      <RequiredOptional value={radio} onChange={setRadio} name={`required-optional-${index}`} />
      <QuestionInput question= {questionData} setQuestion= {setQuestion}/>
        <HintContainer value = {t("text.hint")}/>
    </Parent>
  )
}

export default OpenQuestion





