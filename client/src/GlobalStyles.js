import {createGlobalStyle} from "styled-components"
/*
fictionry colours:
light blue - #d5f6ff
teal - #71c6d9
light teal - #99d6e4
dark teal - #49b6ce
dark sand - #d9965b



*/
const GlobalStyles = createGlobalStyle`
  body {
    display:flex;
    flex-flow:column;
    justify-content:center;
    align-items:center;
    margin: 0;
    padding: 0;
    background:white;
    color:grey;
    font-family: Sans-Serif;
  }

  button{
    border: none;
    color:white;
    background-color:#99d6e4;
    padding: 10px;
    font-weight:700;
    border-right:solid white 2px;
  }
`;
 
export default GlobalStyles;