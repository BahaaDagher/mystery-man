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
    if (getNotificationsData?.data) {
        setNotifications(getNotificationsData.data.notifications)
    }
  }, [getNotificationsData])


  return (
    <>
    <Container  >
    <div onClick={handleIconClick} style = {{cursor : "pointer" }}>
      <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.08777 8.7364C4.84209 4.96483 8.15365 2.25 11.9999 2.25C15.8462 2.25 19.1577 4.96483 19.912 8.7364L21.1658 15.0054C21.5686 17.019 20.4996 19.0431 18.6323 19.873C17.9505 20.176 17.2507 20.4298 16.5387 20.6343L16.435 20.8678C15.656 22.6205 13.9179 23.75 11.9999 23.75C10.0819 23.75 8.34382 22.6205 7.56484 20.8678L7.46108 20.6343C6.74912 20.4298 6.0493 20.176 5.36748 19.873C3.50016 19.0431 2.43126 17.019 2.83398 15.0054L4.08777 8.7364ZM9.44866 21.0731C10.0757 21.808 11.0026 22.25 11.9999 22.25C12.9972 22.25 13.9241 21.808 14.5511 21.0731C12.8624 21.3372 11.1374 21.3372 9.44866 21.0731Z" fill="#455A64"/>
        <rect x="1.5" y="0.5" width="9" height="9" rx="4.5" fill={Colors.main}/>
        <rect x="1.5" y="0.5" width="9" height="9" rx="4.5" stroke="white"/>
      </svg>
    </div>
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