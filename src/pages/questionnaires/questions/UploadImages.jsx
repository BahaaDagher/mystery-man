import React, { useEffect, useState } from 'react'
import RequiredOptional from './RequiredOptional'
import QuestionInput from './QuestionInput'
import styled from '@emotion/styled';
import { FlexCenter } from '../../../components/FlexCenter';
import DeleteIcon from './DeleteIcon';
import { Colors } from '../../../Theme';
import { useDispatch, useSelector } from 'react-redux';
import { setQuestionDetails } from '../../../store/slices/questionierSlice';
import { useTranslation } from 'react-i18next';


const Parent = styled("div")(({ theme }) => ({
  backgroundColor : "#fff" ,
  padding : "20px" ,
  margin : "15px 0 " ,
  borderRadius : "10px" ,
  position : "relative" , 
}));
const LabelFile = styled("label")(({ theme }) => ({
  display: "inline-block",
  width : "80%" , 
  margin: "auto",
  textTransform: "uppercase",
  color: Colors.main,
  backgroundColor: Colors.lightMain,
  textAlign: "center",
  padding: "5px",
  letterSpacing: "1.5px",
  cursor: "pointer",
  borderRadius: "10px",
  transition: "all 0.3s ease-in-out",
  border : `1px solid ${Colors.main}` , 
  "&:active": {
      transform: "scale(0.8)",
  } , 
  "&:hover": {
    backgroundColor: Colors.main[2],
  } , 
  [theme.breakpoints.down("500")]: { 
    fontSize: "18px",
  }
})) 



const UploadImages = ({questionData,index ,setIsApplyFocus}) => {
  const [radio,  setRadio] = useState(questionData.required);
  const [question, setQuestion] = useState(questionData.title);
  const [photo, setPhoto] = useState(null);
  const isReadyToSend = useSelector((state) => state.questioneirData.isReadyToSend);
  const dispatch = useDispatch() ; 
  useEffect(()=>{
    const data ={
      type:questionData.type,
     
      title:question,
    }
    dispatch(setQuestionDetails({index:index ,data:data}))
  },[question])
  useEffect(()=>{
    const data ={
      type:questionData.type,
      required:radio,

    }
    dispatch(setQuestionDetails({index:index ,data:data}))
  },[radio])

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhoto(file);
    }
  };
  const {t} = useTranslation() ; 
  return (
    <Parent>
       <DeleteIcon index={index} setIsApplyFocus={setIsApplyFocus}/>
      <RequiredOptional radio={questionData} setRadio= {setRadio} />
      <QuestionInput question= {questionData} setQuestion= {setQuestion}/>
      <input
        id = "uploadFile"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handlePhotoChange}
      />
      <LabelFile htmlFor="uploadFile">{t("text.TakePhotos")}</LabelFile>
    </Parent>
  )
}

export default UploadImages





