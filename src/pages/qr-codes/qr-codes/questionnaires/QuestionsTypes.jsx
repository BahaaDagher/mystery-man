import styled from '@emotion/styled';
import React, { useState } from 'react'
import { Colors } from '../../../../Theme';
import { ListItemText, Popover } from '@mui/material';
import singleChoice from  '../../../../assets/icons/singleChoice.svg'
import multiChoice from  '../../../../assets/icons/multiChoice.svg'
import yesOrNo from  '../../../../assets/icons/yesOrNo.svg'
import uploadImages from  '../../../../assets/icons/uploadImages.svg'
import rating from  '../../../../assets/icons/rating.svg'
import open from  '../../../../assets/icons/open.svg'
import headLine from  '../../../../assets/icons/headLine.svg'
import { useDispatch } from 'react-redux';
import { setQuestionsInStep } from '../../../../store/slices/questionierSlice';
import { useTranslation } from 'react-i18next';



const ListContainer = styled("div")(({ theme }) => ({
    width: "250px",
    padding: "10px 20px",
}));

const Title = styled("div")(({ theme }) => ({
    fontSize: "20px",
    lineHeight: '21px',
    padding: "5px 10px 15px 10px",
    direction : theme.direction ,
}));
const Img = styled("img")(({ theme }) => ({
    width : "20px" ,
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
    direction: theme.direction,
}));
const Span = styled("span")(({ theme }) => ({
  fontWeight: "normal",
  fontSize :"16px" , 
}));
    
const QuestionsTypes = ({anchorEl , setAnchorEl , setChosenType }) => {
  const dispatch = useDispatch() ; 
  const handleClose = () => {
    setAnchorEl(null);
  };
  const wantedType = (index) => {
    setChosenType(TypesArray[index].name)
    
    dispatch(setQuestionsInStep(TypesArray[index].name))
  };
  const {t} = useTranslation() ; 

  const TypesArray = [
    {
        name : "SingleChoice" , 
        name2 : t("text.SingleChoice") , 
        icon : singleChoice
    },
    {
        name : "multiChoice" , 
        name2 : t("text.multiChoice") , 
        icon : multiChoice
    },
    {
        name : "yesOrNo" , 
        name2 : t("text.yesOrNo") , 
        icon : yesOrNo
    },
    {
        name : "rating" , 
        name2 : t("text.rating") , 
        icon : rating
    },
    {
        name : "open" , 
        name2 :t("text.open")  , 
        icon : open
    },
    {
        name : "uploadImages" , 
        name2 : t("text.uploadImages") , 
        icon : uploadImages
    },
    {
        name : "headLine" , 
        name2 : t("text.headLine") , 
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
      <Title>{t("text.chooseAQuestionType")}</Title>
        <UL>
        {TypesArray.map((type   , index) => 
            <Li  onClick={()=> {handleClose() ; wantedType(index) ; }} key = {index}>
                <Img src = {type.icon} alt />
                <Span > {type.name2} </Span>
            </Li>
        )}
        </UL>
      </ListContainer>
    </Popover>
    </>
  )
}

export default QuestionsTypes