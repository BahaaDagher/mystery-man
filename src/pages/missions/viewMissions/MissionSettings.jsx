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
import { useTranslation } from 'react-i18next';


const ListContainer = styled("div")(({ theme }) => ({
    width: "200px",
    padding: "10px",
    fontFamily: "Cairo",
}));


const Img = styled("img")(({ theme }) => ({
    marginRight: "10px"  , 
}));
const UL = styled("ul")(({ theme }) => ({
    margin: 0,
}));
const Li = styled("li")(({ theme }) => ({
  fontFamily: "Cairo",
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
const Span = styled("span")(({ theme }) => ({
  fontWeight: "normal",
}));
    
    
const MissionSettings = ({anchorEl , setAnchorEl , setChosenSetting , selectMissions}) => {

  const handleClose = () => {
    setAnchorEl(null);
  };
  const wantedSetting = (index) => {
    setChosenSetting(TypesArray[index].name)
  };

  const {t} = useTranslation() ; 
  const TypesArray = [
    {
        name : "MysteryProfile" , 
        name2 : t("text.MysteryProfile") , 
        icon : MysteryProfile
    },
    {
        name : "MissionDetails" , 
        name2 : t("text.MissionDetails")  , 
        icon : MissionDetails
    },
    {
      name : "Delete" ,
      name2 : t("text.Delete")  , 
      icon : Cancel , 
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
            {
              
              if (type.name != "Cancel") {

                if (type.name == "MysteryProfile" &&  selectMissions != 0 && selectMissions != 1  ) {
                  
                  return (
                    <Li  onClick={()=> {handleClose() ; wantedSetting(index) ; }} key = {index}>
                        <Img src = {type.icon} alt />
                        <Span> {type.name2} </Span>
                    </Li>
                  )
                }
                else if (type.name == "MysteryProfile" && ( selectMissions == 0 || selectMissions == 1 ) ) {
                  return (

                    null 
                  )
                }
                else {
                  return (
                    <Li  onClick={()=> {handleClose() ; wantedSetting(index) ; }} key = {index}>
                        <Img src = {type.icon} alt />
                        <Span > {type.name2} </Span>
                    </Li>
                  )
                }
              }
              else  {
                if (selectMissions == 0 || selectMissions == 1 ) {
                  return (
                    <Li  onClick={()=> {handleClose() ; wantedSetting(index) ; }} key = {index}>
                        <Img src = {type.icon} alt />
                        <Span> {type.name2} </Span>
                    </Li>
                  ) 
                }
              } 
            }
        )}
        </UL>
      </ListContainer>
    </Popover>
    </>
  )
}

export default MissionSettings