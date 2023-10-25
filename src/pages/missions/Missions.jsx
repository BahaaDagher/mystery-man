import styled from '@emotion/styled';
import React, { useState } from 'react'
import { SmallContainer } from '../../components/SmallContainer';
import { FlexSpaceBetween } from '../../components/FlexSpaceBetween';
import MissionButton from './MissionButton';
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


const MainContent = styled(FlexSpaceBetween)(({ theme }) => ({

}));
const MissionsButtons = styled("div")(({ theme }) => ({
  width: '300px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
}));
const DetailsPart = styled("div")(({ theme }) => ({

}));
const ViewMissions = styled("div")(({ theme }) => ({

}));
const Missions = () => {
  const buttonsArray = [
    {
      id : "NewMissions" ,
      name : "New Missions" , 
      number :  12 , 
      icon1 : NewMissions, 
      icon2 : NewMissions2
    } , 
    {
      id : "CurrentMissions" , 
      name : "Current Missions" , 
      number :  12 , 
      icon1 : CurrentMissions, 
      icon2 : CurrentMissions2
    } , 
    {
      id : "WaitRequests" , 
      name : "Wait Requests" , 
      number :  12 , 
      icon1: WaitRequests, 
      icon2 : WaitRequests2
    } , 
    {
      id : "CompleteMissions" , 
      name : "Complete Missions" , 
      number :  12 , 
      icon1 : CompleteMissions, 
      icon2 : CompleteMissions2
    } , 
    {
      id : "CanceledMissions" , 
      name : "Canceled Missions" , 
      number :  12 , 
      icon1 : CanceledMissions, 
      icon2 : CanceledMissions2
    } ,
    
  ]
  const [activeButton, setActiveButton] = useState("NewMissions"); 


  return (
    <>
    <SmallContainer>
    <MainContent>
      <DetailsPart>

        <ViewMissions>
        </ViewMissions>
        
      </DetailsPart>

      <MissionsButtons>
        {buttonsArray.map((button , index) => {
          return (
            <MissionButton
              key={index} 
              name={button.name} 
              number={button.number} 
              activeButton={activeButton === button.id}
              icon={activeButton === button.id ? button.icon2 : button.icon1 }
              id = {button.id}
              setActiveButton = {setActiveButton}
            />
          )
        })}
      </MissionsButtons>
    </MainContent>
    </SmallContainer>
    </>
  )
}

export default Missions