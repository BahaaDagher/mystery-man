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
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { forgetPassword, resendOtp, verifyOtp, verifyOtpPassword } from '../../store/slices/authSlice';
import VerificationSVG from './VerificationSVG';
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
  
  fontSize: '24px',
  fontWeight: 500,
  lineHeight: '45px',
  letterSpacing: '0em',
  textAlign: 'left',
  color: Colors.second,
  textAlign:"center" ,
}));
const Paragraph = styled("p")(({ theme }) => ({
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
  border: `1px solid ${Colors.gold}` ,
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

const OtpPassword = () => {
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [seconds, setSeconds] = useState(3);
  const [isRunning, setIsRunning] = useState(true);
  const [email , setEmail] = useState(sessionStorage.getItem("email"))
  
  const dispatch  = useDispatch() ;

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
  //////////////////////////////////start send again ///////////////////////////////////
  const [clickSend , setClickSend] = useState(false)
  const handleSendAgain = ()=> {
    setClickSend(true)
    dispatch(forgetPassword({email :  email}))
  }
  const forgetPasswordData = useSelector(state => state.authData.forgetPasswordData) ; 
  const forgetPasswordDataLoading = useSelector((state) => state.authData.forgetPasswordDataLoading);
  useEffect(() => {
    console.log ("forgetPasswordData", forgetPasswordData)
    if (clickSend) {
      if (forgetPasswordData.status) {
        setIsRunning(true)
        setSeconds (60)
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
  //////////////////////////////////end send again ///////////////////////////////////////////////////



  //////////////////////////////////start submit ///////////////////////////////////////
  const [clicked , setClicked] = useState(false)
  const handleSubmit = ()=> {
    setClicked(true)
    let theOtp = otp.join("");
    
    dispatch(verifyOtpPassword({otp :theOtp , email : email}))
   
  }
  const verifyOtpPasswordData = useSelector((state) => state.authData.verifyOtpPasswordData);
  const verifyOtpPasswordDataLoading = useSelector((state) => state.authData.verifyOtpPasswordDataLoading);
  const navigate = useNavigate() ; 
  useEffect(() => {
    if (clicked) {
      if (verifyOtpPasswordData.status) {
          Swal.fire({
            icon: 'success',
            text:  verifyOtpPasswordData.message,
            showConfirmButton: false,
            timer: 2000
          })
          setTimeout(() => {
            navigate("/forgetPassword/changePassword")
          }, 2000);
      }
      else {
        Swal.fire({
          icon: 'error',
          text:  verifyOtpPasswordData.message,
          showConfirmButton: false,
          timer: 2000
        })
      }
    }
  } , [verifyOtpPasswordData])
  //////////////////////////////////end submit ///////////////////////////////////////

const {t} = useTranslation () ; 
  return (
    <>  
    {(verifyOtpPasswordDataLoading || forgetPasswordDataLoading ) ? <Loading/> : null}
      <LanguageIcon className= "notNavbar"/>
      <Container>
        <VerificationSVG/>
        <VerificationDiv>
            <Title></Title>
            <Paragraph> {t("text.You_will_receive_an_email_with_a_verification_code_on")}
              <span style = {{ color : Colors.second , padding : "10px"}}>{email}</span>
              {/* <LINK style = {{ color : Colors.main}} to= "/enter-phone">{t("text.change")}</LINK> */}
            </Paragraph>
              <Box sx = {{display : "flex" , justifyContent : "space-between" , margin : "50px 0 " , direction : "ltr"}}>
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
              <SubmitButton onClick = {handleSubmit} style = {{cursor : "pointer"}} > {t("text.Verify")}</SubmitButton>
              <Paragraph>{t("text.Didnt_receive_anything")}
                {isRunning ? 
                  <span > {t("text.Send_again_after")} </span>  : 
                  <span style = {{color : Colors.main , cursor : "pointer"}} onClick= {handleSendAgain}> {t("text.Send_again")} </span> 
                }
                {isRunning ? 
                 <span style = {{color : Colors.main}}>
                    {seconds}
                    <span > {t("text.seconds")} </span>
                 </span> : null
                }
              </Paragraph>
        </VerificationDiv>
      </Container>
    </>
  )
}

export default OtpPassword