import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Popover } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Colors } from '../Theme';
import { ListItemText } from '@mui/material';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { ToggleDirection, ToggleLanguage } from '../store/slices/directionSlice';
import { use } from 'i18next';

const Container = styled("div")(({ theme }) => ({
}));
const UL = styled("ul")(({ theme }) => ({
  margin: 0,
    padding: "5px 10px",
    width: "250px",
  }));
  const Li = styled("li")(({ theme }) => ({
    listStyle: "none",
    color: Colors.main,
    fontWeight: "bold",
    padding: "5px 10px",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: Colors.lightMain,
      borderRadius: "5px",
    },
  }));
  
const LanguageIcon = ({Navbar}) => {

  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const theme =  useTheme() ; 
  const {i18n } = useTranslation();

  const directionData = useSelector((state) => state.directionData.direction);
  const dispatch = useDispatch() ; 

  useEffect(() => {
    console.log("directionData: ", directionData);
  },[directionData])
  
  const arabicDirection  = ()=> {
    localStorage.setItem("language", "ar")
    window.location.reload();
  }
  const englishDirection  = ()=> {
    localStorage.setItem("language", "en")
    window.location.reload();
  }
  
  const navStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "5",  
  }
  const otherStyle = {
    position: "absolute",
    right:"5px" ,
    top: 0 , 
    zIndex: "5",  
  }



  return (
    
    <>
    <Container style = { Navbar ? navStyle : otherStyle} >
      <LanguageOutlinedIcon onClick={handleIconClick} style = {{cursor : "pointer" , color : Colors.second}}/>
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
    </Container>
    </>
  )
}

export default LanguageIcon