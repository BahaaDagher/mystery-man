import React from 'react'
import { Title } from './Title'
import { Box } from '@mui/material'

const Rating = ({question, num}) => {
  return (
    <Box>
      <Title>{num} - {question.title}</Title>
    </Box>  
  )
}

export default Rating