import styled from '@emotion/styled';
import React from 'react'
import { Colors } from '../../Theme';
import notificationImage from "../../assets/images/notification.svg"
import chatImage from "../../assets/images/chat.svg"
import adminImage from "../../assets/images/admin.png"
import LanguageIcon from '../../components/LanguageIcon';
import profileLogo from "../../assets/images/profileLogo.svg"

import { useTranslation } from 'react-i18next';
import { LINK } from '../../components/LINK';
import { FlexDiv } from '../../components/FlexDiv';

const Container = styled("div")(({ theme }) => ({
  minHeight : "100vh" , 
  minWidth : "100%" ,
  backgroundColor : Colors.body , 
  position : "relative" ,
  display: 'flex',
}));

const NavbarContainer = styled("div")(({ theme }) => ({
  height: '73px',
  width : `calc(100% - 10px )` ,
  margin : " 0 5px" ,
  backgroundColor: "#fff", 
  borderRadius: '10px', 
  position : "fixed" , 
  top : "0" ,
  left : "0" ,
  display : "flex" ,
  justifyContent : "space-between" ,
  alignItems : "center" ,
  padding : "20px" ,
  direction : theme.direction , 
  zIndex : "5" ,
  [theme.breakpoints.down('500')]: {
    padding : "10px"
  },
  
}));
const InformationDiv = styled("div")(({ theme }) => ({
  display : "flex" ,
  alignItems : "center" , 
  justifyContent : "center" , 
}));

const Section = styled("div")(({ theme }) => ({
  display : "flex" ,
  justifyContent : "center" ,
  alignItems : "center" ,
  marginRight : theme.direction == "ltr" ? "20px" : "0px" , 
  marginLeft : theme.direction == "rtl" ? "20px" : "0px" , 
  cursor : "pointer" ,
  "&.company" : {
    flexDirection : "column" ,
    [theme.breakpoints.down('1200')]: {
      display : "none" ,
    },
  },
}));

const LanguageIconNavbar = styled(LanguageIcon)(({ theme }) => ({
  position : "relative" ,
}));

const Logo = styled(LINK)(({ theme }) => ({
   display : "flex" ,
    alignItems : "center" ,
    justifyContent : "center" ,
}));
const Img = styled("img")(({ theme }) => ({
  marginRight :theme.direction == "ltr"?   "10px" : "0px" ,
  marginLeft :theme.direction == "rtl"?   "10px" : "0px" ,
  [theme.breakpoints.down('500')]: {
    width :"100px"
  },
}));

const Content = styled("div")(({ theme }) => ({
  width : `calc(100% - 20px )` ,
  overflow : "auto" ,
  margin : " 0 10px" ,
  marginTop : "90px" ,
  display : "flex" ,
  justifyContent : "space-between" ,
  direction : theme.direction
}));

const DataDiv = styled("div")(({ theme }) => ({
  width: '364px',
  borderRadius: '10px',
  backgroundColor: '#fff',
  padding : "20px" ,
}));
const PhotoAndName = styled(FlexDiv)(({ theme }) => ({
  width : "100%" , 
  display : "flex" , 
  flexDirection : "row" ,
  justifyContent : "flex-start" ,
}));

const Division = styled("div")(({ theme }) => ({
  width :"241px" , 
  height : "1px" ,
  backgroundColor : Colors.grayDC ,
  margin : "20px auto"
}));
const Part = styled("div")(({ theme }) => ({
  flexDirection : "row" ,
  justifyContent : "flex-start" ,
}));
const P1 = styled("div")(({ theme }) => ({
  fontSize : "18px" ,
  color : Colors.second
}));
const P2 = styled("div")(({ theme }) => ({
  color : Colors.gray_l ,
  fontSize : "14px"
}));
const BranchesDiv = styled("div")(({ theme }) => ({

}));

const Profile = () => {
  const {t } = useTranslation();
  return (
    <>
        <Container>
          <NavbarContainer>
            <Logo to = "/dashboard">
              <Img src = {profileLogo} />
            </Logo>
            <InformationDiv>
              <Section>
                <LanguageIconNavbar Navbar= {true} />
              </Section>
              <Section>
                <img src = {notificationImage} alt = "notification"/>
              </Section>
              <Section >
                <img src = {chatImage} alt = "chat"/>
              </Section>
              <Section >
                <img src = {adminImage} style = {{width : "40px" , height : "40px" ,   borderRadius : "50%" }} alt = "admin"/>
              </Section>
              <Section className = "company">
                <p style = {{color: Colors.second , weight : "400"}}>{t("text.company_name")}</p>
                <p style = {{color: Colors.gray , weight : "400"}}>+995 14231512154</p>
              </Section>
            </InformationDiv>
          </NavbarContainer>
          <Content>
            <DataDiv>
                <PhotoAndName>
                    <Section >
                      <img src = {adminImage} style = {{width : "65px" , height : "65px" ,   borderRadius : "50%" }} alt = "admin"/>
                    </Section>
                    <div>
                      <p>Company_name</p>
                      <p>++995 14231512154</p>
                    </div>
                </PhotoAndName>
                <Division/>
                <Part>
                  <P1 >Jaddah, Any Location</P1>
                  <P2 > Company Location </P2>
                </Part>
                <Part>
                  <P1 >www.company.com</P1>
                  <P2 > Company Website </P2>
                </Part>
                <Part>
                  <P1>12151-5645-54113-54112</P1>
                  <P2> Commercial Registration No </P2>
                </Part>

            </DataDiv>
            <BranchesDiv>
dd
            </BranchesDiv>
          </Content>
        </Container>
    </>
  )
}
export default Profile