import React from 'react'
import { Title } from './Title'
import { Box, Rating } from '@mui/material'

const RatingQuestion = ({question, num}) => {
  return (
    <Box>
      <Title>{num} - {question.title}</Title>
      <Rating name="half-rating" defaultValue={question.answer}  readOnly style = {{direction : "ltr"}}/>
    </Box>  
  )
}

export default RatingQuestion