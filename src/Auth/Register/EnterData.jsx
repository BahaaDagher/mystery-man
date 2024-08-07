import React, { useEffect, useState } from 'react'
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
import { useDispatch, useSelector } from 'react-redux'
import  { getCategories, userRegister } from '../../store/slices/authSlice'
import Swal from 'sweetalert2'
import { useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Loading from '../../components/Loading'
import blueCamera from "../../assets/icons/blueCamera.svg"
import upload from "../../assets/icons/upload.svg"
import { FlexCenter } from '../../components/FlexCenter'

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
const Required = styled("span")(({ theme }) => ({
color:'red',
fontSize:'22px',
margin : theme.direction == "ltr" ? "0 5px 0 0" : "0 0 0 5px" ,

}));

const CameraDiv = styled(FlexDiv)(({ theme }) => ({
  width : "100px" ,
  height : "100px" , 
  margin : "auto" ,
  backgroundColor : "#fff" ,
  borderRadius : "50%" ,
  position : "relative" , 
  border : `1px solid ${Colors.gold}` ,
}));
const CircleCamera = styled(FlexCenter)(({ theme }) => ({
    position :"absolute" , 
    padding : "10px" , 
    backgroundColor : Colors.main ,
    bottom : "0" , 
    borderRadius : "50%" ,
    width : "40px" , 
    height : "40px" , 
}));
const CircleImg = styled("img")(({ theme }) => ({

}));



const InputInformation = styled("div")(({ theme }) => ({
}));

const Select = styled("select")(({ theme }) => ({
  width: '100%', 
  height: 'fit-content', 
  padding: '15px 16px', 
  borderRadius: '10px',
  border : `1px solid ${Colors.gold}` ,
  fontSize: '16px',
  color: theme.palette.text.primary,
  '&:focus': {
    borderColor: theme.palette.primary.dark,
    outline: 'none',
    boxShadow: `0 0 0 3px ${Colors.gold}`,
  }
}));

const Option = styled("option")(({ theme }) => ({
  fontSize: '16px',
  color: theme.palette.text.primary,
  // backgroundColor: Colors.lightMain,
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
  const [clickSubmit , setClickSubmit] = useState(false)

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log ("booha", file)
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

  const RegisterData = useSelector((state) => state.authData.RegisterData);
  const RegisterDataLoading = useSelector(state => state.authData.RegisterDataLoading) ;


  const navigate = useNavigate();
  useEffect(() => {
    if (clickSubmit) {
      console.log ("RegisterData" , RegisterData ) 
      if (RegisterData.status) {
        sessionStorage.setItem("company_email" , Phone_Number) ;
        Swal.fire({
          icon: 'success',
          text: RegisterData.message,
          showConfirmButton: false,
          timer: 4000
        })
        setTimeout(() => {
          navigate("/register/VerifyEmail")
        }
        , 4000)
      }
      else {
        console.log("failed")
        Swal.fire({
          icon: 'error',
          text: RegisterData.message,
        })
      }
    }
  }, [RegisterData]);

  const dispatch = useDispatch(); 
  const theme = useTheme() ;

  const handleSubmit = () => {
      setClickSubmit(true)
      if (password !== confirm_password)  {
        Swal.fire({
          icon: 'error',
          text:theme.direction == "ltr" ? 'Password and confirm password are not the same!' : "! كلمتا السر غير متطابقتين",
          
        })
      }
      else {

        if(Phone_Number.length != 10){
         
            Swal.fire({
              icon: 'error',
              text:theme.direction == "ltr" ? 'Phone Number must be 10 digits!' : "! رقم الهاتف يجب ان يكون 10 ارقام",
              
            })
          

        }
        else if(password.length<8){
          Swal.fire({
            icon: 'error',
            text:theme.direction == "ltr" ? 'Password  must be 8 digits or more!' : "!  الرقم السري يجب ان يكون 8 ارقام او اكثر",
            
          })

        }
        else{

          const formData = new FormData();
          formData.append("name", company_name);
          if (company_website!="") formData.append("url", company_website);
          formData.append("email", company_email);
          formData.append("phone", Phone_Number);
          formData.append("password", password);
          if (commercial_registration_no!="") formData.append("CommercialRegistrationNo", commercial_registration_no);
          if (commercialRegisterFile!=null) formData.append("CommercialRegistrationImage", commercialRegisterFile);
          if (selectedPhoto!=null) formData.append("image", selectedPhoto);
          if (selectedCategoryId!="") formData.append("category_id", selectedCategoryId)
          dispatch(userRegister(formData))
        }

      }
      
  }

  const getCategoriesData = useSelector((state) => state.authData.getCategoriesData);
  const categoriesLoading = useSelector(state => state.authData.categoriesLoading) ;
  useEffect(() => {
    dispatch (getCategories())
  }, [])


  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  const handleCategoryChange = (event) => {
    setSelectedCategoryId(event.target.value);
  };
  

  const {t} = useTranslation()
  return (
    <>
    {RegisterDataLoading || categoriesLoading ? <Loading/> : null}
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
                  {selectedPhoto ?        
                    <CircleCamera>
                      <CircleImg src = {blueCamera}/>
                    </CircleCamera> 
                    : null 
                  }
                    <img
                      src = { selectedPhoto ? URL.createObjectURL(selectedPhoto) : camera }  
                      style = {{  width : selectedPhoto ? "100%" : "fit-content"  , height : selectedPhoto ? "100%" : "fit-content"  , borderRadius : "50%"}} alt=  "company logo"/>
                </CameraDiv>
              </label>
            <InputInformation>
              <InputDiv >
                  <H3><Required>*</Required> {t("text.Company_name")}</H3>
                  <Input  placeholder={t("text.Company_name")} value ={company_name} onChange = {(e)=> setCompany_name(e.target.value)} />
              </InputDiv>
              <InputDiv>
                  <H3> <Required>*</Required> {t("text.Phone_Number")}</H3>
                  <Input  placeholder={t("text.Phone_Number")} value ={Phone_Number} onChange = {(e)=> setPhone_number(e.target.value)}/>
              </InputDiv>
              <InputDiv>
                  <H3> <Required>*</Required> {t("text.Company_Email")}</H3>
                  <Input  placeholder={t("text.Company_Email")} value ={company_email} onChange = {(e)=> setCompany_email(e.target.value)}/>
              </InputDiv>
              <InputDiv>
                  <H3> <Required>*</Required>{t("text.Password")} {t("text.password_lengh")} </H3>
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
              <Input   placeholder={t("text.Commercial_Registration_No")} value ={commercial_registration_no} onChange = {(e)=> setCommercial_registration_no(e.target.value)}/>
          </InputDiv>

          <InputDiv>
              <H3>{t("text.categories")} </H3>
              <Select onChange={handleCategoryChange}>
                <Option value="">{t("text.choose_category")} </Option>
                 { getCategoriesData?.map(category => (
                  <Option key={category.id} value={category.id}>
                    {category.name_ar}
                  </Option>
                ))}
              </Select>
          </InputDiv>

          <InputDiv>
              <H3>{t("text.Copy_of_the_commercial_register")} </H3>
              <FlexDiv style = {{border :` 1px dashed ${Colors.gold}` ,  borderRadius : "10px" , padding : "20px 0 "}}>
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
                  <img src = {upload} alt =  "upload" style =  {{padding : "5px"}}/>
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