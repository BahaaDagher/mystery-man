import React, { useEffect, useState } from 'react'
import { Container } from '../../components/Container'
import { H3 } from '../../components/H3'
import { Input} from '../../components/Input'
import { Colors } from '../../Theme'
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next'
import LanguageIcon from '../../components/LanguageIcon'
import LabelFile from '../../components/LabelFile'
import { FlexDiv } from '../../components/FlexDiv'
import { SubmitButton } from '../../components/SubmitButton'
import  Loading  from '../../components/Loading'
import camera from "../../assets/icons/camera.svg"
import file_text from "../../assets/icons/file-text.svg"
import upload from "../../assets/icons/upload.svg"
import { useDispatch, useSelector } from 'react-redux'
import  { getCategories, userRegister } from '../../store/slices/authSlice'
import Swal from 'sweetalert2'
import { useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { ProfileData, updateProfile } from '../../store/slices/profileSlice'
import blueCamera from "../../assets/icons/blueCamera.svg"
import { FlexCenter } from '../../components/FlexCenter'


const Parent = styled(Container)(({ theme }) => ({
  background  : "#fff" ,
}));

const ProfileInput = styled(Input)(({ theme }) => ({
  backgroundColor : Colors.input_fill ,
  border : `2px solid ${Colors.gold}` ,
}));
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
    position : "relative" ,
  }));
const BlueCameraDiv = styled(FlexCenter)(({ theme }) => ({
    position :"absolute" , 
    padding : "10px" , 
    backgroundColor : Colors.gold ,
    bottom : "0" , 
    borderRadius : "50%" ,
}));
const BlueCamera = styled("img")(({ theme }) => ({

}));


const InputInformation = styled("div")(({ theme }) => ({
}));

const UpdateButton = styled(SubmitButton)(({ theme }) => ({
  color : "#000" , 
  backgroundColor : Colors.gold ,
  "&:hover":  {
    backgroundColor : Colors.hoverGold ,
  },

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


const EditProfile = () => {
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
  const [selectedCategoryID, setSelectedCategoryID] = useState('');


  // my work 
  const getProfileData = useSelector((state) => state.profileData.getProfileData);
  const getProfileLoading = useSelector((state) => state.profileData.getProfileLoading);
    useEffect(() => {
        if (getProfileData.status) {
            console.log ("getProfileData" , getProfileData)
            setCompany_name(getProfileData.data.user.name)
            setPhone_number(getProfileData.data.user.phone)
            setCompany_email(getProfileData.data.user.email)
            setCompany_website(getProfileData.data.user.url)
            setCommercial_registration_no(getProfileData.data.user.CommercialRegistrationNo)
            setCommercial_registration_file(getProfileData.data.user.CommercialRegistrationImage)
            setSelectedPhoto(getProfileData.data.user.image)
            setSelectedCategoryID(getProfileData.data.user.category_id)
        }
    }, [getProfileData]);


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

  const updateProfileData = useSelector((state) => state.profileData.updateProfileData);
  const updateProfileLoading = useSelector((state) => state.profileData.updateProfileLoading);

  const navigate = useNavigate();
  useEffect(() => {
    if (clickSubmit) {
      console.log ("RegisterData" , updateProfileData ) 
      if (updateProfileData.status) {
        console.log("success")
        Swal.fire({
          icon: 'success',
          text : t("text.edited_successfully"), 
          showConfirmButton: false,
          timer: 3000
        })
        setTimeout(() => {
            navigate("/profile")
        }
        , 3000)
      }
      else {
        console.log("failed")
        Swal.fire({
          icon: 'error',
          text: updateProfileData.message,
        })
      }
    }
  }, [updateProfileData]);

  const dispatch = useDispatch(); 
  const theme = useTheme() ; 
  const handleSubmit = () => {
      setClickSubmit(true)
      if (password!="" || confirm_password!="") {
        if (password !== confirm_password)  {
            Swal.fire({
              icon: 'error',
              text:theme.direction == "ltr" ? 'Password and confirm password are not the same!' : "! كلمتا السر غير متطابقتين",
              
            })
        }
        else {
          const formData = new FormData();
          formData.append("name", company_name);
          formData.append("url", company_website);
          formData.append("email", company_email);
          formData.append("phone", Phone_Number);
          formData.append("CommercialRegistrationNo", commercial_registration_no);
          if (password!="") formData.append("password", password);
          if (typeof commercialRegisterFile !== 'string') formData.append("CommercialRegistrationImage", commercialRegisterFile);
          if (typeof selectedPhoto !== 'string') formData.append("image", selectedPhoto);
          if (selectedCategoryID) formData.append("category_id", selectedCategoryID);
          dispatch(updateProfile(formData))
        }
      }
      else {
        Swal.fire({
          icon: 'error',
          text:theme.direction == "ltr" ? 'enter the password' : "أدخل كلمة السر",
          
        })
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
    setSelectedCategoryID(event.target.value);
  };
  

  const {t} = useTranslation()
  return (
    <>
        {getProfileLoading || categoriesLoading || updateProfileLoading? <Loading/> : null}
      <Parent>
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
                    <BlueCameraDiv>
                        <BlueCamera src= {blueCamera}/>
                    </BlueCameraDiv>
                    <img
                      src = { typeof selectedPhoto === 'string'? selectedPhoto :  selectedPhoto ? URL.createObjectURL(selectedPhoto) : camera }  
                      style = {{  width : selectedPhoto ? "100%" : "fit-content"  , height : selectedPhoto ? "100%" : "fit-content"  , borderRadius : "50%"}} alt=  "company logo"/>
                </CameraDiv>
              </label>
            <InputInformation>
              <InputDiv >
                  <H3>{t("text.Company_name")}</H3>
                  <ProfileInput placeholder={t("text.Company_name")} value ={company_name} onChange = {(e)=> setCompany_name(e.target.value)} />
              </InputDiv>
              <InputDiv>
                  <H3> {t("text.Phone_Number")}</H3>
                  <ProfileInput placeholder={t("text.Phone_Number")} value ={Phone_Number} onChange = {(e)=> setPhone_number(e.target.value)}/>
              </InputDiv>
              <InputDiv>
                  <H3> {t("text.Company_Email")}</H3>
                  <ProfileInput placeholder={t("text.Company_Email")} value ={company_email} onChange = {(e)=> setCompany_email(e.target.value)}/>
              </InputDiv>
              <InputDiv>
                  <H3>{t("text.Password")} </H3>
                  <ProfileInput type='password' placeholder={t("text.Password")} value ={password} onChange = {(e)=> setPassword(e.target.value)}/>
              </InputDiv>
              <InputDiv>
                  <H3>{t("text.Confirm_Password")} </H3>
                  <ProfileInput type='password' placeholder={t("text.Confirm_Password")} value ={confirm_password} onChange = {(e)=> setConfirm_password(e.target.value)}/>
              </InputDiv>
            </InputInformation>
        </InsideContainer>
        <InsideContainer>
        <InputDiv>
                  <H3> {t("text.Company_Website")}</H3>
                  <ProfileInput placeholder={t("text.Company_Website")} value ={company_website} onChange = {(e)=> setCompany_website(e.target.value)}/>
              </InputDiv>
          <InputDiv>
              <H3>{t("text.Commercial_Registration_No")} </H3>
              <ProfileInput  placeholder={t("text.Commercial_Registration_No")} value ={commercial_registration_no} onChange = {(e)=> setCommercial_registration_no(e.target.value)}/>
          </InputDiv>
          <InputDiv>
              <H3>{t("text.categories")} </H3>
              <Select onChange={handleCategoryChange} value={selectedCategoryID}>
                {console.log(selectedCategoryID)}
                 { getCategoriesData?.map(category => (
                  <Option key={category.id} value={category.id}>
                    {category.name_ar}
                  </Option>
                ))}
              </Select>
          </InputDiv>
          <InputDiv>
              <H3>{t("text.Copy_of_the_commercial_register")} </H3>
              <FlexDiv style = {{border :` 1px dashed ${Colors.second}` ,  borderRadius : "10px" , padding : "20px 0 "}}>
                <img 
                  src =  {typeof commercialRegisterFile === 'string'? commercialRegisterFile : commercialRegisterFile ? URL.createObjectURL(commercialRegisterFile) : file_text}  
                  alt = "file" 
                  style = {{marginBottom : "40px" , maxWidth : "95%"}}
                />
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
          <UpdateButton onClick = {handleSubmit}> {t("text.update")}</UpdateButton>
        </InsideContainer>
      </Parent>
    </>
  )
}

export default EditProfile