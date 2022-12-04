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
}
a{
    display:flex;
    gap: 2vw;
    padding: 20px;
    font-weight: 700;
    color:black;
    text-decoration:none;
  }
  a.active {
    color: #81EFD1;
}
ul{
    display:flex;
    flex-flow:row;
    list-style:none;
    color:black;
}

button{
    background-color:#81EFD1;
}
a:hover{
background-color:#81EFD1;
color: white;
}
`
export default Sidebar