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
        overflow: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
    }
    a{
        text-decoration: none; 
        color:${props => props.theme.textColor};
    }
    input{
        color:${props => props.theme.textColor};
        border:solid 1px ${props => props.theme.weekColor};
        &:focus{
            outline: solid 2px ${props => props.theme.mainColor};
        }
    }
    input[type=password]{
        font-family:"Arial Black";
        letter-spacing :1px;
        font-size:20px;
        ::placeholder{
            font-family: "Sebang";
        }
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
