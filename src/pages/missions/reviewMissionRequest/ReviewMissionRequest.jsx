import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SmallContainer } from '../../../components/SmallContainer';
import { Colors } from '../../../Theme';
import { SubmitButton } from '../../../components/SubmitButton';
import { FlexDiv } from '../../../components/FlexDiv';
import adminImage from "../../../assets/images/admin.png"
import { Rating } from '@mui/material';
import { Flex } from '../../../components/Flex';
import { FlexCenter } from '../../../components/FlexCenter';
import { accepetRequest } from '../../../store/slices/missionSlice';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';
import { FlexSpaceBetween } from '../../../components/FlexSpaceBetween';
const Place = styled("div")(({ theme }) => ({
  marginBottom : "10px" ,
}));

const Parent = styled("div")(({ theme }) => ({
  width : "100%" , 
  borderRadius: '10px',
}));

const Line = styled(FlexSpaceBetween)(({ theme }) => ({
  width : "100%" , 
  borderRadius: '5px',
  padding : "10px", 
  marginBottom : "20px" ,
  backgroundColor : "#fff" , 
  [theme.breakpoints.down('600')]: {
    flexDirection : "column" ,
    // alignItems : "center" ,
  
  }
}));

const PhotoAndName = styled(Flex)(({ theme }) => ({
  // width : "100%" , 
  flexDirection : "row" ,
  justifyContent : "flex-start" ,
  [theme.breakpoints.down('800')]: {
    justifyContent : "center" ,
  },
  [theme.breakpoints.down('600')]: {
    justifyContent : "space-between" ,
  }
}));
const Section = styled("div")(({ theme }) => ({
  display : "flex" ,
  justifyContent : "center" ,
  alignItems : "center" ,
  marginRight : theme.direction == "ltr" ? "20px" : "0px" , 
  marginLeft : theme.direction == "rtl" ? "20px" : "0px" , 
  cursor : "pointer" ,
  "&.company" : {
    flexDirection : "column" ,
    [theme.breakpoints.down('1200')]: {
      display : "none" ,
    },
  },
}));
const ButtonDiv = styled("div")(({ theme }) => ({

  display : "flex"  , 
  justifyContent : "center" ,
  alignItems : "center" ,
}));
const AcceptButton = styled(SubmitButton)(({ theme }) => ({
  backgroundColor : Colors.green ,
  padding : "0px 10px" ,  
  margin : "0" , 
  "&:hover" : {
    backgroundColor : Colors.hoverGreen ,
  
  }

}));

const CategoryDiv = styled(FlexCenter)(({ theme }) => ({
    [theme.breakpoints.down('600')]: {
      margin : "10px 0" ,
    }
}));
const Category = styled(FlexCenter)(({ theme }) => ({
    height : "35px" ,  
    padding : "5px 10px" , 
    color : "#fff" , 
    fontWeight : "bold" ,
    backgroundColor : "#605df9" ,
    borderRadius : "10px" ,
    margin : "0 5px" ,

}));

const ReviewMissionRequest = ({reviewRequestData ,missionId}) => {
  const accepetRequestData = useSelector(state => state.missionData.accepetRequestData) 
  const CurrentMissionEmployees = reviewRequestData.employee

  const dispatch = useDispatch()
  useEffect(()=>{
  
    console.log(accepetRequestData);
    if (accepetRequestData.status) {
          console.log(accepetRequestData);
          Swal.fire(accepetRequestData.message, '', 'success').then((result) => {
            if (result.isConfirmed) {
              window.location.href ="/userDashboard/missions"
            }
          })
    }
  },[accepetRequestData])

  
  const handleAccept = (CurrentMissionEmployee)=>{
    console.log(CurrentMissionEmployee.id);
    Swal.fire({
      title: t("text.are_you_sure_you_want_to_accept_this_visitor"),
      showDenyButton: true,
      confirmButtonText: t("text.Yes"),
      denyButtonText: t("text.No"),
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(accepetRequest({order_id:CurrentMissionEmployee.id , mission_id:missionId}))
      } else if (result.isDenied) {
        Swal.fire(t("text.Changes_are_not_saved"), '', 'info')
      }
    })

  }

  const {t} = useTranslation() ; 
  return (
    <>
    <SmallContainer>
    <Place>
        <span>Missions/ </span>
        <span style = {{color : Colors.main}}>{t("text.Review_Requests")} </span>
    </Place>
    <Parent>
    {CurrentMissionEmployees?.map((item , index) => {
      return (
      <Line>
          <PhotoAndName>
              <Section>
                <img src = {item.user.image} style = {{width : "65px" , height : "65px" ,   borderRadius : "50%" }} alt = "pic"/>
              </Section>
              <div>
                <p>{item.user.name}</p>
                <Rating name="half-rating" defaultValue={item.user.rate} precision={0.5} readOnly style = {{direction : "ltr"}}/>
              </div>
          </PhotoAndName>
          <CategoryDiv>
                  {item.user.categories?.map((item , index) => {
                      return (
                          <Category key = {index}>{item.name}</Category>
                      )
                  })}
            </CategoryDiv>
          <ButtonDiv>
            <AcceptButton onClick={()=>handleAccept(item)}>{t("text.Accept")}</AcceptButton>
          </ButtonDiv>
      </Line> 
      ) 
    }
    )}
      
    </Parent>
    </SmallContainer>
    </>
  )
}

export default ReviewMissionRequest