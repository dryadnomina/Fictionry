import { useState,useContext } from "react"
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const BookFinder = () => {
    
    const navigate = useNavigate();

    const {actions:{addBook,removeBook},state} = useContext(UserContext)

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
            <button id="" onClick={() => getBooks()}>{books? 'shuffle':'get books'}</button>
            {books && <button onClick={() => searchByCategory('')}>see all books</button>}
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
                            <span key={author + index} id={author} onClick = {() => {
                                    navigate(`/author/${book["author_key"][index]}`)
                            }}>
                                {author}
                            </span>)}</p>
                            <p>{book.isbn && book.isbn[0]}</p>
                            <button onClick = {() => { navigate(`/book/${book.edition_key[0]}`)} } > Book Details</button>
                        </div>)
                    })
                    }
                {!books && <h3>Click get books to find your next read!</h3>}
                </div>
        </div>
    )
}

export default BookFinder