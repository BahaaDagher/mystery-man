import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react'
import { Colors } from '../../Theme';
import { H1 } from '../../components/H1';
import { SubmitButton } from '../../components/SubmitButton';
import LanguageIcon from '../../components/LanguageIcon';
import { Container } from '../../components/Container';
import { useTranslation } from 'react-i18next';
import logo2 from "../../assets/images/BlueLogo.png"
import { useDispatch, useSelector } from 'react-redux';
import { changePassword, forgetPassword } from '../../store/slices/authSlice';
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
    width : "300px" ,
  },
}));

const PhoneDiv = styled("div")(({ theme }) => ({
  padding : "20px" , 
  direction : theme.direction ,
}));
const Title = styled("p")(({ theme }) => ({
  fontSize: '24px',
  fontWeight: 500,
  lineHeight: '45px',
  letterSpacing: '0em',
  color: Colors.second,
}));
const Paragraph = styled("div")(({ theme }) => ({
  direction : theme.direction ,
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '22px',
  letterSpacing: '0em',
  color : Colors.gray_l ,
  paddingBottom : "20px" ,
}));
const Div = styled("div")(({ theme }) => ({
  width: '100%', 
  marginBottom : "10px" ,
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
  border : `1px solid ${Colors.gold}`  , 
}));

const ChangePassword = () => {
  
  const [password , setPassword] = useState("") ;
  const [confirmation , setConfirmation] = useState("") ;
  const [clicked , setClicked] = useState(false) ;
  const [email , setEmail] = useState(sessionStorage.getItem("email")) ;
  const {t} =  useTranslation() ; 
  const dispatch = useDispatch() ;

  // start submit
  const handleSubmit = () => {
    if (password === "" || confirmation === "") {
      Swal.fire({
        icon: 'error',
        text: t("text.please_fill_all_fields"),
      })
    }
    else if (password !== confirmation) {
      Swal.fire({
        icon: 'error',
        text: t("text.password_and_confirmation_are_not_identical"),
      })
    }
    else if (password === confirmation) {
      setClicked(true) ;
      dispatch(changePassword({email :email , password : password }))
    }
    else {
     
  }
}
  const changePasswordData = useSelector(state => state.authData.changePasswordData) ; 
  const changePasswordDataLoading = useSelector((state) => state.authData.changePasswordDataLoading);
  const navigate = useNavigate() ; 
  useEffect(() => {
    console.log ("forgetPasswordData", changePasswordData)
    if (clicked) {
      if (changePasswordData.status) {
        sessionStorage.removeItem("email")
        localStorage.removeItem("token")
        Swal.fire({
          icon: 'success',
          text: changePasswordData.message,
          showConfirmButton: false,
          timer: 3000
        })
        setTimeout(() => {
          navigate("/login")
        }
        , 3000)
      }
      else {
        Swal.fire({
          icon: 'error',
          text: changePasswordData.message,
        })
      }
    }
  } , [changePasswordData])
  // end submit


  
  return (
    <>
    {changePasswordDataLoading ? <Loading/> : null}
      <LanguageIcon/>
      <ParentContainer>
        <PhoneDiv >
          <Title>{t("text.change_password")} </Title>
          <Paragraph>{t("text.Please_enter_your_new_password_and_confirm_it_to_change_it")}</Paragraph>
          <Div>
              <H3>{t("text.password")} </H3>
              <Input type="password" placeholder={t("text.password")} value = {password} onChange={(e)=> setPassword(e.target.value)}/>
          </Div>
          <Div>
              <H3>{t("text.confirm_password")} </H3>
              <Input type="password" placeholder={t("text.confirm_password")} value = {confirmation} onChange={(e)=>setConfirmation(e.target.value)}/>
          </Div>
          <SubmitButton onClick={handleSubmit} >{t("text.confirm")}</SubmitButton>
        </PhoneDiv>
        <IMG src = {logo2}/>
      </ParentContainer>
    </>
  )
}

export default ChangePassword