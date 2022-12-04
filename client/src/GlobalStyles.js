import {createGlobalStyle} from "styled-components"
/*
fictionry colours:
light blue - #d5f6ff
teal - #71c6d9
dark teal - #49b6ce

FIND COLOR SCHEME THAT WORKS WITH THESE:
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
TO DO:
ADD FANCY STYLING TO GETBOOKS BUTTON
ADD NAV BAR COMPONENT--WILL CONTAIN EVERYTHING UNDER LOGIN HEADING--MAKE LOGIN HEADING DYNAMIC LIKE BUTTON
STYLE ALL COMPONENTS INDIVIDUALLY WHERE NECESSARY:
REVIEW COMPONENT, 
SEARCH COMPONENT,
PROFILE COMPONENT, 
WELCOME COMPONENT--MAKE 'FIND YOUR NEXT...' A BUTTON,
STYLE LIBRARY,TABS COMPONENT AND LIST ITEMS THERE

CREATE AND STYLE LIST ITEM COMPONENT--MAKE SURE IT HAS DIV BEHIND COVER IF COVER IS NOT FOUND
REWORK ICON COLOR IN HEADER-- THE LIGHT BROWN LOOKS WEIRD
IN BOOK DETAILS ADD OTHER BOOK INFO IE. ISBN,PUBLISHER,PUBLISH DATE ETC PICK 3 OR 4


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