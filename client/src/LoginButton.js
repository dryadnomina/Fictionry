import {useAuth0} from '@auth0/auth0-react'
const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    console.log('login',loginWithRedirect)
    console.log('is authenticated?',isAuthenticated)
return(
    !isAuthenticated && <button onClick={() => loginWithRedirect()}>Sign In</button>
)
}
export default LoginButton