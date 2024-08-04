import React from 'react'
import { Title } from './Title'
import { Box, Rating } from '@mui/material'

const RatingQuestion = ({question, num}) => {
  return (
    <Box>
      <Title>{num} - {question.title}</Title>
      {
      question.answer ? 
      <Rating name="half-rating" defaultValue={question.answer}  readOnly style = {{direction : "ltr"}}/>
      : 'N/A'
      }
    </Box>  
  )
}

export default RatingQuestion