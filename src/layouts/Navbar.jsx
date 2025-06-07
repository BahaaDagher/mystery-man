
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Colors ,  Dimensions } from '../Theme';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import searchImage from "../assets/images/search.svg"
import notificationImage from "../assets/images/notification.svg"
import chatImage from "../assets/images/chat.svg"
import adminImage from "../assets/images/admin.png"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import "../i18n";
import LanguageIcon from '../components/LanguageIcon';
import { useTranslation } from 'react-i18next';
import { use } from 'i18next';
import { Box, ListItemText, Popover } from '@mui/material';
import { Flex } from '../components/Flex';
import { FlexCenter } from '../components/FlexCenter';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { getProfile } from '../store/slices/profileSlice';
import NotificationIcon from '../components/NotificationIcon';
import Loading from '../components/Loading';
import Pusher from 'pusher-js';

const NavbarContainer = styled("div")(({ theme }) => ({
  height: '73px',
  width : `calc(100vw - ${Dimensions.sidebarWidth} - 60px )` ,
  backgroundColor: "#fff", 
  borderRadius: '10px', 
  position : "fixed" , 
  display : "flex" ,
  justifyContent : "space-between" ,
  alignItems : "center" ,
  padding : "20px" ,
  [theme.breakpoints.down('1200')]: {
    width : `calc(100vw  - 20px )` ,
  },
  [theme.breakpoints.up('1200')]: {
    left : theme.direction =="rtl" ? "20px" : "auto" ,
  },
  [theme.breakpoints.down('500')]: {
    padding : "15px" ,
  },
  direction : theme.direction , 
  zIndex : "20" ,
  
  
}));

const InformationDiv = styled("div")(({ theme }) => ({
  display : "flex" ,
  alignItems : "center" , 
  justifyContent : "center" , 
}));

const Text = styled("div")(({ theme }) => ({
  display : "flex" ,
  justifyContent : "center" ,
  alignItems : "center" ,
  position : "relative" ,
}));

const SearchDiv = styled("div")(({ theme }) => ({
  position : "absolute" ,
  left : "10px" ,
  display : "flex" ,
  justifyContent : "center" ,
  alignItems : "center" ,
}));
const NumChats = styled("span")(({ theme }) => ({
  position : "absolute" ,
  top : "-8px" ,
  right:"-5px",
  background:'red',
  borderRadius:'50%',
  width:'20px',
  height:'20px',
  textAlign:'center',
  color:'white'

}));

const Input = styled("input")(({ theme }) => ({
    width: '450px',
    padding : "10px 20px 10px 40px" , 
    borderRadius: '8px',
    height: '46px',
    border: '1px solid #C8C8C8', 
    outline : "none" ,
    "&:focus" : {
      border : `1px solid ${Colors.main}`, 
    } , 
    [theme.breakpoints.down('950')]: {
      width: '100%',
    },
}));

const Section = styled("div")(({ theme }) => ({
  display : "flex" ,
  justifyContent : "center" ,
  alignItems : "center" ,
  marginRight : theme.direction == "ltr" ? "20px" : "0px" , 
  marginLeft : theme.direction == "rtl" ? "20px" : "0px" ,
  cursor : "pointer" ,
  "&.company" : {
    flexDirection : "column" ,
    [theme.breakpoints.down('1200')]: {
      display : "none" ,
    },
  },
  [theme.breakpoints.down('500')]: {
    marginRight : "15px" , 
  },
}));
const ProfileImage = styled('div')(({ theme }) => ({
  padding: '1px',
  borderRadius: '50%',
  border: `1px solid ${Colors.main}`,
  '&:hover': {
    transition: 'all 0.3s ease',
    border: `1px solid ${Colors.main3}`,
    '& img': {
      opacity: 0.8,
      transition: 'all 0.3s ease',
    }
  },
  width: "40px", 
  height: "40px",  
}));
const ProfileImg = styled('img')(({ theme }) => ({
  width:"100%" , 
  height:"100%" , 
  borderRadius: "50%",
}));

const Slider = styled("div")(({ theme }) => ({
  display : "flex" ,
  justifyContent : "center" ,
  alignItems : "center" ,
  marginLeft : "5px" ,
  cursor : "pointer" ,
  [theme.breakpoints.up('1200')]: {
    display : "none" ,
  },
  
}));

const LanguageIconNavbar = styled(LanguageIcon)(({ theme }) => ({
  position : "relative" ,
  
}));

const Logout = styled(LogoutOutlinedIcon)(({ theme }) => ({
  cursor : "pointer" ,
  
}));
  


const Navbar = ({phoneOpen , setPhoneOpen ,  handlePhoneToggle }) => {

  const {t } = useTranslation();
  
  const dispatch = useDispatch();
  const navigate = useNavigate() ; 

  const logout = () => {
    Swal.fire({
      title:t("text.Are_you_sure_you_want_to_logout") ,
      showCancelButton: true,
      confirmButtonText: t("text.Yes"),
      cancelButtonText: t("text.Cancel")
    }).then((result) => {
      if (result.isConfirmed) {
        // dispatch(userLogout())
        Swal.fire({
          icon: 'success',
          title: t("text.Logout_successfully"),
          showConfirmButton: false,
          timer: 2000
        })
        setTimeout(() => {
          localStorage.removeItem("token")
          navigate("/login")
        }, 2000);
      }
    })
  }
  
  useEffect(()=> {
    dispatch(getProfile())
  },[])
  // profile data 
  const getProfileData = useSelector(state => state.profileData.getProfileData) ;
  const getProfileLoading = useSelector(state => state.profileData.getProfileLoading) ;
  const [ProfileID , setProfileID] = useState(-1);
  const [profileData , setProfileData] = useState ({})
  useEffect(()=>{
    console.log('getProfileData' ,getProfileData);
    if (getProfileData.status) {
   
      setProfileData(getProfileData.data.user)
      setProfileID(getProfileData.data.user.id)
    }
  },[getProfileData])

  const [newBranch , setNewBranch] = useState(false) ; 
  const [currentBranches , setCurrentBranches] = useState ([])
  const [showNotification , setShowNotification] = useState(false) ; 

  const chatPage = () => {
    navigate("/chat")
  }

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
            console.log(data);
            if(! data.message.isMine){

              setShowNotification(true)
            }
       
        });
        channel.bind("supportEvent", (data) => {
          console.log(data.message.user_id ,ProfileID ,! data.message.isMine);
          if( data.message.user_id==ProfileID && ! data.message.isMine){

            console.log('lll',data);
            setShowNotification(true)
          }

            
        
        });
    }, 1000);

    return () => {
    pusher.unsubscribe('chat_api');
    pusher.disconnect();
    };
    },[ProfileID])
  return (
    <>
    {getProfileLoading && <Loading/>}
    <NavbarContainer>
      <Slider onClick={()=> { setPhoneOpen(true) ;  } }>
        <FormatListBulletedIcon/>
      </Slider>
      {/* <Text>
        <Input type= "text" placeholder='search here'/>
        <SearchDiv>
          <img src = {searchImage}/>
        </SearchDiv>
      </Text> */}
      
      <InformationDiv>
        <Section>
          <LanguageIconNavbar Navbar= {true} />
        </Section>
        <Section>
          <NotificationIcon  />
        </Section>
        <Section onClick={chatPage}>
          <div style={{position: 'relative'}}>

             <img src = {chatImage} alt = "chat"/>
             {showNotification ?<NumChats>1</NumChats>:'' }
          </div>
        </Section>
        
      </InformationDiv>
      <FlexCenter>
        <Section className = "company">
          <div style = {{color: Colors.second , weight : "400"}}>{profileData.name}</div>
          <div style = {{color: Colors.gray , weight : "400"}}>{profileData.phone}</div>
        </Section>
        <Section onClick={()=>{window.location = "/profile"}}>
          <ProfileImage className='profile-image'>
            <ProfileImg src={profileData.image} alt="admin" />
          </ProfileImage>
        </Section>
        {/* <Logout onClick={logout}/> */}
      </FlexCenter>

      

    </NavbarContainer>
    </>
  )
}

export default Navbar