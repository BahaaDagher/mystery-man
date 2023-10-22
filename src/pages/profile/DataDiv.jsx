import React from 'react'
import styled from '@emotion/styled';
import { FlexDiv } from '../../components/FlexDiv';
import { Colors } from '../../Theme';
import Commercial_Registration from "../../assets/images/Commercial Registration.svg"
import adminImage from "../../assets/images/admin.png"
const DataDivContainer = styled("div")(({ theme }) => ({
    width: '364px',
    borderRadius: '10px',
    backgroundColor: '#fff',
    padding : "20px" ,
    height : "fit-content" ,
    [theme.breakpoints.down('800')]: {
      justifyContent : "center" ,
      flexDirection : "column" ,
      width : "100%" ,
    },
  }));
  const PhotoAndName = styled(FlexDiv)(({ theme }) => ({
    width : "100%" , 
    display : "flex" , 
    flexDirection : "row" ,
    justifyContent : "flex-start" ,
    [theme.breakpoints.down('800')]: {
      justifyContent : "center" ,
    },
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
    [theme.breakpoints.down('800')]: {
      textAlign : "center" ,
    },
  }));
  const P1 = styled("div")(({ theme }) => ({
    fontSize : "18px" ,
    color : Colors.second
  }));
  const P2 = styled("div")(({ theme }) => ({
    color : Colors.gray_l ,
    fontSize : "14px"
  }));
  const CommercialRegistrationImgDiv = styled("div")(({ theme }) => ({
    width: '100%',
    height: '139px',
  }));
  const AvailableMission = styled("div")(({ theme }) => ({
    width: '100%',
    height: '62px',
    padding: '10px 45px', 
    borderRadius: '10px',
    backgroundColor: Colors.bgBL,
    display : "flex" , 
    justifyContent : "center" ,
    alignItems : "center" ,
    marginTop :"20px" , 
    [theme.breakpoints.down('500')]: {
      padding: '10px', 
    },
  }));
  const TotalBalance = styled("div")(({ theme }) => ({
    marginTop :"20px" , 
    width: '100%',
    height: '131px',
    padding: '20px  60px', 
    borderRadius: '10px',
    backgroundColor : Colors.lightMain , 
    border: `1px solid ${Colors.main}}`, 
    textAlign : "center" ,
  }));
  
  const Price = styled("p")(({ theme }) => ({
    fontSize: '36px',
    fontWeight: 500,
    lineHeight: '67px',
    color : Colors.main , 
    [theme.breakpoints.down('500')]: {
      fontSize: '20px', 
    },
    textAlign : "center" ,
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

const DataDiv = () => {
  return (
    <>
        <DataDivContainer>
                <PhotoAndName>
                    <Section>
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
                <CommercialRegistrationImgDiv>
                  <img src = {Commercial_Registration}  style = {{width : "100%" , height: "100%" ,  borderRadius: '10px',}}/>
                </CommercialRegistrationImgDiv>
                <AvailableMission>
                    <p style = {{padding : "0 20px" , fontSize : "32px" ,fontWeight : "bold" }}>06</p>
                    <p style = {{fontSize : "18px" , color : Colors.gray}}>Available Missions</p>
                </AvailableMission>
                <TotalBalance>
                  <Price>155.24 SAR</Price>
                  <p style = {{textAlign : "center" , fontSize : "12px", color: Colors.second}}>total balance</p>
                </TotalBalance>
            </DataDivContainer>
    </>
  )
}

export default DataDiv