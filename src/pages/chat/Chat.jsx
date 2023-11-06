import React, { useEffect, useState } from 'react'
import LanguageIcon from '../../components/LanguageIcon';
import styled from '@emotion/styled';
import { LINK } from '../../components/LINK';
import profileLogo from "../../assets/images/profileLogo.svg"
import notificationImage from "../../assets/images/notification.svg"
import chatImage from "../../assets/images/chat.svg"
import { Colors } from '../../Theme';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../../store/slices/profileSlice';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { use } from 'i18next';
import { useNavigate } from 'react-router-dom';
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
  border : "1px solid red" , 
  justifyContent : "space-between" ,
  direction : theme.direction , 
  [theme.breakpoints.down('800')]: {
    justifyContent : "center" ,
    flexDirection : "column" ,
  },
}));
  
  
const Chat = () => {

    return (
    <>
    <Container>
        <NavbarContainer/>
        <Content>
        
        </Content>
    </Container>
    </>
  )
}

export default Chat