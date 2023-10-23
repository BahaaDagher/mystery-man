import React from 'react'
import { Colors } from '../../../Theme';
import styled from '@emotion/styled';
import { Box } from '@mui/material';

const Input = styled("input")(({ theme }) => ({
    backgroundColor : "transparent" ,
    width : "80%" ,
    border: "1px solid transparent" , 
    borderBottom: `1px solid ${Colors.input}` , 
    outline : "none" ,
    fontSize : "20px" ,
    "::placeholder": {
      color: Colors.gray_l
    },
    padding : "0 10px" ,
  }));

const QuestionInput = ({question ,setQuestion }) => {
  return (
    <Box margin = "20px 0">
        <Input
          placeholder='Enter your question'
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
    </Box>
  )
}

export default QuestionInput