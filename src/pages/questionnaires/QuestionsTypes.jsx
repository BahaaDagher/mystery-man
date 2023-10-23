import styled from '@emotion/styled';
import React, { useState } from 'react'
import { Colors } from '../../Theme';
import { ListItemText, Popover } from '@mui/material';
import singleChoice from  '../../assets/icons/singleChoice.svg'
import multiChoice from  '../../assets/icons/multiChoice.svg'
import yesOrNo from  '../../assets/icons/yesOrNo.svg'
import uploadImages from  '../../assets/icons/uploadImages.svg'
import rating from  '../../assets/icons/rating.svg'
import open from  '../../assets/icons/open.svg'
import headLine from  '../../assets/icons/headLine.svg'



const ListContainer = styled("div")(({ theme }) => ({
    width: "250px",
    padding: "10px 20px",
}));

const Title = styled("div")(({ theme }) => ({
    fontSize: "18px",
    lineHeight: '21px',
    padding: "5px 10px 15px 10px",
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
    color: Colors.main,
    fontWeight: "bold",
    padding: "5px 10px",
    transition: "all 0.3s ease-in-out",
    cursor: "pointer",
    borderRadius: "5px",
    "&:hover": {
    backgroundColor: Colors.bg,
    },
}));
    
const QuestionsTypes = ({anchorEl , setAnchorEl , setChosenType }) => {

  const handleClose = () => {
    setAnchorEl(null);
  };
  const wantedType = (index) => {
    setChosenType(TypesArray[index].name)
        console.log(TypesArray[index].name)
  };

  const TypesArray = [
    {
        name : "SingleChoice" , 
        icon : singleChoice
    },
    {
        name : "multiChoice" , 
        icon : multiChoice
    },
    {
        name : "yesOrNo" , 
        icon : yesOrNo
    },
    {
        name : "rating" , 
        icon : rating
    },
    {
        name : "open" , 
        icon : open
    },
    {
        name : "uploadImages" , 
        icon : uploadImages
    },
    {
        name : "headLine" , 
        icon : headLine
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
      <Title>choose a question type</Title>
        <UL>
        {TypesArray.map((type   , index) =>    
            <Li  onClick={()=> {handleClose() ; wantedType(index) ; }} key = {index}>
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

export default QuestionsTypes