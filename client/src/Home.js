import { useEffect, useState } from "react"


const Home = () => {

const test = document.getElementById('test')
const [books,setBooks] = useState();
const genres = ['romance','fantasy','mystery','action','adventure','comedy','horror','drama','tragedy','science-fiction']
const subgenres = ['school life','supernatural','martial arts','slice of life','sports','historical','psychological']


const searchByCategory = (category) =>{
const matched = []
    if(books){
       books.map(
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
const random = getRandomNum();   
useEffect(()=>{  
    fetch(`https://openlibrary.org/search.json?sort=random_${random}&subject=Fiction`)
.then((res) => res.json())
.then((data) => setBooks(data.docs))},[])
console.log(books)
return (
<div>
    <button id= "romance" onClick={ () => searchByCategory(test.id)}>Test</button>
    <h3>Genres</h3>
    {genres.map( genre =>  <button id= {genre} key={genre} onClick={ () => searchByCategory(genre)}>{genre}</button>)}
    <h3>Sub-genres</h3>
    {subgenres.map(subgenre =>  <button id= {subgenre} key={subgenre} onClick={ () => searchByCategory(subgenre)}>{subgenre}</button>)}
   
</div>
)
}

export default Home