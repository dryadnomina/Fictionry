import { NavLink } from "react-router-dom"
import styled from "styled-components"
import LogoutButton from "./logoutButton"
import {FiBell as Bell} from "react-icons/fi"
import {FiHome as Home} from "react-icons/fi"
import {FiBookOpen} from "react-icons/fi"
import { FiBook as Book } from "react-icons/fi"
import { FiSearch as Search } from "react-icons/fi"
import {FiUser as User} from "react-icons/fi"

import { useAuth0 } from "@auth0/auth0-react"
import LoginButton from "./LoginButton"
const Sidebar =()=>{
const {user, isLoading} = useAuth0();
    return(
        <StyledSidebar>
                <ul>
                    {user && !isLoading &&
                    <>
                    <NavLink to="/find-books">
                        <li><FiBookOpen/>Book finder</li>
                    </NavLink>
                    <NavLink to={`/profile`}>
                    <li><User/> Profile</li>  
                    </NavLink>
                    <NavLink to="/library">
                    <li><Book/>Library</li>
                    </NavLink>
                    <NavLink to="/search">
                    <li><Search/>Search</li>
                    </NavLink>
                    </>
                    }
                   <LogoutButton/>
                   <LoginButton/>
                </ul>
                
        </StyledSidebar>

    )

    
}

const StyledSidebar = styled.aside`
&{
    display:flex;
    flex-flow:row;
    width:25vw;
    grid-column:1;
   
}
a{
    display:flex;
    gap: 2vw;
    padding: 20px;
    font-weight: 700;
    text-decoration:none;
    border-radius:10px;
  }
  a.active {
    color: #00A7E1;
}
ul{
    display:flex;
    flex-flow:row;
    list-style:none;
}
button{
        color:white;
        font-weight:700;
        padding:10px 20px;
        border-radius: 10px;
        background-color:#00A7E1;
}
a:hover{
background-color:#00A7E1;
color: white;
}
`
export default Sidebar