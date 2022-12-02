import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useState } from "react";
import { UserContext } from "./UserContext";
import UserReview from "./UserReview";

const BookDetails = () =>{
const nytKey = process.env.REACT_APP_BOOKS_API_KEY
const googleKey = process.env.REACT_APP_GOOGLE_API_KEY;
const {state,actions:{addBook}} = useContext(UserContext)
const {bookId} = useParams();

const [book,setBook] = useState()
const [bookDescription,setBookDescription] = useState()
const [reviews,setReviews] = useState()

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
if(book){
        try{
                    fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${book.isbn_13? book.isbn_13:book.isbn_10}`)
                        .then((res) => res.json())
                        .then((data) => {
                            setBookDescription(data);})
                }
                catch(err){console.log(err)}
            }
    },[book])

   
    useEffect(() => {
        try{
           if(book) {
            
            if(book.isbn_13){
                fetch(`https://api.nytimes.com/svc/books/v3/reviews.json?isbn=${book.isbn_13[0]}&api-key=${nytKey}`)
                    .then(res =>res.json())
                    .then(data => {
                        setReviews(data.results);
                        console.log(data);}
                        
                        )}
                        
                    if(book.isbn_10 && book.isnb_13 === undefined){
                        fetch(`https://api.nytimes.com/svc/books/v3/reviews.json?isbn=${book.isbn_10[0]}&api-key=${nytKey}`)
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
console.log('book desc',bookDescription)

if(book && state){
    const userReviews = state.reviews;
    return (
    
    <div>
        <h1>book details</h1>
        <div>
            {book.isbn_13 && <img src={`https://covers.openlibrary.org/b/isbn/${book.isbn_13[0]}-L.jpg`} alt={book.title} />}
            {book.isbn_10 && !book.isbn_13 && <img src={`https://covers.openlibrary.org/b/isbn/${book.isbn_10[0]}-L.jpg`} alt={book.title} />}
            {!book.covers && <div>cover not found!</div>}
            <h2>{book.title}</h2>
            <h2>Description</h2>
            {bookDescription && bookDescription.totalItems === 0 && <div>Description not available!</div>}
            {bookDescription && bookDescription.totalItems > 0 && <div>{bookDescription.items[0].volumeInfo.description}</div>}
            {!bookDescription && <div>Loading</div>}
            <h2>Critic Reviews</h2>
            {!reviews && <h3>Loading</h3>}
            {reviews && reviews.length === 0 && <h3>No reviews found!</h3>}
            {reviews && reviews.length > 0 &&
            reviews.map(review => <div>
                review placeholder
            </div>
            )
            }
        </div>
        <h2>Your Reviews</h2>
        {userReviews[bookId] && <div>
            <p>{userReviews[bookId]["review"]}</p>
            <p>{userReviews[bookId]["rating"]}/5</p>

            
            </div>}
            {!userReviews[bookId] && <UserReview bookId ={bookId}/> }
    </div>
 
)
}

}
export default BookDetails