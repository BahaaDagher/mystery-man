import React, { useState } from 'react'
import RequiredOptional from './RequiredOptional'
import QuestionInput from './QuestionInput'
import styled from '@emotion/styled';
import { Colors } from '../../../Theme';
import { Box, Rating } from '@mui/material';
import { Flex } from '../../../components/Flex';
import { FlexCenter } from '../../../components/FlexCenter';
import DeleteIcon from './DeleteIcon';


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


const HeadLine = () => {
  const [radio,  setRadio] = useState ('required');
  const [question, setQuestion] = useState('');
  return (
    <Parent>
      <DeleteIcon />
      <RequiredOptional radio={radio} setRadio= {setRadio} />
      <QuestionInput question= {question} setQuestion= {setQuestion}/>
      <Input
        placeholder='Please, need you to .........'
        type="text"
      />
    </Parent>
  )
}

export default HeadLine





