import {useAuth0} from '@auth0/auth0-react'
import styled from 'styled-components';
const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

return(
    !isAuthenticated && <StyledButton onClick={() => loginWithRedirect()}>Sign In</StyledButton>
)
}
export default LoginButton

const StyledButton = styled.button`
&{
    background-color:#99d6e4;
    padding:10px;
}
&:hover{
    background-color:#81EFD1;
    color: white;
}`
