import styled from '@emotion/styled';
import React, { useState } from 'react'
import { Colors } from '../../Theme';
import { LINK } from '../../components/LINK';
import { Box } from '@mui/material';
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
        flexDirection : "column" ,
        justifyContent : "space-around" ,
    },
}));
const IMG = styled("img")(({ theme }) => ({
  [theme.breakpoints.down("1000")]: {
    width : "250px" ,
  },
}));
const VerificationDiv = styled("div")(({ theme }) => ({
  padding : "0 20px" , 
  textAlign:"center" ,
}));

const Title = styled("p")(({ theme }) => ({
  fontFamily: 'Cairo',
  fontSize: '24px',
  fontWeight: 500,
  lineHeight: '45px',
  letterSpacing: '0em',
  textAlign: 'left',
  color: Colors.second,
  textAlign:"center" ,
}));
const Paragraph = styled("p")(({ theme }) => ({
  fontFamily: 'Cairo',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '22px',
    letterSpacing: '0em',
    textAlign: 'left',
    color : Colors.gray_l ,
    textAlign:"center" ,
    marginTop : "20px" ,
}));

const Input = styled("input")(({ theme }) => ({
  width: '85.2px',
  height: '85.2px',
  borderRadius: '14.2px',
  border:"none" , 
  display : "flex" , 
  justifyContent : "center" ,
  alignItems : "center" ,
  textAlign : "center" ,
  fontSize: '20px',
  "&:focus": {
    outline: `1px solid ${Colors.main}`,
    border: `1px solid ${Colors.main} `,
  },
  caretColor : Colors.main ,
  color : Colors.main ,
  [theme.breakpoints.down("500")]: {
    width : "60px" ,
    height : "60px" ,
    fontSize : "16px" ,
  },
}));

const Verification = () => {
  const [otp, setOtp] = useState(new Array(4).fill(""));

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    //Focus next input
    if (element.nextSibling) {
        element.nextSibling.focus();
    }
};
  return (
    <>  
      <Container>
        <IMG src="/images/verification.svg" alt="phone" />
        <VerificationDiv>
            <Title>Verify your mobile number</Title>
            <Paragraph>You will receive a SMS with a verification code on 
              <span style = {{ color : Colors.second , padding : "10px"}}>+20 10987654321</span>
              <LINK style = {{ color : Colors.main}} >change</LINK>
            </Paragraph>
              <Box sx = {{display : "flex" , justifyContent : "space-between" , margin : "50px 0 "}}>
                {otp.map((data, index) => {
                    return (
                        <Input
                            className="otp-field"
                            type="text"
                            name="otp"
                            maxLength="1"
                            key={index}
                            value={data}
                            onChange={e => handleChange(e.target, index)}
                            onFocus={e => e.target.select()}
                        />
                    );
                })}
              </Box>
              <SubmitButton>Verify</SubmitButton>
              <Paragraph>Didn’t receive anything? 
              <span style = {{color : Colors.main }}> Send again after </span> 01 : 22</Paragraph>
        </VerificationDiv>
      </Container>
    </>
  )
}

export default Verification