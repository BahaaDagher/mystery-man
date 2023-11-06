import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled';
import { Colors } from '../../Theme';
import NavbarContainer from '../../components/NavbarContainer';
import Chats from './chatComponent/Chats';
import Messages from './chatComponent/Messages';

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


  
const Chat = () => {

    return (
    <>
    <Container>
        <NavbarContainer/>
        <Content>
          <Chats/>
          <Messages/>
        </Content>
    </Container>
    </>
  )
}

export default Chat