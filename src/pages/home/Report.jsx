import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react'
import { Colors } from '../../Theme';
import { Bar, BarChart, CartesianGrid, Label, Layer, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useSelector } from 'react-redux';
import { Flex } from '../../components/Flex';
import { FlexSpaceBetween } from '../../components/FlexSpaceBetween';
import {SubmitButton} from '../../components/SubmitButton';
import { FlexCenter } from '../../components/FlexCenter';
import printReport from "../../assets/icons/printReport.svg"
import { useTheme } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import ReactToPrint from 'react-to-print';
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import BlueLogo from "../../assets/images/BlueLogo.png"

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
  [theme.breakpoints.down('600')]: {
    flexDirection : "column" ,
    alignItems : "flex-start" ,
  },
}));
const TitleDiv = styled(FlexCenter)(({ theme }) => ({
    
}));
const TileContainer = styled(FlexCenter)(({ theme }) => ({

  [theme.breakpoints.down('430')]: {
    flexDirection : "column" ,
    alignItems : "flex-start" ,
    marginBottom : "10px" ,
  },
}));
const Title = styled("div")(({ theme }) => ({
  fontSize : "24px" , 
  fontWeight : "600" , 
}));
const BlueCircle = styled("div")(({ theme }) => ({
    width : "18px" , 
    height : "18px" ,
    backgroundColor : Colors.main ,
    borderRadius : "50%" ,
    margin : theme.direction === "ltr" ? "0 10px 0 0" : "0 0 0 10px" ,
}));
const MissionsNumber = styled("div")(({ theme }) => ({
    fontSize : "16px" , 
    fontWeight : "600" , 
    color : Colors.gray ,
    margin : theme.direction === "ltr" ? "0 0 0 10px" : "0 10px 0 0" ,
    [theme.breakpoints.down('430')]: {
      margin : "0" ,
    },

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
  } , 
  "&.print" : {
    width : "100%" , 
    margin : "0px auto" ,
    backgroundColor: Colors.green,
    borderRadius: '10px 10px 0 0 ',
    "&:hover" : {
      backgroundColor : Colors.hoverGreen ,
    } , 
  }
}));
const Print = styled(FlexCenter)(({ theme }) => ({
    fontSize : "24px" , 
    margin : "0 10px" ,
    
}));
const PrintImg = styled("img")(({ theme }) => ({
  // margin : theme.direction === "ltr" ? "0 10px 0 0" : "0 0 0 10px" ,
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
    minWidth : "1150px" ,
    overflow : "auto" ,
    direction : "ltr" , 
    display : "flex" ,
    justifyContent : theme.direction =="rtl" ? "right" : "left" ,
}));



const LogoDiv = styled("div")(({ theme }) => ({
  display : "flex" , 
  justifyContent : "center" , 
}));
const Logo = styled("img")(({ theme }) => ({
  width : "200px" , 
}));

const InformationDiv = styled(FlexSpaceBetween)(({ theme }) => ({
  borderBottom : `1px solid ${Colors.grayDC}` ,
  marginBottom : "20px" ,
  padding : "10px" , 
  direction : theme.direction ,
}));
const Info = styled(Flex)(({ theme }) => ({
  fontSize : "20px"  , 
}));

const TabTitle = styled("div")(({ theme }) => ({
  fontWeight : "bold" , 
  margin : "0 10px" , 
  color : Colors.main ,
  
}));
const TabAnswer = styled("div")(({ theme }) => ({

}));

const PrintTitle = styled(Flex)(({ theme }) => ({
  direction : theme.direction ,
  color : Colors.gold ,
  fontWeight : "bold" , 
}));

const PrintContainer = styled("div")(({ theme }) => ({
  minWidth : "700px" ,
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
      const j = {} 
      for (let i = 0; i < getBranchesData.data.branches.length; i++) {
        if (j[getBranchesData.data.branches[i].name]) {
          continue ; 
        }
        else {
          j[getBranchesData.data.branches[i].name] = 1 ; 
        }

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
    }
  },[getBranchesData])

  
  const [showRate , setShowRate] = useState (true)
  
  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      // Customize the tooltip content based on your data
      // `payload` is an array of objects representing the data for the hovered item
      const text = payload[0]?.name  ; 
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
          <div> {t(`text.${text}`)} : {payload[0]?.value }</div>
        </FlexCenter>
      );
    }
    return null;
  };



  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');
  
    const currentDate = `${day}-${month}-${year}`;
    return currentDate;
  }


  // company name 

  const [CompanyName , setCompanyName] = useState ("")
  const getProfileData = useSelector(state => state.profileData.getProfileData) ;
  useEffect(()=>{
    if (getProfileData.status) {
      setCompanyName(getProfileData.data.user.name)
    }
  },[getProfileData])
  /////////////////////////////////////


  /// custome YAxeis 
  const CustomBar = (props) => {
    const { x, y, width, height } = props;
  
    return (
      <Layer>
        <rect x={x} y={y} width={width} height={height} fill={Colors.main} />
        <rect x={x} y={y} width={width} height={height} fill={Colors.lightMain} style={{ clipPath: 'url(#round-top)' }} />
      </Layer>
    );
  };

  // const CustomBar = (props) => {
  //   const { x, y, width, height } = props;
  
  //   return (
  //     <g>
  //       <rect x={x} y={y} width={width} height={height} rx={ "8 0 0 0" }   fill={Colors.main} />
  //     </g>
  //   );
  // };

  /////////////////////////////////////////////////
  const theme = useTheme() ; 
  const {t} = useTranslation()

  const sayed = [
    {
      name : "bahaa "  , 
      id : 6 , 
    } , 
    {
      name : "bahaa "  , 
      id : 7 , 
    } , 
    {
      name : "mohamed "  , 
      id : 8 , 
    } , 

  ]

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
                <PrintDiv onClick={handleOpen}> 
                  <PrintImg src={printReport} alt="printReport" /> 
                  <Print>
                    {t("text.print")}
                  </Print>
                </PrintDiv>
            </Header>
            <RateOrMissions>
              <Tab onClick={()=>{setShowRate(true)}} className = {showRate ? "active" : ""}>{t("text.rate")} </Tab>
              <Tab onClick={()=>{setShowRate(false)}} className = {!showRate ? "active" : ""}> {t("text.missions")} </Tab>
            </RateOrMissions>
            <BarParent >
              <BarChart
                width={1150}
                height={350}
                data= {showRate ? branchesRates  : branchesMissions }
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
                barSize={20}
              >
                <XAxis dataKey="name" scale="point" padding= {theme.direction === 'ltr' ? { left: 50, right: 30 } : { left: 50, right: 50 } } />
                <YAxis 
                  domain= { showRate ? [0, 5] : [0, maxMission] }    
                  tickCount={6} 
                  orientation= {theme.direction=="rtl" ?  "right" : "left"}
                />
                <Tooltip content={<CustomTooltip />}  />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey= { showRate ? "rate" : "missions" } fill={Colors.main} background={{ fill: Colors.lightMain }} rx={8} />
                {/* <Bar shape={<CustomBar />} dataKey="rate" /> */}
              </BarChart>
            </BarParent> 
            <Dialog
              open={open}
              onClose={handleClose}
              maxWidth="md"
              fullWidth
              aria-labelledby="popover-title"
            >
              <DialogContent id = "divToPrint">
                <PrintContainer>
                  <LogoDiv>
                    <Logo src = {BlueLogo}/>
                  </LogoDiv>
                  <InformationDiv>
                      <Info>
                          <TabTitle>{t("text.CompanyName")} : </TabTitle>
                          <TabAnswer>{CompanyName}</TabAnswer>
                      </Info>
                      <Info>
                          <TabTitle>{t("text.Date")} : </TabTitle>
                          <TabAnswer>{getCurrentDate()}</TabAnswer>
                      </Info>
                  </InformationDiv>
                  <PrintTitle> {t("text.General_rate")}   </PrintTitle>
                  <BarParent>
                    <BarChart
                      width={1150}
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
                  <PrintTitle> {t("text.Number_of_Missions")}  </PrintTitle>
                  <BarParent>
                    <BarChart
                      width={1150}
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
                </PrintContainer>
              </DialogContent>
                <ReactToPrint 
                    trigger={ () =>
                      <PrintDiv className = "print">
                        <PrintImg src={printReport} alt="printReport" /> 
                        <Print>
                          {t("text.print")}
                        </Print>
                      </PrintDiv>
                    }
                    content={ () => document.getElementById('divToPrint') }
                />
            </Dialog>
        </Parent>
        
    </>
  )
}

export default Report