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
    input{
        color: black;
        border: 2px solid #008037;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 5px;
        margin: 0.3em;
        padding: 0.5em 1.5em;
    }
    button {
        transition:color 0.4s ease;
        transition:background-color 0.4s ease;
        background: #008037;
        color: white;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 10px;
        margin: 0.3em;
        padding: 0.5em 1.5em;
        border: 2px solid #008037;
        border-radius: 5px;
    }
`;
