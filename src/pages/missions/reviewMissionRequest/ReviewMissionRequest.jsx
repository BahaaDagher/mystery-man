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
import { accepetRequest, sendMissionPdf } from '../../../store/slices/missionSlice';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';
import { FlexSpaceBetween } from '../../../components/FlexSpaceBetween';
import jsPDF from 'jspdf';
import 'jspdf-font';
import html2canvas from 'html2canvas';
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
  gap : "10px" ,
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
    
  },
  "&.details-button" : {
    backgroundColor : Colors.main ,
    "&:hover" : {
      backgroundColor : Colors.hoverMain ,
    }
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
  const sendMissionPdfData = useSelector(state => state.missionData.sendMissionPdfData)
  const CurrentMissionEmployees = reviewRequestData.employee
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState('');
  const [pdfBlob, setPdfBlob] = useState(null);
  const [selectedEmployeeForPdf, setSelectedEmployeeForPdf] = useState(null);

  const dispatch = useDispatch()
  useEffect(()=>{
  
    console.log(accepetRequestData);
    if (accepetRequestData.status) {
          console.log(accepetRequestData);
          Swal.fire(accepetRequestData.message, '', 'success').then((result) => {
            if (result.isConfirmed) {
              // window.location.href ="/userDashboard/missions"
            }
          })
    }
  },[accepetRequestData])

  useEffect(() => {
    if (sendMissionPdfData.status) {
      console.log('PDF sent successfully:', sendMissionPdfData);
      Swal.fire('PDF Generated and Sent Successfully', '', 'success');
    } else if (sendMissionPdfData.error) {
      console.log('PDF sending failed:', sendMissionPdfData.error);
      Swal.fire('Failed to send PDF', sendMissionPdfData.error, 'error');
    }
  }, [sendMissionPdfData])

  // Cleanup PDF URL when component unmounts
  useEffect(() => {
    return () => {
      if (pdfPreviewUrl) {
        URL.revokeObjectURL(pdfPreviewUrl);
      }
    };
  }, [pdfPreviewUrl]);

  const generatePdfPreview = async (employee, companyName) => {
    // Create HTML content for the certificate
    const certificateHTML = `
      <div style="
        width: 800px; 
        height: 600px; 
        padding: 40px; 
        background: white; 
        font-family: Arial, sans-serif;
        direction: ltr;
      ">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="font-size: 24px; margin-bottom: 10px; color: #333;">Mission Assignment Certificate</h1>
          <h1 style="font-size: 24px; margin-bottom: 10px; color: #333; direction: rtl;">شهادة تعيين المهمة</h1>
        </div>
        
        <div style="margin-bottom: 20px;">
          <p style="font-size: 16px; margin: 10px 0;"><strong>Employee Name / اسم الموظف:</strong> ${employee.user.name}</p>
          <p style="font-size: 16px; margin: 10px 0;"><strong>Company Name / اسم الشركة:</strong> ${companyName}</p>
          <p style="font-size: 16px; margin: 10px 0;"><strong>Date / التاريخ:</strong> ${new Date().toLocaleDateString('ar-SA')}</p>
          ${reviewRequestData.name ? `<p style="font-size: 16px; margin: 10px 0;"><strong>Mission / المهمة:</strong> ${reviewRequestData.name}</p>` : ''}
          ${reviewRequestData.address ? `<p style="font-size: 16px; margin: 10px 0;"><strong>Location / الموقع:</strong> ${reviewRequestData.address}</p>` : ''}
        </div>
        
        <div style="margin-top: 30px; padding: 20px; border-top: 2px solid #333;">
          <p style="font-size: 14px; margin: 10px 0; line-height: 1.5;">
            This document certifies that the above employee has been assigned to this mission.
          </p>
          <p style="font-size: 14px; margin: 10px 0; line-height: 1.5; direction: rtl;">
            هذا المستند يؤكد أن الموظف المذكور أعلاه تم تعيينه لهذه المهمة.
          </p>
        </div>
      </div>
    `;

    // Create a temporary div to render the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = certificateHTML;
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '-9999px';
    document.body.appendChild(tempDiv);

    try {
      // Convert HTML to canvas
      const canvas = await html2canvas(tempDiv.firstElementChild, {
        width: 800,
        height: 600,
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      // Remove temporary div
      document.body.removeChild(tempDiv);

      // Create PDF
      const doc = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      
      // Calculate dimensions to fit the image properly
      const imgWidth = 190;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      doc.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);

      // Create blob for preview and sending
      const pdfBlob = doc.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      
      setPdfBlob(pdfBlob);
      setPdfPreviewUrl(pdfUrl);
      setSelectedEmployeeForPdf(employee);
      setShowPdfModal(true);
    } catch (error) {
      console.error('Error generating PDF:', error);
      // Fallback to simple PDF if html2canvas fails
      const doc = new jsPDF();
      doc.setFontSize(20);
      doc.text('Mission Assignment Certificate', 105, 30, { align: 'center' });
      doc.setFontSize(12);
      doc.text(`Employee Name: ${employee.user.name}`, 20, 60);
      doc.text(`Company Name: ${companyName}`, 20, 80);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 100);
      
      const pdfBlob = doc.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      
      setPdfBlob(pdfBlob);
      setPdfPreviewUrl(pdfUrl);
      setSelectedEmployeeForPdf(employee);
      setShowPdfModal(true);
    }
  }

  const handleSendPdf = () => {
    if (pdfBlob && selectedEmployeeForPdf) {
      dispatch(sendMissionPdf({
        missionId: missionId,
        pdfBlob: pdfBlob
      }));
      setShowPdfModal(false);
      if (pdfPreviewUrl) {
        URL.revokeObjectURL(pdfPreviewUrl);
      }
      setPdfPreviewUrl('');
      setPdfBlob(null);
      setSelectedEmployeeForPdf(null);
    }
  }

  const handleClosePdfModal = () => {
    setShowPdfModal(false);
    if (pdfPreviewUrl) {
      URL.revokeObjectURL(pdfPreviewUrl);
    }
    setPdfPreviewUrl('');
    setPdfBlob(null);
    setSelectedEmployeeForPdf(null);
  }
  
  const handleAccept = (CurrentMissionEmployee)=>{
    console.log(CurrentMissionEmployee.id);
    Swal.fire({
      title: t("text.are_you_sure_you_want_to_accept_this_visitor"),
      showDenyButton: true,
      confirmButtonText: t("text.Yes"),
      denyButtonText: t("text.No"),
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(accepetRequest({order_id:CurrentMissionEmployee.id , mission_id:missionId})).then((result) => {
          if (result.payload && result.payload.status) {
            // Check if reconnaissance is true before generating PDF
            if (reviewRequestData.reconnaissance) {
              // Generate PDF preview after successful acceptance
              const companyName = reviewRequestData.companyName || 'Unknown Company';
              generatePdfPreview(CurrentMissionEmployee, companyName).catch(error => {
                console.error('Error generating PDF:', error);
                Swal.fire('Error', 'Failed to generate PDF preview', 'error');
              });
            } else {
              // If reconnaissance is false, just show success message without PDF
              console.log('Reconnaissance is false, skipping PDF generation');
            }
          }
        })
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

  // Function to get Arabic letters
  const getArabicLetter = (index) => {
    const currentLanguage = localStorage.getItem("language") || "en";
    if (currentLanguage === "ar") {
      const arabicLetters = ['أ', 'ب', 'ج', 'د'];
      return arabicLetters[index] || String.fromCharCode(65 + index);
    } else {
      // English letters
      return String.fromCharCode(65 + index); // A, B, C, D
    }
  }

  // Get text direction based on language
  const textDirection = localStorage.getItem("language") === "ar" ? 'rtl' : 'ltr';

  const {t} = useTranslation() ; 
  return (
    <>
    <SmallContainer>
    <Place>
        <span>{t("text.Missions")}/ </span>
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
                <p> {item.user.info}</p>
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
            <AcceptButton className='details-button' onClick={()=>handleShowQuiz(item)}>{t("text.Details")}</AcceptButton>
            
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
              {t("text.Details")} - {selectedEmployee.user.name}
            </h3>
            <div
              onClick={handleCloseQuizModal}
              className="text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer"
            >
              ×
            </div>
          </div>
          
          <div className="p-6">
            {/* Employee Info Section */}
            {selectedEmployee.user.info && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">{t("text.Bio")}</h4>
                <p className="text-gray-700 leading-relaxed">{selectedEmployee.user.info}</p>
              </div>
            )}
            
            {/* Quiz Results Section */}
            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-3">{t("text.Quiz_Results")}</h4>
            </div>
            
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
                        <span className="font-medium">{getArabicLetter(0)}</span> 
                        <span className="font-medium mx-2">-</span> 
                        <span style={{direction: textDirection}}>{quiz.option_1}</span>
                        {/* {quiz.answer === 1 && <span className="ml-2 text-success">✓ {t("text.Correct_Answer")}</span>} */}
                      </div>
                      <div className={`p-2 rounded ${
                        // quiz.answer === 2 ? 'bg-lightSuccess border border-success' : 
                        'bg-gray-50'
                      }`}>
                        <span className="font-medium">{getArabicLetter(1)}</span> 
                        <span className="font-medium mx-2">-</span> 
                        <span style={{direction: textDirection}}>{quiz.option_2}</span>
                        {/* {quiz.answer === 2 && <span className="ml-2 text-success">✓ {t("text.Correct_Answer")}</span>} */}
                      </div>
                      <div className={`p-2 rounded ${
                        // quiz.answer === 3 ? 'bg-lightSuccess border border-success' : 
                        'bg-gray-50'
                      }`}>
                        <span className="font-medium">{getArabicLetter(2)}</span> 
                        <span className="font-medium mx-2">-</span> 
                        <span style={{direction: textDirection}}>{quiz.option_3}</span>
                        {/* {quiz.answer === 3 && <span className="ml-2 text-success">✓ {t("text.Correct_Answer")}</span>} */}
                      </div>
                      <div className={`p-2 rounded ${
                        // quiz.answer === 4 ? 'bg-lightSuccess border border-success' : 
                        'bg-gray-50'
                      }`}>
                        <span className="font-medium">{getArabicLetter(3)}</span> 
                        <span className="font-medium mx-2">-</span> 
                        <span style={{direction: textDirection}}>{quiz.option_4}</span>
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
                        {getArabicLetter(quiz.user_answer - 1)}
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

    {/* PDF Preview Modal */}
    {showPdfModal && pdfPreviewUrl && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              PDF Preview - Mission Certificate
            </h3>
            <div
              onClick={handleClosePdfModal}
              className="text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer"
            >
              ×
            </div>
          </div>
          
          <div className="p-6">
            <div className="mb-4">
              <p className="text-gray-600 mb-4">
                Review the PDF certificate for {selectedEmployeeForPdf?.user.name} before sending.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <iframe
                src={pdfPreviewUrl}
                className="w-full h-96"
                title="PDF Preview"
              />
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={handleClosePdfModal}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSendPdf}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Send PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  )
}

export default ReviewMissionRequest