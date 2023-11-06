import styled from '@emotion/styled';
import React from 'react'

const Parent = styled("div")(({ theme }) => ({
    width : "72%" , 
    border : "1px solid red" ,
    [theme.breakpoints.down('1200')]: {
      width : "65%" ,
    },
    [theme.breakpoints.down('900')]: {
      width : "100%" ,
    },
}));

const Messages = () => {
  return (
    <Parent>
        
    </Parent>
  )
}

export default Messages