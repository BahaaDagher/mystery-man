import styled from "@emotion/styled";
import {Container} from "../../components/Container"
import {SubmitButton} from "../../components/SubmitButton"
import React from 'react'
import { Colors } from "../../Theme";
import LanguageIcon from "../../components/LanguageIcon";
import { useTranslation } from "react-i18next";
import { useTheme } from "@emotion/react";
import { Link } from "react-router-dom";
import  review from "../../assets/icons/review.svg"
import Vector from  "../../assets/icons/Vector.svg"
const ViewSiteButton = styled(SubmitButton)(({ theme }) => ({
  width: '200px',
  height: '57px',
  padding: '10px',
}));
const H2Styles = styled("h2")(({ theme }) => ({
  fontSize: '32px',
  fontWeight: 500,
  lineHeight: '60px',
  letterSpacing: '0em',
  color : Colors.olive , 
  padding : "10px" , 
}));

const H3Styles = styled("h3")(({ theme }) => ({
  fontSize: '24px',
  fontWeight: 500,
  lineHeight: '45px',
  letterSpacing: '0em',
  color : Colors.gray , 
  padding : "10px" , 
}));

const Review = () => {


  const {t}= useTranslation();
  const theme = useTheme()  ; 
  const handleSubmit = ()=>{
    window.location.href = "/userDashboard" ;
  }
  return (
    <>
      <LanguageIcon className= "notNavbar"/>
      <Container style={{justifyContent : "center" , flexDirection :"column" , textAlign : "center" , backgroundColor : "#fff"}}>
          <H2Styles >{t("text.The_application_is_currently_being_reviewed")}</H2Styles>
          <H3Styles >{t("text.We_will_contact_you_to_verify_the_data_and_some_other_information")}</H3Styles>
          <img src = {review}/>
          <Link >
            <ViewSiteButton onClick = {handleSubmit}>  
              {/* condition to change the direction of the text based on the theme.direction */}
              { theme.direction == "ltr" ? t("text.Visit_Site") : ""}
                <img src = {Vector} style = {{width : "8px" , margin : "10px"}}/>
              { theme.direction == "rtl" ? t("text.Visit_Site") : ""}
            </ViewSiteButton>
          </Link>
      </Container>
    </>
  )
}

export default Review