import styled from '@emotion/styled';
import React from "react";
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileImage from "../../../assets/images/admin.png"
import { useState } from "react";
import Pusher from 'pusher-js';
import { useRef } from "react";

import FileBox from "./FileBox";
import ImageBox from "./ImageBox";
import { chatMessagesGet, chatMessagesSend } from '../../../store/slices/chatSlice';
import { SubmitButton } from '../../../components/SubmitButton';
import { Colors } from '../../../Theme';
import Send from "../../../assets/icons/Send.svg";
import { Flex } from '../../../components/Flex';
import { use } from 'i18next';
import { FlexCenter } from '../../../components/FlexCenter';
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
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
  const chatMessagesGetResponse = useSelector((state) => state.chatData.chatMessagesGetResponse);
  const chatMessagesSendPages = useSelector((state) => state.chatData.chatMessagesSendPages);
  const currentChat = useSelector((state) => state.chatData.currentChat);
  const [messages, setMessages] = useState([]);
  const [scrollToBot, setMScrollToBot] = useState(true);
  const [scrollCount, setScrollCount] = useState(0);
  const [singleMessage , setSingleMessage] = useState("");
  const [lastPage, setlastPage] = useState();
  const chatRef = useRef(null);
  const [currentChatData , setCurrentChatData] = useState({}); 

  useEffect(() => {
    setMessages([])
    setCurrentChatData(currentChat)
    setMScrollToBot(true)
    setScrollCount(0)
  },[currentChat])
  
  useEffect(() => {
    setMessages([])
    if (currentChatData.mission_id) {
      getData(1)
      setMScrollToBot(true)
    }
  },[currentChatData])

  const dispatch = useDispatch();
  useEffect(() => {
    if (chatMessagesGetResponse.status==true) {
      setlastPage(0)
      setlastPage(chatMessagesGetResponse.data.last_page )
      setMessages(prevItems => [...prevItems, ...chatMessagesGetResponse.data.messages]);

    }
  }, [chatMessagesGetResponse])


  useEffect(() => { 
    const pusher = new Pusher("8071a8e96650bf6eac15", {
      secret: "74f3c62856110435f421",
      cluster: "us3" , 
      forceTLS: true,
      encrypted: true,
    });

    const channel = pusher.subscribe('chat_api');
    channel.bind("VistorMessageSent", (data) => {
      setMessages(current => [...[data.message], ...current])
    });

    return () => {
    pusher.unsubscribe('chat_api');
    pusher.disconnect();
    };
},[])




const getData=(value)=>{
  dispatch(chatMessagesGet({missionId:currentChatData.mission_id, page:value}));
}



const handleSend = (e) => {
  let RealMessage = singleMessage.replace(/^\s+/, '');
  if (RealMessage!="") {
    const formData = new FormData();
    formData.append("message", singleMessage);
    formData.append("mission_id", currentChatData.mission_id);
    
    dispatch(chatMessagesSend(formData))
    scrollToBottom();
  }
  setSingleMessage("")
}


useEffect(() => {
  if(scrollToBot){
    scrollToBottom();
    
  }
  if (messages.length > 0) {
    setLastMessage(
      {
        id : currentChatData.id , 
        message : messages[0].message , 
      }
    )
  }
  
}, [messages]);



const scrollToBottom = () => {
  if (chatRef.current) {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;

}}



const handleScroll = () => {

  const chatContainer = chatRef.current;
  if (chatContainer.scrollTop  === 0) {

    if(scrollCount>0){


      if(lastPage>=chatMessagesSendPages){
        getData(chatMessagesSendPages)
        chatContainer.scrollTop=chatContainer.scrollTop+1000
        setMScrollToBot(false)
      
        
      }
    }
  }
  setScrollCount(1)
  
};


const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("mission_id", '97');
    
    dispatch(chatMessagesSend(formData))
    event.target.value = null;
  }
};

  const handleBack = () => {
    setShowMessages(false)
  }
  return (
    <>
      {!currentChatData.id ?  <Part>please select a message from the side bar</Part> : 
      <Parent>
      <section style = {{height : "100%" }}>
      <div className= "w-100 " style={{height: "100%" }}>
        <div className="row d-flex justify-content-center w-100 m-0 h-100">
          <div className="col-md-12 col-lg-12 col-xl-12 h-100">
            <div className="card h-100" id="chat2">
              <div className="card-header d-flex align-items-center p-3 justify-content-between">
                <Flex className = "d-flex align-items-center">
                  <div>
                    <img src = {currentChatData.senderImage} style = {{width : "60px" ,  height : "60px" , borderRadius : "10px"}} />
                  </div>
                    <Name className="mb-0"> {currentChatData.adsName}</Name>
                </Flex>
                <BackArrow onClick = {handleBack}/>
              </div>
              <div
                className="card-body"
                data-mdb-perfect-scrollbar="true"
                style={customStyles }
                onScroll={handleScroll}
                ref={chatRef}
              >
                {messages.toReversed().map((message, index) => (
                  (
                      <div className="notMine" key={index}>
                        <div className="d-flex flex-row " 
                          style = {{justifyContent: message.isMine ? "flex-end" :"flex-start" }}
                          >
                          <div
                            style = {{maxWidth:"70%"  , wordWrap:"break-word"}}
                          >
                            <p
                              className="small p-2 ms-3 mb-1 rounded-3"
                              style={{ background: message.isMine ? Colors.main2 : Colors.grayDC  }}
                            >
                              <span 
                                style={{
                                    fontFamily: "inherit" ,
                                    fontSize :"inherit" ,
                                    whiteSpace: "pre-wrap" ,
                                    display : "flex",
                                    justifyContent: message.isMine ? "flex-end" :"flex-start" , 
                                    color : message.isMine ? "#fff" :"#000"
                                  }}
                                 >
                                  {message.type== "text" ? message.message : 
                                  message.type== "pdf" ? <FileBox src = {message.file} mine={false}/> :
                                  message.type== "image" ? <ImageBox src = {message.file}/> : null }
                                 </span>
                            </p>
                            <p className="small ms-3 mb-3 rounded-3 text-muted d-flex flex-row "
                              style={{ direction : "ltr" , justifyContent: message.isMine ? "flex-end" :"flex-start"}}
                            >
                            {message.created_at}
                            </p>
                          </div>
                         
                        </div>
                      </div>
                    )
                ))}


              </div>
              <div className="card-footer text-muted d-flex justify-content-start align-items-center p-3" style = {{direction : "rtl"}}>
                
                  <SendButton onClick={handleSend}>
                    <SendImg src = {Send}/>
                    Send
                  </SendButton>
                    
                    {/* style = {{fontSize : "30px" , color : 'red' , cursor: "pointer" , marginLeft : "10px"}} */}
                  
                  <label className="ms-1 text-muted" htmlFor="fileInput" >
                    <AttachFileOutlinedIcon style={{ fontSize: "30px", color: Colors.main , cursor: "pointer"}} />
                  </label>
                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={handleFileSelect}
                  />
                <textarea
                  style={{resize: "none" , height : "50px" , width : "100%"}}
                  type="text"
                  multiple 
                  className="form-control form-control-lg"
                  id="exampleFormControlInput1"
                  placeholder="Enter Message"
                  value={singleMessage}
                  onChange = {(e) => setSingleMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      handleSend()
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
       
      </Parent>
      }
    </>
  )
}

export default Messages