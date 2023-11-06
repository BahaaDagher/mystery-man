
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
  zIndex : "5" ,
  
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
  marginRight : "20px" , 
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

  
  
  const dispatch = useDispatch();
  const navigate = useNavigate() ; 

  const logout = () => {
    Swal.fire({
      title: "Are you sure you want to logout?",
      showCancelButton: true,
      confirmButtonText: `Yes`,
    }).then((result) => {
      if (result.isConfirmed) {
        // dispatch(userLogout())
        Swal.fire({
          icon: 'success',
          title: 'logout successfully',
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
  const [profileData , setProfileData] = useState ({})
  useEffect(()=>{
    if (getProfileData.status) {
      console.log("getProfileData" , getProfileData.data)
      setProfileData(getProfileData.data.user)
    }
  },[getProfileData])

  const [newBranch , setNewBranch] = useState(false) ; 
  const [currentBranches , setCurrentBranches] = useState ([])

  const chatPage = () => {
    navigate("/chat")
  }
  
  const {t } = useTranslation();
  return (
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
          <img src = {notificationImage} alt = "notification"/>
        </Section>
        <Section onClick={chatPage}>
          <img src = {chatImage} alt = "chat"/>
        </Section>
        
      </InformationDiv>
      <FlexCenter>
        <Section onClick={()=>{window.location = "/profile"}}>
          <img src = {profileData.image} style = {{width : "40px" , height : "40px" ,   borderRadius : "50%" }} alt = "admin"/>
        </Section>
        <Section className = "company">
          <p style = {{color: Colors.second , weight : "400"}}>{profileData.name}</p>
          <p style = {{color: Colors.gray , weight : "400"}}>{profileData.phone}</p>
        </Section>
        <Logout onClick={logout}/>
      </FlexCenter>

      

    </NavbarContainer>
  )
}

export default Navbar