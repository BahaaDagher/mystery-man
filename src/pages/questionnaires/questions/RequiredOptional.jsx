import styled from '@emotion/styled';
import React, { useState } from 'react'
import { Colors } from '../../../Theme';

const Container = styled("div")(({ theme }) => ({
    display : "flex" ,
    justifyContent : "center" ,
    alignItems : "center" ,
    margin : "20px 0" ,
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
    console.log('radio');
    console.log(radio);
    const handleOptionChange = (event) => {
        console.log(event.target.value);
        setRadio(event.target.value);
    }
return (
    <>
        <Container>
            <RadioLabel isActive={radio.required === 'required'}>
                <RadioInput
                type="radio"
                value='required'
                checked={radio.required === 'required'}
                onChange={handleOptionChange}
                />
                Required
            </RadioLabel>
            <RadioLabel isActive={radio.required === 'optional'}>
                <RadioInput
                type="radio"
                value='optional'
                checked={radio.required === 'optional'}
                onChange={handleOptionChange}
                />
                Optional
            </RadioLabel>
        </Container>
    </>
  )
}

export default RequiredOptional