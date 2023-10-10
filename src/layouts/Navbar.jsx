
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Colors ,  Dimensions } from '../Theme';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useDispatch, useSelector } from 'react-redux';
import { ToggleDirection } from '../store/slices/directionSlice';
import { useTheme } from '@emotion/react';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import { ListItemText, Popover } from '@mui/material';
import "../i18n";
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
  backgroundColor : theme.direction === "rtl" ? Colors.lightMain : "#f443361a" ,
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

const UL = styled("ul")(({ theme }) => ({
  margin: 0,
  padding: "5px 10px",
  width: "250px",
}));
const Li = styled("li")(({ theme }) => ({
  listStyle: "none",
  color: Colors.main[1],
  fontWeight: "bold",
  padding: "5px 10px",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    cursor: "pointer",
    backgroundColor: Colors.lightMain,
    borderRadius: "5px",
  },
}));


const Navbar = () => {

  const [anchorEl, setAnchorEl] = useState(null);

  const handleIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const theme =  useTheme() ; 
  const { t, i18n } = useTranslation();

  const arabicDirection  = ()=> {
    theme.direction = "rtl" ;
    i18n.changeLanguage("ar");
    console.log("theme.direction arabic" , theme.direction)
  }
  const englishDirection  = ()=> {
    theme.direction = "ltr" ;
    i18n.changeLanguage("en");
    console.log("theme.direction english " , theme.direction)
  }
  
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
          <LanguageOutlinedIcon onClick={handleIconClick} />
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <UL>
              <Li button onClick={() => { englishDirection(); handleClose(); }}>
                <ListItemText  primary="English" />
              </Li>
              <Li button onClick={() => { arabicDirection(); handleClose(); }}>
                <ListItemText primary="Arabic" />
              </Li>
            </UL>
          </Popover>
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