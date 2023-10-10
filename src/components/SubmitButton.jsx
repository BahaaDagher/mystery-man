import styled from "@emotion/styled";
import { Colors } from "../Theme";

export const SubmitButton = styled("div")(({ theme }) => ({
    width: '100%',
    height: '60px',
    padding: '2px 0px 1px 0px',
    borderRadius: '10px',
    color : "white" , 
    backgroundColor : Colors.main ,
    cursor : "pointer" , 
    display : "flex" ,
    justifyContent : "center" ,
    alignItems : "center" ,
    fontSize: '20px', 
    marginTop : "30px" ,
    transition : "all 0.5s ease" ,
    "&:hover" : {
        backgroundColor : Colors.lightMain ,
    }
}));