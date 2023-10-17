import React, { useState } from 'react'
import { Container } from '../../components/Container'
import { H3 } from '../../components/H3'
import { Input } from '../../components/Input'
import { Colors } from '../../Theme'
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next'
import LanguageIcon from '../../components/LanguageIcon'
import LabelFile from '../../components/LabelFile'
import { FlexDiv } from '../../components/FlexDiv'
import { SubmitButton } from '../../components/SubmitButton'
import camera from "../../assets/icons/camera.svg"
import file_text from "../../assets/icons/file-text.svg"
import { useDispatch } from 'react-redux'
import authSlice, { userRegister } from '../../store/slices/authSlice'

const InsideContainer = styled("div")(({ theme }) => ({
  width : "30%" ,
  [theme.breakpoints.down("1200")]: {
    width : "40%" ,
  },
  [theme.breakpoints.down("1000")]: {
    width : "60%" ,
  },
  [theme.breakpoints.down("700")]: {
    width : "90%" ,
  },
}));

const InputDiv = styled("div")(({ theme }) => ({
  width :  "100%" , 
  marginBottom : "20px" ,
}));

const CameraDiv = styled(FlexDiv)(({ theme }) => ({
  width : "100px" ,
  height : "100px" , 
  margin : "auto" ,
  backgroundColor : "#fff" ,
  borderRadius : "50%" ,
}));


const InputInformation = styled("div")(({ theme }) => ({
}));

const EnterData = () => {
  const [commercialRegisterFile, setCommercial_registration_file] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [Phone_Number , setPhone_number] = useState("")
  const [company_name , setCompany_name] = useState("")
  const [company_website , setCompany_website] = useState("")
  const [company_email , setCompany_email] = useState("")
  const [password , setPassword] = useState("")
  const [confirm_password , setConfirm_password] = useState("")
  const [commercial_registration_no , setCommercial_registration_no] = useState("")

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCommercial_registration_file(file);
    }
  };
  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedPhoto(file);
    }
  };
  const dispatch = useDispatch(); 

  const handleSubmit = () => {
    if (company_name && company_website && company_email && password && confirm_password && commercial_registration_no && commercialRegisterFile && selectedPhoto) 
    {
      if (password === confirm_password)  {
        const formData = new FormData();
        formData.append("company_name", company_name);
        formData.append("company_website", company_website);
        formData.append("company_email", company_email);
        formData.append("Phone_Number", Phone_Number);
        formData.append("password", password);
        formData.append("commercial_registration_no", commercial_registration_no);
        formData.append("commercial_registration_file", commercialRegisterFile);
        formData.append("selectedPhoto", selectedPhoto);
        console.log("sdfsdfsd");
        dispatch(userRegister(formData))
      }
      
    }
  }
  const {t} = useTranslation()
  return (
    <>
      <LanguageIcon className= "notNavbar"/>
      <Container>
        <InsideContainer>
              <input
                id = "uploadPhoto"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handlePhotoChange}
              />
              <label htmlFor='uploadPhoto' style = {{cursor : "pointer"}}>
                <CameraDiv>
                    <img
                      src = { selectedPhoto ? URL.createObjectURL(selectedPhoto) : camera }  
                      style = {{  width : selectedPhoto ? "100%" : "fit-content"  , height : selectedPhoto ? "100%" : "fit-content"  , borderRadius : "50%"}} alt=  "company logo"/>
                </CameraDiv>
              </label>
            <InputInformation>
              <InputDiv >
                  <H3>{t("text.Company_name")}</H3>
                  <Input  placeholder={t("text.Company_name")} value ={company_name} onChange = {(e)=> setCompany_name(e.target.value)} />
              </InputDiv>
              <InputDiv>
                  <H3> {t("text.Phone_Number")}</H3>
                  <Input  placeholder={t("text.Phone_Number")} value ={Phone_Number} onChange = {(e)=> setPhone_number(e.target.value)}/>
              </InputDiv>
              <InputDiv>
                  <H3> {t("text.Company_Email")}</H3>
                  <Input  placeholder={t("text.Company_Email")} value ={company_email} onChange = {(e)=> setCompany_email(e.target.value)}/>
              </InputDiv>
              <InputDiv>
                  <H3>{t("text.Password")} </H3>
                  <Input type='password' placeholder={t("text.Password")} value ={password} onChange = {(e)=> setPassword(e.target.value)}/>
              </InputDiv>
              <InputDiv>
                  <H3>{t("text.Confirm_Password")} </H3>
                  <Input  type='password' placeholder={t("text.Confirm_Password")} value ={confirm_password} onChange = {(e)=> setConfirm_password(e.target.value)}/>
              </InputDiv>
            </InputInformation>
        </InsideContainer>
        <InsideContainer>
        <InputDiv>
                  <H3> {t("text.Company_Website")}</H3>
                  <Input  placeholder={t("text.Company_Website")} value ={company_website} onChange = {(e)=> setCompany_website(e.target.value)}/>
              </InputDiv>
          <InputDiv>
              <H3>{t("text.Commercial_Registration_No")} </H3>
              <Input type = "number"  placeholder={t("text.Commercial_Registration_No")} value ={commercial_registration_no} onChange = {(e)=> setCommercial_registration_no(e.target.value)}/>
          </InputDiv>
          <InputDiv>
              <H3>{t("text.Copy_of_the_commercial_register")} </H3>
              <FlexDiv style = {{border :` 1px dashed ${Colors.second}` ,  borderRadius : "10px" , padding : "20px 0 "}}>
                <img 
                  src = { commercialRegisterFile ? URL.createObjectURL(commercialRegisterFile) : file_text } 
                  alt = "file" 
                  style = {{marginBottom : "40px" , maxWidth : "95%"}}/>
                <input
                  id = "uploadFile"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <LabelFile htmlFor="uploadFile">
                  <img src = "./icons/upload.svg" alt =  "upload" style =  {{padding : "5px"}}/>
                  {t("text.Upload")}
                </LabelFile>
              </FlexDiv>
          </InputDiv>
          <SubmitButton onClick = {handleSubmit}> {t("text.Create_Account")}</SubmitButton>
        </InsideContainer>
      </Container>
    </>
  )
}

export default EnterData