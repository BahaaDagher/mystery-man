import React from 'react'
import { Title } from './Title'
import { Box, Rating } from '@mui/material'
import { FlexCenter } from '../../../../components/FlexCenter';
import styled from '@emotion/styled';

const RatingQuestion = ({question, num}) => {
  const Answer = styled(FlexCenter)(({ theme }) => ({
    width:'100%'
    
      
    }));
  return (
    <Box>
      <Title>{num} - {question.title}</Title>
      <Answer>

       <Rating name="half-rating" defaultValue={question.answer}  readOnly style = {{direction : "ltr"}}/>
      </Answer>
    </Box>  
  )
}

export default RatingQuestion