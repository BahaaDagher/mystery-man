import { Box } from '@mui/material'
import React from 'react'
import { Title } from './Title'
import styled from '@emotion/styled';
import { Flex } from '../../../../components/Flex';
import { Colors } from '../../../../Theme';
import { useTranslation } from 'react-i18next';

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

    const LabelFile = styled("label")(({ theme }) => ({
        display: "inline-block",
        width : "80%" , 
        margin: "auto",
        textTransform: "uppercase",
        color: Colors.main,
        backgroundColor: Colors.lightMain,
        textAlign: "center",
        padding: "5px 80px 5px 80px",
        letterSpacing: "1.5px",
        cursor: "pointer",
        borderRadius: "10px",
        transition: "all 0.3s ease-in-out",
        border : `1px solid ${Colors.main}` , 
        "&:active": {
            transform: "scale(0.8)",
        } , 
        "&:hover": {
          backgroundColor: Colors.main[2],
        } , 
        [theme.breakpoints.down("500")]: { 
          fontSize: "18px",
        }
      })) 
      const {t} = useTranslation() ; 
  return (
    <Box>
        <Title>{num} - {question.title}</Title>
        <ImgContainer>
        <LabelFile htmlFor="uploadFile">{t("text.Take_photos")}</LabelFile>
        </ImgContainer>
    </Box>
  )
}

export default UploadImages