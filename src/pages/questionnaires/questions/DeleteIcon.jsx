import styled from '@emotion/styled';
import React from 'react'
import redDelete from '../../../assets/icons/redDelete.svg'
const DeleteImg = styled("img")(({ theme }) => ({
    cursor : "pointer" ,
    position : "absolute" ,
    top : "10px" ,
    right :theme.direction =="ltr"?  "10px" : "auto" , 
    left :theme.direction =="rtl"?  "10px" : "auto" , 
}));
const DeleteIcon = () => {
  return (
    <div>
          <DeleteImg src = {redDelete} />
    </div>
  )
}

export default DeleteIcon