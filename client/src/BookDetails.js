import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useState } from "react";

const BookDetails = () =>{
const nytKey = process.env.REACT_APP_BOOKS_API_KEY

console.log(nytKey)
const {bookId} = useParams();
console.log(bookId)
const [book,setBook] = useState()
const [reviews,setReviews] = useState()
    useEffect(() => {
        try{
                    fetch(`https://openlibrary.org/books/${bookId}.json`)
                    .then((res) => res.json())
                    .then((data) => setBook(data))
                    
                }
                catch(err){console.log(err)}

    },[])
    useEffect(() =>{
        try{
            if(book){
            fetch(`https://api.nytimes.com/svc/books/v3/reviews.json?isbn=${book.isbn_13}&api-key=${nytKey}`)
            .then(res =>res.json())
            .then(data => setReviews(data.results))}
        }
        catch(err){
            console.log(err)
        }
    },[])
console.log('book',book)
console.log('reviews',reviews)
return (<><h1>book details</h1>
<div>
    <img src={book && `https://covers.openlibrary.org/b/isbn/${book.isbn_13[0]}-L.jpg`} alt="" />
    <h2>{book && book.title}</h2>
    <h3>Critic Reviews</h3>
</div>
</>)

}
export default BookDetails