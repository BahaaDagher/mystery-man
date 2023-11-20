import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react'
import { SmallContainer } from '../../components/SmallContainer';
import { FlexSpaceBetween } from '../../components/FlexSpaceBetween';
import { FlexCenter } from '../../components/FlexCenter';
import MissionsButtons from './MissionsButtons';
import { Colors } from '../../Theme';
import { Box } from '@mui/material';
import ViewMissions from './viewMissions/ViewMissions';
import { useTranslation } from 'react-i18next';
import { use } from 'i18next';
import { useNavigate } from 'react-router-dom';

const MainContent = styled(FlexSpaceBetween)(({ theme }) => ({
  [theme.breakpoints.down('800')]: {
    flexDirection : "column-reverse" ,
    gap : "20px" ,
  },
}));

const DetailsPart = styled("div")(({ theme }) => ({
  width : `calc( 100% - 300px )` ,
  // padding : "20px" ,
  marginBottom : "20px" ,
  [theme.breakpoints.down('800')]: {
    width : "100%" ,
  },
  
}));
const NewMissionDiv = styled("div")(({ theme }) => ({
  display : "flex" ,
  justifyContent : theme.direction == "ltr" ? "flex-end" :"flex-start" ,
  marginBottom : "20px" 
}));
const NewMissionButton = styled(FlexCenter)(({ theme }) => ({
  width: '190px',
  height: '54px',
  padding: '9px 40px 8px 40px',
  borderRadius: '10px',
  backgroundColor: Colors.second,
  color: "#fff",
  fontSize : "20px" , 
  cursor : "pointer" ,
}));

const Missions = () => {
  
  const [selectMissions, setSelectMissions] = useState(0); 

  useEffect(() => {
    console.log(selectMissions)
  }, [selectMissions])
  const navigate = useNavigate() ; 
  const newMissionPage = () => {
      navigate ("/dashboard/missions/newMission")
  }

  
  const [showMissions , setShowMissions] = useState(true)
 
  const {t} = useTranslation()
  return (
    <>
    <SmallContainer>
    <MainContent>
      <DetailsPart>
        <NewMissionDiv>
         {showMissions &&  <NewMissionButton onClick={newMissionPage}> {t("text.New_Mission")} </NewMissionButton> }
        </NewMissionDiv>
        <ViewMissions
          showMissions = {showMissions}
          setShowMissions={setShowMissions}
          selectMissions= {selectMissions} 
        />
      </DetailsPart>
      <MissionsButtons 
        setShowMissions={setShowMissions}  
        setSelectMissions= {setSelectMissions} 
      />
    </MainContent>
    </SmallContainer>
    </>
  )
}

export default Missions