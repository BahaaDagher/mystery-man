import { Box } from '@mui/material'
import React from 'react'
import { Title } from './Title'
import { Flex } from '../../../../components/Flex'
import styled from '@emotion/styled';
import { Colors } from '../../../../Theme';

const Label = styled("div")(({ theme }) => ({
  fontSize : "22px" , 
  color : Colors.main  , 
  margin : theme.direction === "rtl" ? "0 10px 0 0 " : "0 0 0 10px " ,

}));
const InputDiv = styled(Flex)(({ theme }) => ({
  alignItems : "center" ,
  margin : theme.direction === "rtl" ? "0 20px 0 0 " : "0 0 0 20px " ,

}));
const Input = styled("input")(({ theme }) => ({
  display : "flex" ,
  alignItems : "center" , 
  transform: "scale(1.3)", 
}));
const MultiChoice = ({question, num}) => {
  console.log(question)
  return (
    <>
      <Box>
        <Title>{num} - {question.title}</Title>
          {question.answer.map((item , index) => {
             return (
                <InputDiv key = {index} >
                  <Input type="checkbox" name={question.id} value={item} defaultChecked />
                  <Label >{item}</Label>
                </InputDiv>
             ) 
          })}
      </Box>
    </>
  )
}

export default MultiChoice