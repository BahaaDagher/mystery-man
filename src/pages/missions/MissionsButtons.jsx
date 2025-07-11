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
        id : 5 , 
        name : "Pending_user_Acceptance" , 
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
            five : 0 , 
            six : 0 ,
        }
    )
        
    useEffect(() => {
        let get = true
        for (let i = 0; i < buttonsArray.length; i++) {
            if (buttonsArray[i].number != 0) get = false
        }
        console.log("buttonsMissions", buttonsMissions)
        if (get) {
            buttonsMissions.map((mission , index) => {
                console.log ("mission.status", mission.status )
                let arr = numbers 
                if (mission.status == 0) {
                    arr.zero = arr.zero + 1
                    setNumbers(arr)
                }else if (mission.status == 1) {
                    arr.one = arr.one + 1
                    setNumbers(arr)
                }else if (mission.status == 2) {
                    arr.two = arr.two + 1
                    setNumbers(arr)
                }else if (mission.status == 3) {
                    arr.three = arr.three + 1
                    setNumbers(arr)
                }else if (mission.status == 5) {
                    arr.five = arr.five + 1
                    setNumbers(arr)
                }else if (mission.status == 6) {
                    arr.six = arr.six + 1
                    setNumbers(arr)
                }
            })
            let arr = [...buttonsArray]
            arr[0].number = numbers.zero
            arr[1].number = numbers.one
            arr[2].number = numbers.five
            arr[3].number = numbers.two
            arr[4].number = numbers.three
            arr[5].number = numbers.six
            setButtonsArray(arr)
        }

    },[buttonsMissions])
    
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




