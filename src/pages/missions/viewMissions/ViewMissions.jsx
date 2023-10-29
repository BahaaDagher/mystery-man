import styled from '@emotion/styled';
import React, { Fragment, useEffect, useState } from 'react'
import { FlexSpaceBetween } from '../../../components/FlexSpaceBetween';
import  Loading  from '../../../components/Loading';
import { Flex } from '../../../components/Flex';
import { Box } from '@mui/material';
import { Colors } from '../../../Theme';
import ThreeDotesMore from "../../../assets/icons/ThreeDotesMore.svg"
import location2 from "../../../assets/icons/location2.svg"
import date from "../../../assets/icons/date.svg"
import time from "../../../assets/icons/time.svg"
import { FlexCenter } from '../../../components/FlexCenter';
import MissionSettings from './MissionSettings';
import { useDispatch, useSelector } from 'react-redux';
import { getMissions, setCurrentMission } from '../../../store/slices/missionSlice';
import { SubmitButton } from '../../../components/SubmitButton';
import { useNavigate } from 'react-router-dom';



const Parent = styled("div")(({ theme }) => ({
    borderRadius: '10px',
    backgroundColor: '#fff',
    padding : "20px", 
    marginBottom : "20px" ,
}));
const Header = styled(FlexSpaceBetween)(({ theme }) => ({
}));
const Published = styled(Flex)(({ theme }) => ({

}));
const IconDiv = styled("div")(({ theme }) => ({
    cursor : "pointer" ,

}));
const MissionTitle = styled("div")(({ theme }) => ({
    fontSize:"20px" , 
    color : Colors.second ,
}));
const Divider = styled("div")(({ theme }) => ({
    width : "97%" ,
    height : "1px" ,
    backgroundColor : Colors.grayDC ,
    margin : "15px 0 "
}));
const Footer = styled(FlexSpaceBetween)(({ theme }) => ({
    [theme.breakpoints.down('1500')]: {
        flexDirection : "column" ,
        gap : "20px" ,
    },
}));
const Focus = styled("div")(({ theme }) => ({
    width : "350px" , 
    margin : theme.direction == "ltr" ? "0 20px 0 0" : "0 0 0 20px" ,
    [theme.breakpoints.down('1500')]: {
        width : "100%" ,
    },
}));
const FocusTitle = styled("div")(({ theme }) => ({
    
    color : Colors.gray_l ,
    fontSize : "16px" ,
    marginBottom : "13px" ,
}));
const FocusThings = styled("div")(({ theme }) => ({
    width : "fit-content" ,
    maxWidth : "100%" ,
    padding: '5px 10px',
    overflow: 'auto',
    fontSize : "16px" ,
    color : Colors.second ,
    borderRadius: '10px',
    gap: '10px',
    backgroundColor: "#455A641A",
}));
const LocationAndTime = styled("div")(({ theme }) => ({
    width : `calc( 100% - 350px )` ,
    [theme.breakpoints.down('1500')]: {
        width : "100%" ,
    },
}));
const LocationAndTimeTitle = styled("div")(({ theme }) => ({
    color : Colors.gray_l ,
    fontSize : "16px" ,
    marginBottom : "13px" ,
}));
const LocationAndTimeThings = styled("div")(({ theme }) => ({

}));
const DateDiv = styled("div")(({ theme }) => ({
    display : "flex" , 
    alignItems : "center" ,
    marginBottom : "10px" ,
}));
const ImgDiv = styled(FlexCenter)(({ theme }) => ({
    margin : theme.direction == "ltr" ? "0 10px 0 0" : "0 0 0 10px" ,

}));
const Address = styled("div")(({ theme }) => ({
    color : Colors.second ,
}));
const DateTime = styled(FlexSpaceBetween)(({ theme }) => ({
    [theme.breakpoints.down('500')]: {
        flexDirection : "column" ,
        gap : "20px" ,
    },
}));
const Date = styled(Flex)(({ theme }) => ({
    margin : theme.direction == "ltr" ? "0 10px 0 0" : "0 0 0 10px" ,
}));
const Time = styled(Flex)(({ theme }) => ({

}));
const ReviewSubmitButton = styled(SubmitButton)(({ theme }) => ({
    width : "fit-content" ,
    padding : "20px" ,  
}));
const ViewSubmitButton = styled(SubmitButton)(({ theme }) => ({
    width : "fit-content" ,
    padding : "20px" ,  
    backgroundColor  : Colors.green
}));
const ViewMissions = ({selectMissions}) => {

    const [chosenSetting , setChosenSetting] = useState("sss") ;
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedMission, setSelectedMission] = useState(0);
    useEffect(() => {
        console.log("chosenSetting", chosenSetting)
        console.log("selectedMission", selectedMission)
    } , [chosenSetting , selectedMission])
    const showSettings = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const getMissionsData = useSelector((state) => state.missionData.getMissionsData);
    const getMissionsLoading = useSelector((state) => state.missionData.getMissionsLoading);
    const [missionsData , setMissionsData] = useState([])
    useEffect(() => {
        if(getMissionsData.status) {
            setMissionsData(getMissionsData.data.missions)

        }
    }, [getMissionsData])

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMissions())
    }, [])
    // view request 
    const navigate = useNavigate(); 
    const ReviewRequest = (mission) => {
        dispatch(setCurrentMission(mission))
        navigate ("/dashboard/missions/waitRequests/viewMissions")
        
    }
  return (
    <>
    <MissionSettings setAnchorEl= {setAnchorEl} anchorEl={anchorEl} setChosenSetting = {setChosenSetting}   />
    {getMissionsLoading  && <Loading/>}
    {missionsData.map((mission , index) => {

        if (mission.status == selectMissions && mission.finished==0)
        return (
            <Parent key={index}>
                <Header>
                    <Published>
                        <Box color = {Colors.grayDC} margin = "0 10px"> published</Box>
                        <Box color = {Colors.gray} >{mission.dayWritten}</Box>
                    </Published>
                    <IconDiv onClick={(e)=>{showSettings(e); setSelectedMission(mission.id) }}>
                        <img src= {ThreeDotesMore} alt ="more"/>
                    </IconDiv>
                </Header>
                <MissionTitle>
                    {mission.name}  
                </MissionTitle>
                <Divider/>
                <Footer>
                    <Focus>
                        <FocusTitle>Focus</FocusTitle>
                        <FocusThings>
                            {mission.foucs} 
                        </FocusThings>
                    </Focus>
                    <LocationAndTime>
                        <LocationAndTimeTitle>location and time</LocationAndTimeTitle>
                        <LocationAndTimeThings>
                            <DateDiv>
                                <ImgDiv>
                                    <img src= {location2} alt ="location"/>
                                </ImgDiv>
                                <Address>{mission.address}</Address>
                            </DateDiv>
                            <DateTime>
                                <Date>
                                    <ImgDiv>
                                        <img src= {date} alt ="location"/>
                                    </ImgDiv>
                                    <Address>{mission.date}</Address>
                                </Date>
                                <Time>
                                    <ImgDiv>
                                        <img src= {time} alt ="location"/>
                                    </ImgDiv>
                                    <Address>{mission.from} - {mission.to}</Address>
                                </Time>
                            </DateTime>
                        </LocationAndTimeThings>
                    </LocationAndTime>
                </Footer>
                {mission.status ==1 ? 
                    <ReviewSubmitButton  onClick={()=>ReviewRequest(mission)}> Review Request </ReviewSubmitButton> : null 
                }
            </Parent>
        ) 
        else if (selectMissions==3 && mission.finished==1)  
        
        return (
            <Parent key={index}>
                <Header>
                    <Published>
                        <Box color = {Colors.grayDC} margin = "0 10px"> published</Box>
                        <Box color = {Colors.gray} >{mission.dayWritten}</Box>
                    </Published>
                    <IconDiv onClick={(e)=>{showSettings(e); setSelectedMission(mission.id) }}>
                        <img src= {ThreeDotesMore} alt ="more"/>
                    </IconDiv>
                </Header>
                <MissionTitle>
                    {mission.name}  
                </MissionTitle>
                <Divider/>
                <Footer>
                    <Focus>
                        <FocusTitle>Focus</FocusTitle>
                        <FocusThings>
                            {mission.foucs} 
                        </FocusThings>
                    </Focus>
                    <LocationAndTime>
                        <LocationAndTimeTitle>location and time</LocationAndTimeTitle>
                        <LocationAndTimeThings>
                            <DateDiv>
                                <ImgDiv>
                                    <img src= {location2} alt ="location"/>
                                </ImgDiv>
                                <Address>{mission.address}</Address>
                            </DateDiv>
                            <DateTime>
                                <Date>
                                    <ImgDiv>
                                        <img src= {date} alt ="location"/>
                                    </ImgDiv>
                                    <Address>{mission.date}</Address>
                                </Date>
                                <Time>
                                    <ImgDiv>
                                        <img src= {time} alt ="location"/>
                                    </ImgDiv>
                                    <Address>{mission.from} - {mission.to}</Address>
                                </Time>
                            </DateTime>
                        </LocationAndTimeThings>
                    </LocationAndTime>
                </Footer>
                {/* {mission.status == } */}
                <ViewSubmitButton  > View Details </ViewSubmitButton> 
            </Parent>
        ) 

     } )}
    </>
  ) 
}

export default ViewMissions