import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react'
import { Colors } from '../../Theme';
import { Bar, BarChart, CartesianGrid, Label, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useSelector } from 'react-redux';
import { Flex } from '../../components/Flex';
import { FlexSpaceBetween } from '../../components/FlexSpaceBetween';
import {SubmitButton} from '../../components/SubmitButton';
import { FlexCenter } from '../../components/FlexCenter';
import printReport from "../../assets/icons/printReport.svg"
import { useTheme } from '@emotion/react';
import { useTranslation } from 'react-i18next';

const Parent = styled("div")(({ theme }) => ({
    padding : "20px" ,
    backgroundColor : "#fff" ,
    marginTop : "20px" ,
    borderRadius : "10px" ,
    overflow : "auto" , 
    
}));
const Header = styled(FlexSpaceBetween)(({ theme }) => ({
  alignItems : "center" ,
  fontWeight : "600" , 
  // border: "1px solid red "
}));
const TitleDiv = styled(FlexCenter)(({ theme }) => ({
    
}));
const TileContainer = styled(FlexCenter)(({ theme }) => ({

  [theme.breakpoints.down('500')]: {
    flexDirection : "column" ,
  },
    
}));
const Title = styled("div")(({ theme }) => ({
  fontSize : "24px" , 
  fontWeight : "600" , 
  margin : "0 5px 0 10px" , 
}));
const BlueCircle = styled("div")(({ theme }) => ({
    width : "18px" , 
    height : "18px" ,
    backgroundColor : Colors.main ,
    borderRadius : "50%" ,
}));
const MissionsNumber = styled("div")(({ theme }) => ({
    fontSize : "16px" , 
    fontWeight : "600" , 
    color : Colors.gray ,

}));
const PrintDiv = styled("div")(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: Colors.main,
  color : "#fff" ,
  width: 'fit-content',
  height: 'fit-content',
  borderRadius: '5.76px',
  padding : "5px 20px " , 
  margin : "0" , 
  transition : "all 0.3s ease-in-out" ,
  "&:hover" : {
    cursor : "pointer" , 
    backgroundColor : Colors.hoverMain ,
  }
}));
const Print = styled(FlexCenter)(({ theme }) => ({
    fontSize : "24px" , 
}));
const PrintImg = styled("img")(({ theme }) => ({
  margin : theme.direction === "ltr" ? "0 10px 0 0" : "0 0 0 10px" ,
}));
const RateOrMissions = styled(Flex)(({ theme }) => ({
  margin : "20px 0px" , 
  borderBottom : `1px solid ${Colors.grayDC}` ,
  width : "260px" ,  
}));
const Tab = styled("div")(({ theme }) => ({
  width : "fit-content" , 
  color : Colors.gray ,
  cursor : "pointer" ,
  paddingBottom : "10px" , 
  margin : theme.direction === "ltr" ? "0 20px 0 0" : "0 0 0 20px" ,
  "&:hover" : {
    color : Colors.main ,
    borderBottom : `1px solid ${Colors.main}` ,
  } , 
  "&.active" : {
    color : Colors.main ,
    borderBottom : `1px solid ${Colors.main}` ,
  } 
}));
const BarParent = styled("div")(({ theme }) => ({
    marginTop : "20px" ,
    minWidth : "700px" ,
    overflow : "auto" ,
    direction : "ltr" , 
    display : "flex" ,
    justifyContent : theme.direction =="rtl" ? "right" : "left" ,
}));
const Report = () => {
  const getBranchesData = useSelector(state => state.branchData.getBranchesData) ;
  const [branchesMissions , setBranchesMissions] = useState ([])
  const [branchesRates , setBranchesRates] = useState ([])
  const[NumberOfMissions , setNumberOfMissions] = useState (0)
  const [maxMission, setMaxMissions ] = useState(0) 

  useEffect(()=>{
    if (getBranchesData.status) {
      let numOfMissions = 0 ; 
      let Missions = [] ;
      let Rates = [] ; 
      let mxMission = 0 ; 
      for (let i = 0; i < getBranchesData.data.branches.length; i++) {
        let branchMissions = getBranchesData.data.branches[i].missions.length 
        numOfMissions +=  branchMissions ;
        Missions.push({
          name : getBranchesData.data.branches[i].name ,
          missions : branchMissions
        })
        Rates.push({
          name : getBranchesData.data.branches[i].name ,
          rate : parseFloat(getBranchesData.data.branches[i].generalRate)/20 
        })
        if (branchMissions >mxMission ) mxMission = branchMissions ; 
      }
      setMaxMissions(mxMission+5)
      setBranchesMissions(Missions)
      setNumberOfMissions(numOfMissions)
      setBranchesRates(Rates)
      console.log("Rates", Rates)
      console.log ("mxMission" , mxMission)
    }
  },[getBranchesData])

  
  const [showRate , setShowRate] = useState (true)
  const theme = useTheme() ; 
  const {t} = useTranslation()

  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      // Customize the tooltip content based on your data
      // `payload` is an array of objects representing the data for the hovered item
      const text = payload[0].name  ; 
      return (
        <FlexCenter
         style = {{
          flexDirection : "column" , 
          backgroundColor : "#fff" , 
          borderRadius : "5px" , 
          padding : "5px" , 
          border: `1px solid ${Colors.main}`
        }}
        >
          <div>{label}</div>
          <div> {t(`text.${text}`)} : {payload[0].value }</div>
        </FlexCenter>
      );
    }
  
    return null;
  };
  return (
    <>
        <Parent>
            <Header>
                <TitleDiv>
                  <BlueCircle/>
                  <TileContainer>
                    <Title> {t("text.Branches_Report")}  </Title>
                    <MissionsNumber> ( { NumberOfMissions} {t("text.Missions")} )</MissionsNumber>
                  </TileContainer>
                </TitleDiv>
                {/* <PrintDiv>
                  <Print>
                    <PrintImg src={printReport} alt="printReport" /> 
                    {t("text.print")}
                  </Print>
                </PrintDiv> */}
            </Header>
            <RateOrMissions>
              <Tab onClick={()=>{setShowRate(true)}} className = {showRate ? "active" : ""}>{t("text.rate")}   </Tab>
              <Tab onClick={()=>{setShowRate(false)}} className = {!showRate ? "active" : ""}> {t("text.missions")}  </Tab>
            </RateOrMissions>
            {showRate  ? 
              <BarParent>
                <BarChart
                  width={700}
                  height={350}
                  data={branchesRates}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                  barSize={20}
                >
                  <XAxis dataKey="name" scale="point" padding= {theme.direction === 'ltr' ? { left: 50, right: 30 } : { left: 30, right: 50 } } />
                  <YAxis 
                    domain={[0, 5]} 
                    tickCount={6}  
                    orientation= {theme.direction=="rtl" ?  "right" : "left"}

                  />
                  <Tooltip content={<CustomTooltip />}  />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Bar dataKey="rate" fill={Colors.main} background={{ fill: Colors.lightMain }} />
                </BarChart>
              </BarParent>     
              :
              <BarParent>
                <BarChart
                  width={700}
                  height={350}
                  data={branchesMissions}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                  barSize={20}
                >
                  <XAxis dataKey="name" scale="point" padding= {theme.direction === 'ltr' ? { left: 50, right: 30 } : { left: 30, right: 50 } } />
                  <YAxis domain={[0, maxMission]} tickCount={6} orientation= {theme.direction=="rtl" ?  "right" : "left"}/>
                  <Tooltip content={<CustomTooltip />} />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Bar dataKey="missions" fill={Colors.main} background={{ fill: Colors.lightMain }} />
                </BarChart>
              </BarParent>
            }
            

            
        </Parent>
    </>
  )
}

export default Report