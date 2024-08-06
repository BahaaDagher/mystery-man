import { Box } from '@mui/material'
import React from 'react'
import { Title } from './Title'
import styled from '@emotion/styled';
import { Flex } from '../../../../components/Flex';

const ImgContainer = styled(Flex)(({ theme }) => ({
    flexWrap : "wrap" ,
    alignItems : "center" ,
    // maxHeight : "300px" , 
}));
const ImgDiv = styled("div")(({ theme }) => ({
    width : "200px" ,
    margin : "10px" , 
    cursor : "pointer" ,
    [theme.breakpoints.down("500")] : {
        width : "100%" ,
    }
}));
const Img = styled("img")(({ theme }) => ({
    width : "100%" , 
}));
const UploadImages = ({question, num}) => {
  return (
    <Box>
        <Title>{num} - {question.title}</Title>
        {question.answer  && question.answer.length >0 ? 
        <ImgContainer>
            {question.answer.map((img , index) => {
                return (
                    <ImgDiv onClick={()=>window.open(img, '_blank')}>
                        <Img key = {index} src = {img} alt = {index}  />
                    </ImgDiv>
                )
            } )}
        </ImgContainer>
        : <p>N/A</p>
        }
    </Box>
  )
}

export default UploadImages