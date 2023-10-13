import styled from "@emotion/styled";
import { Colors } from "../Theme";

export const Container = styled("div")(({ theme }) => ({
    minHeight : "100vh" ,
    width : "100%" ,
    backgroundColor : Colors.body , 
    position : "relative" ,
    display : "flex" ,
    justifyContent : "space-around" ,
    alignItems : "center" ,
    padding : "30px 0 " , 
    [theme.breakpoints.down("1000")]: {
        flexDirection : "column" ,
    },
    direction : theme.direction 
}));