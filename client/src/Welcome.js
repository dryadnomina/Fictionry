import { useAuth0 } from "@auth0/auth0-react"
import { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "./UserContext";

const Welcome = () =>{
const {user} = useAuth0();
const navigate = useNavigate();
const {actions:{getUser,addUser},state} = useContext(UserContext);

    return(
        <StyledWelcome>
            <h1>Welcome, {user.given_name}</h1>
            <button onClick={() => navigate('/find-books')}>Find your Sanctuary</button>
        </StyledWelcome>
    )
}

export default Welcome;

const StyledWelcome = styled.div`
&{
    background-color: #FDA377;
    border-radius:10px;
    padding:10px;
}
h1{
    color:white;
}
button{
    background-color:#F9F871;
    color:black;
    border-radius:10px;
    padding:10px;
    border:none;
}

button:hover{
    background-color: white;
}
`