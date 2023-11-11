import styled from '@emotion/styled';
import React, { useEffect, useState, useTransition } from 'react'
import { Colors } from '../../Theme';
import { SmallContainer } from '../../components/SmallContainer';
import { useTranslation } from 'react-i18next';
import paper_scroll from "../../assets/icons/paper-scroll.svg"
import high_rate from "../../assets/icons/high-rate.svg"
import low_rate from "../../assets/icons/low-rate.svg"
import location from "../../assets/icons/location.svg" 
import { useDispatch, useSelector } from 'react-redux';
import { getBranches } from '../../store/slices/branchSlice';

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
    const dispatch = useDispatch() ; 
    useEffect(()=> {
        dispatch(getBranches())
    },[])
      // profile data 
      const getProfileData = useSelector(state => state.profileData.getProfileData) ;
      const getBranchesData = useSelector(state => state.branchData.getBranchesData) ;
      const [profileData , setProfileData] = useState ({})
      const [branchesData , setBranchesData] = useState ({})
      const [highestBranch , setHighestBranch] = useState ('')
      const [lowestBranch , setLowestBranch] = useState ('')
      useEffect(()=>{
        if (getProfileData.status) {
          setProfileData(getProfileData.data.user)
        }
      },[getProfileData])
      useEffect(()=>{
        if (getBranchesData.status) {
            setBranchesData(getBranchesData.data.branches)
     
        }
      },[getBranchesData])
      useEffect(()=>{
        let highestBranch = 0
        let lowestBranch = 0
        console.log("branchesData" ,branchesData ,branchesData.length>0);
        if (branchesData.length>0) {
            branchesData.forEach(element => {
                console.log(element.generalRate);
                const branchRating =element.generalRate.replace(",", ".")
                if(branchRating >= highestBranch)
                {
                    
                    highestBranch=branchRating
                    setHighestBranch(element.name)
                }
                if (branchRating <= lowestBranch) {
                    lowestBranch=branchRating
                    setLowestBranch(element.name)
                    
                }
                
            });
          
        }
      },[branchesData])
  return (
    <>
        <SmallContainer>
            <Section1>
                <Div className = "one">
                    <div style = {{position :"absolute" , right : "10px" , top : "40px"  , fontSize : "20px"}}>
                        {t("text.Available_Missions")}
                    </div>
                    <div 
                        className  = "number"
                        style = {{position :"absolute" , right : "10px" , top : "70px" , fontSize : "50px" }}
                    >
                        {profileData.newMission}
                    </div>
                    <CircleDiv>
                        <img 
                            src= {paper_scroll}  alt = "circle" 
                            style = {{position :"absolute" , right : "30px" , top : "40px" , zIndex : "5"}}
                        />
                    </CircleDiv>
                </Div>
                <Div>
                    <div
                        style = {{position :"absolute" , left : "5px" , bottom : "30px" , fontSize : "25px"  , color : "#E1312A"}}
                    >
                        {t("text.Highest_rating")}
                    </div>
                    <div style = {{display : "flex"  , margin : "15px" , position : "absolute" , left : "0px" , top : "0px"}}>
                        <img src = {location} alt =  "location"/>
                        <div
                            style={{fontSize : "20px" , margin : "10px"}}
                        >
                        {highestBranch}
                        </div>
                    </div>
                    <img 
                        src= {high_rate}  alt = "circle" 
                        style = {{position :"absolute" , right : "30px" , top : "20px" , zIndex : "5"}}
                    />
                    <CircleDiv className = "second">
                    </CircleDiv>
                </Div>
                <Div>
                    <div
                        style = {{position :"absolute" , left : "5px" , bottom : "30px" , fontSize : "25px"  , color : "#BBC3E9"}}
                    >
                        {t("text.Lowest_rating")}
                    </div>
                    <div style = {{display : "flex"  , margin : "15px" , position : "absolute" , left : "0px" , top : "0px"}}>
                        <img src = {location} alt =  "location"/>
                        <div
                            style={{fontSize : "20px" , margin : "10px"}}
                        >
                        {lowestBranch}
                        </div>
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