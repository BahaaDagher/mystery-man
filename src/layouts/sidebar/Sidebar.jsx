import React, { useState } from 'react'
import SidebarData from './SidebarData'
import styled from '@emotion/styled';
import { Colors, Dimensions } from '../../Theme';
import { Link } from 'react-router-dom';

const SideBarDiv = styled("div")(({ theme }) => ({
  height : "calc(100% - 4px)",
  marginTop : "2px",
  marginLeft : "10px",
  width : Dimensions.sidebarWidth,
  backgroundColor : "#fff",
  borderRadius : "10px",
  textAlign : "center",
  display: 'flex', // Added display: flex
  flexDirection: 'column', // Vertically stack children
  alignItems: 'center', // Center horizontally
  position: 'fixed',
  display: 'flex',
  [theme.breakpoints.down('1200')]: {
    display: 'none',
  },
}));

const LogoContainer = styled("div")(({ theme }) => ({
  textAlign : "center",
  marginTop : "33px",
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
}));
const Li = styled("li")(({ theme , isActive}) => ({
  display : "flex",
  alignItems : "center",
  width: '237px', 
  height: '50px', 
  padding: '13px 20px', 
  borderRadius: '8px',
  
  cursor : "pointer", 
  backgroundColor: isActive ? "#3734CA1A" : "transparent",
  borderColor: isActive ? Colors.main : "transparent", 
  borderWidth: isActive ? '0px 0px 0px 3px' : '0px',
  borderStyle: 'solid',
  "& div": {
    color: isActive ? Colors.main : Colors.gray_input,
  },
  "&:hover": {
    backgroundColor : "#3734CA1A" , 
    borderWidth: '0px 0px 0px 3px', 
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
  marginRight : "20px",
}));

const Title = styled("div")(({ theme }) => ({

}));

const Sidebar = () => {
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
  return (
    <SideBarDiv>
      <LogoContainer>
        <img  src="./images/dashboardLogo.svg" alt = "logo" />
      </LogoContainer>
      <Divider />
      <SidebarItems>
        <Ul>
          {SidebarData.map((item, index) => {
            return (
              <LINK to={item.link} key={index}  >
                <Li
                  
                  isActive={index === activeItem} 
                  onClick={() => handleItemClick(index)}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave} 
                >
                  <IconContainer>
                      <img src={index==activeItem || hoveredItem === index ? item.icon2 : item.icon1} alt={item.title} /> 
                  </IconContainer>
                  <Title >{item.title}</Title>
                </Li>
              </LINK>
            )
          })}
        </Ul>
      </SidebarItems>
    </SideBarDiv>
  )
}

export default Sidebar