import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react'
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
import { useDispatch, useSelector } from 'react-redux';
import { addMissions } from '../../../store/slices/missionSlice';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const Parent = styled("div")(({ theme }) => ({
  width: '30%',
  height :"fit-content" , 
  display : "flex" ,
  flexDirection : "column" ,
  backgroundColor: "#fff",
  borderRadius: '10px',
  padding : "20px" ,
  marginBottom : "10px" ,
  
  [theme.breakpoints.down('850')]: {
    width: '100%',
  },
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
  fontSize: '25px',
  fontWeight: 500,
  lineHeight: '67px',
  color : Colors.main , 
  [theme.breakpoints.down('850')]: {
    fontSize: '36px', 
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
    missionSelectedQuestioniere,
    missionNotes , 
  } ) => {
    const [activePost , setActivePost] = useState(false)
    useEffect(() => {
      if(missionTitle && missionFocus && missionSelectedBranch && missionDate && missionTime1 && missionTime2  && missionSelectedQuestioniere>-1){
        setActivePost(true)
      }
      else {
        setActivePost(false)
      }
    },[ missionTitle , missionFocus , missionSelectedBranch , missionDate , missionTime1 , missionTime2 , missionVoucherChecked , missionVoucherValue , missionSelectedQuestioniere])
  
    const questionieresData = useSelector((state) => state.questioneirData.questionieres);
    const currentQuestioneir = useSelector((state) => state.questioneirData.currentQuestioneir);
    const missionData = {
      title : missionTitle , 
      foucs : missionFocus , 
      branch_id : missionSelectedBranch , 
      date : missionDate , 
      from : missionTime1 , 
      to : missionTime2 , 
      price : missionVoucherValue , 
      notes : missionNotes  ,
      questions: [questionieresData[currentQuestioneir]] , 
    }
    const [click , setClick] = useState(false)

    const addMissionsData = useSelector((state) => state.missionData.addMissionsData);
    
    const dispatch = useDispatch();
    const navigate = useNavigate() ; 

    useEffect(() => {
      if (addMissionsData.status) {
        Swal.fire('mission added successfully', '', 'success')
        window.location.href ="/dashboard/missions"
      }
    }, [addMissionsData])

    const handlePostMission = () => {
      Swal.fire({
        title: 'are you sure you want to add this mission?',
        showDenyButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: `No`,
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(addMissions(missionData))
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
      
    }
    const {t} = useTranslation();
    return (
    <>
      <Parent>
      { activePost==true ? 
        <PostMissionButton className="active" onClick={()=>handlePostMission()}>Post Mission</PostMissionButton>
        :
        <PostMissionButton >{t("text.Post_Mission")}</PostMissionButton>
      }
        <FocusChange>
            <FocusChangeLine>
              <FocusChangeTitle>
                <img src = {title}/>
                <Title>{t("text.Title")} & {t("text.Focus")}</Title>
              </FocusChangeTitle>
              <FocusChangeImg>
                <img src = {(missionTitle && missionFocus) ? checked : unchecked}/>
              </FocusChangeImg>
            </FocusChangeLine>
            
            <FocusChangeLine>
              <FocusChangeTitle>
                <img src = {branch}/>
                <Title>{t("text.Branch")}</Title>
              </FocusChangeTitle>
              <FocusChangeImg>
                <img src = {missionSelectedBranch ? checked :unchecked}/>
              </FocusChangeImg>
            </FocusChangeLine>

            <FocusChangeLine>
              <FocusChangeTitle>
                <img src = {newDate}/>
                <Title>{t("text.Date")}</Title>
              </FocusChangeTitle>
              <FocusChangeImg>
                <img src = { missionDate ? checked :unchecked}/>
              </FocusChangeImg>
            </FocusChangeLine>

            <FocusChangeLine>
              <FocusChangeTitle>
                <img src = {newTime}/>
                <Title>{t("text.Time")}</Title>
              </FocusChangeTitle>
              <FocusChangeImg>
                <img src = {missionTime1 && missionTime2 ? checked :unchecked}/>
              </FocusChangeImg>
            </FocusChangeLine>

            <FocusChangeLine>
              <FocusChangeTitle>
                <img src = {PurchaseVoucher}/>
                <Title>{t("text.Purchase_voucher")}</Title>
              </FocusChangeTitle>
              <FocusChangeImg>
                <img src = {missionVoucherChecked && missionVoucherValue ? checked :unchecked}/>
              </FocusChangeImg>
            </FocusChangeLine>

            <FocusChangeLine>
              <FocusChangeTitle>
                <img src = {Questionnaire}/>
                <Title>{t("text.Questionnaire")}</Title>
              </FocusChangeTitle>
              <FocusChangeImg>
                <img src = {missionSelectedQuestioniere >-1 ?checked :unchecked}/>
              </FocusChangeImg>
            </FocusChangeLine>

        </FocusChange>
        <TotalBalance>
          <Price>155.24 {t("text.SAR")}</Price>
          <p style = {{textAlign : "center" , fontSize : "12px", color: Colors.second}}>{t("text.total_balance")}</p>
        </TotalBalance>
        
      </Parent>
    </>
  )
}

export default FinishedData