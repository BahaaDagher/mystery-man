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

const customStyles = {

  padding: '20px',
  position: "relative", 
  height: "100%"  , 
  overflow:"auto"
};

const Parent = styled("div")(({ theme }) => ({
    width : "72%" , 
    height:'84vh',
    [theme.breakpoints.down('1200')]: {
      width : "65%" ,
    },
    [theme.breakpoints.down('900')]: {
      width : "100%" ,
    },
}));

const Messages = () => {
  const chatMessagesGetResponse = useSelector((state) => state.chatData.chatMessagesGetResponse);
  const chatMessagesSendPages = useSelector((state) => state.chatData.chatMessagesSendPages);
  const [messages, setMessages] = useState([]);
  const [scrollToBot, setMScrollToBot] = useState(true);
  const [singleMessage , setSingleMessage] = useState("");
  const [lastPage, setlastPage] = useState();
  const chatRef = useRef(null);

  const dispatch = useDispatch();
  useEffect(() => {
    if (chatMessagesGetResponse.status==true) {
      setlastPage(chatMessagesGetResponse.data.last_page )
      setMessages(prevItems => [...prevItems, ...chatMessagesGetResponse.data.messages]);

    }
  }, [chatMessagesGetResponse])


  useEffect(() => { 
    getData(1)
   
    const pusher = new Pusher("8071a8e96650bf6eac15", {
      secret: "74f3c62856110435f421",
      cluster: "us3" , 
      forceTLS: true,
      encrypted: true,
    });

    const channel = pusher.subscribe('chat_api');
    channel.bind("VistorMessageSent", (data) => {
      console.log('data');
      console.log(data);
      setMessages(current => [...[data.message], ...current])
    });

    return () => {
    pusher.unsubscribe('chat_api');
    pusher.disconnect();
    };
},[])




const getData=(value)=>{
  dispatch(chatMessagesGet({missionId:'97', page:value})); 
}



const handleSend = () => {
  if (singleMessage!="") {
    const formData = new FormData();
    formData.append("message", singleMessage);
    formData.append("mission_id", '97');
    
    dispatch(chatMessagesSend(formData))
    scrollToBottom();
  }
  setSingleMessage("") ;
}


useEffect(() => {
  if(scrollToBot){
    scrollToBottom();

  }
  
}, [messages]);



const scrollToBottom = () => {
  if (chatRef.current) {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
}}



const handleScroll = () => {
  const chatContainer = chatRef.current;
  if (chatContainer.scrollTop  === 0) {
    console.log(chatMessagesSendPages);
    
    if(lastPage>=chatMessagesSendPages){
 
      getData(chatMessagesSendPages)
      chatContainer.scrollTop=chatContainer.scrollTop+1000
      setMScrollToBot(false)
    }
  }
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
  return (
    <Parent>
      <section style = {{height : "100%"}}>
      <div className= "w-100 " style={{height: "100%" }}>
        <div className="row d-flex justify-content-center w-100 m-0 h-100">
          <div className="col-md-12 col-lg-12 col-xl-12 h-100">
            <div className="card h-100" id="chat2" >
              <div className="card-header d-flex justify-content-between align-items-center p-3">
                <h5 className="mb-0"> الدعم الفني </h5>
                
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
                        <h6 className="mb-2 d-flex flex-row justify-content-end">  {message.adminName} </h6>
                        <div className="d-flex flex-row justify-content-end">
                          <div
                            style = {{maxWidth:"70%"  , wordWrap:"break-word"}}
                          >
                            <p
                              className="small p-2 ms-3 mb-1 rounded-3"
                              style={{ background: "#f5f6f7" }}
                            >
                              <span style={{ fontFamily: "inherit" , fontSize :"inherit" , whiteSpace: "pre-wrap" }}
                                 >
                                  {message.type== "text" ? message.message : 
                                  message.type== "pdf" ? <FileBox src = {message.file} mine={false}/> :
                                  message.type== "image" ? <ImageBox src = {message.file}/> : null }
                                 </span>
                            </p>
                            <p className="small ms-3 mb-3 rounded-3 text-muted d-flex flex-row justify-content-start"
                              style={{ direction : "ltr"}}
                            >
                            {message.created_at}
                            </p>
                          </div>
                         
                        </div>
                      </div>
                    )
                ))}


              </div>
              <div className="card-footer text-muted d-flex justify-content-start align-items-center p-3">
                
                <label className="ms-1 text-muted" htmlFor="fileInput" >
                  <AttachFileOutlinedIcon style={{ fontSize: "30px", color: 'green' , cursor: "pointer"}} />
                </label>
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={handleFileSelect}
                />
                <SendOutlinedIcon
                  onClick={handleSend}
                  style = {{fontSize : "30px" , color : 'red' , cursor: "pointer" , marginLeft : "10px"}}
                />
                <textarea
                  style={{resize: "none" , height : "50px" , width : "100%"}}
                  type="text"
                  multiple 
                  className="form-control form-control-lg"
                  id="exampleFormControlInput1"
                  placeholder="أدخل رسالة "
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
  )
}

export default Messages