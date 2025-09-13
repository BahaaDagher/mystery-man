import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProfile } from '../store/slices/profileSlice';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import CircleLoader from '../components/CircleLoader';
import { Colors } from '../Theme';

const ProtectNewMission = ({ children }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const getProfileData = useSelector(state => state.profileData.getProfileData);
  const getProfileLoading = useSelector(state => state.profileData.getProfileLoading);

  useEffect(() => {
    // Fetch profile data if not already available
    if (!getProfileData?.status && !getProfileLoading) {
      dispatch(getProfile());
    }
  }, [dispatch, getProfileData, getProfileLoading]);

  useEffect(() => {
    if (getProfileData?.status) {
      const newMissionCount = getProfileData.data.user.newMission;
      setIsLoading(false);
      
      if (newMissionCount <= 0) {
        // Show error message and redirect
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
  }, [getProfileData, t]);

  // Show loading while checking
  if (isLoading || getProfileLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh'
      }}>
        <CircleLoader
          size={48}
          color={Colors.main}
          text={t("text.checking_permissions")}
          textColor="#6b7280"
        />
      </div>
    );
  }

  // Redirect if wallet is insufficient
  if (shouldRedirect) {
    return <Navigate to="/userDashboard/missions" replace />;
  }

  // Check if user has sufficient missions
  const newMissionCount = getProfileData?.data?.user?.newMission || 0;
  if (newMissionCount <= 0) {
    return <Navigate to="/userDashboard/missions" replace />;
  }

  return children;
};

export default ProtectNewMission;