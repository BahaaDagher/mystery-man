import styled from '@emotion/styled';
import React, { useState } from 'react'
import { Colors } from '../../../Theme';
import { ListItemText, Popover } from '@mui/material';
import singleChoice from  '../../../assets/icons/singleChoice.svg'
import multiChoice from  '../../../assets/icons/multiChoice.svg'
import yesOrNo from  '../../../assets/icons/yesOrNo.svg'
import uploadImages from  '../../../assets/icons/uploadImages.svg'
import rating from  '../../../assets/icons/rating.svg'
import open from  '../../../assets/icons/open.svg'
import headLine from  '../../../assets/icons/headLine.svg'

import MysteryProfile from '../../../assets/icons/MysteryProfile.svg'
import MissionDetails from '../../../assets/icons/MissionDetails.svg'
import Edite from '../../../assets/icons/Edite.svg'
import Cancel from '../../../assets/icons/Cancel.svg'


const ListContainer = styled("div")(({ theme }) => ({
    width: "200px",
    padding: "10px",
}));


const Img = styled("img")(({ theme }) => ({
    marginRight: theme.direction == "ltr" ? "10px" : "0",
    marginLeft: theme.direction == "rtl" ? "10px" : "0",
}));
const UL = styled("ul")(({ theme }) => ({
    margin: 0,
}));
const Li = styled("li")(({ theme }) => ({
    display: "flex",
    listStyle: "none",
    color: Colors.second,
    fontWeight: "bold",
    padding: "5px 10px",
    transition: "all 0.3s ease-in-out",
    cursor: "pointer",
    borderRadius: "5px",
    "&:hover": {
    backgroundColor: Colors.bg,
    },
}));
    
const MissionSettings = ({anchorEl , setAnchorEl , setChosenSetting }) => {

  const handleClose = () => {
    setAnchorEl(null);
  };
  const wantedSetting = (index) => {
    setChosenSetting(TypesArray[index].name)
  };

  const TypesArray = [
    {
        name : "MysteryProfile" , 
        icon : MysteryProfile
    },
    {
        name : "MissionDetails" , 
        icon : MissionDetails
    },
    {
        name : "Edite" , 
        icon : Edite
    },
    {
        name : "Cancel" , 
        icon : Cancel
    },
   
  ]
  return (
    <>
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
      <ListContainer>
        <UL>
        {TypesArray.map((type   , index) =>    
            <Li  onClick={()=> {handleClose() ; wantedSetting(index) ; }} key = {index}>
                <Img src = {type.icon} alt />
                <ListItemText  primary={type.name} />
            </Li>
        )}
        </UL>
      </ListContainer>
    </Popover>
    </>
  )
}

export default MissionSettings