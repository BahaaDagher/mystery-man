import React from 'react'
import { Navigate } from 'react-router-dom';

const ProtectAuth = ({children}) => {
const token = localStorage.getItem('token');
    
    if (token) {
        return <Navigate to ="/dashboard/home" />
    }
    return children
  
}

export default ProtectAuth