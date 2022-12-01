import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

const Search = () => {
    const {state,actions:{addBook,removeBook}} =  useContext(UserContext)
    const navigate = useNavigate();
    const searchBar = document.getElementById('search')

    const [results,setResults] = useState();
    const [query,setQuery] = useState();
    const handleSearchQuery = (e) => {
    
        if(e.target.value){
            console.log(e.target.value)
            setQuery(e.target.value)
        }
    }
    const handleSearch = (query) =>{
        if(query){
        fetch(`http://openlibrary.org/search.json?q=${query}&limit=20&subject=fiction`)
        .then(res => res.json())
        .then(data => {console.log(data);
        setResults(data.docs);
        })
        }
    }
return(
        <>
    <h2>search</h2>
    <div>
        <input onChange={handleSearchQuery} id="search" type="text" placeholder="search..." />
        <button  disabled = {query === null|| undefined && true} onClick={() => {
            if(query !== null || undefined) {
                handleSearch(query)
                }
                }
            }>Search</button>
    </div>
    <h2>Search Results</h2>
    <div>
    {results && results.length === 0 && <h2>No results found</h2>}
    {results && results.length > 0 &&
    results.map(book =>
    //replace this with book list item component
    <div key={book.key}>
                                <p>{book.title}</p>
                                {book.isbn && <img src={`https://covers.openlibrary.org/b/isbn/${book.isbn[0]}-M.jpg`} /> }
                                {!book.isbn && book.lccn && <img src={`https://covers.openlibrary.org/b/lccn/${book.lccn[0]}-M.jpg`} />}
                                <p>{book.author_name && book['author_name']
                                .map((author,index) => 
                                <span key={author + index} id={author} onClick = {() => {
                                        navigate(`/author/${book["author_key"][index]}`)
                                }}>
                                    {author}
                                </span>)}</p>
                                <p>{book.isbn && book.isbn[0]}</p>
                                <div>
                                {!state.library[book.edition_key[0]] &&  <button onClick={() => {
                                        addBook({bookId:book.edition_key[0],book: book})
                                    }}>add to library</button>}
                                    {state.library[book.edition_key[0]] && <button onClick={() => {
                                        removeBook({bookId:book.edition_key[0]})
                                    }}>remove from library</button>}
                                    
                                </div>
                                <button onClick = {() => { navigate(`/book/${book.edition_key[0]}`)} } > Book Details</button>
                            </div>
    )
    }
    </div>
    </>
)
}

export default Search