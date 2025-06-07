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
import BlueLogo from '../assets/images/BlueLogo.png' ;
import NotificationIcon from './NotificationIcon';
import Loading from './Loading';
import { useTranslation } from 'react-i18next';

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
    width : "100px" ,
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
const NavbarContainer = () => {
    const {t} = useTranslation() ; 
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
    const chatPage = () => {
        navigate("/chat")
    }
  return (
    <>
    {getProfileLoading && <Loading/>}
    <Parent>
        <Logo to = "/userDashboard/home">
            <Img src = {BlueLogo}  />
        </Logo>
        <InformationDiv>
            <Section>
                <LanguageIconNavbar Navbar={true} />
            </Section>
            <Section>
              <NotificationIcon />
            </Section>
            <Section onClick={chatPage}>
                <img src = {chatImage} alt = "chat"/>
            </Section>
            <Section className = "company">
                <div style = {{color: Colors.second , weight : "400"}}>{profileData.name}</div>
                <div style = {{color: Colors.gray , weight : "400"}}>{profileData.phone}</div>
            </Section>
            <Section onClick={()=>{window.location = "/profile"}}>
              <ProfileImage className='profile-image'>
                <ProfileImg src={profileData.image} alt="admin" />
              </ProfileImage>
            </Section>
            <Logout onClick={logout}/>
        </InformationDiv>
    </Parent>
    </>
  )
}

export default NavbarContainer