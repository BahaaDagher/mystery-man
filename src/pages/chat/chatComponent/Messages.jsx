import styled from '@emotion/styled';
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from '../../../Theme';
import { Flex } from '../../../components/Flex';
import { FlexCenter } from '../../../components/FlexCenter';
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import ShowMessageContainer from './ShowMessageContainer';


const customStyles = {

  padding: '20px',
  position: "relative", 
  height: "100%"  , 
  overflow:"auto"
};

const Parent = styled("div")(({ theme }) => ({
    width : "72%" , 
    height : "calc(100vh - 110px)" ,
    [theme.breakpoints.down('1200')]: {
      width : "65%" ,
    },
    [theme.breakpoints.down('900')]: {
      width : "100%" ,
    },
    direction : "ltr"
}));
const SendButton = styled(Flex)(({ theme }) => ({
  backgroundColor : Colors.main  ,
  color : "#fff" , 
  padding : "10px 20px" ,
  borderRadius : "10px" ,
  fontSize : "16px" , 
  cursor : "pointer" ,
  transition : "all 0.3s ease" ,
  "&:hover" : {
    backgroundColor : Colors.hoverMain
  }
}));
const SendImg = styled("img")(({ theme }) => ({
  margin : "0 0 0 10px" , 
}));

const Part = styled(FlexCenter)(({ theme }) => ({
    width : "72%" , 
    height : "calc(100vh - 110px)" ,
    [theme.breakpoints.down('1200')]: {
      width : "65%" ,
    },
    [theme.breakpoints.down('900')]: {
      width : "100%" ,
    },
    color : Colors.second , 
    fontSize : "30px" ,
}));


const Name = styled("div")(({ theme }) => ({
  margin : theme.direction == "ltr" ? "0 0 0 10px" : "0 10px 0 0" ,
}));
const BackArrow = styled(EastOutlinedIcon)(({ theme }) => ({
  cursor : "pointer" ,
  color : Colors.second, 
  display : "none" ,
  [theme.breakpoints.down('900')]: {
    display : "block" ,
  },

}));
const Messages = ({setLastMessage , setShowMessages}) => {
  const currentChat = useSelector((state) => state.chatData.currentChat);


  
  return (
    <>
      {!currentChat.id ?  <Part> select a message from the side bar</Part> : 
      <ShowMessageContainer   setLastMessage={setLastMessage} setShowMessages={setShowMessages} />
      }
    </>
  )
}

export default Messages