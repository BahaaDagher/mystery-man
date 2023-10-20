import styled from '@emotion/styled';
import React, { useState } from 'react'
import { Colors } from '../../Theme';
import notificationImage from "../../assets/images/notification.svg"
import chatImage from "../../assets/images/chat.svg"
import adminImage from "../../assets/images/admin.png"
import LanguageIcon from '../../components/LanguageIcon';
import profileLogo from "../../assets/images/profileLogo.svg"
import Commercial_Registration from "../../assets/images/Commercial Registration.svg"
import trash  from "../../assets/icons/trash.svg"
import edit from "../../assets/icons/edit.svg"
import pinLocation from "../../assets/icons/pinLocation.svg"

import { useTranslation } from 'react-i18next';
import { LINK } from '../../components/LINK';
import { FlexDiv } from '../../components/FlexDiv';
import { Box, Drawer, Rating, useTheme } from '@mui/material';
import { Flex } from '../../components/Flex';
import { FlexSpaceBetween } from '../../components/FlexSpaceBetween';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import Swal from 'sweetalert2';
import Warning from '../../components/Warning';

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
  direction : theme.direction
}));

const DataDiv = styled("div")(({ theme }) => ({
  width: '364px',
  borderRadius: '10px',
  backgroundColor: '#fff',
  padding : "20px" ,
  height : "fit-content" ,
}));
const PhotoAndName = styled(FlexDiv)(({ theme }) => ({
  width : "100%" , 
  display : "flex" , 
  flexDirection : "row" ,
  justifyContent : "flex-start" ,
}));

const Division = styled("div")(({ theme }) => ({
  width :"241px" , 
  height : "1px" ,
  backgroundColor : Colors.grayDC ,
  margin : "20px auto"
}));
const Part = styled("div")(({ theme }) => ({
  flexDirection : "row" ,
  justifyContent : "flex-start" ,
}));
const P1 = styled("div")(({ theme }) => ({
  fontSize : "18px" ,
  color : Colors.second
}));
const P2 = styled("div")(({ theme }) => ({
  color : Colors.gray_l ,
  fontSize : "14px"
}));
const CommercialRegistrationImgDiv = styled("div")(({ theme }) => ({
  width: '100%',
  height: '139px',
}));
const AvailableMission = styled("div")(({ theme }) => ({
  width: '100%',
  height: '62px',
  padding: '10px 45px', 
  borderRadius: '10px',
  backgroundColor: Colors.bgBL,
  display : "flex" , 
  justifyContent : "center" ,
  alignItems : "center" ,
  marginTop :"20px" , 
  [theme.breakpoints.down('500')]: {
    padding: '10px', 
  },
}));
const TotalBalance = styled("div")(({ theme }) => ({
  marginTop :"20px" , 
  width: '100%',
  height: '131px',
  padding: '20px  60px', 
  borderRadius: '10px',
  backgroundColor : Colors.lightMain , 
  border: `1px solid ${Colors.main}}`, 
  textAlign : "center" ,
}));

const Price = styled("p")(({ theme }) => ({
  fontSize: '36px',
  fontWeight: 500,
  lineHeight: '67px',
  color : Colors.main , 
  [theme.breakpoints.down('500')]: {
    fontSize: '20px', 
  },
  textAlign : "center" ,
}));

const BranchesDiv = styled("div")(({ theme }) => ({
  width: `calc(100% - 364px - 10px)`,
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
  height: '278px',
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
  "&.edit" : {
    backgroundColor : Colors.green
  } , 
  margin : "0 5px" ,
  cursor : "pointer" 
}));

const AddAnewBranch = styled("div")(({ theme }) => ({
  textAlign : "center" ,
  margin : "20px auto" ,
  backgroundColor : Colors.main ,
  color : "#fff" ,
  fontSize: '20px',
  width : "70%" ,
  padding : "10px" , 
  borderRadius: '10px',
  cursor : "pointer" ,
  transition: 'all 0.3s ease-in-out',
  "&:hover" : {
    backgroundColor : Colors.hoverMain
  } 
})); 

const Label = styled("label")(({ theme }) => ({
  display : "block" ,
  color : Colors.gray_l , 
  fontSize : "17px" , 

}));

const Profile = () => {
  const {t } = useTranslation();
  const theme = useTheme() ; 
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
  const [currentBranches , setCurrentBranches] = useState (BranchesArray)
  const [newBranch , setNewBranch] = useState(false) ; 

  // edit branch 
  const editBranch = (index) => {
   
  }



  // delete branch 
  const deleteBranch = (index) => {
    let newBranches = [...currentBranches]
    newBranches.splice(index , 1)
    setCurrentBranches(newBranches)
  }

  // start add new branch 
  const [branchName , setBranchName] = useState("")
  const [branchRate , setBranchRate] = useState(0)
  const [branchAddress , setBranchAddress] = useState("")
  const [openWarning , setOpenWarning] = useState(false) ;

  const handleRatingChange = (event, newRate) => {
    if (newRate !== null) {
      setBranchRate(newRate);
      console.log(branchRate)
    }
  };

  const addNewBranch = () => {
    if (!branchName || !branchAddress) {
      setOpenWarning(true)
      console.log ("showWarning" , openWarning)
    }
    else {
      let newBranches = [...currentBranches]
      newBranches.push({
        name : branchName ,
        rate : branchRate ,
        address : branchAddress
      })
      setCurrentBranches(newBranches)
      setNewBranch(false)
      setBranchName("")
      setBranchAddress("")
      setBranchRate(0)
    }
  }
  // end add new branch 

  return (
    <>
        <Container>
        <Warning text = "asdasdasdasdasd"/>
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
              <Section >
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
            <DataDiv>
                <PhotoAndName>
                    <Section >
                      <img src = {adminImage} style = {{width : "65px" , height : "65px" ,   borderRadius : "50%" }} alt = "admin"/>
                    </Section>
                    <div>
                      <p>Company_name</p>
                      <p>++995 14231512154</p>
                    </div>
                </PhotoAndName>
                <Division/>
                <Part>
                  <P1 >Jaddah, Any Location</P1>
                  <P2 > Company Location </P2>
                </Part>
                <Part>
                  <P1 >www.company.com</P1>
                  <P2 > Company Website </P2>
                </Part>
                <Part>
                  <P1>12151-5645-54113-54112</P1>
                  <P2> Commercial Registration No </P2>
                </Part>
                <CommercialRegistrationImgDiv>
                  <img src = {Commercial_Registration}  style = {{width : "100%" , height: "100%" ,  borderRadius: '10px',}}/>
                </CommercialRegistrationImgDiv>
                <AvailableMission>
                    <p style = {{padding : "0 20px" , fontSize : "32px" ,fontWeight : "bold" }}>06</p>
                    <p style = {{fontSize : "18px" , color : Colors.gray}}>Available Missions</p>
                </AvailableMission>
                <TotalBalance>
                  <Price>155.24 SAR</Price>
                  <p style = {{textAlign : "center" , fontSize : "12px", color: Colors.second}}>total balance</p>
                </TotalBalance>
            </DataDiv>

            {/* second div branches part  */}
            <BranchesDiv>
              <NewBranchButton onClick= {()=>{setNewBranch(true)}}>New Branch</NewBranchButton>
              <Drawer
                anchor= "left"
                variant="temporary"
                open={newBranch}
                onClose={()=> setNewBranch(false)}
                ModalProps={{
                  keepMounted: true,
                }}
                sx={{
                  display : "flex" ,
                  justifyContent : "center" ,
                  alignItems : "center" ,
                  "& .MuiDrawer-paper": {
                    borderRadius: "10px",
                    margin : "150px" , 
                    width : "50%" , 
                    height : "500px", 
                    padding : "10px" , 
                  },
                }}
              >
                <Label htmlFor="branchName" >Branch Name</Label>
                <Input 
                  style = {{border : `1px solid ${Colors.input}`}}
                  type="text"
                  id="branchName"
                  value={branchName}
                  onChange={(e)=>{setBranchName(e.target.value)}}
                />
                <Label htmlFor="branchAddress">Branch Address</Label>
                <Input 
                  style = {{border : `1px solid ${Colors.input}`}}
                  type="text"
                  id="branchAddress"
                  value={branchAddress}
                  onChange={(e)=>{setBranchAddress(e.target.value)}}
                />
                <Label htmlFor="dropdown">Branch Rate</Label>
                <Rating name="half-rating" defaultValue={branchRate} precision={0.5}  style = {{direction : "ltr"}} onChange={handleRatingChange} />

                <AddAnewBranch onClick= {addNewBranch}> Add New Branch </AddAnewBranch>

              </Drawer>
               
              { openWarning && <Warning openWarning= {openWarning} setOpenWarning ={setOpenWarning} text =  {theme.direction== "ltr" ? "Please fill all fields" : "من فضلك املأ كل الحقول"} />}



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
                            <img src = {trash} onClick= {()=>{deleteBranch(index)}}/>
                          </IconDiv>
                          <IconDiv className = "edit">
                            <img src = {edit} onClick= {()=>{editBranch(index)}} />
                          </IconDiv>
                        </Flex>
                      </FlexSpaceBetween>
                      <Flex>
                        <img src = {pinLocation}/>
                        <p style = {{margin : "0 5px"}}>{branch.address}</p>
                      </Flex>
                    </BranchDetails>
                  )
                })}
              </BranchesContainer>
            </BranchesDiv>

          </Content>
        </Container>
    </>
  )
}
export default Profile