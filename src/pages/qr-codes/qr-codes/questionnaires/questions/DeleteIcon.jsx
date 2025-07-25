import styled from '@emotion/styled';
import React from 'react'
import redDelete from '../../../../../assets/icons/redDelete.svg'
import { useDispatch } from 'react-redux';
import { handleDeleteQuestion } from '../../../../../store/slices/questionierSlice';
const DeleteImg = styled("img")(({ theme }) => ({
    width : "30px" ,
    cursor : "pointer" ,
    position : "absolute" ,
    top : "10px" ,
    right :theme.direction =="ltr"?  "10px" : "auto" , 
    left :theme.direction =="rtl"?  "10px" : "auto" , 
}));
const DeleteIcon = ({index ,setIsApplyFocus}) => {
  const dispatch = useDispatch() ; 
  const handledeleteQuestion = (index) => {
    console.log(index);
    dispatch(handleDeleteQuestion(index))
    setIsApplyFocus(false)
  };
  return (
    <div onClick={()=>handledeleteQuestion(index)}>
          <DeleteImg src = {redDelete} />
    </div>
  )
}

export default DeleteIcon