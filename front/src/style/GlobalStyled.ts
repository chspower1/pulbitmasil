import { createGlobalStyle, ThemeProvider } from "styled-components";
import { reset } from "styled-reset";
import "./fonts/fonts.css";
export const GlobalStyled = createGlobalStyle`
    ${reset}
    
    h1{
        font-family: "SebangBold";
    }
    
    body {
        font-family: "Sebang";
    }
    a{
        text-decoration: none; 
    }
    input{
        color:${props => props.theme.textColor};
        border:solid 1px ${props => props.theme.weekColor};
        outline: solid 2px ${props => props.theme.mainColor};
    
    }
    button { 
        background-color: ${props => props.theme.mainColor};
        color:white;
        padding-top:20px;
        padding-bottom:20px;
        border:none;
        cursor:pointer;
        transition:all 0.4s ease; 
        &:hover{
            background-color: ${props => props.theme.accentColor};
        }
    }
    * {
        font-family: "Sebang";
        box-sizing: border-box;
    }
`;
