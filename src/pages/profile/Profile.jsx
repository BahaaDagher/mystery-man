import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react'
import { Colors } from '../../Theme';

import trash  from "../../assets/icons/trash.svg"
import EditBranch  from "../../assets/icons/EditBranch.svg"
import pinLocation from "../../assets/icons/pinLocation.svg"
import { useTranslation } from 'react-i18next';
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
import { FlexCenter } from '../../components/FlexCenter';
import Wallet from './wallet/Wallet';
import DateRangePickerComponent from '../../components/DateRangePickerComponent';

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
  // border : `1px solid ${Colors.gold}` , 
  [theme.breakpoints.down('800')]: {
    width: "100%",
  },
}));



const BranchesContainer = styled("div")(({ theme }) => ({
  // margin : "10px 0 " , 
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
  border : `1px solid ${Colors.gold}` ,
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
const BranchRating = styled(Rating)(({ theme }) => ({
  direction : "ltr"
}));

const TabButton = styled("div")(({ theme, active }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 'fit-content',
  margin: theme.direction === 'rtl' ? '0 0 0 10px' : '0 10px 0 0',
  padding: '10px 20px',
  color: active ? '#fff' : '#000',
  backgroundColor: active ? Colors.main : '#fff',
  borderRadius: '10px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: active ? Colors.main : '#f0f0f0'
  }
}));

const NewBranchButton = styled(TabButton)(({ theme }) => ({
  backgroundColor : "#000" ,
  color : "#fff" , 
  '&:hover': {
    backgroundColor: "#000", 
  }
}));

const Profile = () => {
  const [activeTab, setActiveTab] = useState('branches'); // 'branches' or 'wallet'
  const [dateRange, setDateRange] = useState(null);
  
  const {t} = useTranslation();
  const theme = useTheme() ;

  const getBranchesData = useSelector(state => state.branchData.getBranchesData) ;
  const getBranchesDataLoading = useSelector(state => state.branchData.getBranchesDataLoading) ;

  const dispatch = useDispatch() ;

  useEffect(()=>{
    if (getBranchesData?.status) {
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
    if (getProfileData?.status) {
      console.log("getProfileData" , getProfileData.data)
      setProfileData(getProfileData.data.user)
    }
  },[getProfileData])

  const [newBranch , setNewBranch] = useState(false) ; 
  const [currentBranches , setCurrentBranches] = useState ([])
  const [profileData , setProfileData] = useState ({})
  const [clickDelete , setClickDelete] = useState (false)

  // delete branch 
  const deleteBranchData = useSelector(state => state.branchData.deleteBranchData) ;
  const deleteBranchLoading = useSelector(state => state.branchData.deleteBranchLoading) ;

  useEffect(()=>{
    if (deleteBranchData.status && clickDelete) {
      Swal.fire(t("text.branch_deleted_successfully"), '', 'success')
      dispatch(getBranches())
    }
  },[deleteBranchData])


  const delBranch = (index) => {
    const branchID = currentBranches[index].id ;
    console.log("currentBranches[index]" , branchID)
    
    // Show confirmation dialog before deleting
    Swal.fire({
      title: t("text.are_you_sure_you_want_to_delete_this_branch"),
      showDenyButton: true,
      confirmButtonText: t("text.Yes"),
      denyButtonText: t("text.No"),
    }).then((result) => {
      if (result.isConfirmed) {
        setClickDelete(true)
        dispatch(deleteBranch({id : branchID}))
      }
    })
  }

  const navigate = useNavigate() ; 

  const Percent  = (str)=> {
    str =  str.replace(',', '.');
    console.log ("strrrrrr" , str)
    str = str/20
    return str 
  }

  const handleDateRangeChange = (range) => {
    setDateRange(range);
    console.log('Selected date range:', range);
    // You can add your logic here to handle the date range change
  }

  return (
    <>
        {deleteBranchLoading || getBranchesDataLoading? <Loading/> : null}
        <Container>
          <NavbarContainer/>
          <Content>
            {/* first div data and information part */} 
            <DataDiv profileData = {profileData}/>

            {/* second div branches part  */}

            <BranchesDiv>

              <div className='flex justify-between items-center mb-[20px]' > 
                <div className='flex justify-between items-center' >
                  <TabButton 
                    active={activeTab === 'branches'}
                    onClick={() => setActiveTab('branches')}
                  >
                    Branches
                  </TabButton>
                  <TabButton 
                    active={activeTab === 'wallet'}
                    onClick={() => setActiveTab('wallet')}
                  >
                    My Wallet
                  </TabButton>
                </div>
                <div className='flex justify-between items-center' >
                  {activeTab === 'branches' && (
                    <NewBranchButton onClick= {()=>{window.location.href = '/newBranch'}}>
                      + {t("text.NewBranch")}
                    </NewBranchButton>
                  )}
                  {/* {activeTab === 'wallet' && (
                    <DateRangePickerComponent onDateChange={handleDateRangeChange} />
                  )} */}
                </div>
              </div>

              {activeTab === 'branches' && (
                <>
                  <BranchesContainer>
                    {currentBranches.map((branch , index) => {
                      return (
                        <BranchDetails key= {index} >
                          <FlexSpaceBetween>
                            <Box>
                              <p style = {{color : Colors.second , fontSize : "18px"}}>{branch.name}</p>
                              <BranchRating name="half-rating" defaultValue={Percent(branch.generalRate)} precision={0.5} readOnly />
                            </Box>
                            <Flex>
                              <IconDiv>
                                <img src = {trash} onClick= {()=>{delBranch(index)}}/>
                              </IconDiv>
                              <IconDiv onClick={() => navigate('/editBranch', { state: { branchData: branch } })}>
                                <img src = {EditBranch} />
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
                </>
              )}

              {activeTab === 'wallet' && (
                <div >
                  <Wallet/>
                </div>
              )}
              
            </BranchesDiv>

          </Content>
        </Container>
    </>
  )
}

export default Profile