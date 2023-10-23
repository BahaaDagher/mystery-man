import React, { useState } from 'react'
import RequiredOptional from './RequiredOptional'
import QuestionInput from './QuestionInput'
import styled from '@emotion/styled';
import { Colors } from '../../../Theme';
import { Box } from '@mui/material';
import { Flex } from '../../../components/Flex';
import { FlexCenter } from '../../../components/FlexCenter';
import DeleteIcon from './DeleteIcon';

const Parent = styled("div")(({ theme }) => ({
  backgroundColor : "#fff" ,
  padding : "20px" ,
  margin : "15px 0 " ,
  borderRadius : "10px" ,
  position : "relative" , 
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

const YesOrNo = () => {
  const [radio,  setRadio] = useState ('required');
  const [question, setQuestion] = useState('');
  return (
    <Parent>
      <DeleteIcon />
      <RequiredOptional radio={radio} setRadio= {setRadio} />
      <QuestionInput question= {question} setQuestion= {setQuestion}/>
      <Flex>
        <FlexCenterP>
          <Circle/>
          <P for="no">Yes</P>
        </FlexCenterP>
        <FlexCenterP>
          <Circle/>
          <P for="no">No</P>
        </FlexCenterP>
      </Flex>
    </Parent>
  )
}

export default YesOrNo