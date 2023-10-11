import styled from '@emotion/styled';
import React from 'react'
import { Colors } from '../../Theme';
import { H1 } from '../../components/H1';
import { SubmitButton } from '../../components/SubmitButton';

const Container = styled("div")(({ theme }) => ({
    height : "100vh" ,
    width : "100%" ,
    backgroundColor : Colors.body2 , 
    position : "relative" ,
    display : "flex" ,
    justifyContent : "space-around" ,
    alignItems : "center" ,
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
  textAlign: 'left',
  color: Colors.second,
}));
const Paragraph = styled("p")(({ theme }) => ({
  fontFamily: 'Cairo',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '22px',
    letterSpacing: '0em',
    textAlign: 'left',
    color : Colors.gray_l ,
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
const EnterPhone = () => {
  return (
    <>
        <Container>
          <PhoneDiv >
            <Title>Enter your phone number</Title>
            <Paragraph>we need your phone number to create an account and log in with later</Paragraph>
            <Div>
                <H3>Phone Number </H3>
                <Input type="number" placeholder='+02 | '/>
            </Div>
            <SubmitButton>confirm</SubmitButton>
          </PhoneDiv>
          <IMG src = "./images/logo2.svg"/>
        </Container>
    </>
  )
}

export default EnterPhone