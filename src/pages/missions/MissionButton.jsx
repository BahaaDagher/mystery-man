import styled from '@emotion/styled';
import React from 'react'
import { Colors } from '../../Theme';

const Button = styled("div")(({ theme }) => ({
    width: '282px',
    height: '138px',
    borderRadius: '10px',
    position: 'relative',
    marginBottom: '20px',
    cursor : "pointer" ,
    backgroundColor : "#fff" , 
    color : Colors.gray_l ,
    "&.active" : {
        backgroundColor: Colors.main , 
        color  : "#fff" ,
    },
}));

const MissionName = styled("div")(({ theme }) => ({
    top: '15px',
    left: '15px',
    position: 'relative' , 
    fontSize : "24px" ,
}));

const ImgContainer = styled("div")(({ theme }) => ({
    position : "absolute" , 
    bottom : "0px" ,
    left : "15px" ,
}));

const Number = styled("div")(({ theme }) => ({
    position : "absolute" , 
    bottom : "10px" ,
    right : "20px" ,
    fontSize: '48px',
    fontWeight: 500,
    lineHeight: '58px',
    letterSpacing: '0em',
    textAlign: 'right',
}));


const MissionButton = ({id ,name , number , icon , activeButton ,setActiveButton}) => {
  return (
    <>
        <Button className = {activeButton ? "active" : ""} onClick={()=>setActiveButton(id)}>
            <MissionName>{name}</MissionName>
            <ImgContainer>
                <img src= {icon}/>
            </ImgContainer>
            <Number>{number}</Number>
        </Button>
    </>
  )
}

export default MissionButton