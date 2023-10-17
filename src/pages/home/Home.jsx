import styled from '@emotion/styled';
import React, { useTransition } from 'react'
import { Colors } from '../../Theme';
import { SmallContainer } from '../../components/SmallContainer';
import { useTranslation } from 'react-i18next';
import paper_scroll from "../../assets/icons/paper-scroll.svg"
import high_rate from "../../assets/icons/high-rate.svg"
import low_rate from "../../assets/icons/low-rate.svg"
import location from "../../assets/icons/location.svg" 

const Section1 = styled("div")(({ theme }) => ({
    display :"flex" , 
    justifyContent : "center" ,
    alignItems : "center" ,
    flexWrap : "wrap" ,
    [theme.breakpoints.down('1000')]: {
    },
}));
const Div = styled("div")(({ theme }) => ({
    height : "204px" , 
    width : "32%" ,
    margin : "5px" , 
    backgroundColor : "#fff" , 
    borderRadius : "10px" ,
    position : "relative" ,
    overflow : "hidden" ,
    "&.one" : {
        backgroundColor : Colors.main , 
        color : "#fff"
    } , 
    [theme.breakpoints.down('1000')]: {
        width : "48%" ,
    },
    [theme.breakpoints.down('700')]: {
        width : "99%" ,
    },
}));
const CircleDiv = styled("div")(({ theme }) => ({
    borderRadius : "50%" ,
    width :"260px" , 
    height : "260px" , 
    position : "absolute" , 
    left : "-100px" , 
    bottom : "-90px" , 
    backgroundColor : "#fff" ,
    "&.second" :{
        backgroundColor : Colors.lightRed ,
        left : "auto" , 
        right : "-50px" , 
        bottom : "-100px" , 
        width :"190px" , 
        height : "190px" , 

    }
}));

const Report = styled("div")(({ theme }) => ({
    
}));

const Home = () => {
    const {t} = useTranslation() ; 
  return (
    <>
        <SmallContainer>
            <Section1>
                <Div className = "one">
                    <div style = {{position :"absolute" , right : "10px" , top : "40px"  , fontSize : "20px"}}>
                        Available Missions
                    </div>
                    <div 
                        className  = "number"
                        style = {{position :"absolute" , right : "10px" , top : "70px" , fontSize : "50px" }}
                    >
                        06
                    </div>
                    <CircleDiv>
                        <img 
                            src= {paper_scroll}  alt = "circle" 
                            style = {{position :"absolute" , right : "30px" , top : "40px" , zIndex : "5"}}
                        />
                    </CircleDiv>
                </Div>
                <Div>
                    <div style = {{display : "flex"  , margin : "15px"}}>
                        <img src = {location} alt =  "location"/>
                        <div
                            style={{fontSize : "20px" , margin : "10px"}}
                        >Jaddah</div>
                    </div>
                    <div
                        style = {{position :"absolute" , left : "5px" , bottom : "30px" , fontSize : "25px"  , color : "#E1312A"}}
                    >
                        Highest rating
                    </div>
                    <img 
                        src= {high_rate}  alt = "circle" 
                        style = {{position :"absolute" , right : "30px" , top : "20px" , zIndex : "5"}}
                    />
                    <CircleDiv className = "second">
                    </CircleDiv>
                </Div>
                <Div>
                    <div style = {{display : "flex"  , margin : "15px"}}>
                        <img src = {location} alt =  "location"/>
                        <div
                            style={{fontSize : "20px" , margin : "10px"}}
                        >Al Dmam</div>
                    </div>
                    <div
                        style = {{position :"absolute" , left : "5px" , bottom : "30px" , fontSize : "25px"  , color : "#BBC3E9"}}
                    >
                        Lowest rating
                    </div>
                    <img 
                        src= {low_rate}  alt = "circle" 
                        style = {{position :"absolute" , right : "10px" , bottom : "20px" , zIndex : "5"}}
                    />
                    <CircleDiv className = "second" style = {{backgroundColor : "#D6DBF266"}}> </CircleDiv>
                </Div>

            </Section1>
            <Report>

            </Report>
        </SmallContainer>
    </>
  )
}

export default Home