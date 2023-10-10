import styled from "@emotion/styled";
import { Colors } from "../Theme";

export const H1 = styled("h1")(({ theme }) => ({
    fontSize: "32px",
    fontWeight: "500",
    lineHeight: "60px",
    letterSpacing: "0em",
    textAlign: "left",
    color: Colors.second,
    marginBottom : "40px" ,
}));