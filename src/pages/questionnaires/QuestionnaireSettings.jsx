import styled from '@emotion/styled';
import React from 'react'
import plusSign from '../../assets/icons/plusSign.svg'
import {Colors} from "../../Theme"
import { Box } from '@mui/material';
import { FlexSpaceBetween } from '../../components/FlexSpaceBetween';
import { FlexCenter } from '../../components/FlexCenter';
const Settings = styled("div")(({ theme }) => ({
  backgroundColor : "#fff" ,
  padding : "20px" ,
  borderRadius : "10px" ,
}));
const InputContainer = styled("div")(({ theme }) => ({
  backgroundColor : Colors.main ,
  padding : "20px" ,
  borderRadius : "10px" ,
  height : "80px" , 
  width : "60%" , 
}));
const Input = styled("input")(({ theme }) => ({
  backgroundColor : "transparent" ,
  width : "100%" ,
  color : "#fff" ,
  border: "1px solid transparent" , 
  borderBottom: "1px solid #fff" , 
  outline : "none" ,
  "::placeholder": {
    color: Colors.gray_l
  },
  fontSize : "20px" ,
}));
const AddQuestionContainer = styled("div")(({ theme }) => ({
  padding : "20px" ,
  borderRadius: '10px',
  display : "flex" , 
  justifyContent : "space-between" ,
  alignItems : "center" ,
  backgroundColor : Colors.grayDC ,
  marginLeft : "10px" , 
  height : "60px" , 
  cursor : "pointer" ,
  transition : "all 0.3s ease" , 
  "&:hover" : {
    backgroundColor : Colors.hoverGray ,
  }
}));
const AddQuestionButton = styled("div")(({ theme }) => ({
  fontSize: '18px',
  fontWeight: 500,
  lineHeight: '21px',
  letterSpacing: '0.02em',
  textAlign: 'center',
}));
const ActionButton = styled(FlexCenter)(({ theme }) => ({
  width: '76px',
  height: '60px',
  padding: '10px 12px 10px 12px',
  borderRadius: '10px',
  backgroundColor: Colors.green,
  color : "#fff" , 
  cursor : "pointer" ,
  transition : "all 0.3s ease" , 
  marginLeft : "10px" ,
  "&:hover" : {
    backgroundColor : Colors.hoverGreen ,
  },
  "&.cancel" : {
    backgroundColor : Colors.red , 
    "&:hover" : {
      backgroundColor : Colors.hoverRed ,
    }
  },

}));
const QuestionnaireSettings = () => {
  return (
    <>
    <Box marginRight = "10px"  width = "100%">
        <Settings>
          <FlexSpaceBetween style = {{alignItems : "center"}}>
            <InputContainer>
              <Input placeholder= "Title"/>
            </InputContainer>
            <AddQuestionContainer>
              <img src = {plusSign} style = {{margin : "10px" }}/>
              <AddQuestionButton> Add_Question</AddQuestionButton>
            </AddQuestionContainer>
            <ActionButton>Save</ActionButton>
            <ActionButton className = "cancel">Cancel</ActionButton>
          </FlexSpaceBetween>
        </Settings>
    </Box>
    </>
  )
}

export default QuestionnaireSettings