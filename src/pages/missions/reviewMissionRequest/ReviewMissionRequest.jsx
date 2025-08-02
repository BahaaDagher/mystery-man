import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SmallContainer } from '../../../components/SmallContainer';
import { Colors } from '../../../Theme';
import { SubmitButton } from '../../../components/SubmitButton';
import { FlexDiv } from '../../../components/FlexDiv';
import adminImage from "../../../assets/images/admin.png"
import { Rating } from '@mui/material';
import { Flex } from '../../../components/Flex';
import { FlexCenter } from '../../../components/FlexCenter';
import { accepetRequest } from '../../../store/slices/missionSlice';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';
import { FlexSpaceBetween } from '../../../components/FlexSpaceBetween';
const Place = styled("div")(({ theme }) => ({
  marginBottom : "10px" ,
}));

const Parent = styled("div")(({ theme }) => ({
  width : "100%" , 
  borderRadius: '10px',
}));

const Line = styled(FlexSpaceBetween)(({ theme }) => ({
  width : "100%" , 
  borderRadius: '5px',
  padding : "10px", 
  marginBottom : "20px" ,
  backgroundColor : "#fff" , 
  [theme.breakpoints.down('600')]: {
    flexDirection : "column" ,
    // alignItems : "center" ,
  
  }
}));

const PhotoAndName = styled(Flex)(({ theme }) => ({
  // width : "100%" , 
  flexDirection : "row" ,
  justifyContent : "flex-start" ,
  [theme.breakpoints.down('800')]: {
    justifyContent : "center" ,
  },
  [theme.breakpoints.down('600')]: {
    justifyContent : "space-between" ,
  }
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
const ButtonDiv = styled("div")(({ theme }) => ({

  display : "flex"  , 
  justifyContent : "center" ,
  alignItems : "center" ,
}));
const AcceptButton = styled(SubmitButton)(({ theme }) => ({
  backgroundColor : Colors.green ,
  padding : "0px 10px" ,  
  margin : "0" , 
  "&:hover" : {
    backgroundColor : Colors.hoverGreen ,
  
  }

}));

const CategoryDiv = styled(FlexCenter)(({ theme }) => ({
    [theme.breakpoints.down('600')]: {
      margin : "10px 0" ,
    }
}));
const Category = styled(FlexCenter)(({ theme }) => ({
    height : "35px" ,  
    padding : "5px 10px" , 
    color : "#fff" , 
    fontWeight : "bold" ,
    backgroundColor : "#605df9" ,
    borderRadius : "10px" ,
    margin : "0 5px" ,

}));

const ReviewMissionRequest = ({reviewRequestData ,missionId}) => {
  const accepetRequestData = useSelector(state => state.missionData.accepetRequestData) 
  const CurrentMissionEmployees = reviewRequestData.employee
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const dispatch = useDispatch()
  useEffect(()=>{
  
    console.log(accepetRequestData);
    if (accepetRequestData.status) {
          console.log(accepetRequestData);
          Swal.fire(accepetRequestData.message, '', 'success').then((result) => {
            if (result.isConfirmed) {
              window.location.href ="/userDashboard/missions"
            }
          })
    }
  },[accepetRequestData])

  
  const handleAccept = (CurrentMissionEmployee)=>{
    console.log(CurrentMissionEmployee.id);
    Swal.fire({
      title: t("text.are_you_sure_you_want_to_accept_this_visitor"),
      showDenyButton: true,
      confirmButtonText: t("text.Yes"),
      denyButtonText: t("text.No"),
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(accepetRequest({order_id:CurrentMissionEmployee.id , mission_id:missionId}))
      } else if (result.isDenied) {
        Swal.fire(t("text.Changes_are_not_saved"), '', 'info')
      }
    })

  }

  const handleShowQuiz = (employee) => {
    setSelectedEmployee(employee);
    setShowQuizModal(true);
  }

  const handleCloseQuizModal = () => {
    setShowQuizModal(false);
    setSelectedEmployee(null);
  }

  const {t} = useTranslation() ; 
  return (
    <>
    <SmallContainer>
    <Place>
        <span>Missions/ </span>
        <span style = {{color : Colors.main}}>{t("text.Review_Requests")} </span>
    </Place>
    <Parent>
    {CurrentMissionEmployees?.map((item , index) => {
      return (
      <Line>
          <PhotoAndName>
              <Section>
                <img src = {item.user.image} style = {{width : "65px" , height : "65px" ,   borderRadius : "50%" }} alt = "pic"/>
              </Section>
              <div>
                <p>{item.user.name}</p>
                <Rating name="half-rating" defaultValue={item.user.rate} precision={0.5} readOnly style = {{direction : "ltr"}}/>
              </div>
          </PhotoAndName>
          <CategoryDiv>
                  {item.user.categories?.map((item , index) => {
                      return (
                          <Category key = {index}>{item.name}</Category>
                      )
                  })}
            </CategoryDiv>
          <ButtonDiv>
            <AcceptButton onClick={()=>handleAccept(item)}>{t("text.Accept")}</AcceptButton>
            <div 
              onClick={() => handleShowQuiz(item)}
              className="ms-2 cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              {t("text.Show_Quiz")}
            </div>
          </ButtonDiv>
      </Line> 
      ) 
    }
    )}
      
    </Parent>
    </SmallContainer>

    {/* Quiz Modal */}
    {showQuizModal && selectedEmployee && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              {t("text.Quiz_Results")} - {selectedEmployee.user.name}
            </h3>
            <div
              onClick={handleCloseQuizModal}
              className="text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer"
            >
              ×
            </div>
          </div>
          
          <div className="p-6">
            {selectedEmployee.quiz_request && selectedEmployee.quiz_request.length > 0 ? (
              <div className="space-y-4">
                {selectedEmployee.quiz_request.map((quiz, index) => (
                  <div key={quiz.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">
                        {t("text.Question")} {index + 1}
                      </h4>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        quiz.is_correct 
                          ? 'bg-lightSuccess text-success' 
                          : 'bg-lightFailed text-failed'
                      }`}>
                        {quiz.is_correct ? t("text.Correct") : t("text.Incorrect")}
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-3">{quiz.question}</p>
                    
                    <div className="space-y-2">
                      <div className={`p-2 rounded ${
                        // quiz.answer === 1 ? 'bg-lightSuccess border border-success' : 
                        'bg-gray-50'
                      }`}>
                        <span className="font-medium">A:</span> {quiz.option_1}
                        {/* {quiz.answer === 1 && <span className="ml-2 text-success">✓ {t("text.Correct_Answer")}</span>} */}
                      </div>
                      <div className={`p-2 rounded ${
                        // quiz.answer === 2 ? 'bg-lightSuccess border border-success' : 
                        'bg-gray-50'
                      }`}>
                        <span className="font-medium">B:</span> {quiz.option_2}
                        {/* {quiz.answer === 2 && <span className="ml-2 text-success">✓ {t("text.Correct_Answer")}</span>} */}
                      </div>
                      <div className={`p-2 rounded ${
                        // quiz.answer === 3 ? 'bg-lightSuccess border border-success' : 
                        'bg-gray-50'
                      }`}>
                        <span className="font-medium">C:</span> {quiz.option_3}
                        {/* {quiz.answer === 3 && <span className="ml-2 text-success">✓ {t("text.Correct_Answer")}</span>} */}
                      </div>
                      <div className={`p-2 rounded ${
                        // quiz.answer === 4 ? 'bg-lightSuccess border border-success' : 
                        'bg-gray-50'
                      }`}>
                        <span className="font-medium">D:</span> {quiz.option_4}
                        {/* {quiz.answer === 4 && <span className="ml-2 text-success">✓ {t("text.Correct_Answer")}</span>} */}
                      </div>
                    </div>
                    
                    <div className={`mt-3 p-2 rounded ${
                      quiz.is_correct ? 'bg-lightSuccess' : 'bg-lightFailed'
                    }`}>
                      <span className={`font-medium ${
                        quiz.is_correct ? 'text-success' : 'text-failed'
                      }`}>{t("text.User_Answer")}: </span>
                      <span className={`${
                        quiz.is_correct ? 'text-success' : 'text-failed'
                      }`}>
                        {quiz.user_answer === 1 ? 'A' : 
                         quiz.user_answer === 2 ? 'B' : 
                         quiz.user_answer === 3 ? 'C' : 'D'}
                      </span>
                    </div>
                  </div>
                ))}
                
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">{t("text.Total_Questions")}:</span>
                    <span className="font-bold">{selectedEmployee.quiz_request.length}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-medium text-gray-700">{t("text.Correct_Answers")}:</span>
                    <span className="font-bold text-success">
                      {selectedEmployee.quiz_request.filter(q => q.is_correct).length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-medium text-gray-700">{t("text.Score")}:</span>
                    <span className="font-bold text-blue-600">
                      {Math.round((selectedEmployee.quiz_request.filter(q => q.is_correct).length / selectedEmployee.quiz_request.length) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">{t("text.No_Quiz_Data_Available")}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )}
    </>
  )
}

export default ReviewMissionRequest