import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react'
import { Colors } from '../../Theme';

import LanguageIcon from '../../components/LanguageIcon';
import { useTheme } from '@emotion/react';
import { Container } from '../../components/Container';
import { useTranslation } from 'react-i18next'
import logo from "../../assets/images/BlueLogo.png"
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../store/slices/authSlice';
import Swal from 'sweetalert2';
import Loading from '../../components/Loading';
import { FlexCenter } from '../../components/FlexCenter';
const Parent = styled("div")(({ theme }) => ({
    
}));
const UpperTriangle = styled("div")(({ theme }) => ({
    position: "fixed" ,
    zIndex : "-5" , 
    left : 0 ,
    top : 0 ,
    width: 0 ,
    borderWidth : "150px 300px 150px 300px" , 
    borderStyle : "solid" ,
    borderColor : `${Colors.main} transparent transparent ${Colors.main}` ,
    [theme.breakpoints.down("1300")]: {
        borderWidth : "40px 80px 40px 80px " , 
    },
}));
const LowerTriangle = styled("div")(({ theme }) => ({
    position: "fixed" ,
    zIndex : "-5" ,
    right : 0 ,
    bottom : 0 ,
    width: 0 , 
    borderWidth : "150px 300px 150px 300px" , 
    borderStyle : "solid" ,
    borderColor : `transparent ${Colors.main} ${Colors.main} transparent` ,
    [theme.breakpoints.down("1300")]: {
        borderWidth : "100% 0 0 0 " , 
    },
}));
const ImgDiv = styled(FlexCenter)(({ theme }) => ({
    marginTop : "70px" ,
    marginBottom : "50px" ,  
}));
const IMG = styled("img")(({ theme }) => ({
    // position: "absolute" ,
    // top : "0" ,
    // left : "50%" ,

    width  : "250px",  
    // transform : "translateX(-50%)" ,
    [theme.breakpoints.down("500")]: {
        width : "250px" ,
    },
}));

const InformationDivParent = styled(FlexCenter)(({ theme }) => ({

}));
const InformationDiv = styled("div")(({ theme }) => ({
    // position : "absolute" ,
    flexDirection : "column" ,
    maxWidth: "500px",
    width: "100%",
    padding: "0px 20px",
    // top: '30%',
    // left: '50%',
    // transform : "translateX(-50%)" ,
    direction : theme.direction 
}));
const H1 = styled("h1")(({ theme }) => ({
    fontSize: "32px",
    fontWeight: "700",
    lineHeight: "60px",
    letterSpacing: "0em",
    color: Colors.gray_l,
    marginBottom : "20px" ,
    direction : theme.direction 
}));
const Div = styled("div")(({ theme }) => ({
    width: '100%', 
    direction : theme.direction ,  
    marginBottom : "10px"  , 
}));
const H3 = styled("h3")(({ theme }) => ({
    fontSize: '16px',
    lineHeight: '30px',
    letterSpacing: '0em',
    color: Colors.gray_l,
}));
const Input = styled("input")(({ theme }) => ({
    width: '100%', 
    height: 'fit-content', 
    padding: '15px 16px', 
    borderRadius: '10px',
    gap: '10px',
    border : `1px solid ${Colors.gold}` ,
    '&::placeholder': {
        color: Colors.input, 
    },
    '&:focus': {
        outline: 'none', 
    } ,
    // border : "none" 
}));
const LINK = styled(Link)(({ theme }) => ({
    display:"flex" , 
    fontSize: '16px', 
    lineHeight: '22px', 
    letterSpacing: '0em', 
    textAlign: 'right', 
    color: Colors.gold,
    textDecoration : "none" ,
    cursor : "pointer" ,
    transition : "all 0.5s ease" ,
    "&:hover" : {
        color : Colors.hoverGold , 
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
    color : "#000" , 
    backgroundColor : Colors.gold ,
    cursor : "pointer" , 
    display : "flex" ,
    justifyContent : "center" ,
    alignItems : "center" ,
    fontSize: '20px', 
    marginTop : "30px" ,
    transition : "all 0.5s ease" ,
    "&:hover" : {
        backgroundColor : Colors.hoverGold ,
    } , 
}));
const RegisterDiV = styled("div")(({ theme }) => ({

}));
const Login = () => {
    const [phone , setPhone] = useState("") ;
    const [password , setPassword] = useState("") ;
    const [clickSubmit , setClickSubmit] = useState(false)

    const LoginData = useSelector(state => state.authData.LoginData) ;  
    const LoginDataLoading = useSelector(state => state.authData.LoginDataLoading) ;

    const navigate = useNavigate();
    useEffect(() => {
        console.log(LoginData) 
        if (clickSubmit) {
            if (LoginData.status ) {
                if (LoginData.data.isActive) {
                    console.log("success")
                    localStorage.setItem("token" , LoginData.data.user.token) ;
                    Swal.fire({
                        icon: 'success',
                        text: LoginData.message,
                        showConfirmButton: false,
                        timer: 2000
                    })
                    setTimeout(() => {
                        navigate("/userDashboard/home")
                    }, 2000);
                }
                else{
                    sessionStorage.setItem("company_email" ,LoginData.data.user.email ) ;
                    Swal.fire({
                      icon: 'success',
                      text: LoginData.message,
            
                      showConfirmButton: false,
                      timer: 3000
                    })
                    setTimeout(() => {
                      navigate("/register/VerifyEmail")
                    }
                    , 3000)
                }
            }
            else {
                console.log("failed")
                Swal.fire({
                    icon: 'error',
                    text: LoginData.message,
                })
            }
        }
    }, [LoginData])

    const dispatch = useDispatch() ; 
    const handleLogin = () => {
        setClickSubmit(true)
        dispatch (userLogin({phone : phone , password : password})) ; 
    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };
    const theme = useTheme() ;
    const {t} =  useTranslation() ; 
  return (
    <>
    {LoginDataLoading? <Loading/> : null}
    <LanguageIcon />
    <Parent>
        <UpperTriangle/>
        <LowerTriangle/>
        <ImgDiv>
            <IMG src={logo}/>
        </ImgDiv>
        <InformationDivParent>
            <InformationDiv>
                <H1>{t("text.Welcome_back")}</H1>
                <Div>
                    <H3>{t("text.Phone_Number")} </H3>
                    <Input type="number"  placeholder={t("text.Phone_Number")} onChange={(e)=>setPhone(e.target.value)}  onKeyPress={handleKeyPress}/>
                </Div>
                <Div>
                    <H3>{t("text.Password")} </H3>
                    <Input type="password" placeholder={t("text.Password")} onChange={(e)=>setPassword(e.target.value)}  onKeyPress={handleKeyPress}/>
                </Div>
                <LINK to = "/forgetPassword">
                    {t("text.Forget_Password")}
                </LINK>
                <SubmitButton onClick={handleLogin} >{t("text.Login")}</SubmitButton>
                <LINK  to = "/register/enter-data" className = "register"  > 
                   <span style = {{color : Colors.gray_l  }}>{t("text.Didnt_have_an_account") }</span>   
                    <span style = {{color : Colors.gold , margin : "0 10px" , fontWeight : "bold" }}> {t("text.Register")} </span>
                </LINK>
            </InformationDiv>
        </InformationDivParent>
    </Parent>
    </>
  )
}

export default Login