import { Box } from '@mui/material'
import React from 'react'
import { Title } from './Title'
import { Colors } from '../../../../Theme'
import styled from '@emotion/styled';
import { FlexCenter } from '../../../../components/FlexCenter';
const Answer = styled(FlexCenter)(({ theme }) => ({
width:'100%'

  
}));
const HintContainer = styled("input")(({ theme }) => ({
  width : "80%" , 
  height:"60px",
  padding:"18px",
  borderRadius:"10px",
  border:`1px solid ${Colors.input}`,
  color : Colors.second , 
  fontSize : "16px" ,
  margin:'auto',
  outline : "none" ,
  "::placeholder": {
    color: Colors.input
  },

}));
const Open = ({question, num}) => {
  return (
    <>
      <Box>
        <Title>{num} - {question.title}</Title>
        <Answer>

          <HintContainer disabled value = "hint"/>
        </Answer>
      </Box>
    </>
  )
}

export default Open