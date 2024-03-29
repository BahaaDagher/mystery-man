import styled from '@emotion/styled';
import { Rating } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { FlexCenter } from '../../../components/FlexCenter';
import { FlexSpaceBetween } from '../../../components/FlexSpaceBetween';
import { Colors } from '../../../Theme';
import admin from "../../../assets/images/admin.png"
import blueSign from "../../../assets/icons/blueSign.svg"
import chatAvailable from "../../../assets/icons/chatAvailable.svg"
import { Flex } from '../../../components/Flex';

const Parent = styled("div")(({ theme }) => ({
  width : "50%" , 
  margin : "auto" ,
  [theme.breakpoints.down('900')]: {
    width : "70%" ,
  },
  [theme.breakpoints.down('500')]: {
    width : "100%" ,
  },
}));

const Container = styled("div")(({ theme }) => ({
    padding : "20px" ,
    borderRadius : "10px" ,
    borderTop : `2px solid ${Colors.main}` ,
    borderBottom : `2px solid ${Colors.main}` ,
    color : Colors.second , 
    margin : "10px" , 
}));
const Header = styled(FlexSpaceBetween)(({ theme }) => ({
    
}));
const Gender = styled("div")(({ theme }) => ({
    fontSize : "20px" ,
    fontWeight : "bold" ,
    
}));
const Rate = styled("div")(({ theme }) => ({
    
}));
const NameImage = styled(FlexCenter)(({ theme }) => ({
    // width : "50%" ,  
    flexDirection : "column" ,
    margin : "20px auto" ,
    
}));
const ImageDiv = styled("div")(({ theme }) => ({
    width : "200px" ,
    height : "200px" ,
    borderRadius : "50%" , 
    border : `2px solid ${Colors.main}` ,
    
  }));
  const MysteryImg = styled("img")(({ theme }) => ({
  borderRadius : "50%" , 
    width : "100%" , 
    height : "100%" , 
}));
const Name = styled("div")(({ theme }) => ({
    marginTop : "20px" , 
    fontSize : "20px" ,
    fontWeight : "bold" ,
    textAlign : "center" ,
}));
const Footer = styled(FlexSpaceBetween)(({ theme }) => ({
    alignItems : "center" ,
}));
const Chat = styled("div")(({ theme }) => ({
    cursor : "pointer" ,
}));
const ChatImg = styled("img")(({ theme }) => ({
    
}));
const CategoryDiv = styled(Flex)(({ theme }) => ({
    
}));
const Category = styled("div")(({ theme }) => ({
    padding : "5px 10px" , 
    color : "#fff" , 
    fontWeight : "bold" ,
    backgroundColor : "#605df9" ,
    borderRadius : "10px" ,
    margin : "0 5px" ,

}));
const MysteryProfile = ({missionDetails}) => {
  const [employee , setEmployee] = useState({})
  useEffect(() => {
    console.log(missionDetails)
    if (missionDetails) {
      const employees = missionDetails.employee
      for (let i = 0; i < employees.length; i++) {
        if (employees[i].status!= 0 && employees[i].status!= 3 ) {
            setEmployee(employees[i].user )
          break;
        }
      }
    }
  }
  , [missionDetails])

  useEffect(() => {
    console.log ("employeeeeee ",employee)
    console.log ("gender" , employee.gender)
  },[employee])
  const arr = ["مطاعم" , "كافيهات"]

  return (
    <>
      <Parent>
        <Container>
            <Header>
              <Gender>
                {employee.gender}
              </Gender>
              <Rate>
                {employee.rate ? 
                
                
                <Rating name="half-rating" defaultValue={employee.rate}  readOnly style = {{direction : "ltr" , fontSize : "30px" ,}}  precision={0.5}/>
                :''}
              </Rate>
            </Header>
            <NameImage>
              <ImageDiv>
                <MysteryImg src = {employee.image} alt = "photo"/>
              </ImageDiv>
              <Name>
                {employee.name} 
                  <img src = {blueSign} style = {{margin : "0 10px"}}/>
              </Name>
            </NameImage>
            <Footer>
              <CategoryDiv>
                  {employee.categories?.map((item , index) => {
                      return (
                          <Category key = {index}>{item.name}</Category>
                      )
                  })}
              </CategoryDiv>
              <Chat>
                <ChatImg src = {chatAvailable} />
              </Chat>
            </Footer>

        </Container>
      </Parent>
    </>
  )
}

export default MysteryProfile