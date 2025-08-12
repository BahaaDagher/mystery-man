import React, { useEffect, useState } from 'react'
import Map from '../../components/Map'
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { Colors } from '../../Theme';
import { SubmitButton } from '../../components/SubmitButton';
import { useDispatch, useSelector } from 'react-redux';
import { updateBranch } from '../../store/slices/branchSlice';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const EnterData = styled("div")(({ theme }) => ({
  direction : theme.direction,
  width: '434px',
  top: '75%',
  left: '50%',
  padding: '20px',
  borderRadius: '10px',
  position: 'fixed',
  transform: 'translate(-50%, -50%)' , 
  backgroundColor : "#fff" , 
  opacity : "0.9" ,
  [theme.breakpoints.down("500")]  : {
    width:"96%",
  },
}));

const Input = styled("input")(({ theme }) => ({
  width: '100%',
  height: '60px',
  padding: '20px', // top right bottom left
  borderRadius: '10px',
  border : "none" , 
  backgroundColor : Colors.bg , 
  margin : "10px 0 " , 
  outline : "none" , 
  fontSize : "17px"
}));

const EditBranch = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const branchData = location.state?.branchData;
  
  const [branchName, setBranchName] = useState(branchData?.name || "");
  const [branchAddress, setBranchAddress] = useState(branchData?.address || "");
  const [mapLocation, setMapLocation] = useState({ 
    lat: parseFloat(branchData?.lat) || 24.774265, 
    lng: parseFloat(branchData?.long) || 46.738586 
  });
  const [clickSubmit, setClickSubmit] = useState(false);

  const updateBranchData = useSelector(state => state.branchData.updateBranchData);
  const updateBranchLoading = useSelector(state => state.branchData.updateBranchLoading);

  useEffect(() => {
    if (clickSubmit) {
      if (updateBranchData.status) {
        Swal.fire({
          icon: 'success',
          text: updateBranchData.message,
          showConfirmButton: false,
          timer: 2000
        });
        setTimeout(() => {
          navigate("/profile");
        }, 2300);
      } else if (updateBranchData.message) {
        Swal.fire({
          icon: 'error',
          text: updateBranchData.message,
        });
      }
    }
  }, [updateBranchData, clickSubmit, navigate]);

  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (!branchName.trim() || !branchAddress.trim()) {
      Swal.fire({
        icon: 'error',
        text: t('text.Please_fill_in_all_fields'),
      });
      return;
    }
    
    setClickSubmit(true);
    dispatch(updateBranch({
      name: branchName,
      address: branchAddress,
      lat: mapLocation.lat,
      long: mapLocation.lng,
      branch_id: branchData.id
    }));
  };

  const theme = useTheme();

  // If no branch data is provided, redirect to profile
  if (!branchData) {
    navigate("/profile");
    return null;
  }

  return (
    <>
      <Map 
        setLocation={setMapLocation} 
        latPos={parseFloat(branchData.lat) || 24.774265} 
        lngPos={parseFloat(branchData.long) || 46.738586} 
        handelAddressChanged={setBranchAddress} 
      />
      <EnterData>
        <Input 
          placeholder="Branch Name" 
          value={branchName} 
          onChange={(e) => setBranchName(e.target.value)}
        />
        <Input 
          placeholder="Branch Address" 
          value={branchAddress} 
          onChange={(e) => setBranchAddress(e.target.value)}
        />
        <SubmitButton 
          onClick={handleSubmit}
          disabled={updateBranchLoading}
        >
          {updateBranchLoading ? t('text.Updating') : t('text.Update_Branch')}
        </SubmitButton>
      </EnterData>
    </>
  );
};

export default EditBranch; 