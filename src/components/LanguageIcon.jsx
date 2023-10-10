import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Popover } from '@mui/material';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Colors } from '../Theme';
import { ListItemText } from '@mui/material';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';

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

const LanguageIcon = () => {
    const [anchorEl, setAnchorEl] = useState(null);

  const handleIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const theme =  useTheme() ; 
  const {i18n } = useTranslation();

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
    <>
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
    </>
  )
}

export default LanguageIcon