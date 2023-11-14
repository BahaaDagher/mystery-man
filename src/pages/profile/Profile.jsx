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
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useTranslation } from 'react-i18next';
import { LINK } from '../../components/LINK';
import { FlexDiv } from '../../components/FlexDiv';
import { Box, CircularProgress, Rating, useTheme } from '@mui/material';
import { Flex } from '../../components/Flex';
import { FlexSpaceBetween } from '../../components/FlexSpaceBetween';
import  NavbarContainer from '../../components/NavbarContainer';
import Map from '../../components/Map';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBranch, getBranches } from '../../store/slices/branchSlice';
import Loading from '../../components/Loading';
import Swal from 'sweetalert2';
import DataDiv from './DataDiv';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../../store/slices/profileSlice';

const Container = styled("div")(({ theme }) => ({
  minHeight : "100vh" , 
  minWidth : "100%" ,
  backgroundColor : Colors.body , 
  position : "relative" ,
  display: 'flex',
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
  // marginTop : "20px" ,
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
  backgroundColor : Colors.red , 
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
    dispatch(getProfile())
  },[])

  const getProfileData = useSelector(state => state.profileData.getProfileData) ;
  const getProfileLoading = useSelector(state => state.profileData.getProfileLoading) ;

  useEffect(()=>{
    if (getProfileData.status) {
      console.log("getProfileData" , getProfileData.data)
      setProfileData(getProfileData.data.user)
    }
  },[getProfileData])

  const [newBranch , setNewBranch] = useState(false) ; 
  const [currentBranches , setCurrentBranches] = useState ([])
  const [profileData , setProfileData] = useState ({})

 
  // delete branch 
  const deleteBranchData = useSelector(state => state.branchData.deleteBranchData) ;
  const deleteBranchLoading = useSelector(state => state.branchData.deleteBranchLoading) ;

  useEffect(()=>{
    if (deleteBranchData.status) {
      Swal.fire({
        title: 'are you sure you want to delete this branch?',
        showDenyButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: `No`,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('branch deleted successfully', '', 'success')
          dispatch(getBranches())
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
    }
  },[deleteBranchData])


  const delBranch = (index) => {
    const branchID = currentBranches[index].id ;
    console.log("currentBranches[index]" , branchID)
    dispatch(deleteBranch({id : branchID}))
  }

  const navigate = useNavigate() ; 


  const Percent  = (str)=> {
    str =  str.replace(',', '.');
    console.log ("strrrrrr" , str)
    str = str/20
    return str 
  }
  return (
    <>
        {deleteBranchLoading ? <Loading/> : null}
        <Container>
          <NavbarContainer/>
          <Content>
            {/* first div data and information part */} 
            <DataDiv profileData = {profileData}/>

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
                            <Rating name="half-rating" defaultValue={Percent(branch.generalRate)} precision={0.5} readOnly style = {{direction : "ltr"}}/>
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