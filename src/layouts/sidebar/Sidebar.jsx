import React, { useState } from 'react'
import SidebarData from './SidebarData'
import styled from '@emotion/styled';
import { Colors, Dimensions } from '../../Theme';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Drawer } from '@mui/material';
import { useTheme } from '@emotion/react';
import BlueLogo from '../../assets/images/BlueLogo.png' ;

const SideBarDiv = styled("div")(({ theme }) => ({
  height : "calc(100% - 10px)",
  margin : "5px 10px",
  width : Dimensions.sidebarWidth,
  backgroundColor : "#fff",
  borderRadius : "10px",
  textAlign : "center",
  display: 'flex', // Added display: flex
  flexDirection: 'column', // Vertically stack children
  alignItems: 'center', // Center horizontally
  position: 'fixed',
  display: 'flex',
  right : theme.direction == "rtl" ? "0" : "auto" ,
  [theme.breakpoints.down('1200')]: {
    display: 'none',
  },
  direction: theme.direction,
}));

const LogoContainer = styled("div")(({ theme }) => ({
  textAlign : "center",
  marginTop : "33px",
  cursor : "pointer",
  width : "150px" , 
}));

const Divider = styled("div")(({ theme }) => ({
  width : "237px",
  height : "1px",
  backgroundColor : Colors.gray_input , 
  margin: '32px auto',
}));

const SidebarItems = styled("div")(({ theme }) => ({

}));
const Ul = styled("ul")(({ theme }) => ({
  padding : "0" , 
}));
const Li = styled("li")(({ theme , isActive}) => ({
  display : "flex",
  alignItems : "center",
  width: '237px', 
  height: '50px', 
  padding: '13px 20px', 
  borderRadius: '8px',
  cursor : "pointer", 
  backgroundColor: isActive ? Colors.light : "transparent",
  borderColor: isActive ? Colors.main : "transparent", 
  borderWidth: isActive ? theme.direction =="ltr" ?  '0px 0px 0px 3px' : '0px 3px 0px 0px' : '0px',
  borderStyle: 'solid',
  fontWeight :"600" , 
  "& div": {
    color: isActive ? Colors.main : Colors.gray_input,
  },
  "&:hover": {
    backgroundColor : Colors.light , 
    borderWidth: theme.direction =="ltr" ?  '0px 0px 0px 3px' : '0px 3px 0px 0px' ,
    borderStyle: 'solid',
    borderColor: Colors.main,
    '& div': {
      color: Colors.main,
    },
  } , 
  
}));
const LINK = styled(Link)(({ theme }) => ({
  display : "flex",
  alignItems : "center",
  textDecoration : "none",
  color : Colors.gray_input, 
  backgroundColor : "#fff",
  marginBottom : "10px",
}));
const IconContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center" , 
  // marginRight : "20px",
}));

const Title = styled("div")(({ theme }) => ({
  margin : theme.direction == "ltr" ? "0 0 0 20px" : "0 20px 0 0" ,
}));

const SideBarDivPhone = styled(Drawer)(({ theme }) => ({
}));

const Sidebar = ( {phoneOpen , setPhoneOpen ,  handlePhoneToggle }) => {
  
  const [activeItem, setActiveItem] = useState(0);

  const handleItemClick = (index) => {
    setActiveItem(index);
  };

  const [hoveredItem, setHoveredItem] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredItem(index);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

 

  const { t } = useTranslation();
  const theme = useTheme() ; 
  const location = useLocation();
  const pathnameSegments = location.pathname.split('/');
  // Extract the first two segments
  const firstTwoSegments = pathnameSegments.slice(0, 3).join('/');
  const  navigate = useNavigate() ;
  
  const handleLogoClick = () => {
    navigate("/userDashboard/home")
  }

  return (
    <>
    <SideBarDiv>
      <LogoContainer onClick={handleLogoClick}>
        <img  src= {BlueLogo} alt = "logo" style = {{width : "100%"}}/>
      </LogoContainer>
      <Divider />
      <SidebarItems>
        <Ul >
          {SidebarData.map((item, index) => {
            return (
              <LINK to={item.link} key={index}  >
                <Li
                  isActive={firstTwoSegments === item.link} 
                  onClick={() => handleItemClick(index) } 
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave} 
                >
                  <IconContainer>
                      {
                        firstTwoSegments === item.link || hoveredItem === index ? item.icon2 : item.icon1
                      }
                  </IconContainer>
                  <Title >{t(`text.${item.title}`)}</Title>   
                </Li>
              </LINK>
            )
          })}
        </Ul>
      </SidebarItems>
    </SideBarDiv>

{/* ///////////////////////////////////////////////////////////////////////////////////////////////////////// */}

    <SideBarDivPhone
      anchor= {theme.direction =="ltr" ? "left" : "right"}
      variant="temporary"
      open={phoneOpen}
      onClose={()=> setPhoneOpen(false)}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        "& .MuiDrawer-paper": {
          height : "calc(100% - 10px)",
          marginTop : "5px",
          margin : "5px",
          width : Dimensions.sidebarWidth,
          backgroundColor : "#fff",
          borderRadius : "10px",
          textAlign : "center",
          display: 'flex', // Added display: flex
          flexDirection: 'column', // Vertically stack children
          alignItems: 'center', // Center horizontally
          direction: theme.direction,
        },
      }}
    >
      <LogoContainer>
        <img  src= {BlueLogo} alt = "logo" style = {{width : "100%"}}/>
      </LogoContainer>
      <Divider />
      <SidebarItems>
        <Ul>
          {SidebarData.map((item, index) => {
            return (
              <LINK to={item.link} key={index}  >
                <Li
                  isActive={firstTwoSegments === item.link} 
                  onClick={() => { handleItemClick(index) ;   setPhoneOpen(false) } }
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <IconContainer>
                    {
                        firstTwoSegments === item.link || hoveredItem === index ? item.icon2 : item.icon1
                      }
                  </IconContainer>
                  <Title >{t(`text.${item.title}`)}</Title>   
                </Li>
              </LINK>
            )
          })}
        </Ul>
      </SidebarItems>
    </SideBarDivPhone>
    </>
  )
}

export default Sidebar