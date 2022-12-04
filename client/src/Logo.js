import logo from './assets/fictionry-logo-ob.png'
import styled from 'styled-components'
const Logo = () =>{
return <StyledLogo><img src={logo} alt="Fictionry Logo" /></StyledLogo>
}
export default Logo

const StyledLogo = styled.div`
 img{
    height: 100px;
}
 
 `