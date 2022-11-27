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
    const genres = ['romance','fantasy','mystery','action','adventure','comedy','horror','drama','tragedy','science-fiction']
    const subgenres = ['school life','supernatural','martial arts','slice of life','sports','historical','psychological']


const searchByCategory = (category) =>{
   
const matched = []
    if(books){
       books.forEach(
        book =>{
            const subject = book.subject;
            const matchArr = subject.filter(str => str.includes(category))
            if(matchArr.length > 0){
                console.log(matchArr);
                console.log(book)
                matched.push(book)

            }
        }
       )
       if(matched.length > 0){
console.log('matched',matched)}
else{
    console.log('nothing found')
}
    }
   
    }

const getRandomNum = () =>{
    return Math.random()*10000000000
}

const getBooks = ()=>{  
    const random = getRandomNum();   
    fetch(`https://openlibrary.org/search.json?sort=random_${random}&subject=Fiction`)
.then((res) => res.json())
.then((data) => setBooks(data.docs))}
console.log(books)
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
    {subgenres.map(subgenre =>  <button id= {subgenre} key={subgenre} onClick={ () => searchByCategory(subgenre)}>{subgenre}</button>)}
   
</div>
)
}

export default Home