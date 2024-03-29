import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react'
// import blueSign from "../../../assets/icons/blueSign.svg"
import { ReactComponent as BlueSign } from '../../../assets/icons/blueSign.svg';
import { Flex } from '../../../components/Flex';
import { Colors } from '../../../Theme';
import { useTranslation } from 'react-i18next';
import { FlexSpaceBetween } from '../../../components/FlexSpaceBetween';
import { useDispatch, useSelector } from 'react-redux';
import { getChates, setChatMessagesSendPages, setCurrentChat } from '../../../store/slices/chatSlice';
import { use } from 'i18next';
import Loading from '../../../components/Loading';
import { FlexCenter } from '../../../components/FlexCenter';
import Pusher from 'pusher-js';

const Parent = styled("div")(({ theme }) => ({
    width : "25%" , 
    margin : theme.direction == "ltr" ? "0 20px 0 0" : "0 0 0 20px" ,
    borderRadius : "10px" ,
    backgroundColor : "#fff" , 
    fontWeight : "500" ,
    overflow : "auto" ,
    height : "calc(100vh - 110px)" ,
    [theme.breakpoints.down('1200')]: {
      width : "32%" ,
    },
    [theme.breakpoints.down('900')]: {
      width : "100%" ,
      margin : 0 , 
    },
}));

const Title = styled("div")(({ theme }) => ({
    fontSize : "20px" , 
    margin : "20px 20px 0px 20px" ,
  
}));

const SupportDiv = styled(Flex)(({ theme }) => ({
    position:'relative',
  alignItems : "center" ,
  cursor : "pointer" ,
  margin : "20px 20px 0px 20px" ,
  "&:hover" : {
    color : Colors.main
  }
}));
const MysterySupport = styled("div")(({ theme }) => ({

  padding: "10px 0"  , 
  fontSize : "16px" , 
  fontWeight : "500" ,
  margin : theme.direction == "ltr" ? "0 10px 0 0" : "0 0 0 10px" ,
  "&.active" : {
    color : Colors.main , 
    fontWeight : "bold" , 
  }
}));
const Divider = styled("div")(({ theme }) => ({
    width : "100%" ,
    height : "1px" ,
    backgroundColor : "#E5E5E5" ,
    // margin : "15px 0 "
}));
const MessagesDiv = styled("div")(({ theme }) => ({
  fontSize : "20px" , 
  fontWeight : "500" ,
  margin : "20px 20px 10px 20px" ,
}));
const ChatContainer = styled("div")(({ theme }) => ({

}));
const Chat = styled(Flex)(({ theme }) => ({
  padding : "20px" ,
  cursor : "pointer" ,
  "&:hover" : {
    backgroundColor : Colors.bgBL 
  } , 
  "&.active": {
    backgroundColor : Colors.bgBL,
    
    borderColor : Colors.main  ,
    borderWidth :  theme.direction == "rtl" ?  "0px 3px 0px 0px" :"0px 0px 0px 3px"  ,
    borderStyle : "solid" ,
  }
}));

const ImageDiv = styled("div")(({ theme }) => ({
  width : "50px" , 
  height : "50px" , 
  borderRadius : "10px" ,
  overflow : "hidden" ,
  margin : theme.direction == "ltr" ? "0 20px 0 0" : "0 0 0 20px" ,
  "& img" : {
    width : "100%" , 
    height : "100%" , 
    objectFit : "cover" ,
  }
}));
const NumChats = styled("span")(({ theme }) => ({
  position : "absolute" ,
  top : "8px" ,
  right:"5px",
  background:'red',
  borderRadius:'50%',
  width:'20px',
  height:'20px',
  textAlign:'center',
  color:'white'

}));

const NameMessage = styled("div")(({ theme }) => ({
  width : "calc(100% - 70px)" ,
}));
const Name = styled("div")(({ theme }) => ({
  fontSize : "16px" , 
  color : Colors.Black60 ,
  marginBottom : "8px" ,  
}));
const MessageTime = styled(FlexSpaceBetween)(({ theme }) => ({
}));
const Message = styled("div")(({ theme }) => ({
  color : Colors.Black3 , 
  fontSize : "14px" , 
  // "&:hover" : {
  //   color : Colors.Gray1
  // }
}));
const Time = styled("div")(({ theme }) => ({
  color : Colors.Gray1 ,
   
  fontSize : "14px" , 
  // margin : theme.direction == "ltr" ? "0 0 0 10px" : "0 10px 0 0" , 
  width : "75px" , 
}));
const Chats = ({LastMessage , setShowMessages }) => {
  const [ProfileID , setProfileID] = useState(-1);
  const getProfileData = useSelector((state) => state.profileData.getProfileData);

  useEffect(() => {
      if (getProfileData.status) {
          setProfileID(getProfileData.data.user.id)
      }
  }, [getProfileData])
  const [showNotification , setShowNotification] = useState(false)
  const [showNotificationSupport , setShowNotificationSupport] = useState(false)
  const [missionNotification , setMissionNotification] = useState(-1)
  useEffect(() => { 
   
   
    const pusher = new Pusher("83c251525fa6269fb166", {
      secret: "0ef53bdedbcb98960e68",
      cluster: "us3" , 
      forceTLS: true,
      encrypted: true,
    });

    const channel = pusher.subscribe('chat_api');
    setTimeout(() => {
        
        channel.bind("VistorMessageSent", (data) => {
            console.log(currentChat);
            if(! data.message.isMine){

              setShowNotification(true)
              setMissionNotification(data.message.mission_id)
            }
        
        });
        channel.bind("supportEvent", (data) => {
            console.log(currentChat);
            
         if( data.message.user_id==ProfileID && ! data.message.isMine){
          setShowNotificationSupport(true)
            
           
         } 
        });
    }, 1000);

    return () => {
    pusher.unsubscribe('chat_api');
    pusher.disconnect();
    };
    },[])
  const dispatch = useDispatch()
  const getTime = (str)=>{
    const time = str.substring(11);
    return time
  }
  const lastMessage = (str)=>{
    if (str == null) return ""
    if (str.length<15) return str
    const message = str.substring(0,15) + "...";
    return message
  }
  const [activeChat , setActiveChat] = useState(-2)
  
  const handleClick = (chat) => {
    setActiveChat(chat.id)
    dispatch(setCurrentChat(chat))
    dispatch(setChatMessagesSendPages())
    dispatch(getChates())
    setShowMessages(true)
    setShowNotification(false)
  }
  const getChatesResponse = useSelector((state) => state.chatData.getChatesResponse); 
  const getChatesLoading = useSelector((state) => state.chatData.getChatesLoading); 
  const currentChat = useSelector((state) => state.chatData.currentChat);
  
  useEffect(() => {
    if (currentChat.newMission) {
      setShowMessages(true)
    }
  },[currentChat])

  useEffect(() => {
    if (getChatesResponse.status) {
      setChats(getChatesResponse.data.messages)
    }
  }, [getChatesResponse])
  
  useEffect(() => {
    dispatch(getChates())
  }, [])
  
  const [chats , setChats] = useState([])
  const handleTechnical = ()=>{
    setShowMessages(true)
    dispatch(getChates())
    dispatch(setCurrentChat({id : -1}))
    dispatch(setChatMessagesSendPages())
    setActiveChat(-1)
  }
  const svgStyle = {
    fill : Colors.main , 
    // backgroundColor : Colors.main ,
  };
  
  const {t} = useTranslation();
  return (
    <>
    {getChatesLoading? <Loading/> : null}
    <Parent>
        <Title>{t("text.Support")}</Title>
        <SupportDiv>
            <MysterySupport onClick = {handleTechnical} className ={activeChat==-1?'active' : ""}> {t("text.Mystery_Support")}</MysterySupport>
        
            <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg"  >
              <path fill-rule="evenodd" clip-rule="evenodd" d="M6.53256 1.31996C7.03262 0.709104 7.96681 0.709102 8.46694 1.31996L9.08681 2.07711L10.0022 1.73134C10.7408 1.45239 11.5498 1.91946 11.6774 2.69854L11.8358 3.66421L12.8014 3.82247C13.5805 3.95016 14.0476 4.75916 13.7686 5.4977L13.4228 6.41312L14.18 7.03302C14.7908 7.53315 14.7908 8.46727 14.18 8.9674L13.4228 9.58734L13.7686 10.5027C14.0476 11.2413 13.5805 12.0503 12.8014 12.178L11.8358 12.3362L11.6775 13.3019C11.5498 14.081 10.7408 14.548 10.0022 14.2691L9.08681 13.9233L8.46694 14.6805C7.96681 15.2913 7.03262 15.2913 6.53256 14.6805L5.91264 13.9233L4.99721 14.2691C4.25866 14.548 3.44967 14.081 3.32199 13.3019L3.16371 12.3362L2.19804 12.178C1.41897 12.0503 0.951906 11.2413 1.23086 10.5027L1.57662 9.58734L0.819468 8.9674C0.208616 8.46727 0.208613 7.53315 0.819468 7.03302L1.57662 6.41312L1.23086 5.4977C0.9519 4.75916 1.41897 3.95016 2.19805 3.82247L3.16371 3.66421L3.32199 2.69854C3.44967 1.91946 4.25867 1.45239 4.99721 1.73134L5.91264 2.07711L6.53256 1.31996ZM7.00444 10.6296L11.3794 6.25466L10.4956 5.37078L6.5625 9.30384L4.50444 7.24577L3.62056 8.12965L6.12056 10.6296C6.23777 10.7469 6.39675 10.8127 6.5625 10.8127C6.72825 10.8127 6.88725 10.7469 7.00444 10.6296Z" fill={Colors.main}/>
            </svg>
            {showNotificationSupport ? <NumChats>1</NumChats>:''}
        </SupportDiv>
        <Divider/>
        <MessagesDiv>{t("text.Messages")}</MessagesDiv>
        <ChatContainer>
          {
            chats.map((chat , index) => (
              <div key = {index} style={{position: "relative"}}>
                {showNotification ? 
                missionNotification==chat.mission_id ?<NumChats>1</NumChats>:'' 
                
                : ''}
                <Chat className={activeChat==chat.id?'active' : ""} onClick={()=>handleClick(chat)}>
                  <ImageDiv>
                    <img src = {chat.senderImage} alt = "senderImage"/>
                  </ImageDiv>
                  <NameMessage>
                    <Name>{chat.adsName}</Name>
                    <MessageTime>
                      <Message>
                        {LastMessage.message!="" && LastMessage.id == chat.id ? 
                        lastMessage(LastMessage.message)
                        :lastMessage(chat.message) }    
                      </Message>
                      <Time>{getTime(chat.created_at)}</Time>
                    </MessageTime>
                  </NameMessage>
                </Chat>
                <Divider/>
              </div>
            ))
          }
        </ChatContainer>
    </Parent>
    </>
  )
}

export default Chats