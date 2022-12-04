import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import Header from './Header';
import Profile from './Profile';
import BookFinder from './BookFinder'
import LoginButton from './LoginButton';
import LogoutButton from './logoutButton';
import Welcome from './Welcome';
import Search from './Search';
import Library from './Library';
import AuthorProfile from './AuthorProfile';
import GlobalStyles from './GlobalStyles';

import {useAuth0} from '@auth0/auth0-react'
import BookDetails from './BookDetails';

const App = () => {
  const { isAuthenticated,isLoading,error } = useAuth0();
  
  return (
   
    <Router>
    <GlobalStyles/>
    <Header/>
      <main>
      <h2>Login</h2>
      <LoginButton/>
      <LogoutButton/>
    </main>
  
    {isAuthenticated && !isLoading &&
      <Routes>
      {/* • search all fiction books based on genre
        ◦ filters
        ◦ search bar */}
        <Route path ="/"element={<Welcome/>}/>
        <Route path ="/search"element={<Search/>}/>
        <Route path ="/find-books"element={<BookFinder/>}/>

        {/* book profile detail page that  includes summary. Book cover, and a place to leave a personal review 
        a flag shows if the book is in one of the user’s lists. */}
        <Route path ="/profile"element={<Profile/>}/>
        <Route path ="/library"element={<Library/>}/>
        <Route path ="/book/:bookId"element={<BookDetails/>}/>
        <Route path ="/author/:authorId"element={<AuthorProfile/>}/>
      </Routes>
      
    }
    {isLoading && !error && <h2>Loading...</h2>}
    {error && <h2>A problem has occurred!</h2>}
    </Router>
  );
}

export default App;
