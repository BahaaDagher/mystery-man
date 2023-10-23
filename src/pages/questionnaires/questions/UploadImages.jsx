import React, { useState } from 'react'
import RequiredOptional from './RequiredOptional'
import QuestionInput from './QuestionInput'
import styled from '@emotion/styled';
import { FlexCenter } from '../../../components/FlexCenter';
import DeleteIcon from './DeleteIcon';
import { Colors } from '../../../Theme';


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
  padding: "5px 80px 5px 80px",
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



const UploadImages = () => {
  const [radio,  setRadio] = useState('required');
  const [question, setQuestion] = useState('');
  const [photo, setPhoto] = useState(null);

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhoto(file);
    }
  };

  return (
    <Parent>
      <DeleteIcon />
      <RequiredOptional radio={radio} setRadio= {setRadio} />
      <QuestionInput question= {question} setQuestion= {setQuestion}/>
      <input
        id = "uploadFile"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handlePhotoChange}
      />
      <LabelFile htmlFor="uploadFile">Take photos</LabelFile>
    </Parent>
  )
}

export default UploadImages





