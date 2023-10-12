import styled from "@emotion/styled";
import { Colors } from "../Theme";

const LabelFile = styled("label")(({ theme }) => ({
    width : "20%" , 
    margin: "auto",
    display: "flex" ,
    justifyContent : "center" ,
    alignItems : "center" , 
    textTransform: "uppercase",
    color: Colors.second,
    background: Colors.body,
    textAlign: "center",
    padding: "5px 80px 5px 80px",
    letterSpacing: "1.5px",
    cursor: "pointer",
    borderRadius: "10px",
    transition: "all 0.3s ease-in-out",
    border : `1px solid ${Colors.second}` , 
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

export default LabelFile ;