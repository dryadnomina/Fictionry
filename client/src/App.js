import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import Header from './Header';
import Profile from './Profile';
import Home from './Home'
import LoginButton from './LoginButton';
import LogoutButton from './logoutButton';
import {useAuth0} from '@auth0/auth0-react'

const App = () => {
  const { isAuthenticated } = useAuth0();
  return (
    
    <Router>
    <Header/>
      <main>
      <h2>Login</h2>
      <LoginButton/>
      <LogoutButton/>
    </main>
    {isAuthenticated &&
      <Routes>
      {/* • search all fiction books based on genre
        ◦ filters
        ◦ search bar */}
        <Route path ="/search"element={<h1>search page</h1>}/>
        <Route path ="/"element={<Home/>}/>

        {/* book profile detail page that  includes summary. Book cover, and a place to leave a personal review 
        a flag shows if the book is in one of the user’s lists. */}
        <Route path ="/profile"element={<Profile/>}/>
        <Route path ="/your-lists"element={<h1>your lists</h1>}/>
        <Route path ="/book/:bookId"element={<h1>book page</h1>}/>
        
      </Routes>
}
    </Router>
  );
}

export default App;
