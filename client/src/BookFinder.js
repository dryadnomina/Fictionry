import { useState,useContext } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "./UserContext";


const BookFinder = () => {

    const {user} = useAuth0()
    const {actions:{getUser,state}} = useContext(UserContext);
    
    const navigate = useNavigate();
    const test = document.getElementById('test')
    const [books,setBooks] = useState();
    const [filtered,setFiltered] = useState([]);
    const [results,setResults] = useState(null);
    const genres = ['romance','fantasy','mystery','action','adventure','comedy','horror','drama','tragedy','science-fiction']
    const subgenres = ['school life','supernatural','martial arts','slice of life','sports','historical','psychological']

const searchByCategory = (category) =>{

    const matches = [];
    books.map(
            book =>{
                const subject = book.subject;
                const matchArr = subject.filter(str => str.includes(category));
                if(matchArr.length > 0){
                    matches.push(book)
                } 
    }
    )

    if(matches.length > 0){
        setResults(true);
        setFiltered(matches)
    }
    if(matches.length === 0){
        setResults(false);
    }

}


console.log('filtered',filtered)

//fetches 100 random fiction books from openlibrary
    const getBooks = ()=>{  
        const getRandomNum = () =>{
            return Math.random()*10000000000
        }
        const random = getRandomNum();   
        try{
            fetch(`https://openlibrary.org/search.json?sort=random_${random}&subject=Fiction&lang=eng`)
            .then((res) => res.json())
            .then((data) => setBooks(data.docs))
        }
        catch(err){console.log(err)}
        
        }
    console.log('all books',books)
    return (
        <div>

            <button onClick={() => navigate('/profile')}>Profile</button>
            
            <button onClick={() => getBooks()}>{books? 'shuffle':'get books'}</button>
            <button onClick={() => searchByCategory('')}>see all books</button>
            <h3>Genres</h3>
            {genres.map( genre =>  <button id= {genre} key={genre} onClick={ () => {
                searchByCategory(genre);
            }
                }>{genre}</button>)}
            <h3>Sub-genres</h3>
            {subgenres.map(subgenre =>  <button id= {subgenre} key={subgenre} onClick={ () => {searchByCategory(subgenre);}}>{subgenre}</button>)}
        
                <h2>Your Selection</h2>
                
                <div id="results">{
                    books && results === null?
                    
                    books.map(book =>{

                        return(
                        <div key={book.key}>
                            <p>{book.title}</p>
                            <img src={book.isbn && `https://covers.openlibrary.org/b/isbn/${book.isbn[0]}-M.jpg`} />
                            <p>{book.author_name && book['author_name'].map(author => <span>{author}</span>)}</p>
                            <p>{book.isbn && book.isbn[0]}</p>
                            <button onClick = {() => { navigate(`/book/${book.isbn[0]}`)} } > Book Details</button>
                        </div>)
                    }): null

                }
                
                {results ===false && <div>No match found matching selected filter</div>}

                {filtered.length > 0 && results === true&& filtered.map(book =>{

                        return(
                        <div key={book.key}>
                            <img src="" alt="" />
                            <p>{book.title}</p>
                            <img src={`https://covers.openlibrary.org/b/isbn/${book.isbn[0]}-M.jpg`} />
                            <p>{book.author_name && book['author_name']
                            .map((author,index) => 
                            <span onClick = {() => {
                                    navigate(`/author/${book["author_key"][index]}`)
                            }}>
                                {author}
                            </span>)}</p>
                            <p>{book.isbn && book.isbn[0]}</p>
                            <button onClick = {() => { navigate(`/book/${book.isbn[0]}`)} } > Book Details</button>
                        </div>)
                    })
                    }
                {!books && <h3>Click get books to find your next read!</h3>}
                </div>
        </div>
    )
}

export default BookFinder