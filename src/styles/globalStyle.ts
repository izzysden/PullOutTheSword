import { createGlobalStyle } from "styled-components";
import { language } from "../libs/constants/lang";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        
        font-family: ${language === "ko" ? "MY" : "CB"};
        
        box-sizing: border-box;

        ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }
        ::-webkit-scrollbar-track {
            background-color: transparent;
        }
        ::-webkit-scrollbar-thumb {
            border-radius: 10px;
            box-shadow: inset 0 0 16px white;
        }
    }
    
    html, body {
        position: relative;

        max-width: 100%;
        max-height: 100%;
        
        overflow: hidden;
    }

    img {
        -webkit-user-drag: none;
        -moz-user-drag: none;
        -ms-user-drag: none;
        user-drag: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
`;

export default GlobalStyle;
