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
import { chatMessagesGet, chatMessagesSend, technicalMessagesGet, technicalMessagesSend } from '../../../store/slices/chatSlice';
import { SubmitButton } from '../../../components/SubmitButton';
import { Colors } from '../../../Theme';
import Send from "../../../assets/icons/Send.svg";
import { Flex } from '../../../components/Flex';
import { use } from 'i18next';
import { FlexCenter } from '../../../components/FlexCenter';
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import { useTranslation } from 'react-i18next';
import admin from "../../../assets/images/admin.png"
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
  marginLeft : "10px" ,
}));
const BackArrow = styled(EastOutlinedIcon)(({ theme }) => ({
  cursor : "pointer" ,
  color : Colors.second, 
  display : "none" ,
  [theme.breakpoints.down('900')]: {
    display : "block" ,
  },

}));

const ShowMessageContainer = ({setLastMessage , setShowMessages }) => {
    const chatMessagesGetResponse = useSelector((state) => state.chatData.chatMessagesGetResponse);
    const chatMessagesSendPages = useSelector((state) => state.chatData.chatMessagesSendPages);
    const [messages, setMessages] = useState([]);
    const [adminImage, setAdminImage] = useState('');
    const [scrollToBot, setMScrollToBot] = useState(true);
    const [scrollCount, setScrollCount] = useState(0);
    const [singleMessage , setSingleMessage] = useState("");
    const [lastPage, setlastPage] = useState();
    const [ProfileID , setProfileID] = useState(-1);
    const chatRef = useRef(null);
    const dispatch = useDispatch();
    const getProfileData = useSelector((state) => state.profileData.getProfileData);

    useEffect(() => {
        if (getProfileData.status) {
            setProfileID(getProfileData.data.user.id)
        }
    }, [getProfileData])

    const currentChat = useSelector((state) => state.chatData.currentChat);

    const [currentChatData , setCurrentChatData] = useState({}); 
  
    useEffect(() => {
      setMessages([])
      setCurrentChatData(currentChat)
      setMScrollToBot(true)
      setScrollCount(0)
    },[currentChat])
    
    useEffect(() => {
      setMessages([])
      if (currentChatData.id) {
        getData(1)
        setMScrollToBot(true)
      }
    },[currentChatData])


    useEffect(() => {
    if (chatMessagesGetResponse.status==true) {
      setlastPage(0)
      setlastPage(chatMessagesGetResponse.data.last_page )
      setMessages(prevItems => [...prevItems, ...chatMessagesGetResponse.data.messages]);

    }
    }, [chatMessagesGetResponse])


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
         if(currentChat.mission_id== data.message.mission_id) setMessages(current => [...[data.message], ...current])
        });
        channel.bind("supportEvent", (data) => {
            console.log(currentChat);
            
         if(!currentChat.mission_id && data.message.user_id==ProfileID){
            console.log("bahaa data " ,data);
            setMessages(current => [...[data.message], ...current]) 
         } 
        });
    }, 1000);

    return () => {
    pusher.unsubscribe('chat_api');
    pusher.disconnect();
    };
    },[currentChatData])




    const getData=(value)=>{
    console.log(currentChatData);
    if (currentChatData.mission_id)  dispatch(chatMessagesGet({missionId:currentChatData.mission_id, page:value}));
    else dispatch(technicalMessagesGet({page :value}))
    }



    const handleSend = (e) => {
    let RealMessage = singleMessage.replace(/^\s+/, '');
    if (RealMessage!="") {
        const formData = new FormData();
        formData.append("message", singleMessage);
        if (currentChatData.mission_id) {
        formData.append("mission_id", currentChatData.mission_id);
        dispatch(chatMessagesSend(formData))
        } 
        else {
        dispatch(technicalMessagesSend(formData))
        }
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
            console.log(chatMessagesSendPages);
            getData(chatMessagesSendPages)
            setMScrollToBot(false)
            chatContainer.scrollTop=chatContainer.scrollTop+1000
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
        if (currentChatData.mission_id) {
        formData.append("mission_id", currentChatData.mission_id);
        dispatch(chatMessagesSend(formData))
        } 
        else {
        dispatch(technicalMessagesSend(formData))
        }
        event.target.value = null;
    }
    };

    const handleBack = () => {
    setShowMessages(false)
    }
    const {t} = useTranslation();
    return (
        <Parent>
            <section style = {{height : "100%" }}>
        <div className= "w-100 " style={{height: "100%" }}>
            <div className="row d-flex justify-content-center w-100 m-0 h-100">
            <div className="col-md-12 col-lg-12 col-xl-12 h-100">
                <div className="card h-100" id="chat2">
                <div className="card-header d-flex align-items-center p-3 justify-content-between">
                    <Flex className = "d-flex align-items-center">
                    <div>
                        <img src = {currentChatData.senderImage ?currentChatData.senderImage : admin } style = {{width : "60px" ,  height : "60px" , borderRadius : "10px"}} />
                    </div>
                        <Name className="mb-0"> {currentChatData.senderName? currentChatData.senderName : "Admin"}</Name>
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
                    
                    {currentChat.can_sent ? 
                    
                    
                    <>
                    
                            <SendButton onClick={handleSend}>
                                <SendImg src = {Send}/>
                                {t("text.Send")}
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
                            placeholder={t("text.Enter_Message")}
                            value={singleMessage}
                            onChange = {(e) => setSingleMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                handleSend()
                                }
                            }}
                            />
                    </>
                    : !currentChatData.mission_id ? 
                    
                    
                    <>
                    
                    <SendButton onClick={handleSend}>
                        <SendImg src = {Send}/>
                        {t("text.Send")}
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
                    placeholder={t("text.Enter_Message")}
                    value={singleMessage}
                    onChange = {(e) => setSingleMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                        handleSend()
                        }
                    }}
                    />
            </>
                    
                    :'' }
                </div>
                </div>
            </div>
            </div>
        </div>
            </section>
        
        </Parent>
    )
}

export default ShowMessageContainer