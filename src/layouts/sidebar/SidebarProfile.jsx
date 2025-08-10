import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Colors } from '../../Theme';
import { useNavigate } from 'react-router-dom';
import adminImage from '../../assets/images/admin.png';
import LogoutIcon from '../../assets/icons/LogoutIcon.svg';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const ProfileContainer = styled("div")(({ theme }) => ({
  marginTop: 'auto',
  padding: '20px',
  width: '90%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: Colors.bg,
  borderRadius: '8px',
}));

const ProfileInfo = styled("div")(({ theme }) => ({
    display: 'flex',
    marginBottom: '15px',
    alignItems: 'center',
}));

const ProfileImage = styled("img")(({ theme }) => ({
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  marginRight: theme.direction === 'ltr' ? '10px' : '0',
  marginLeft: theme.direction === 'rtl' ? '10px' : '0',
}));

const ProfileNameLink = styled("div")(({ theme }) => ({
    textAlign: theme.direction === 'ltr' ? 'left' : 'right',
}));

const ProfileName = styled("div")(({ theme }) => ({
  fontWeight: '600',
  fontSize: '16px',
  color: Colors.second,
}));

const ProfileLink = styled("div")(({ theme }) => ({
  color: Colors.main,
  fontSize: '14px',
  cursor: 'pointer',
  '&:hover': {
    color: Colors.hoverMain,
  }
}));

const SignOutButton = styled("div")(({ theme }) => ({
  display: 'flex',
  color: '#fff',
  backgroundColor: Colors.danger, 
  fontSize: '14px',
  cursor: 'pointer',
  marginTop: '5px',
  '&:hover': {
    color: Colors.hoverMain,
  },
  '& svg': {
    fontSize: '16px',
    marginRight: theme.direction === 'ltr' ? '5px' : '0',
    marginLeft: theme.direction === 'rtl' ? '5px' : '0',
  },
  borderRadius: '8px',
  gap: '6px',
  padding: '8px 32px',
  justifyContent: 'flex-start',
  textTransform: 'none',
  '&:hover': {
    // backgroundColor: theme.palette.action.hover,
  },
}));

const SidebarProfile = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const logout = () => {
    Swal.fire({
      title:t("text.Are_you_sure_you_want_to_logout") ,
      showCancelButton: true,
      confirmButtonText: t("text.Yes"),
      cancelButtonText: t("text.Cancel")
    }).then((result) => {
      if (result.isConfirmed) {
        // dispatch(userLogout())
        Swal.fire({
          icon: 'success',
          title: t("text.Logout_successfully"),
          showConfirmButton: false,
          timer: 2000
        })
        setTimeout(() => {
          localStorage.removeItem("token")
          navigate("/login")
        }, 2000);
      }
    })
  }
  const getProfileData = useSelector(state => state.profileData.getProfileData) ;
  const getProfileLoading = useSelector(state => state.profileData.getProfileLoading) ;
  const [profileData , setProfileData] = useState ({})
  useEffect(()=>{
    // console.log('getProfileData' ,getProfileData);
    if (getProfileData?.status) {
      setProfileData(getProfileData?.data?.user)
    }
  },[getProfileData])
  return (
    <ProfileContainer>
      <ProfileInfo onClick={() => navigate("/profile")}>
        <ProfileImage src={profileData?.image } alt="profile" />
        <ProfileNameLink>
          <ProfileName>{profileData?.name || t("text.Company_Name")}</ProfileName>
          <ProfileLink onClick={() => navigate("/profile")}>
            {t("text.view_profile")}
          </ProfileLink>
        </ProfileNameLink>
      </ProfileInfo>
      <SignOutButton onClick={logout}>
        <img src={LogoutIcon} alt="logout" />
        <span>{t("text.Sign_out")}</span>
      </SignOutButton>
    </ProfileContainer>
  );
};

export default SidebarProfile;