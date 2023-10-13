import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react'
import { Colors } from '../../Theme';

import LanguageIcon from '../../components/LanguageIcon';
import { useTheme } from '@emotion/react';
import { Container } from '../../components/Container';
import { useTranslation } from 'react-i18next'
import logo from "../../assets/images/logo.svg"
import { Link } from 'react-router-dom';

const UpperTriangle = styled("div")(({ theme }) => ({
    position: "absolute" ,
    left : 0 ,
    top : 0 ,
    width: 0 ,
    borderWidth : "150px 300px 150px 300px" , 
    borderStyle : "solid" ,
    borderColor : "#3734CA transparent transparent #3734CA" ,
    [theme.breakpoints.down("1300")]: {
        borderWidth : "40px 80px 40px 80px " , 
    },
}));
const LowerTriangle = styled("div")(({ theme }) => ({
    position: "absolute" ,
    right : 0 ,
    bottom : 0 ,
    width: 0 , 
    borderWidth : "150px 300px 150px 300px" , 
    borderStyle : "solid" ,
    borderColor : "transparent #3734CA #3734CA transparent" ,
    [theme.breakpoints.down("1300")]: {
        borderWidth : "100% 0 0 0 " , 
    },
}));
const IMG = styled("img")(({ theme }) => ({
    position: "absolute" ,
    top : "10%" ,
    left : "50%" ,
    transform : "translateX(-50%)" ,
    [theme.breakpoints.down("500")]: {
        width : "250px" ,
    },
}));
const InformationDiv = styled("div")(({ theme }) => ({
    position : "absolute" ,
    maxWidth: "500px",
    width: "100%",
    padding: "0px 20px",
    top: '30%',
    left: '50%',
    transform : "translateX(-50%)" ,
    direction : theme.direction 
}));
const H1 = styled("h1")(({ theme }) => ({
    fontSize: "32px",
    fontWeight: "500",
    lineHeight: "60px",
    letterSpacing: "0em",
    color: Colors.second,
    marginBottom : "40px" ,
    direction : theme.direction 
}));
const Div = styled("div")(({ theme }) => ({
    width: '100%', 
    direction : theme.direction 
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
const LINK = styled(Link)(({ theme }) => ({
    display:"flex" , 
    fontFamily: 'Cairo', 
    fontSize: '16px', 
    fontWeight: 400, 
    lineHeight: '22px', 
    letterSpacing: '0em', 
    textAlign: 'right', 
    color: Colors.gray_l,
    textDecoration : "none" ,
    cursor : "pointer" ,
    transition : "all 0.5s ease" ,
    "&:hover" : {
        color : Colors.second , 
    } , 
    marginTop : "10px" ,
    "&.register" : {
        flexDirection : "row" ,
    },
}));
const SubmitButton = styled("div")(({ theme }) => ({
    width: '100%',
    height: '60px',
    padding: '2px 0px 1px 0px',
    borderRadius: '10px',
    color : "white" , 
    backgroundColor : Colors.main ,
    cursor : "pointer" , 
    display : "flex" ,
    justifyContent : "center" ,
    alignItems : "center" ,
    fontSize: '20px', 
    marginTop : "30px" ,
    transition : "all 0.5s ease" ,
    "&:hover" : {
        backgroundColor : Colors.hoverMain ,
    } , 
    [theme.breakpoints.down("1000")]: {
        backgroundColor : "#030087" ,
    },
}));
const RegisterDiV = styled("div")(({ theme }) => ({

}));
const Login = () => {
    const [phone , setPhone] = useState("") ;
    const [password , setPassword] = useState("") ;
    const handleLogin = () => {
        if (phone && password) {
            console.log("phone: ", phone);
            console.log("password: ", password);
            window.location.href = "/enter-phone" ;
        }
    }
    const theme = useTheme() ;
    const {t} =  useTranslation() ; 
  return (
    <>
    <LanguageIcon />
    <Container>
        <UpperTriangle/>
        <LowerTriangle/>
        <IMG src={logo}/>
        <InformationDiv>
            <H1>{t("text.Welcome_back")}</H1>
            <Div>
                <H3>{t("text.Phone_Number")} </H3>
                <Input type="number" placeholder='+02 | ' onChange={(e)=>setPhone(e.target.value)}/>
            </Div>
            <Div>
                <H3>{t("text.Password")} </H3>
                <Input type="text" placeholder={t("text.Password")} onChange={(e)=>setPassword(e.target.value)}/>
            </Div>
            <LINK>
                {t("text.Forget_Password")}
            </LINK>
            <SubmitButton onClick={handleLogin}>{t("text.Login")}</SubmitButton>
            <LINK  className = "register"  > {t("text.Didnt_have_an_account") }  
                <span style = {{color : "#030087" , marginLeft : "10px" }}> {t("text.Register")} </span>
            </LINK>
        </InformationDiv>
    </Container>
    </>
  )
}

export default Login