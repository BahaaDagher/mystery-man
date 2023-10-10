import styled from '@emotion/styled';
import React from 'react'
import { Colors } from '../../Theme';
import { Link, Typography } from '@mui/material';

const Container = styled("div")(({ theme }) => ({
    height : "100vh" ,
    backgroundColor : "#F3F5F8" , 
    position : "relative" ,
}));
const UpperTriangle = styled("div")(({ theme }) => ({
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
}));
const H1 = styled("h1")(({ theme }) => ({
    fontSize: "32px",
    fontWeight: "500",
    lineHeight: "60px",
    letterSpacing: "0em",
    textAlign: "left",
    color: Colors.second,
    marginBottom : "40px" ,
}));
const Div = styled("div")(({ theme }) => ({
    width: '100%', 
}));
const H3 = styled("h3")(({ theme }) => ({
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '30px',
    letterSpacing: '0em',
    textAlign: 'left',
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
    flexDirection : "row-reverse" ,
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
        backgroundColor : Colors.lightMain ,
    } , 
    [theme.breakpoints.down("1000")]: {
        backgroundColor : "#030087" ,
    },
}));
const RegisterDiV = styled("div")(({ theme }) => ({

}));
const Login = () => {
  return (
    <Container>
        <UpperTriangle/>
        <LowerTriangle/>
        <IMG src="./images/logo.svg"/>
        <InformationDiv>
            <H1>Welcome Back!</H1>
            <Div>
                <H3>Phone Number </H3>
                <Input type="number" placeholder='+02 | '/>
            </Div>
            <Div>
                <H3>Password </H3>
                <Input type="text" placeholder='Password'/>
            </Div>
            <LINK>
                Forget Password?
            </LINK>
            <SubmitButton >Login</SubmitButton>
            <LINK className = "register" > Didn't have an account,  
                <span style = {{color : "#030087" , marginLeft : "10px" }}> Register! </span>
            </LINK>
            <Typography>bahaa </Typography>
        </InformationDiv>
    </Container>
  )
}

export default Login