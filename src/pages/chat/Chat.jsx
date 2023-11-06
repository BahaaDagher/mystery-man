import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled';
import { Colors } from '../../Theme';
import NavbarContainer from '../../components/NavbarContainer';

const Container = styled("div")(({ theme }) => ({
    minHeight : "100vh" , 
    backgroundColor : Colors.body , 
    position : "relative" ,
    display: 'flex',
}));

const Content = styled("div")(({ theme }) => ({
  width : `calc(100% - 20px )` ,
  overflow : "auto" ,
  margin : " 20px 10px" ,
  marginTop : "90px" ,
  display : "flex" ,
  flexWrap : "wrap" ,
  // border : "1px solid red" , 
  justifyContent : "space-between" ,
  direction : theme.direction , 
  
}));
const Chats = styled("div")(({ theme }) => ({
  width : "25%" , 
  border : "1px solid red" ,
  margin : theme.direction == "ltr" ? "0 20px 0 0" : "0 0 0 20px" ,
  [theme.breakpoints.down('800')]: {
    width : "100%" ,
    margin : 0 , 
  },
}));
const Messages = styled("div")(({ theme }) => ({
  width : "72%" , 
  border : "1px solid red" ,
  [theme.breakpoints.down('800')]: {
    width : "100%" ,
  },
}));
  
const Chat = () => {

    return (
    <>
    <Container>
        <NavbarContainer/>
        <Content>
          <Chats>
          </Chats>
          <Messages>

          </Messages>
        </Content>
    </Container>
    </>
  )
}

export default Chat