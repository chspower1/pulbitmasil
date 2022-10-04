import { createGlobalStyle, ThemeProvider } from "styled-components";
import { reset } from "styled-reset";
import "./fonts/fonts.css";
export const GlobalStyled = createGlobalStyle`
    ${reset}
    
    h1{
        font-family: "SebangBold";
    }
    * {
        font-family: "Sebang";
        box-sizing: border-box;
    }
    body {
        font-family: "Sebang";
    }
    a{
        text-decoration: none;
    }
    button {
        border-radius: 10px;
        border: none;
        padding: 10px 20px;
        outline: none;
        transition:color 0.4s ease;
        transition:background-color 0.4s ease;
    }
`;
