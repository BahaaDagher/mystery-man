import styled from '@emotion/styled';
import React, { useState } from 'react'
import { Colors } from '../../../Theme';

const Container = styled("div")(({ theme }) => ({
    display : "flex" ,
    justifyContent : "center" ,
    alignItems : "center" ,
    margin : "10px 0" ,
}));
const RadioLabel = styled("label")(({ theme , isActive }) => ({
    margin : "0 30px" ,
    display : "flex" ,
    alignItems : "center" ,
    cursor : "pointer" ,
    fontSize : "20px" ,
    color : isActive ? Colors.main : "black" ,
}));
const RadioInput = styled("input")(({ theme }) => ({
    margin : "0 10px" ,
}));

const RequiredOptional = ({radio , setRadio}) => {
    const handleOptionChange = (event) => {
        setRadio(event.target.value);
    }
return (
    <>
        <Container>
            <RadioLabel isActive={radio === 'required'}>
                <RadioInput
                type="radio"
                value="required"
                checked={radio === 'required'}
                onChange={handleOptionChange}
                />
                Required
            </RadioLabel>
            <RadioLabel isActive={radio === 'optional'}>
                <RadioInput
                type="radio"
                value="optional"
                checked={radio === 'optional'}
                onChange={handleOptionChange}
                />
                Optional
            </RadioLabel>
        </Container>
    </>
  )
}

export default RequiredOptional