import { Box } from '@mui/material'
import React from 'react'
import { Title } from './Title'

const HeadLine = ({question, num}) => {
  return (
    <>
      <Box>
        <Title>{num} - {question.title}</Title>
      </Box>
    </>
  )
}

export default HeadLine