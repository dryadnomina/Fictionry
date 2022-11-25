import { useNavigate } from "react-router-dom"
const Header = () =>{
    const navigate = useNavigate();
return <h1 onClick={() => navigate('/')}>Fictionry</h1>
}
export default Header