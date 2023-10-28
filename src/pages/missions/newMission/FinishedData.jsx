import styled from '@emotion/styled';
import React from 'react'
import { FlexCenter } from '../../../components/FlexCenter';
import { Colors } from '../../../Theme';
import { FlexSpaceBetween } from '../../../components/FlexSpaceBetween';
import unchecked from '../../../assets/icons/unchecked.svg';
import checked from '../../../assets/icons/checked.svg';
import newTime from '../../../assets/icons/newTime.svg';
import newDate from '../../../assets/icons/newDate.svg';
import title from '../../../assets/icons/title.svg';
import branch from '../../../assets/icons/branch.svg';
import PurchaseVoucher  from '../../../assets/icons/PurchaseVoucher.svg';
import Questionnaire from '../../../assets/icons/Questionnaire.svg';
import { Flex } from '../../../components/Flex';


const Parent = styled("div")(({ theme }) => ({
  width: '25%',
  height :"fit-content" , 
  display : "flex" ,
  flexDirection : "column" ,
  backgroundColor: "#fff",
  borderRadius: '10px',
  padding : "20px" , 
}));

const PostMissionButton = styled(FlexCenter)(({ theme }) => ({
  width: '100%',
  backgroundColor: Colors.grayDC,
  marginBottom : "50px" ,
  height: '60px',
  borderRadius: '10px',
  border: "none" , 
  color : "#fff" , 
  fontSize : "20px" ,
  "&.active" :  {
    backgroundColor: Colors.main,
    cursor : "pointer" ,
  }
}));

const FocusChange = styled("div")(({ theme }) => ({

}));

const FocusChangeLine = styled(FlexSpaceBetween)(({ theme }) => ({
  marginBottom : "10px" ,
}));
const FocusChangeTitle = styled(Flex)(({ theme }) => ({

}));
const Title = styled("div")(({ theme }) => ({
  fontSize : "16px" , 
  margin : theme.direction =="ltr" ? "0 0 0 10px" : "0 10px 0 0" ,
}));
const FocusChangeImg = styled(FlexCenter)(({ theme }) => ({

}));
const TotalBalance = styled("div")(({ theme }) => ({
  marginTop :"100px" , 
  width: '100%',
  height: '131px',
  padding: '20px', 
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

const FinishedData = (
   {
    missionTitle ,
    missionFocus ,
    missionSelectedBranch ,
    missionDate ,
    missionTime1 , 
    missionTime2 ,
    missionVoucherChecked ,
    missionVoucherValue ,
  } ) => {
  return (
    <>
      <Parent>
      <PostMissionButton className='active'>Post Mission</PostMissionButton>
        <FocusChange>
            <FocusChangeLine>
              <FocusChangeTitle>
                <img src = {title}/>
                <Title>Title & Focus</Title>
              </FocusChangeTitle>
              <FocusChangeImg>
                <img src = {(missionTitle && missionFocus) ? checked : unchecked}/>
              </FocusChangeImg>
            </FocusChangeLine>
            
            <FocusChangeLine>
              <FocusChangeTitle>
                <img src = {branch}/>
                <Title>Branch</Title>
              </FocusChangeTitle>
              <FocusChangeImg>
                <img src = {missionSelectedBranch ? checked :unchecked}/>
              </FocusChangeImg>
            </FocusChangeLine>

            <FocusChangeLine>
              <FocusChangeTitle>
                <img src = {newDate}/>
                <Title>Date</Title>
              </FocusChangeTitle>
              <FocusChangeImg>
                <img src = { missionDate ? checked :unchecked}/>
              </FocusChangeImg>
            </FocusChangeLine>

            <FocusChangeLine>
              <FocusChangeTitle>
                <img src = {newTime}/>
                <Title>Time</Title>
              </FocusChangeTitle>
              <FocusChangeImg>
                <img src = {missionTime1 && missionTime2 ? checked :unchecked}/>
              </FocusChangeImg>
            </FocusChangeLine>

            <FocusChangeLine>
              <FocusChangeTitle>
                <img src = {PurchaseVoucher}/>
                <Title>Purchase voucher</Title>
              </FocusChangeTitle>
              <FocusChangeImg>
                <img src = {missionVoucherChecked && missionVoucherValue ? checked :unchecked}/>
              </FocusChangeImg>
            </FocusChangeLine>

            <FocusChangeLine>
              <FocusChangeTitle>
                <img src = {Questionnaire}/>
                <Title>Questionnaire</Title>
              </FocusChangeTitle>
              <FocusChangeImg>
                <img src = {unchecked}/>
              </FocusChangeImg>
            </FocusChangeLine>

        </FocusChange>
        <TotalBalance>
          <Price>155.24 SAR</Price>
          <p style = {{textAlign : "center" , fontSize : "12px", color: Colors.second}}>total balance</p>
        </TotalBalance>
        
      </Parent>
    </>
  )
}

export default FinishedData