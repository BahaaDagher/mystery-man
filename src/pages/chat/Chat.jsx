import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled';
import { Colors } from '../../Theme';
import NavbarContainer from '../../components/NavbarContainer';
import Chats from './chatComponent/Chats';
import Messages from './chatComponent/Messages';
import { useTranslation } from 'react-i18next';

const Container = styled("div")(({ theme }) => ({
    minHeight : "100vh" , 
    backgroundColor : Colors.body , 
    position : "relative" ,
    display: 'flex',
    direction : theme.direction ,
}));

const Content = styled("div")(({ theme }) => ({
  width : `calc(100% - 20px )` ,
  overflow : "auto" ,
  margin : " 20px 10px" ,
  marginTop : "90px" ,
  display : "flex" ,
  flexWrap : "wrap" ,
  justifyContent : "space-between" ,
  direction : theme.direction , 
  
}));


  
const Chat = () => {
  const {t} = useTranslation();
    return (
    <>
    {t("text.empty")}
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