import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react'
import { Colors } from '../../Theme';
import { LINK } from '../../components/LINK';
import { Box } from '@mui/material';
import { SubmitButton } from '../../components/SubmitButton';
import LanguageIcon from '../../components/LanguageIcon';
import { Container } from '../../components/Container';
import verification from "../../assets/images/verification.svg"
import { useTranslation } from 'react-i18next';
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
  margin: '0 2px',
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
  backgroundColor : "#fff" ,
}));

const VerifyPhone = () => {
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [seconds, setSeconds] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  
  useEffect(() => {
    if (isRunning && seconds > 0) {
      const interval = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);

      // Cleanup the interval when the component unmounts or when seconds reach 0
      return () => {
        clearInterval(interval);
      };
    }
    if (isRunning && seconds == 0) {
      setIsRunning(false);
    }
  }, [seconds,isRunning]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    //Focus next input
    if (element.nextSibling) {
        element.nextSibling.focus();
    }
  };
  const handleSubmit = ()=> {
    if (!isRunning) {
      setOtp(new Array(4).fill("")) ;
      setSeconds(60); 
      setIsRunning(true);
    }
  }
const {t} = useTranslation () ; 
  return (
    <>  
      <LanguageIcon className= "notNavbar"/>
      <Container>
        <IMG src= {verification} alt="phone" />
        <VerificationDiv>
            <Title></Title>
            <Paragraph> {t("text.You_will_receive_a_SMS_with_a_verification_code_on")}
              <span style = {{ color : Colors.second , padding : "10px"}}>+20 10987654321</span>
              <LINK style = {{ color : Colors.main}} to= "/enter-phone">{t("text.change")}</LINK>
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
              <SubmitButton onClick = {handleSubmit} style = {{cursor : isRunning ? "not-allowed" : "pointer"}} > {t("text.Verify")}</SubmitButton>
              <Paragraph>{t("text.Didnt_receive_anything")}
                <span style = {{color : Colors.main }}> {t("text.Send_again_after")} </span> {seconds} {t("text.seconds")}
              </Paragraph>
        </VerificationDiv>
      </Container>
    </>
  )
}

export default VerifyPhone