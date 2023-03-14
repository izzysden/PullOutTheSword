import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        
        font-family: "CB";
        
        box-sizing: border-box;
        
        ::-webkit-scrollbar {
            display: none;
        }
    }
    
    html, body {
        max-width: 100%;
        
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
