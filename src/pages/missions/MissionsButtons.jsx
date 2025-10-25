import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react'
import { Colors } from '../../Theme';
import NewMissions from "../../assets/icons/NewMissions.svg"
import NewMissions2 from "../../assets/icons/NewMissions2.svg"
import CurrentMissions from "../../assets/icons/CurrentMissions.svg"
import CurrentMissions2 from "../../assets/icons/CurrentMissions2.svg"
import WaitRequests from "../../assets/icons/WaitRequests.svg"
import WaitRequests2 from "../../assets/icons/WaitRequests2.svg"
import CompleteMissions from "../../assets/icons/CompleteMissions.svg"
import CompleteMissions2 from "../../assets/icons/CompleteMissions2.svg"
import CanceledMissions from "../../assets/icons/CanceledMissions.svg"
import CanceledMissions2 from "../../assets/icons/CanceledMissions2.svg"
import { Flex } from '../../components/Flex';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentMission } from '../../store/slices/missionSlice';
import { useTranslation } from 'react-i18next';
import { FlexSpaceBetween } from '../../components/FlexSpaceBetween';


const Parent = styled(Flex)(({ theme }) => ({
    width: '300px',
    position :"fixed" , 
    right : theme.direction  == "ltr" ? "0" : "auto" , 
    left  : theme.direction  == "rtl"? "0" : "auto" , 
    height : "calc(100vh - 75px)" , 
    [theme.breakpoints.down('800')]: {
        position :"static" , 
        height : "fit-content" ,
        width : "100%" ,
        flexDirection : "row" ,
        gap : "20px" ,
    },
}));
const ScrollDiv = styled(Flex)(({ theme }) => ({
    flexDirection: 'column',
    alignItems: 'center',
    overflow : "auto" ,
    [theme.breakpoints.down('800')]: {
        height : "fit-content" ,
        width : "100%" ,
        flexDirection : "row" ,
        gap : "20px" ,
        overflow : "auto" ,
    },
}));
const Button = styled("div")(({ theme }) => ({
    width: '282px',
    height: '138px',
    borderRadius: '10px',
    position: 'relative',
    marginBottom: '20px',
    cursor : "pointer" ,
    backgroundColor : "#fff" , 
    color : Colors.gray_l ,
    padding : "10px" , 

    "&.active" : {
        backgroundColor: Colors.main , 
        color  : "#fff" ,
    },
    [theme.breakpoints.down('800')]: {
        flex: "0 0 282px"
    },
}));

const MissionName = styled("div")(({ theme }) => ({
    position: 'relative' , 
    fontSize : "22px" ,
    
}));

const Footer = styled(FlexSpaceBetween)(({ theme }) => ({
    position: 'absolute',
    bottom: '13px',
    width: `calc(100% - 20px)`,
    alignItems: 'center',
    height : "20px" , 
    marginTop : "10px" ,
}));


const ImgContainer = styled("div")(({ theme }) => ({
    // direction : "ltr" , 
}));

const Number = styled("div")(({ theme }) => ({
    fontSize: '30px',
    fontWeight: 500,
    lineHeight: '58px',
    letterSpacing: '0em',
    textAlign: 'right',
}));

const MissionsButtons = ({ setShowMissions , setSelectMissions , buttonsMissions }) => {
    const CurrentMission = useSelector(state => state.missionData.currentMission)

    const dispatch = useDispatch()
    useEffect(() => {   
        console.log ("CurrentMission" , CurrentMission)
    },[CurrentMission])
    useEffect(() => {
        dispatch(setCurrentMission()) ;
        
    },[])

    const {t} = useTranslation();

    const [buttonsArray , setButtonsArray] = useState([
    {
        id : 0 ,
        name : "New_Missions" , 
        number :  0 , 
        icon1 : NewMissions, 
        icon2 : NewMissions2
    } , 
    {
        id : 1 , 
        name : "Wait_Requests" , 
        number :  0 , 
        icon1: WaitRequests, 
        icon2 : WaitRequests2
    } , 
    {
        id : 2 , 
        name : "Current_Missions" , 
        number :  0 , 
        icon1 : CurrentMissions, 
        icon2 : CurrentMissions2
    } , 
    {
        id : 3 , 
        name : "Complete_Missions" , 
        number :  0 , 
        icon1 : CompleteMissions, 
        icon2 : CompleteMissions2
    } ,
    {
        id : 6 , 
        name : "CanceledMissions" , 
        number :  0 , 
        icon1 : CanceledMissions, 
        icon2 : CanceledMissions2
    } ,  
    ])
    const [activeButton, setActiveButton] = useState(0);

    const handleClick = (id) => {
        setActiveButton(id)
        setSelectMissions(id)
        setShowMissions(true)
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // number of every mission 
    const [numbers , setNumbers] = useState({
            zero : 0 , 
            one : 0 , 
            two : 0 , 
            three : 0 , 
            six : 0 ,
        }
    )
        
    useEffect(() => {
        // Reset counters
        let newNumbers = {
            zero : 0 , 
            one : 0 , 
            two : 0 , 
            three : 0 , 
            six : 0 ,
        };
        
        // Count missions by status
        buttonsMissions.forEach((mission) => {
            console.log ("mission.status", mission.status);
            if (mission.status == 0) {
                newNumbers.zero = newNumbers.zero + 1;
            } else if (mission.status == 1 || mission.status == 5) {
                // Merge status 1 (Wait_Requests) and status 5 (Pending_user_Acceptance)
                newNumbers.one = newNumbers.one + 1;
            } else if (mission.status == 2) {
                newNumbers.two = newNumbers.two + 1;
            } else if (mission.status == 3) {
                newNumbers.three = newNumbers.three + 1;
            } else if (mission.status == 6) {
                newNumbers.six = newNumbers.six + 1;
            }
        });
        
        // Update numbers state
        setNumbers(newNumbers);
        
        // Update buttonsArray with new numbers
        let updatedButtonsArray = [...buttonsArray];
        updatedButtonsArray[0].number = newNumbers.zero;
        updatedButtonsArray[1].number = newNumbers.one;
        updatedButtonsArray[2].number = newNumbers.two;
        updatedButtonsArray[3].number = newNumbers.three;
        updatedButtonsArray[4].number = newNumbers.six;
        setButtonsArray(updatedButtonsArray);

    }, [buttonsMissions]);
    
  return (
    <>
    <Parent>
        {t("text.empty")}
        <ScrollDiv>
            {buttonsArray.map((button , index) => {
            return (
                <Button onClick={(e)=>handleClick(button.id) } className = { activeButton === button.id ? "active" : "" }>
                    <MissionName>{t(`text.${button.name}`)}</MissionName>
                    <Footer>
                        <ImgContainer>
                            <img 
                                src= {activeButton == button.id ? button.icon2 : button.icon1} 
                                style = {{width : "60%"  }}
                                alt = ""
                            />
                        </ImgContainer>
                        <Number>{button.number}</Number>
                    </Footer>
                   
                </Button>
            )
            })}
        </ScrollDiv>
    </Parent>
    </>
  )
}

export default MissionsButtons




