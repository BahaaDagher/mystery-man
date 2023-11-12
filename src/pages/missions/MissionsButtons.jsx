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

    "&.active" : {
        backgroundColor: Colors.main , 
        color  : "#fff" ,
    },
    padding : "10px" , 
    [theme.breakpoints.down('800')]: {
        flex: "0 0 282px"
    },
}));

const MissionName = styled("div")(({ theme }) => ({
    position: 'relative' , 
    fontSize : "24px" ,
    
}));

const ImgContainer = styled("div")(({ theme }) => ({
    position : "absolute" , 
    bottom : "5px" ,
    left : "15px" ,
    
}));

const Number = styled("div")(({ theme }) => ({
    position : "absolute" , 
    bottom : "10px" ,
    right : "20px" ,
    fontSize: '48px',
    fontWeight: 500,
    lineHeight: '58px',
    letterSpacing: '0em',
    textAlign: 'right',
}));


const MissionsButtons = ({ setShowMissions , setSelectMissions }) => {
    const CurrentMission = useSelector(state => state.missionData.currentMission)

    const dispatch = useDispatch()
    useEffect(() => {   
        console.log ("CurrentMission" , CurrentMission)
    },[CurrentMission])
    useEffect(() => {   
        dispatch(setCurrentMission()) ; 
    },[])

    const {t} = useTranslation();

    const buttonsArray = [
    {
        id : 0 ,
        name : t("text.New_Missions") , 
        number :  12 , 
        icon1 : NewMissions, 
        icon2 : NewMissions2
    } , 
    {
        id : 1 , 
        name : t("text.Wait_Requests") , 
        number :  12 , 
        icon1: WaitRequests, 
        icon2 : WaitRequests2
    } , 
    {
        id : 5 , 
        name : t("text.Pending_user_Acceptance") , 
        number :  12 , 
        icon1: WaitRequests, 
        icon2 : WaitRequests2
    } ,
    {
        id : 2 , 
        name : t("text.Current_Missions") , 
        number :  12 , 
        icon1 : CurrentMissions, 
        icon2 : CurrentMissions2
    } , 
    {
        id : 3 , 
        name : t("text.Complete_Missions") , 
        number :  12 , 
        icon1 : CompleteMissions, 
        icon2 : CompleteMissions2
    } , 

    ]
    const [activeButton, setActiveButton] = useState(0);

    const handleClick = (id) => {
        setActiveButton(id)
        setSelectMissions(id)
        setShowMissions(true)
    }
  return (
    <>
    <Parent>
        <ScrollDiv>
            {buttonsArray.map((button , index) => {
            return (
                <Button onClick={(e)=>handleClick(button.id) } className = { activeButton === button.id ? "active" : "" }>
                    <MissionName>{button.name}</MissionName>
                    <ImgContainer>
                        <img 
                            src= {activeButton == button.id ? button.icon2 : button.icon1} 
                            style = {{width : "50px" , }}
                            alt = ""
                        />
                    </ImgContainer>
                    {/* <Number>{button.number}</Number> */}
                </Button>
            )
            })}
        </ScrollDiv>
    </Parent>
    </>
  )
}

export default MissionsButtons




