import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProfile } from '../store/slices/profileSlice';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import Loading from '../components/Loading';
import { Colors } from '../Theme';

const ProtectNewMission = ({ children }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [shouldRedirect, setShouldRedirect] = useState(false);

  const getProfileData = useSelector((state) => state.profileData.getProfileData);
  const getProfileLoading = useSelector((state) => state.profileData.getProfileLoading);

  // Fetch profile data if missing
  useEffect(() => {
      dispatch(getProfile());
  }, []);

  // Check once profile data is loaded
  useEffect(() => {
    console.log("asasa")
    if (getProfileData?.data?.user) {
      const newMissionCount = getProfileData?.data?.user?.newMission || 0;

      if (newMissionCount <= 0) {
        Swal.fire({
          icon: "error",
          title: t("text.Error"),
          text: t("text.You_dont_have_enough_money_to_create_a_new_mission"),
          confirmButtonText: "Ok",
        }).then(() => {
          setShouldRedirect(true);
        });
      }
    }
  }, [getProfileData]);

  // Show loader while fetching
  if (getProfileLoading || !getProfileData?.data?.user) {
    return (
      <Loading/>
    );
  }

  // Redirect case
  if (shouldRedirect) {
    return <Navigate to="/userDashboard/missions"  />;
  }

  // ✅ Normal case: allow access
  return children;
};

export default ProtectNewMission;
