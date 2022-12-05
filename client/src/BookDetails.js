import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useState } from "react";
import { UserContext } from "./UserContext";
import UserReview from "./UserReview";
import styled from "styled-components";
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


if(book && bookDescription && state){
    const userReviews = state.reviews;

    return (
    
    <StyledBookDetails>
        <h1>{book.title}</h1>
        <div>
            {book.isbn_13 && <img src={`https://covers.openlibrary.org/b/isbn/${book.isbn_13[0]}-L.jpg`} alt={book.title} />}
            {book.isbn_10 && !book.isbn_13 && <img src={`https://covers.openlibrary.org/b/isbn/${book.isbn_10[0]}-L.jpg`} alt={book.title} />}
            <h3>Details</h3>
            {book.isbn_10 && <p>isbn-10: {book.isbn_10[0]}</p>}
            {book.isbn_13 && <p>isbn-13: {book.isbn_13[0]}</p>}
            {book.number_of_pages && <p>Number of pages: {book.number_of_pages}</p>}
            {book.publish_date && <p>Published on: {book.publish_date}</p>}
            { book.publishers && <StyledList > Publishers: {book.publishers && book.publishers.map(
                    (publisher) => <span key={publisher}>{publisher}</span>
                )}
            </StyledList>}
            <h3>Subjects</h3>
            <StyledSubjects >
                
                    {book.subjects && book.subjects.map(
                        subject => <span key={subject}>{subject}</span>
                    )}
            </StyledSubjects>
            <h3>Description</h3>
            {bookDescription.totalItems === 0 && book.description === undefined &&<div>Description not available!</div>}
            {book.description && book.description.value &&  <div>{book.description.value}</div> } 
            {book.description === undefined && 
            bookDescription.totalItems > 0 &&
            bookDescription.items[0].volumeInfo.description !== undefined 
            && <div>{bookDescription.items[0].volumeInfo.description}</div>}
            {book.description !== undefined && 
            bookDescription.totalItems == 0 && <div>{book.description.value}</div>}
            {!bookDescription && <div>Loading</div>}
            <h3>Critic Reviews</h3>
            {!reviews && <h3>Loading</h3>}
            {reviews && reviews.length === 0 && <h3>No reviews found!</h3>}
            {reviews && reviews.length > 0 &&
            reviews.map(review => <div>
                review placeholder
            </div>
            )
            }
        </div>
        <h3>Your Reviews</h3>
        {userReviews[bookId] && <div>
            <StyledReview>
                <p>Review: {userReviews[bookId]["review"]}</p>
                <p>Rating: {userReviews[bookId]["rating"]}/5</p>
            </StyledReview>

            
            </div>}
            {!userReviews[bookId] && <UserReview bookId ={bookId} title={book.title} author= {book.authors[0]}/> }
    </StyledBookDetails>
 
)
}

}
export default BookDetails

const StyledBookDetails =styled.div`
&{
    display:flex;
    flex-flow:column;
    align-self:center;
}
img{
    height:500px;
    width:333px; 
    border:solid black 1px;
}
`
const StyledSubjects =styled.div`

&{
    display:grid;
    grid-auto-rows: auto;
    grid-template-columns:repeat(4,1fr);
    gap:5px;
}
span{
   
    background-color:#FDA377;
    padding:10px;
    color:white;
}`

const StyledList = styled(StyledSubjects)`
span{
    background-color:#81EFD1;
}

`
const StyledReview =styled.div`
&{
    background-color:#81EFD1;
    color: white;
    padding:10px;
    border-radius:5px;
    box-shadow:12px 12px 2px 1px rgba(0, 0, 255, .2);
}



p{
    color:white;
    font-weight:700;
    border-bottom:solid white 3px;
}
`