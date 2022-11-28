import { useEffect, useState,useContext } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "./UserContext";

const Home = () => {

    // const {actions:{addEmail}} = useContext()
    const {user} = useAuth0()
    const {actions:{getUser}} = useContext(UserContext);
    
    const navigate = useNavigate();
    const test = document.getElementById('test')
    const [books,setBooks] = useState();
    const [filtered,setFiltered] = useState([]);
    const [results,setResults] = useState(null);
    const genres = ['romance','fantasy','mystery','action','adventure','comedy','horror','drama','tragedy','science-fiction']
    const subgenres = ['school life','supernatural','martial arts','slice of life','sports','historical','psychological']

const searchByCategory = (category) =>{
        // const results = document.getElementById('results');
        // results.innerHTML = '';

    const matches = [];
    books.map(
            book =>{
                const subject = book.subject;
                const matchArr = subject.filter(str => str.includes(category));
                if(matchArr.length > 0){
                    console.log();

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


const getRandomNum = () =>{
    return Math.random()*10000000000
}

console.log('filtered',filtered)
const getBooks = ()=>{  
    const random = getRandomNum();   
    fetch(`https://openlibrary.org/search.json?sort=random_${random}&subject=Fiction`)
        .then((res) => res.json())
        .then((data) => setBooks(data.docs))}
    console.log('all books',books)
return (
    <div>
        <button onClick={() => {if (user){getUser(user.email)}}}>getUser</button>
    <button onClick={() => navigate('/profile')}>Profile</button>
        <button onClick={() => getBooks()}>{books? 'shuffle':'get books'}</button>
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
                        <img src="" alt="" />
                        <p>{book.title}</p>
                        <p>{book.isbn}</p>
                    </div>)
                }): null

            }
            
            {results ===false && <div>No match found matching selected filter</div>}

            {filtered.length > 0 && results === true&& filtered.map(book =>{
                    
                    return(
                    <div key={book.key}>
                        <img src="" alt="" />
                        <p>{book.title}</p>
                        <p>{book.isbn[0]}</p>
                    </div>)
                })
                }
            {!books && <h3>Click get books to find your next read!</h3>}
            </div>
    </div>
)
}

export default Home