import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'

import Home from './Home'
const App = () => {
  return (
    
    <Router>
      <h1>Fictionry</h1>
      <Routes>
      {/* • search all fiction books based on genre
        ◦ filters
        ◦ search bar */}
        <Route path ="/search"element={<h1>search page</h1>}/>
        <Route path ="/"element={<Home/>}/>

        {/* book profile detail page that  includes summary. Book cover, and a place to leave a personal review 
        a flag shows if the book is in one of the user’s lists. */}
        <Route path ="/your-lists"element={<h1>book page</h1>}/>
        <Route path ="/book/:bookId"element={<h1>book page</h1>}/>
        
      </Routes>
    </Router>
  );
}

export default App;
