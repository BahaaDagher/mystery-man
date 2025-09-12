import React, { useEffect, useState } from 'react'
import Map from '../../components/Map'
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { Colors } from '../../Theme';
import { SubmitButton } from '../../components/SubmitButton';
import { useDispatch, useSelector } from 'react-redux';
import { addBranch } from '../../store/slices/branchSlice';
import Swal from 'sweetalert2';

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

const NewBranch = () => {
  const [branchName , setBranchName] = useState("");
  const [branchAddress , setBranchAddress] = useState("");
  const [location , setLocation] = useState({ lat: -1, lng: -1 })
  const [clickSubmit , setClickSubmit] = useState(false) ;

  const addBranchData = useSelector(state => state.branchData.addBranchData) ;  

  useEffect(()=>{
    console.log ("location" , location.lat)
    if (clickSubmit) {
      if (addBranchData.status) {
        // timeout to show the success message
        Swal.fire({
          icon: 'success',
          text: addBranchData.message,
          showConfirmButton: false,
          timer: 2000
        })
        setTimeout(() => {
          window.location.href = "/profile"
        }, 2300);
      }
      else {
        Swal.fire({
          icon: 'error',
          text: addBranchData.message,
        })
      }
    }
  },[addBranchData])

  const dispatch = useDispatch() ; 

  const handleSubmit = () => {
    setClickSubmit(true)
    if (location.lat === -1 && location.lng === -1) 
      dispatch(addBranch({name : branchName , address : branchAddress }))  
    else 
      dispatch(addBranch({name : branchName , address : branchAddress , lat : location.lat , long : location.lng}))
  }
  const theme = useTheme() ; 
  return (
  <>
    <Map setLocation = {setLocation}  latPos=  {24.774265}  lngPos =  {46.738586} handelAddressChanged={setBranchAddress} />
    {/* <Map setLocation = {setLocation}  latPos=  {-1}  lngPos =  {-1} handelAddressChanged={setBranchAddress} /> */}
    <EnterData>
      <Input placeholder= "Branch Name" value = {branchName} onChange={(e)=>{setBranchName(e.target.value)}}/>
      <Input placeholder= "Branch Address" value = {branchAddress}  onChange={(e)=>{setBranchAddress(e.target.value)}}/>
      <SubmitButton onClick ={handleSubmit}>save</SubmitButton>
    </EnterData>
  </>
  )
}

export default NewBranch