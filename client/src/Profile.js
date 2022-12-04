import {useAuth0} from '@auth0/auth0-react'
import styled from 'styled-components';

//user's profile page
const Profile = () => {
    const { user, isAuthenticated } = useAuth0();
    console.log(user)
return(
    isAuthenticated && (
        <StyledProfile>
            <img src={user.picture} alt="" />
            <p>Name: {user.given_name}</p>
            <p>Last Name: {user.family_name}</p>
            <p>Email: {user.email}</p>
        </StyledProfile>
    )
)
}
export default Profile

const StyledProfile = styled.div`
&{ 
    background-color:#81EFD1;
    padding:10px;
    border-radius:5px;
    box-shadow:12px 12px 2px 1px rgba(0, 0, 255, .2);
}

img{
    border:solid black 1px;
    border-radius:5px;
    box-shadow:3px 3px 1px 1px rgba(0, 0, 255, .2);
}
p{
    color:white;
    font-weight:700;
    border-bottom:solid white 3px;
}
`