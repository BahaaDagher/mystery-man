import styled from '@emotion/styled';
import React, { Fragment, useEffect, useState, useTransition } from 'react'
import { FlexSpaceBetween } from '../../../components/FlexSpaceBetween';
import  Loading  from '../../../components/Loading';
import { Flex } from '../../../components/Flex';
import { Box, Rating } from '@mui/material';
import { Colors } from '../../../Theme';
import ThreeDotesMore from "../../../assets/icons/ThreeDotesMore.svg"
import location2 from "../../../assets/icons/location2.svg"
import date from "../../../assets/icons/date.svg"
import time from "../../../assets/icons/time.svg"
import { FlexCenter } from '../../../components/FlexCenter';
import MissionSettings from './MissionSettings';
import { useDispatch, useSelector } from 'react-redux';
import { RateVisitor, deleteMission, getMissions, setCurrentMission, viewMission } from '../../../store/slices/missionSlice';
import { SubmitButton } from '../../../components/SubmitButton';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { use } from 'i18next';
import i18n from '../../../i18n';
import { ToggleLanguage } from '../../../store/slices/directionSlice';
import ViewDetails from '../viewMissionDetailes/ViewDetails';
import ReviewMissionRequest from '../reviewMissionRequest/ReviewMissionRequest';
import NotCompletedDetails from '../notCompletedDetails/NotCompletedDetails';
import chatAvailable from  "../../../assets/icons/chatAvailable.svg" 
import { setCurrentChat } from '../../../store/slices/chatSlice';
import MysteryProfile from '../mysteryProfile/MysteryProfile';
import Swal from 'sweetalert2';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const Parent = styled("div")(({ theme }) => ({
    borderRadius: '10px',
    backgroundColor: '#fff',
    padding : "20px", 
    marginBottom : "20px" ,
    overflowX : "auto" ,
    overflowY : "hidden" ,
    position : "relative" , 
    "&.PaddingBottom" :{
        paddingBottom : "50px" ,
    } , 
    "&.PaddingTop" :{
        paddingTop : "50px" ,
    }
}));

const Header = styled(FlexSpaceBetween)(({ theme }) => ({
}));
const Published = styled(Flex)(({ theme }) => ({

}));
const PublishedTitle = styled("div")(({ theme }) => ({
    color : Colors.grayDC , 
    margin : theme.direction == "ltr" ? "0 20px 0 0" : "0 0 0 20px" ,
}));
const IconDiv = styled("div")(({ theme }) => ({
    cursor : "pointer" ,
}));
const MissionTitle = styled("div")(({ theme }) => ({
    fontSize:"20px" , 
    color : Colors.second ,
    overflowY : "hidden" , 
    overflowX : "auto" , 
    "&.cancel" :{
        textDecoration : "line-through" ,
    }
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
const ReviewSubmitButton = styled("div")(({ theme }) => ({
    position : "absolute" ,
    bottom : "0px" ,
    // left : "50%" , 
    right : "0px" , 
    width : "235px" , 
    padding : "5px 20px 5px 20px" , 
    backgroundColor : Colors.main ,
    borderRadius : "10px 0 0 0" , 
    color : "#fff" , 
    // transform : "translateX(-50%)" ,
    textAlign : "center" ,
    fontSize : "16px" , 
    cursor : "pointer" 
}));
const ViewSubmitButton = styled(SubmitButton)(({ theme }) => ({
    width : "fit-content" ,
    padding : "20px" ,  
    backgroundColor  : Colors.green,
    "&:hover" : {
        backgroundColor  : Colors.hoverGreen,
    }
}));
const FinishedDiv = styled("div")(({ theme }) => ({
    position : "absolute" ,
    top : "0px" ,
    left : "50%" , 
    width : "235px" , 
    padding : "5px 20px 5px 20px" , 
    backgroundColor : Colors.main ,
    borderRadius : "0 0 10px 10px" , 
    color : "#fff" , 
    transform : "translateX(-50%)" ,
    textAlign : "center" ,
    fontSize : "16px" , 
}));
const ChatDiv = styled("div")(({ theme }) => ({
    display : "flex" ,
    position : "absolute" ,
    top : "0px" ,
    left : "50%" , 
    transform : "translateX(-50%)" ,

}));

const ChatAvailable = styled("div")(({ theme }) => ({
     
    width : "150px" , 
    padding : "5px 10px 5px 10px" , 
    backgroundColor : Colors.green ,
    borderRadius : "0 0 10px 10px" , 
    color : "#fff" , 
    textAlign : "center" ,
    fontSize : "16px" , 
}));
const ChatImgDiv = styled("div")(({ theme }) => ({
    margin : theme.direction == "rtl" ? "0 10px 0 0" : "0 0 0 10px" ,
    cursor : "pointer" ,
}));
const ChatImg = styled("img")(({ theme }) => ({

}));
const RateButton = styled(Button)(({ theme }) => ({
    marginTop : "10px" ,
    border : `1px solid ${Colors.main}` ,
    color : Colors.main ,
    fontWeight : "700" , 
    fontFamily : "Cairo" ,
}));
const VisitorRating = styled(Rating)(({ theme }) => ({
    fontSize : "50px" , 
    direction :theme.direction ,
}));

const ViewMissions = ({showMissions , setShowMissions , selectMissions  }) => {

    const [chosenSetting , setChosenSetting] = useState("sss") ;

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedMission, setSelectedMission] = useState(0);
    const [anchorClicked , setAnchorClicked] = useState(false)
    useEffect(() => {
        if ( chosenSetting == "MissionDetails" && selectMissions == 3 ) {
            setShowViewDetails(true)
            setShowMissions(false)
        }
        else if (chosenSetting == "MissionDetails" && selectMissions != 3 ) {
            setNotCompleted(true)
            setShowMissions(false)
        }
        else if (chosenSetting== "MysteryProfile") {
            setMysteryProfile(true)
            setShowMissions(false)
        }
        else if (chosenSetting== "Cancel" ) {
            Swal.fire({
                title: 'are you sure you want to Cancel this mission?',
                showDenyButton: true,
                confirmButtonText: 'Yes',
                denyButtonText: `No`,
              }).then((result) => {
                if (result.isConfirmed) {
                  dispatch(deleteMission({mission_id :  missionDetails.id}))
                } else if (result.isDenied) {
                  Swal.fire('Changes are not saved', '', 'info')
                }
              })
        }
        setSelectedMission(-1)
        setChosenSetting("sss")

    } , [chosenSetting , selectedMission])


    const showSettings = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // delete 

    const deleteMissionData = useSelector((state) => state.missionData.deleteMissionData);
    const deleteMissionLoading = useSelector((state) => state.missionData.deleteMissionLoading);


    useEffect(() => {
        if (deleteMissionData.status &&  anchorClicked) {
            Swal.fire({
                icon: 'success',
                text : deleteMissionData.message  , 
                showConfirmButton: false,
                timer: 2000
              })
              setTimeout(() => {
                  window.location.reload()
              }
              , 2000)
        }
        else if (anchorClicked) {
            Swal.fire({
                icon: 'error',
                text : deleteMissionData.message  , 
                showConfirmButton: false,
                timer: 3000
              })
        }
    },[deleteMissionData])


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
    useEffect(() => {
        if (selectMissions==1 ) setPaddingBottom(true)
        else setPaddingBottom(false)
        if (selectMissions==2 ) setPaddingTop(true)
        else setPaddingTop(false)

    }, [selectMissions])

    // view not completed 
    const [notCompleted , setNotCompleted] = useState(false) 

    // view request 
    const [reviewRequest ,   setReviewRequest] = useState(false)
    const [reviewRequestData ,   setReviewRequestData] = useState({})
    const [missionId ,   setMissionId] = useState()
    const ReviewRequest = (mission) => {
        setShowMissions(false)
        setReviewRequest(true)
        setReviewRequestData(mission)
        setMissionId(mission.id)
    }

    const {t} = useTranslation()
    const [findData ,  setFindData] = useState(false)
    useEffect(() => {
        setFindData(false)
    },[selectMissions])

    const [showViewDetails , setShowViewDetails] = useState(false)
    const [missionDetails , setMissionDetails] = useState({})

    // click on settings icon
    const handleIconClick = (e , mission) => {
        setAnchorClicked(true)
        showSettings(e);
        setMissionDetails(mission) 
        setSelectedMission(mission.id)
    }
    
    useEffect(() => {
        if ( showMissions ){
            setShowViewDetails(false)
            setReviewRequest(false)
            setNotCompleted(false)
            setMysteryProfile(false)
        } 
    },[showMissions])

    //////////////////////////////////////////////

    // active styled in parent 
    const [PaddingBottom , setPaddingBottom] = useState(false)
    const [PaddingTop , setPaddingTop] = useState(false)
    
//////////////////////////////////////////////////////////////

    // chat
    const navigate = useNavigate()
    const handleChat = (mission) => {
        let employees = mission.employee
        let senderImage = ""
        let adsName = ""
        for (let i = 0; i < employees.length; i++) {
            if (employees[i].status!= 0 && employees[i].status!= 3 ) {
                senderImage = employees[i].user.image
                adsName = employees[i].user.name
                break;
            }
        }
        dispatch(setCurrentChat({mission_id :  mission.id, senderImage: senderImage , adsName: adsName , newMission : true,id:1 ,can_sent:mission.can_sent }))
        navigate("/chat")
    }

    //////////////////////////////////////////////////////////////////////////////

    // mystery profile 

    const [mysteryProfile , setMysteryProfile] = useState(false)

    /////////////////////////////////////////////////////////////////////
    // rate the visitor 
   
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const [rateEmployee, setRateEmployee] = useState(0);
    const [confirm , setConfirm] = useState(false);

    const [needMission , setNeedMission] = useState({}) 
    const confirmRate = () => {
        let mission =  needMission 
        console.log ("mission" , mission)
        setConfirm(true) 
        let employees = mission.employee
        let missionID  = mission.id
        let employeeID = -5
        for (let i = 0; i < employees.length; i++) {
            if (employees[i].status!= 0 && employees[i].status!= 3 ) {
                employeeID = employees[i].user_id
                break;
            }
        }

        dispatch(RateVisitor({mission_id:missionID , vistor_id :employeeID , rate:rateEmployee   })) 
    }

    const rateVisitorData = useSelector((state) => state.missionData.rateVisitorData);
    const rateVisitorLoading = useSelector((state) => state.missionData.rateVisitorLoading);

    useEffect(() => {
        if (rateVisitorData.status &&confirm) {
            Swal.fire({
                icon: 'success',
                text : rateVisitorData.message  , 
                showConfirmButton: false,
                timer: 2000
              })
        }
        else if (confirm) {
            Swal.fire({
                icon: 'error',
                text : rateVisitorData.message  , 
                showConfirmButton: false,
                timer: 3000
              })
        }
    },[rateVisitorData])


    ///////////////////////////////////////////////////////
    
  return (
    <>
    <MissionSettings setAnchorEl= {setAnchorEl} anchorEl={anchorEl} setChosenSetting = {setChosenSetting} selectMissions = {selectMissions}/>
    

    {/* loading */}
    {getMissionsLoading  && <Loading/>}

    {/* view details */}
    {showViewDetails ? <ViewDetails missionDetails ={missionDetails} /> : null}

    {/* view request */}
    {reviewRequest ? <ReviewMissionRequest missionId={missionId} reviewRequestData = {reviewRequestData}/> : null}

    {/* view notCompleted */}
    {notCompleted ? <NotCompletedDetails missionDetails ={missionDetails} /> : null}

    {/* mystery profile  */}

    {mysteryProfile ? <MysteryProfile missionDetails ={missionDetails} /> : null}

    {showMissions ?
    missionsData.map((mission , index) => {
        if (mission.status == selectMissions){
            if (!findData) setFindData(true)
            return (
            <Parent key={index} className = {PaddingBottom? "PaddingBottom" : PaddingTop && mission.can_sent ? "PaddingTop" :""}>
                <Header>
                    <Published>
                        <PublishedTitle> {t("text.published")}</PublishedTitle>
                        <Box color = {Colors.gray} >{mission.dayWritten}</Box>
                    </Published>
                    <IconDiv onClick={(e)=>{ handleIconClick(e , mission )}}>
                        <img src= {ThreeDotesMore} alt ="more"/>
                    </IconDiv>
                </Header>
                <MissionTitle className = {mission.status==6 ? "cancel" : ""}>
                    {mission.name} 
                </MissionTitle>
                <Divider/>
                <Footer>
                    <Focus>
                        <FocusTitle>{t("text.Focus")}</FocusTitle>
                        <FocusThings>
                            {mission.foucs} 
                        </FocusThings>
                    </Focus>
                    <LocationAndTime>
                        <LocationAndTimeTitle>{t("text.locationAndTime")}</LocationAndTimeTitle>
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
                                    <Address style = {{color :mission.can_sent? Colors.green : ""}}>{mission.date}</Address>
                                </Date>
                                <Time>
                                    <ImgDiv>
                                        <img src= {time} alt ="location"/>
                                    </ImgDiv>
                                    <Address style = {{ direction : "ltr"  , color :mission.can_sent? Colors.green : "" }}> {mission.from} -  {mission.to}</Address>
                                </Time>
                            </DateTime>
                        </LocationAndTimeThings>
                    </LocationAndTime>
                </Footer>
                {mission.status ==1 ? 
                    <ReviewSubmitButton  onClick={()=>ReviewRequest(mission)}> {t("text.ReviewRequests")}  </ReviewSubmitButton> : null 
                }
                {/* <FinishedDiv>Finished 05 minutes ago</FinishedDiv> : null  */}
                {mission.status == 3 ?  
                    <React.Fragment>
                        <RateButton 
                            variant="outlined" 
                            onClick={()=>{setNeedMission(mission) ;  handleClickOpen()  } }
                        >
                            {t("text.RateTheVisitor")}
                        </RateButton>
                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle style = {{ textAlign : "center" , fontWeight : "bold" , color : Colors.main}}>Rate</DialogTitle>
                            <DialogContent >
                                <VisitorRating 
                                    name="half-rating" 
                                    defaultValue={rateEmployee} 
                                    precision={0.5}
                                    onChange={(event, newValue) => {setRateEmployee(newValue);}}
                                />
                            </DialogContent>
                            <DialogActions>
                                <RateButton onClick={handleClose} style = {{color : Colors.main}}>{t("text.Cancel")}</RateButton>
                                <RateButton onClick={()=>{ confirmRate() ;  handleClose()  }} style = {{color : Colors.main}}>{t("text.Confirm")}</RateButton>
                            </DialogActions>
                        </Dialog>
                    </React.Fragment>
                    
                : null
                }
                {mission.status == 3 && mission.can_sent?  
                    <ChatDiv>
                        <ChatAvailable>Chat Available</ChatAvailable>
                        <ChatImgDiv onClick = {()=>handleChat(mission)}>
                            <ChatImg src = {chatAvailable}/>
                        </ChatImgDiv>
                    </ChatDiv>
                    : null
                }
                {mission.status ==2 && mission.can_sent? 
                    <ChatDiv >
                        <ChatAvailable>Chat Available</ChatAvailable>
                        <ChatImgDiv onClick = {()=>handleChat(mission)}>
                            <ChatImg src = {chatAvailable}/>
                        </ChatImgDiv>
                    </ChatDiv>
                    : null
                }
                
            </Parent>
        ) 
        }
     } ) : null  
    }

        {!findData && 
            <FlexCenter>
                <FlexCenter 
                    style = {{ color : Colors.main , margin : "0 10px"  , fontSize : "24px" }} 
                > 
                    {t("text.noMissions")}
                </FlexCenter>
            </FlexCenter>
        }

    </>
  ) 
}

export default ViewMissions