import styled from "@emotion/styled";
import { Colors } from "../Theme";

export const Input = styled("input")(({ theme }) => ({
    width: '100%', 
    height: 'fit-content', 
    padding: '15px 16px', 
    borderRadius: '10px',
    gap: '10px',
    '&::placeholder': {
        color: Colors.input, 
    },
    '&:focus': {
        outline: 'none', 
    } ,
    border : "none" 
}));