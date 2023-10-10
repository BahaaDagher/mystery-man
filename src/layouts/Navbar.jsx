
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Colors ,  Dimensions } from '../Theme';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';


import "../i18n";
import { Lan } from '@mui/icons-material';
import LanguageIcon from '../components/LanguageIcon';
import { useTranslation } from 'react-i18next';

const NavbarContainer = styled("div")(({ theme }) => ({
  height: '73px',
  width : `calc(100vw - ${Dimensions.sidebarWidth} - 60px )` ,
  backgroundColor: "#fff", 
  borderRadius: '10px', 
  position : "fixed" , 
  display : "flex" ,
  justifyContent : "space-between" ,
  alignContent : "center" ,
  padding : "0px 50px 0 10px" ,
  [theme.breakpoints.down('1200')]: {
    width : `calc(100vw  - 20px )` ,
  },
}));

const InformationDiv = styled("div")(({ theme }) => ({
  display : "flex" ,
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
    height: '46px',
    padding : "10px 20px 10px 40px" , 
    borderRadius: '8px',
    border: '1px solid #C8C8C8', 
    outline : "none" ,
    "&:focus" : {
      border : `1px solid ${Colors.main}`, 
    }
}));

const Section = styled("div")(({ theme }) => ({
  display : "flex" ,
  justifyContent : "center" ,
  alignItems : "center" ,
  marginRight : "20px" , 
  cursor : "pointer" ,
  "&.company" : {
    flexDirection : "column" ,
  },
}));

const Slider = styled("div")(({ theme }) => ({
  display : "flex" ,
  justifyContent : "center" ,
  alignItems : "center" ,
  marginLeft : "10px" ,
  cursor : "pointer" ,
  [theme.breakpoints.up('1200')]: {
    display : "none" ,
  },
  
}));




const Navbar = () => {
  const {t } = useTranslation();
  return (
    <NavbarContainer>
      <Slider>
        <FormatListBulletedIcon/>
      </Slider>
      <Text>
        <Input type= "text" placeholder='search here'/>
        <SearchDiv>
          <img src = "./images/search.svg"/>
        </SearchDiv>
      </Text>
      <InformationDiv>
        <Section>
          <LanguageIcon/>
        </Section>
        <Section>
          <img src = "./images/notification.svg"/>
        </Section>
        <Section >
          <img src = "./images/chat.svg"/>
        </Section>
        <Section >
          <img src = "./images/admin.png" style = {{width : "40px" , height : "40px" ,   borderRadius : "50%" }}/>
        </Section>
        <Section className = "company">
          <p style = {{color: Colors.second , weight : "400"}}>{t("text.company_name")}</p>
          <p style = {{color: Colors.gray , weight : "400"}}>+995 14231512154</p>
        </Section>
      </InformationDiv>
    </NavbarContainer>
  )
}

export default Navbar