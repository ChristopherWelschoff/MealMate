import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    padding: 0;
  }

  body {
    font-family: Arial, sans-serif;
    background: white;
    color: black;
  }

  main {
    flex: 1;
    min-height: 100vw;
  }
`;

export default GlobalStyle;