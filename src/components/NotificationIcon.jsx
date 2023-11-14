import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { CircularProgress, Popover } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Colors } from '../Theme';
import { ListItemText } from '@mui/material';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { ToggleDirection, ToggleLanguage } from '../store/slices/directionSlice';
import { use } from 'i18next';
import notificationImage from "../assets/images/notification.svg"
import admin from "../assets/images/4.png"
import { FlexSpaceBetween } from './FlexSpaceBetween';
import { Flex } from './Flex';
import { getNotifications } from '../store/slices/profileSlice';
const Container = styled("div")(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "5",  
}));

const NotificationContainer = styled("div")(({ theme }) => ({
    width : "500px" , 
    padding : "20px"   ,
    height : "400px" ,
    overflowY : "auto" ,
    [theme.breakpoints.down('500')]: {
        width : "100vw" , 
    }
}));
const NotificationTitle = styled("div")(({ theme }) => ({
    fontSize : "24px" , 
    color : Colors.second ,
    paddingBottom : "20px" ,
    borderBottom : `1px solid ${Colors.input}` ,
    marginBottom : "10px" ,
    [theme.breakpoints.down('500')]: {
        marginBottom : "15px" ,
    }
}));
const Notification = styled(FlexSpaceBetween)(({ theme }) => ({
    minHeight : "80px" , 
    alignItems : "center" ,
    padding : "0 20px" , 
    [theme.breakpoints.down('500')]: {
        flexDirection : "column" ,
        alignItems : "flex-start" ,
        borderBottom : `1px solid ${Colors.input}` ,
        marginBottom : "15px" ,
    }
    
}));
const InfoDiv= styled(Flex)(({ theme }) => ({
}));
const ImgDiv= styled("div")(({ theme }) => ({
    width : "50px" , 
    height : "50px" , 
}));
const Img = styled("img")(({ theme }) => ({
    width   : "100%" ,
    height : "100%" ,
    borderRadius : "50%" ,
}));
const NameMessage = styled("div")(({ theme }) => ({
    marginLeft : "20px" ,
}));
const Name = styled("div")(({ theme }) => ({
    color : Colors.second , 
    fontSize :"18px" ,
}));
const Message = styled("div")(({ theme }) => ({
    color : Colors.gray , 
    fontSize :"14px" ,
}));
const Time = styled("div")(({ theme }) => ({
    fontSize :"14px" ,
    color : Colors.input ,
    

}));
  
const NotificationIcon = () => {

  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch()


  const [notifications , setNotifications] = useState([])
  useEffect(() => {
    dispatch(getNotifications())
  }, [])
  const getNotificationsData = useSelector(state => state.profileData.getNotificationsData)
  const getNotificationsLoading = useSelector(state => state.profileData.getNotificationsLoading)
  useEffect(() => {
    if (getNotificationsData.data) {
        setNotifications(getNotificationsData.data.notifications)
    }
  }, [getNotificationsData])


  return (
    <>
    <Container  >
        <img 
            src = {notificationImage} alt = "notification" 
            onClick={handleIconClick} style = {{cursor : "pointer" }}
        />
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
      <NotificationContainer>
        {getNotificationsLoading ? <CircularProgress/> : null}
        <NotificationTitle>
            Notifications
        </NotificationTitle>
        {notifications.map((item , index) => {
            return (
                <Notification key = {index}>
                    <InfoDiv>
                        <ImgDiv>
                            <Img src = {item.companyimage}/> 
                        </ImgDiv>
                        <NameMessage>
                            <Name>{item.name}</Name>
                            <Message>{item.message}</Message>
                        </NameMessage>
                    </InfoDiv>
                    <Time>{item.created_at}</Time>
                </Notification>
            )
        })}
      </NotificationContainer>
      </Popover>
    </Container>
    </>
  )
}

export default NotificationIcon