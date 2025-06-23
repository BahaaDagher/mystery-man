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
import Report from './Report';
import DateRangePickerComponent from '../../components/DateRangePickerComponent';

const Section1 = styled("div")(({ theme }) => ({
    display :"flex" , 
    justifyContent : "space-between" ,
    alignItems : "center" ,
    [theme.breakpoints.down('1000')]: {
        flexWrap : "wrap" ,
    },
}));
const Div = styled("div")(({ theme }) => ({
    height : "204px" , 
    width : "32%" ,
    marginTop : "10px" ,
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
        let lowestBranch = 500
        console.log("branchesData" ,branchesData ,branchesData.length>0);
        if (branchesData.length>0) {
            branchesData.forEach(element => {
                console.log(element.generalRate ,highestBranch ,lowestBranch);
                const branchRating =JSON.parse(element.generalRate.replace(",", "."))
                if(branchRating > highestBranch)
                {
                    console.log(typeof(branchRating));
                    console.log('2222222222' , branchRating,highestBranch);
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
                    <svg 
                        width="120"
                        height="120" 
                        viewBox="0 0 120 120" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        style = {{position :"absolute" , right : "30px" , top : "40px" , zIndex : "2"}}
                    >
                        <path d="M11.2965 40.044C11.888 41.687 12.7075 43.127 13.622 44.4635L12.798 50.4595C11.936 56.5925 11.499 62.9495 11.499 69.351C11.499 76.763 12.0925 84.1705 13.2615 91.3385C14.663 100.142 21.438 106.919 30.1245 108.199C38.379 109.41 46.687 110.01 54.9975 110.01C63.3105 110.01 71.6235 109.405 79.8805 108.199C88.562 106.919 95.337 100.143 96.7385 91.3385C98.847 78.2295 99.0195 64.911 97.326 51.6915C102.646 49.581 106.829 45.4155 108.689 40.079C109.558 37.7245 110 35.176 110 32.5C110 29.824 109.558 27.2755 108.721 25.005C106.265 17.959 99.68 12.8075 91.9455 11.885C71.1205 9.38501 48.8765 9.38501 28.0565 11.885C20.32 12.8075 13.7355 17.959 11.311 24.922C10.442 27.2755 10 29.824 10 32.5C10 35.176 10.442 37.7245 11.2965 40.044ZM86.863 89.756L86.8605 89.766C86.1625 94.1655 82.6905 97.676 78.4255 98.306C62.8885 100.581 47.122 100.581 31.58 98.306C27.31 97.676 23.8385 94.1655 23.135 89.7465C22.051 83.091 21.4995 76.226 21.4995 69.351C21.4995 63.4135 21.905 57.525 22.703 51.8365L22.713 51.7585C23.0805 51.9065 23.469 52.0015 23.8455 52.128C24.156 52.232 24.46 52.342 24.776 52.4315C25.8495 52.7365 26.9415 52.9855 28.0645 53.1155C33.177 53.718 38.307 54.1605 43.4455 54.4725C45.258 54.5825 47.0735 54.591 48.888 54.665C52.225 54.8005 55.56 54.945 58.8995 54.9585C59.2655 54.9595 59.6325 54.99 60 54.99C61.7465 54.99 63.4905 54.87 65.237 54.8365C68.2865 54.778 71.334 54.729 74.38 54.5685C76.5845 54.4525 78.7795 54.251 80.9805 54.0815C83.1625 53.9135 85.35 53.819 87.527 53.5985C89.0135 65.635 88.789 77.793 86.863 89.756ZM60 20C70.3855 20 80.735 20.6105 90.757 21.8165C94.7265 22.29 98.0715 24.834 99.309 28.379C99.773 29.6435 100 30.991 100 32.5C100 34.009 99.773 35.3565 99.28 36.699C98.108 40.0485 94.8975 42.5635 91.099 43.1005C90.938 43.125 90.757 43.159 90.584 43.203C80.4075 44.399 70.159 44.992 59.911 44.9875C51.8925 44.984 43.885 44.5045 35.9015 43.7715C38.6575 39.5275 39.416 35.5355 39.431 32.4805C39.45 28.549 38.258 24.757 36.0055 21.213C43.9055 20.4805 51.9175 20 60 20ZM20.7225 28.296C21.45 26.208 23.0105 24.528 24.962 23.3605C27.3265 25.702 29.45 28.809 29.431 32.4315C29.414 36.092 27.211 39.222 24.775 41.5755C23.9495 41.061 23.17 40.472 22.517 39.751C21.7725 38.9455 21.145 37.876 20.691 36.621C20.227 35.3565 20 34.009 20 32.5C20 30.991 20.227 29.6435 20.7225 28.296Z" fill={Colors.main}/>
                        <path d="M40 75.0002H50C52.761 75.0002 55 72.7637 55 70.0002C55 67.2367 52.761 65.0002 50 65.0002H40C37.239 65.0002 35 67.2367 35 70.0002C35 72.7637 37.239 75.0002 40 75.0002ZM70 80.0002H40C37.239 80.0002 35 82.2367 35 85.0002C35 87.7637 37.239 90.0002 40 90.0002H70C72.761 90.0002 75 87.7637 75 85.0002C75 82.2367 72.761 80.0002 70 80.0002Z" fill={Colors.main}/>
                    </svg>
                        
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
            <Report/>
        </SmallContainer>
    </>
  )
}

export default Home