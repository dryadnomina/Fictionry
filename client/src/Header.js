import { useNavigate } from "react-router-dom"
import Logo from "./Logo";

//header for fictionry website, links to homepage on click of title
const Header = () =>{
    const navigate = useNavigate();
    return <div onClick={() => navigate('/')}>
                <Logo/>
            </div>
}
export default Header