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
const Place = styled("div")(({ theme }) => ({
  marginBottom : "10px" ,
}));

const Parent = styled("div")(({ theme }) => ({
  width : "100%" , 
  borderRadius: '10px',
}));

const Line = styled(FlexCenter)(({ theme }) => ({
  width : "100%" , 
  borderRadius: '10px',
  padding : "20px", 
  marginBottom : "20px" ,
  backgroundColor : "#fff" , 
}));

const PhotoAndName = styled(FlexDiv)(({ theme }) => ({
  width : "100%" , 
  display : "flex" , 
  flexDirection : "row" ,
  justifyContent : "flex-start" ,
  [theme.breakpoints.down('800')]: {
    justifyContent : "center" ,
  },
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
  padding : "10px" ,  
  margin : "0"

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
            
              window.location.href ="/dashboard/missions"
            }
          })
    }

     
  },[accepetRequestData])

  
  const handleAccept = (CurrentMissionEmployee)=>{

    console.log(CurrentMissionEmployee.id);
    dispatch(accepetRequest({order_id:CurrentMissionEmployee.id , mission_id:missionId}))

  }

  return (
    <>
    <SmallContainer>
    <Place>
        <span>Missions/ </span>
        <span style = {{color : Colors.main}}> Review Requests </span>
    </Place>
    <Parent>
    {CurrentMissionEmployees?.map((item , index) => {
      return (
      <Line>
          <PhotoAndName>
              <Section>
                <img src = {adminImage} style = {{width : "65px" , height : "65px" ,   borderRadius : "50%" }} alt = "admin"/>
              </Section>
              <div>
                <p>{item.user.name}</p>
                <Rating name="half-rating" defaultValue={item.user.rate} prec ision={0.5} readOnly style = {{direction : "ltr"}}/>
              </div>
          </PhotoAndName>
          <ButtonDiv>
            <AcceptButton onClick={()=>handleAccept(item)}>Accept</AcceptButton>
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