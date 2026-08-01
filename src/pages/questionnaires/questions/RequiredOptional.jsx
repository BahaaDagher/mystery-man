import styled from '@emotion/styled';
import React from 'react'
import { Colors } from '../../../Theme';
import { useTranslation } from 'react-i18next';

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

const RequiredOptional = ({ value, onChange, name = 'required-optional' }) => {
    const normalizedValue = value === 'optional' ? 'optional' : 'required';

    const handleOptionChange = (event) => {
        onChange(event.target.value);
    }
    const {t} = useTranslation();
return (
    <>
        <Container>
            <RadioLabel isActive={normalizedValue === 'required'}>
                <RadioInput
                type="radio"
                name={name}
                value='required'
                checked={normalizedValue === 'required'}
                onChange={handleOptionChange}
                />
                {t("text.Required")}
            </RadioLabel>
            <RadioLabel isActive={normalizedValue === 'optional'}>
                <RadioInput
                type="radio"
                name={name}
                value='optional'
                checked={normalizedValue === 'optional'}
                onChange={handleOptionChange}
                />
                {t("text.Optional")}
            </RadioLabel>
        </Container>
    </>
  )
}

export default RequiredOptional
