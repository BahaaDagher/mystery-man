import React, { useState } from 'react'
import RequiredOptional from './RequiredOptional'
import QuestionInput from './QuestionInput'
import styled from '@emotion/styled';
import { FlexCenter } from '../../../components/FlexCenter';
import DeleteIcon from './DeleteIcon';
import { Colors } from '../../../Theme';


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


const OpenQuestion = () => {
  const [radio,  setRadio] = useState('required');
  const [question, setQuestion] = useState('');
  return (
    <Parent>
      <DeleteIcon />
      <RequiredOptional radio={radio} setRadio= {setRadio} />
      <QuestionInput question= {question} setQuestion= {setQuestion}/>
        <HintContainer value = "hint"/>
    </Parent>
  )
}

export default OpenQuestion





