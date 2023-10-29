import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { SmallContainer } from '../../../components/SmallContainer';
import { Colors } from '../../../Theme';
import { SubmitButton } from '../../../components/SubmitButton';
import { FlexDiv } from '../../../components/FlexDiv';
import adminImage from "../../../assets/images/admin.png"
import { Rating } from '@mui/material';
import { Flex } from '../../../components/Flex';
import { FlexCenter } from '../../../components/FlexCenter';
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
const ReviewMissionRequest = () => {
  const CurrentMissionEmployees = useSelector(state => state.missionData.CurrentMission.employee) 

  return (
    <>
    <SmallContainer>
    <Place>
        <span>Missions/ </span>
        <span style = {{color : Colors.main}}> Review Requests </span>
    </Place>
    <Parent>
    {CurrentMissionEmployees.map((item , index) => {
      return (
      <Line>
          <PhotoAndName>
              <Section>
                <img src = {adminImage} style = {{width : "65px" , height : "65px" ,   borderRadius : "50%" }} alt = "admin"/>
              </Section>
              <div>
                <p>{CurrentMissionEmployees[0].user.name}</p>
                <Rating name="half-rating" defaultValue={CurrentMissionEmployees[0].user.rate} prec ision={0.5} readOnly style = {{direction : "ltr"}}/>
              </div>
          </PhotoAndName>
          <ButtonDiv>
            <AcceptButton>Accept</AcceptButton>
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