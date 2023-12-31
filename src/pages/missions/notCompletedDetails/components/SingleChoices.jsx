import { Box } from '@mui/material'
import React from 'react'
import { Title } from './Title'
import { Flex } from '../../../../components/Flex'
import styled from '@emotion/styled';
import { Colors } from '../../../../Theme';

const Label = styled("div")(({ theme }) => ({
  fontSize : "18px" , 
  color : Colors.gray  , 
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
const SingleChoices = ({question, num}) => {
  console.log(question)
  return (
    <>
      <Box>
        <Title>{num} - {question.title}</Title>
        {question.options.map((item)=>{
          return(

          <InputDiv>
            <Input  disabled type="radio" name={question.id} value={item.title}  />
            <Label >{item.title}</Label>
          </InputDiv>
          )

        })}
      </Box>
    </>
  )
}

export default SingleChoices