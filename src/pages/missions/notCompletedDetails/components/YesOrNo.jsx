import React from 'react'
import { Title } from './Title'
import styled from '@emotion/styled';
import { Colors } from '../../../../Theme';
import { Flex } from '../../../../components/Flex';
import { Box } from '@mui/material';
import { FlexCenter } from '../../../../components/FlexCenter';
import { useTranslation } from 'react-i18next';
const Label = styled("div")(({ theme }) => ({
  fontSize : "22px" , 
  fontWeight : "600" ,
  margin : theme.direction === "rtl" ? "0 10px 0 0 " : "0 0 0 10px " ,
  "&.active" :{
    color : Colors.main ,
  }
}));
const InputDiv = styled(Flex)(({ theme }) => ({
  alignItems : "center" ,
  margin : theme.direction === "rtl" ? "0 20px 0 0 " : "0 0 0 20px " ,

}));
const Input = styled("input")(({ theme }) => ({
  display : "flex" ,
  alignItems : "center" , 
  transform: "scale(1.3)", 
}));

const Circle = styled("div")(({ theme }) => ({
  width : "20px" , 
  height : "20px" ,
  borderRadius : "50%" ,
  backgroundColor : "#fff" ,
  border : `1px solid ${Colors.gray_l } ` ,
  margin :"0 20px"
}));
const FlexCenterP = styled(FlexCenter)(({ theme }) => ({
  margin  : "0 30px" , 
}));
const P = styled("p")(({ theme }) => ({
  fontSize: '20px',
  color: Colors.gray , 
}));
  const Answer = styled(FlexCenter)(({ theme }) => ({
    width:'100%'
    
      
  }));


const YesOrNo = ({question, num}) => {
  console.log(question ,'yesorno');
  const {t} = useTranslation() ; 
  return (
    <Box>
        <Title>{num} - {question.title}</Title>
    
        <Answer>

          <Flex>
            <FlexCenterP>
              <Circle/>
              <P for="no">{t("text.Yes")}</P>
            </FlexCenterP>
            <FlexCenterP>
              <Circle/>
              <P for="no">{t("text.No")}</P>
            </FlexCenterP>
          </Flex>
        </Answer>
    
    </Box>
  )
}

export default YesOrNo