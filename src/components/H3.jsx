import styled from "@emotion/styled";
import { Colors } from "../Theme";

export const H3 = styled("h3")(({ theme }) => ({
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '30px',
    letterSpacing: '0em',
    color: Colors.second,
}));