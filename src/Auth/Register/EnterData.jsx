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
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedPhoto(file);
    }
  };

  const {t} = useTranslation()
  return (
    <>
      <LanguageIcon/>
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
                      src = { selectedPhoto ? URL.createObjectURL(selectedPhoto) : "./icons/camera.svg" }  
                      style = {{  width : selectedPhoto ? "100%" : "fit-content"  , height : selectedPhoto ? "100%" : "fit-content"  , borderRadius : "50%"}} alt=  "company logo"/>
                </CameraDiv>
              </label>
            <InputInformation>
              <InputDiv >
                  <H3>{t("text.Company_name")}</H3>
                  <Input  placeholder={t("text.Company_name")}/>
              </InputDiv>
              <InputDiv>
                  <H3> {t("text.Company_Website")}</H3>
                  <Input  placeholder={t("text.Company_Website")}/>
              </InputDiv>
              <InputDiv>
                  <H3> {t("text.Company_Location")}</H3>
                  <Input  placeholder={t("text.Company_Location")}/>
              </InputDiv>
              <InputDiv>
                  <H3>{t("text.Password")} </H3>
                  <Input type='password' placeholder={t("text.Password")}/>
              </InputDiv>
              <InputDiv>
                  <H3>{t("text.Confirm_Password")} </H3>
                  <Input  type='password' placeholder={t("text.Confirm_Password")}/>
              </InputDiv>
            </InputInformation>
        </InsideContainer>
        <InsideContainer>
          <InputDiv>
              <H3>{t("text.Commercial_Registration_No")} </H3>
              <Input type='password' placeholder={t("text.Commercial_Registration_No")}/>
          </InputDiv>
          <InputDiv>
              <H3>{t("text.Copy_of_the_commercial_register")} </H3>
              <FlexDiv style = {{border :` 1px dashed ${Colors.second}` ,  borderRadius : "10px" , padding : "20px 0 "}}>
                <img 
                  src = { selectedFile ? URL.createObjectURL(selectedFile) : "./icons/file-text.svg" } 
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
          <SubmitButton>{t("text.Create_Account")}</SubmitButton>
        </InsideContainer>
      </Container>
    </>
  )
}

export default EnterData