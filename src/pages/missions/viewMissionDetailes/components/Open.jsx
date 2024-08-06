import { Box } from '@mui/material'
import React from 'react'
import { Title } from './Title'
import { Colors } from '../../../../Theme'
import styled from '@emotion/styled';
const Answer = styled(Box)(({ theme }) => ({
  fontSize : "18px" , 
  color : Colors.second ,
  margin : theme.direction === "rtl" ? "0 10px 0 0 " : "0 0 0 10px " , 
  
}));
const Open = ({question, num}) => {
  return (
    <>
      <Box>
        <Title>{num} - {question.title}</Title>
        <Answer  >{question.answer ?question.answer : 'N/A'}</Answer>
      </Box>
    </>
  )
}

export default Open