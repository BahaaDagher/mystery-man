import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react'
import { SmallContainer } from '../../components/SmallContainer';
import { FlexSpaceBetween } from '../../components/FlexSpaceBetween';
import MissionsButtons from './MissionsButtons';

const MainContent = styled(FlexSpaceBetween)(({ theme }) => ({

}));

const DetailsPart = styled("div")(({ theme }) => ({

}));
const ViewMissions = styled("div")(({ theme }) => ({

}));
const Missions = () => {
  
  const [selectMission, setSelectMission] = useState("NewMissions"); 
  useEffect(() => {
    console.log(selectMission)
  }, [selectMission])
  return (
    <>
    <SmallContainer>
    <MainContent>
      <DetailsPart>

        <ViewMissions>
        </ViewMissions>
        
      </DetailsPart>

      <MissionsButtons setSelectMission= {setSelectMission}/>
    </MainContent>
    </SmallContainer>
    </>
  )
}

export default Missions