import {useAuth0} from '@auth0/auth0-react'
const Profile = () => {
    const { user, isAuthenticated } = useAuth0();
    console.log(user)
return(
    isAuthenticated && (
        <article>
            <img src={user.picture} alt="" />
            <p>Name: {user.given_name}</p>
            <p>Last Name: {user.family_name}</p>
            <p>Email: {user.email}</p>
            <p></p>
            <p></p>
            <p></p>
        </article>
    )
)
}
export default Profile