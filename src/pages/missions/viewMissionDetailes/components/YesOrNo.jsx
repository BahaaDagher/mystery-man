import React from 'react'
import { Title } from './Title'
import styled from '@emotion/styled';
import { Colors } from '../../../../Theme';
import { Flex } from '../../../../components/Flex';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Label = styled("div")(({ theme }) => ({
  fontSize : "22px" , 
  fontWeight : "600" ,
  margin : theme.direction === "rtl" ? "0 10px 0 0 " : "0 0 0 10px " ,
  "&.active" :{
    color : Colors.main ,
  }
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
const YesOrNo = ({question, num}) => {
  const {t} = useTranslation() ; 
  return (
    <Box>
        <Title>{num} - {question.title}</Title>
        
          {
          question.answer?
        <InputDiv>
          <Input type="radio"  value={question.title} checked />
          <Label className='active' > {t(`text.${question.answer}`)} </Label>
        </InputDiv>
          : "N/A"
          }
    </Box>
  )
}

export default YesOrNo