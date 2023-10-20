import styled from '@emotion/styled';
import React, { useState } from 'react'
import { Colors , Dimensions} from '../Theme';
import Sidebar from './sidebar/Sidebar';
import Navbar from './Navbar';
import { Language } from '@mui/icons-material';
import LanguageIcon from '../components/LanguageIcon';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Parent = styled("div")(({ theme }) => ({
  backgroundColor: Colors.body , 
  minHeight : "100vh" ,
  display: 'flex',
}));

const Content = styled("div")(({ theme }) => ({
  width : `calc(100vw - ${Dimensions.sidebarWidth} - 60px )` ,
  position: "relative",
  left : "290px" ,
  zIndex : "1" ,
  [theme.breakpoints.down('1200')]: {
    width : `calc(100vw  - 20px )` ,
    marginLeft : "10px" ,
    left : 0  , 
  },
  [theme.breakpoints.up('1200')]: {
    left : theme.direction =="rtl" ? "20px" : "290px" ,
  },
}));

const MainContent = styled("div")(({ theme }) => ({
  marginTop : "85px" ,
  zIndex : "-1" ,
  borderRadius: '10px', 
  display : "flex" , 
  direction : theme.direction 
}));

const Layout = () => {

  const [phoneOpen, setPhoneOpen] = useState(false)
  const handlePhoneToggle = () => {
    setPhoneOpen(!phoneOpen)
  }
  const {t} = useTranslation() ; 
  return (
    <>
    <Parent>
      <Sidebar phoneOpen = {phoneOpen} setPhoneOpen= {setPhoneOpen} handlePhoneToggle = {handlePhoneToggle}/>
      <Content>
        {t("text.empty")}
        <Navbar  setPhoneOpen= {setPhoneOpen}  />
        <MainContent>
          <Outlet/>
        </MainContent>
      </Content>
    </Parent>
    </>
  )
}

export default Layout