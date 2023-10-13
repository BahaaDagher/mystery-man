
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Colors ,  Dimensions } from '../Theme';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import searchImage from "../assets/images/search.svg"
import notificationImage from "../assets/images/notification.svg"
import chatImage from "../assets/images/chat.svg"
import adminImage from "../assets/images/admin.png"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import "../i18n";
import LanguageIcon from '../components/LanguageIcon';
import { useTranslation } from 'react-i18next';
import { use } from 'i18next';
import { ListItemText, Popover } from '@mui/material';

const NavbarContainer = styled("div")(({ theme }) => ({
  height: '73px',
  width : `calc(100vw - ${Dimensions.sidebarWidth} - 60px )` ,
  backgroundColor: "#fff", 
  borderRadius: '10px', 
  position : "fixed" , 
  display : "flex" ,
  justifyContent : "space-between" ,
  alignItems : "center" ,
  padding : "0px 50px 0 10px" ,
  [theme.breakpoints.down('1200')]: {
    width : `calc(100vw  - 20px )` ,
  },
  
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

const LanguageIconNavbar = styled(LanguageIcon)(({ theme }) => ({
  position : "relative" ,
  
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
  


const Navbar = ({phoneOpen , setPhoneOpen ,  handlePhoneToggle }) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const handleIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const {t } = useTranslation();
  return (
    <NavbarContainer>
      <Slider onClick={()=> { setPhoneOpen(true) ; console.log(phoneOpen) } }>
        <FormatListBulletedIcon/>
      </Slider>
      <Text>
        <Input type= "text" placeholder='search here'/>
        <SearchDiv>
          <img src = {searchImage}/>
        </SearchDiv>
      </Text>
      <InformationDiv>
        <Section>
          <LanguageIconNavbar Navbar= {true} />
        </Section>
        <Section>
          <img src = {notificationImage}/>
        </Section>
        <Section >
          <img src = {chatImage}/>
        </Section>
        <Section >
          <img src = {adminImage} style = {{width : "40px" , height : "40px" ,   borderRadius : "50%" }}/>
        </Section>
        <Section className = "company">
          <p style = {{color: Colors.second , weight : "400"}}>{t("text.company_name")}</p>
          <p style = {{color: Colors.gray , weight : "400"}}>+995 14231512154</p>
        </Section>
      </InformationDiv>

      {/* start phone responsive   */}
      <ExpandMoreIcon onClick={handleIconClick} style = {{cursor : "pointer" , color : Colors.second , display : "flex" , justifyContent :"center" , alignItems : "center" }}/>
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
          <Li button onClick={() => {  handleClose(); }}>
            <ListItemText  primary="English" />
          </Li>
          <Li button onClick={() => {  handleClose(); }}>
            <ListItemText primary="Arabic" />
          </Li>
        </UL>
      </Popover>

      {/* end the phone responsive  */}

    </NavbarContainer>
  )
}

export default Navbar