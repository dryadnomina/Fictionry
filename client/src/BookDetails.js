import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useState } from "react";
import { UserContext } from "./UserContext";

const BookDetails = () =>{
const nytKey = process.env.REACT_APP_BOOKS_API_KEY
const {state} = useContext(UserContext)
const {bookId} = useParams();

const [book,setBook] = useState()
const [reviews,setReviews] = useState()
const userReviews = state.library.filter(book => book.id === bookId);
console.log('user reviews',userReviews)
    useEffect(() => {
        try{
                    fetch(`https://openlibrary.org/books/${bookId}.json`)
                        .then((res) => res.json())
                        .then((data) => {
                            setBook(data);})
                        

                }
                catch(err){console.log(err)}

    },[])

    useEffect(() => {
        try{
           if(book) {
            
            if(book.isbn_13 && book.isbn_10){
                fetch(`https://api.nytimes.com/svc/books/v3/reviews.json?isbn=${book.isbn_13}&api-key=${nytKey}`)
                    .then(res =>res.json())
                    .then(data => {
                        setReviews(data.results);
                        console.log(data);}
                        
                        )}
                        
                    if(book.isbn_10 && book.isnb_13 === undefined){
                        fetch(`https://api.nytimes.com/svc/books/v3/reviews.json?isbn=${book.isbn_10}&api-key=${nytKey}`)
                            .then(res =>res.json())
                            .then(data => {
                                setReviews(data.results);
                                console.log(data);}
                        
                        )
                        }
}
                }
                catch(err){console.log(err)}

    },[book])

console.log('book',book)
console.log('reviews',reviews)

if(book){return (<><h1>book details</h1>
<div>
    {book.isbn_13 && <img src={`https://covers.openlibrary.org/b/isbn/${book.isbn_13[0]}-L.jpg`} alt="" />}

    <h2>{book && book.title}</h2>
    <h3>Critic Reviews</h3>
    {!reviews && <h3>Loading</h3>}
    {reviews && reviews.length === 0 && <h3>No reviews found!</h3>}
    {reviews && reviews.length > 0 && 
    reviews.map(review => <div>
        review placeholder
    </div>
    )
    }
    {}
</div>
</>)}

}
export default BookDetails