import styled from '@emotion/styled';
import React from 'react'

const Parent = styled("div")(({ theme }) => ({
    width : "25%" , 
    border : "1px solid red" ,
    margin : theme.direction == "ltr" ? "0 20px 0 0" : "0 0 0 20px" ,
    [theme.breakpoints.down('800')]: {
      width : "100%" ,
      margin : 0 , 
    },
}));

const Chats = () => {
  return (
    <Parent>

    </Parent>
  )
}

export default Chats