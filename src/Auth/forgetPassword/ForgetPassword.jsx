import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react'
import { Colors } from '../../Theme';
import { H1 } from '../../components/H1';
import { SubmitButton } from '../../components/SubmitButton';
import LanguageIcon from '../../components/LanguageIcon';
import { Container } from '../../components/Container';
import { useTranslation } from 'react-i18next';
import logo2 from "../../assets/images/logo2.svg"
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassword } from '../../store/slices/authSlice';
import Swal from 'sweetalert2';
import Loading from '../../components/Loading';
import { useNavigate } from 'react-router-dom';
const ParentContainer = styled(Container)(({ theme }) => ({
  direction : theme.direction ,
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
  direction : theme.direction ,
}));
const Title = styled("p")(({ theme }) => ({
  fontFamily: 'Cairo',
  fontSize: '24px',
  fontWeight: 500,
  lineHeight: '45px',
  letterSpacing: '0em',
  color: Colors.second,
}));
const Paragraph = styled("div")(({ theme }) => ({
  direction : theme.direction ,
  fontFamily: 'Cairo',
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '22px',
  letterSpacing: '0em',
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

const ForgetPassword = () => {
  
  const [email , setEmail] = useState("") ;
  const [clicked , setClicked] = useState(false) ;
  const {t} =  useTranslation() ; 
  const dispatch = useDispatch() ;

  // start submit
  const handleSubmit = () => {
    if (email) {
      setClicked(true) ;
      dispatch(forgetPassword({email : email}))
    }
    else {
      Swal.fire({
        icon: 'error',
        text: t("text.Please_enter_your_email"),
      })
    }
  }
  
  const forgetPasswordData = useSelector(state => state.authData.forgetPasswordData) ; 
  const forgetPasswordDataLoading = useSelector((state) => state.authData.forgetPasswordDataLoading);
  const navigate = useNavigate() ; 
  useEffect(() => {
    console.log ("forgetPasswordData", forgetPasswordData)
    if (clicked) {
      if (forgetPasswordData.status) {
        sessionStorage.setItem("email" , email)
        Swal.fire({
          icon: 'success',
          text: forgetPasswordData.message,
          showConfirmButton: false,
          timer: 3000
        })
        setTimeout(() => {
          navigate("/forgetPassword/OtpPassword")
        }
        , 3000)
      }
      else {
        Swal.fire({
          icon: 'error',
          text: forgetPasswordData.message,
        })
      }
    }
  } , [forgetPasswordData])
  // end submit


  const handleChange = (e)=>{
    setEmail(e.target.value)
  }
  return (
    <>
    {forgetPasswordDataLoading ? <Loading/> : null}
      <LanguageIcon/>
      <ParentContainer>
        <PhoneDiv >
          <Title>{t("text.Enter_your_email")} </Title>
          <Paragraph>{t("text.Please_enter_your_email_address_to_search_for_your_account")}</Paragraph>
          <Div>
              <H3>{t("text.email")} </H3>
              <Input type="text" placeholder='' value = {email} onChange={(e)=>handleChange(e)}/>
          </Div>
          <SubmitButton onClick={handleSubmit} >{t("text.confirm")}</SubmitButton>
        </PhoneDiv>
        <IMG src = {logo2}/>
      </ParentContainer>
    </>
  )
}

export default ForgetPassword