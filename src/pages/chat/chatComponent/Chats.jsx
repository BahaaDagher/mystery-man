import styled from '@emotion/styled';
import React from 'react'
import blueSign from "../../../assets/icons/blueSign.svg"
import { Flex } from '../../../components/Flex';
import { Colors } from '../../../Theme';
import { useTranslation } from 'react-i18next';
import { FlexSpaceBetween } from '../../../components/FlexSpaceBetween';
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
}));
const Divider = styled("div")(({ theme }) => ({
    width : "100%" ,
    height : "1px" ,
    backgroundColor : "#E5E5E5" ,
    margin : "15px 0 "
}));
const MessagesDiv = styled("div")(({ theme }) => ({
  fontSize : "20px" , 
  fontWeight : "500" ,
  margin : "20px 20px 10px 20px" ,
}));
const ChatContainer = styled("div")(({ theme }) => ({

}));
const Chat = styled(Flex)(({ theme }) => ({
  margin : "20px 20px 0px 20px" ,
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
  color : Colors.Gray1 , 
  fontSize : "14px" , 
}));
const Time = styled("div")(({ theme }) => ({
  color : Colors.Gray1 , 
  fontSize : "14px" , 
  // margin : theme.direction == "ltr" ? "0 0 0 10px" : "0 10px 0 0" , 
  width : "75px" , 
}));
const Chats = () => {
  const arr = [
    {
      "id": 147,
      "message": "مننننن",
      "mission_id": 97,
      "created_at": "2023-11-06 18:00 pm",
      "receive_id": 33,
      "senderName": "شركة اسماعيل وبهاء",
      "senderImage": "https://ui-avatars.com/api/?name=شركةاسماعيلوبهاء.png",
      "adsName": "التأكد من الطبيعه"
  },
  {
      "id": 142,
      "message": "اهلا بكم",
      "mission_id": 98,
      "created_at": "2023-11-06 17:59 pm",
      "receive_id": 33,
      "senderName": "شركة اسماعيل وبهاء",
      "senderImage": "https://ui-avatars.com/api/?name=شركةاسماعيلوبهاء.png",
      "adsName": "بهاء"
  }
  ]
  const getTime = (str)=>{
    const time = str.substring(11);
    return time
  }
  const lastMessage = (str)=>{
    if (str.length<25) return str
    const message = str.substring(0,25) + "...";
    return message
  }
  const {t} = useTranslation();
  return (
    <Parent>
        <Title>{t("text.Support")}</Title>
        <SupportDiv>
            <MysterySupport>Mystery Support</MysterySupport>
            <img src= {blueSign} alt = "sign"/>
        </SupportDiv>
        <Divider/>
        <MessagesDiv>Messages</MessagesDiv>
        <ChatContainer>
          {
            arr.map((chat , index) => (
              <div key = {index}>
                <Chat>
                  <ImageDiv>
                    <img src = {chat.senderImage} alt = "senderImage"/>
                  </ImageDiv>
                  <NameMessage>
                    <Name>{chat.senderName}</Name>
                    <MessageTime>
                      <Message>{lastMessage(chat.message+ "نتيلانلاينلانيتلانتلاينتلانت")}    </Message>
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
  )
}

export default Chats