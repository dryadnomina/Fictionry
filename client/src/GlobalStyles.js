import {createGlobalStyle} from "styled-components"
/*
fictionry colours:
light blue - #d5f6ff

light teal - #99d6e4
generic gradient: 
#99D6E4
#84E3E2
#81EFD1
#99F7B4
#C4FA91
#F9F871-yellow

skip gradient: 
#99D6E4
#8CF8B8
#52BF83
#038951

dark sand - #d9965b
#FDA377 - light peach
#653300-dark brown
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
    color:black;
    
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