import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react'
import { Colors } from '../../Theme';
import notificationImage from "../../assets/images/notification.svg"
import chatImage from "../../assets/images/chat.svg"
import adminImage from "../../assets/images/admin.png"
import LanguageIcon from '../../components/LanguageIcon';
import profileLogo from "../../assets/images/profileLogo.svg"
import Commercial_Registration from "../../assets/images/Commercial Registration.svg"
import trash  from "../../assets/icons/trash.svg"
import pinLocation from "../../assets/icons/pinLocation.svg"

import { useTranslation } from 'react-i18next';
import { LINK } from '../../components/LINK';
import { FlexDiv } from '../../components/FlexDiv';
import { Box, CircularProgress, Rating, useTheme } from '@mui/material';
import { Flex } from '../../components/Flex';
import { FlexSpaceBetween } from '../../components/FlexSpaceBetween';
import Map from '../../components/Map';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBranch, getBranches } from '../../store/slices/branchSlice';
import Loading from '../../components/Loading';
import Swal from 'sweetalert2';
import DataDiv from './DataDiv';

const Container = styled("div")(({ theme }) => ({
  minHeight : "100vh" , 
  minWidth : "100%" ,
  backgroundColor : Colors.body , 
  position : "relative" ,
  display: 'flex',
}));

const NavbarContainer = styled("div")(({ theme }) => ({
  height: '73px',
  width : `calc(100% - 10px )` ,
  margin : "0 5px" ,
  backgroundColor: "#fff", 
  borderRadius: '10px', 
  position : "fixed" , 
  top : "0" ,
  left : "0" ,
  display : "flex" ,
  justifyContent : "space-between" ,
  alignItems : "center" ,
  padding : "20px" ,
  direction : theme.direction , 
  zIndex : "5" ,
  [theme.breakpoints.down('500')]: {
    padding : "10px"
  },
  
}));
const InformationDiv = styled("div")(({ theme }) => ({
  display : "flex" ,
  alignItems : "center" , 
  justifyContent : "center" , 
}));

const Section = styled("div")(({ theme }) => ({
  display : "flex" ,
  justifyContent : "center" ,
  alignItems : "center" ,
  marginRight : theme.direction == "ltr" ? "20px" : "0px" , 
  marginLeft : theme.direction == "rtl" ? "20px" : "0px" , 
  cursor : "pointer" ,
  "&.company" : {
    flexDirection : "column" ,
    [theme.breakpoints.down('1200')]: {
      display : "none" ,
    },
  },
}));

const LanguageIconNavbar = styled(LanguageIcon)(({ theme }) => ({
  position : "relative" ,
}));

const Logo = styled(LINK)(({ theme }) => ({
   display : "flex" ,
    alignItems : "center" ,
    justifyContent : "center" ,
}));
const Img = styled("img")(({ theme }) => ({
  marginRight :theme.direction == "ltr"?   "10px" : "0px" ,
  marginLeft :theme.direction == "rtl"?   "10px" : "0px" ,
  [theme.breakpoints.down('500')]: {
    width :"100px"
  },
}));

const Content = styled("div")(({ theme }) => ({
  width : `calc(100% - 20px )` ,
  overflow : "auto" ,
  margin : " 20px 10px" ,
  marginTop : "90px" ,
  display : "flex" ,
  justifyContent : "space-between" ,
  direction : theme.direction , 
  [theme.breakpoints.down('800')]: {
    justifyContent : "center" ,
    flexDirection : "column" ,
  },
}));


const BranchesDiv = styled("div")(({ theme }) => ({
  width: `calc(100% - 364px - 10px)`,
  [theme.breakpoints.down('800')]: {
    width: "100%",
  },
}));

const NewBranchButton = styled("div")(({ theme }) => ({
  width: '190px',
  height: '60px',
  padding: '12px 43px',
  borderRadius: '10px',
  backgroundColor: Colors.main,
  color: '#fff',
  textAlign: 'center',
  cursor : "pointer" , 
  fontSize: '20px',
  fontWeight: 500,
  lineHeight: '37px',
  letterSpacing: '0em',
  transition: 'all 0.3s ease-in-out',
  marginTop : "20px" ,
  "&:hover" : {
    backgroundColor : Colors.hoverMain
  }
}));

const BranchesContainer = styled("div")(({ theme }) => ({
  margin : "10px 0 " , 
  display : "flex" ,
  flexWrap : "wrap" ,
}));

const BranchDetails = styled("div")(({ theme }) => ({
  width: '534px',
  borderRadius: '10px',
  backgroundColor: '#fff',
  margin : "10px" ,
  padding : "10px" ,
  [theme.breakpoints.down('1520')]: {
    width : "100%" , 
  },
}));

const IconDiv = styled("div")(({ theme }) => ({
  width: "34px" , 
  height: "34px",
  padding: "5px",
  borderRadius: "5px",
  gap: "10px",
  backgroundColor : Colors.blackRed , 
  display : "flex" , 
  justifyContent : "center" , 
  alignItems : "center" , 
  margin : "0 5px" ,
  cursor : "pointer" ,
  transition : "all 0.3s ease-in-out" ,
  "&:hover" : {
    backgroundColor : "#b9001d" 
  }

}));


const LocationDiv = styled("div")(({ theme }) => ({
  width: '100%',
  height: '200px',
  borderRadius: '10px',
  marginTop :"20px" , 
}));

const Profile = () => {
  const {t } = useTranslation();
  const theme = useTheme() ; 

  const getBranchesData = useSelector(state => state.branchData.getBranchesData) ;
  const getBranchesDataLoading = useSelector(state => state.branchData.getBranchesDataLoading) ;

  const dispatch = useDispatch() ;

  useEffect(()=>{
    if (getBranchesData.status) {
      console.log("getBranchesData" , getBranchesData.data.branches)
      setCurrentBranches(getBranchesData.data.branches)
    }
  },[getBranchesData])

  useEffect(()=>{
    dispatch(getBranches())
  },[])

  const BranchesArray = [
    {
      name : "MC zefta" , 
      rate : 5 , 
      address : "King Khalid Rd, Al Sanaiyyah, Al Duwadimi 17436, Saudi Arabia" , 
    } , 
    {
      name : "MC kafr qretna" , 
      rate : 3.5 , 
      address : "King Khalid Rd, Al Sanaiyyah, Al Duwadimi 17436, Saudi Arabia" , 
    } , 
    {
      name : "MC Cairo" , 
      rate : 1 , 
      address : "King Khalid Rd, Al Sanaiyyah, Al Duwadimi 17436, Saudi Arabia" , 
    } , 
  ]

  const [newBranch , setNewBranch] = useState(false) ; 
  const [currentBranches , setCurrentBranches] = useState ([])

 
  // delete branch 
  const deleteBranchData = useSelector(state => state.branchData.deleteBranchData) ;
  const deleteBranchLoading = useSelector(state => state.branchData.deleteBranchLoading) ;

  useEffect(()=>{
    if (deleteBranchData.status) {
      Swal.fire({
        icon: 'success',
        title: 'Deleted successfully',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(getBranches())
    }
  },[deleteBranchData])


  const delBranch = (index) => {
    const branchID = currentBranches[index].id ;
    console.log("currentBranches[index]" , branchID)
    dispatch(deleteBranch({id : branchID}))
  }

  return (
    <>
        {deleteBranchLoading ? <Loading/> : null}
        <Container>
          <NavbarContainer>
            <Logo to = "/dashboard">
              <Img src = {profileLogo} />
            </Logo>
            <InformationDiv>
              <Section>
                <LanguageIconNavbar Navbar= {true} />
              </Section>
              <Section>
                <img src = {notificationImage} alt = "notification"/>
              </Section>
              <Section >
                <img src = {chatImage} alt = "chat"/>
              </Section>
              <Section onClick={()=>{window.location = "/profile"}}>
                <img src = {adminImage} style = {{width : "40px" , height : "40px" ,   borderRadius : "50%" }} alt = "admin"/>
              </Section>
              <Section className = "company">
                <p style = {{color: Colors.second , weight : "400"}}>{t("text.company_name")}</p>
                <p style = {{color: Colors.gray , weight : "400"}}>+995 14231512154</p>
              </Section>
            </InformationDiv>
          </NavbarContainer>
          <Content>
            {/* first div data and information part */} 
            <DataDiv/>

            {/* second div branches part  */}
            <BranchesDiv>
              <NewBranchButton onClick= {()=>{window.location.href = '/newBranch'}}>New Branch</NewBranchButton>
              {getBranchesDataLoading ? <CircularProgress style = {{margin :"30px" , color : Colors.main}}/> : 
                <BranchesContainer>
                  {currentBranches.map((branch , index) => {
                    return (
                      <BranchDetails key= {index} >
                        <FlexSpaceBetween>
                          <Box>
                            <p style = {{color : Colors.second , fontSize : "18px"}}>{branch.name}</p>
                            <Rating name="half-rating" defaultValue={branch.rate} precision={0.5} readOnly style = {{direction : "ltr"}}/>
                          </Box>
                          <Flex>
                            <IconDiv>
                              <img src = {trash} onClick= {()=>{delBranch(index)}}/>
                            </IconDiv>
                          </Flex>
                        </FlexSpaceBetween>
                        <Flex>
                          <img src = {pinLocation}/>
                          <p style = {{margin : "0 5px"}}>{branch.address}</p>
                        </Flex>
                        <LocationDiv>
                          <Map  latPos = {parseFloat(branch.lat)} lngPos = {parseFloat(branch.long)} mapWidth={"100%"} mapHeight={"100%"} showSearch = {false}/>
                        </LocationDiv>
                      </BranchDetails>
                    )
                  })}
                </BranchesContainer>
              }
            </BranchesDiv>

          </Content>
        </Container>
    </>
  )
}
export default Profile