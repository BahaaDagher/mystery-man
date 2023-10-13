import styled from '@emotion/styled';
import React, { useState } from 'react'
import { Colors } from '../../Theme';
import { H1 } from '../../components/H1';
import { SubmitButton } from '../../components/SubmitButton';
import LanguageIcon from '../../components/LanguageIcon';
import { Container } from '../../components/Container';
import { useTranslation } from 'react-i18next';
import logo2 from "../../assets/images/logo2.svg"
const ParentContainer = styled(Container)(({ theme }) => ({
  [theme.breakpoints.down("1000")]: {
    flexDirection : "column-reverse" ,
},
}));

const IMG = styled("img")(({ theme }) => ({
  [theme.breakpoints.down("1000")]: {
    width : "250px" ,
  },
}));

const PhoneDiv = styled("div")(({ theme }) => ({
  padding : "20px" , 
}));
const Title = styled("p")(({ theme }) => ({
  fontFamily: 'Cairo',
  fontSize: '24px',
  fontWeight: 500,
  lineHeight: '45px',
  letterSpacing: '0em',
  color: Colors.second,
  paddingBottom : "20px" ,
}));
const Paragraph = styled("p")(({ theme }) => ({
  fontFamily: 'Cairo',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '22px',
    letterSpacing: '0em',
    textAlign: 'left',
    color : Colors.gray_l ,
    paddingBottom : "20px" ,
}));
const Div = styled("div")(({ theme }) => ({
  width: '100%', 
}));
const H3 = styled("h3")(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '30px',
  letterSpacing: '0em',
  color: Colors.second,
}));
const Input = styled("input")(({ theme }) => ({
  width: '100%', 
  height: 'fit-content', 
  padding: '15px 16px', 
  borderRadius: '10px',
  gap: '10px',
  '&::placeholder': {
      color: Colors.input, 
  },
  '&:focus': {
      outline: 'none', 
  } ,
  border : "none" 
}));

const EnterPhone = () => {
  const [phone , setPhone] = useState("") ;
  const {t} =  useTranslation() ; 

  const handleSubmit = () => {
    if (phone) {
      window.location = "/verify-phone" ;
    }
    console.log("phone: ", phone);
  }
  const handleChange = (e)=>{
    if (/[a-zA-Z]/.test(e.target.value)) return false 
    setPhone(e.target.value)
  }
  return (
    <>
      <LanguageIcon/>
      <ParentContainer>
        <PhoneDiv >
          <Title>{t("text.Enter_your_phone_number")}</Title>
          <Paragraph>{t("text.We_need_your_phone_number_to_create_an_account_and_log_in_with_later")}</Paragraph>
          <Div>
              <H3>{t("text.Phone_Number")} </H3>
              <Input type="text" placeholder='+02 | ' value = {phone} onChange={(e)=>handleChange(e)}/>
          </Div>
          <SubmitButton onClick={handleSubmit} >{t("text.confirm")}</SubmitButton>
        </PhoneDiv>
        <IMG src = {logo2}/>
      </ParentContainer>
    </>
  )
}

export default EnterPhone