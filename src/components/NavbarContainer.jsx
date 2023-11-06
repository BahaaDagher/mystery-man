import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ProfileData, getProfile } from '../store/slices/profileSlice';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import LanguageIcon from './LanguageIcon';
import { LINK } from './LINK';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Colors } from '../Theme';
import profileLogo from "../assets/images/profileLogo.svg"
import notificationImage from "../assets/images/notification.svg"
import chatImage from "../assets/images/chat.svg"

const Parent = styled("div")(({ theme }) => ({
    height: '73px',
    width : `calc(100% - 10px )` ,
    margin : "0 5px" ,
    backgroundColor: "#fff", 
    borderRadius: '10px', 
    position : "fixed" , 
    top : "0" ,
    left : "0" ,
    display : "flex" ,
    justifyContent : "space-between" ,
    alignItems : "center" ,
    padding : "20px" ,
    direction : theme.direction , 
    zIndex : "5" ,
    [theme.breakpoints.down('500')]: {
      padding : "10px"
    },
    
  }));
  const InformationDiv = styled("div")(({ theme }) => ({
    display : "flex" ,
    alignItems : "center" , 
    justifyContent : "center" , 
  }));
  
  const Section = styled("div")(({ theme }) => ({
    display : "flex" ,
    justifyContent : "center" ,
    alignItems : "center" ,
    marginRight : theme.direction == "ltr" ? "20px" : "0px" , 
    marginLeft : theme.direction == "rtl" ? "20px" : "0px" , 
    cursor : "pointer" ,
    "&.company" : {
      cursor : "default" ,
      flexDirection : "column" ,
      [theme.breakpoints.down('1200')]: {
        display : "none" ,
      },
    },
  }));
  
  const LanguageIconNavbar = styled(LanguageIcon)(({ theme }) => ({
    position : "relative" ,
  }));
  
  const Logo = styled(LINK)(({ theme }) => ({
     display : "flex" ,
      alignItems : "center" ,
      justifyContent : "center" ,
  }));
  const Img = styled("img")(({ theme }) => ({
    marginRight :theme.direction == "ltr"?   "10px" : "0px" ,
    marginLeft :theme.direction == "rtl"?   "10px" : "0px" ,
    [theme.breakpoints.down('500')]: {
      width :"100px"
    },
  }));
  const Logout = styled(LogoutOutlinedIcon)(({ theme }) => ({
    cursor : "pointer" ,
  }));

  const Content = styled("div")(({ theme }) => ({
    width : `calc(100% - 20px )` ,
    overflow : "auto" ,
    margin : " 20px 10px" ,
    marginTop : "90px" ,
    display : "flex" ,
    border : "1px solid red" , 
    justifyContent : "space-between" ,
    direction : theme.direction , 
    [theme.breakpoints.down('800')]: {
      justifyContent : "center" ,
      flexDirection : "column" ,
    },
  }));

const NavbarContainer = () => {

    const getProfileData = useSelector(state => state.profileData.getProfileData) ;
    const getProfileLoading = useSelector(state => state.profileData.getProfileLoading) ;

  const dispatch = useDispatch()
    useEffect(()=>{
      if (getProfileData.status) {
        console.log("getProfileData" , getProfileData.data)
        setProfileData(getProfileData.data.user)
        dispatch(ProfileData(getProfileData.data.user))
      }
    },[getProfileData])

    useEffect(()=>{
        dispatch(getProfile())
    },[])

    const [profileData, setProfileData] = useState({});
    const navigate = useNavigate()
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
    const chatPage = () => {
        navigate("/chat")
    }
  return (
    <Parent>
        <Logo to = "/dashboard">
            <Img src = {profileLogo} />
        </Logo>
        <InformationDiv>
            <Section>
                <LanguageIconNavbar Navbar={true} />
            </Section>
            <Section>
                <img src = {notificationImage} alt = "notification"/>
            </Section>
            <Section onClick={chatPage}>
                <img src = {chatImage} alt = "chat"/>
            </Section>
            <Section onClick={()=>{window.location = "/profile"}}>
                <img src = {profileData.image} style = {{width : "40px" , height : "40px" ,   borderRadius : "50%" }} alt = "admin"/>
            </Section>
            <Section className = "company">
                <div style = {{color: Colors.second , weight : "400"}}>{profileData.name}</div>
                <div style = {{color: Colors.gray , weight : "400"}}>{profileData.phone}</div>
            </Section>
            <Logout onClick={logout}/>
        </InformationDiv>
        </Parent>
  )
}

export default NavbarContainer