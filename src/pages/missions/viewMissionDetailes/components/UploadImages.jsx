import { Box } from '@mui/material'
import React from 'react'
import { Title } from './Title'

const UploadImages = ({question, num}) => {
  return (
    <Box>
        <Title>{num} - {question.title}</Title>
    </Box>
  )
}

export default UploadImages