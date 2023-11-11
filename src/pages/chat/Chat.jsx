import React, { useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled';
import { Colors } from '../../Theme';
import NavbarContainer from '../../components/NavbarContainer';
import Chats from './chatComponent/Chats';
import Messages from './chatComponent/Messages';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@emotion/react';
import { useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';

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
  const [LastMessage , setLastMessage] = useState({id : -1 , message : ""})
  const [showMessages , setShowMessages] = useState(true)

  const theme = useTheme();
  const isWidth900 = useMediaQuery(theme.breakpoints.down('900'));

  
  useEffect(() => {
    if (isWidth900)  setShowMessages(false)
  },[isWidth900])
  
  const {t} = useTranslation();
    return (
    <>
    {t("text.empty")}
    <Container>
        <NavbarContainer/>
        <Content>
          {!isWidth900 ? 
          <>
            <Chats LastMessage = {LastMessage}  setShowMessages = {setShowMessages}/> 
            <Messages  setLastMessage = {setLastMessage} setShowMessages = {setShowMessages} />   
          </>  :  null 

          }
          {isWidth900 ? 
          <>
          { !showMessages? <Chats LastMessage = {LastMessage} setShowMessages = {setShowMessages} />:'' }
          { showMessages? <Messages  setLastMessage = {setLastMessage} setShowMessages = {setShowMessages}/>  :'' }
             
          </>  :  null 

          }
        </Content>
    </Container>
    </>
  )
}

export default Chat