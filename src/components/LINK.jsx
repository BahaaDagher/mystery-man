import styled from "@emotion/styled";
import { Link } from "@mui/material";
import { Colors } from "../Theme";

export const LINK = styled(Link)(({ theme }) => ({
    fontSize: '16px', 
    fontWeight: 400, 
    lineHeight: '22px', 
    letterSpacing: '0em', 
    textAlign: 'right', 
    color: Colors.gray_l,
    textDecoration : "none" ,
    cursor : "pointer" ,
    transition : "all 0.5s ease" ,
    "&:hover" : {
        color : Colors.second , 
    },
}));