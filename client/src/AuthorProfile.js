import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

import { v4 as uuid } from 'uuid';
import { StyledList } from "./BookFinder";

//Lists author's name and works

const AuthorProfile = () =>{

const {authorId} = useParams();
// console.log('author id',authorId)
const [author,setAuthor] = useState();
const [booksByAuthor,setBooksByAuthor] = useState();
    useEffect(() => {
        try{
                    fetch(`https://openlibrary.org/authors/${authorId}.json`)
                        .then((res) => res.json())
                        .then((data) => {
                            setAuthor(data);})
                        

                }
                catch(err){console.log(err)}

    },[])

    useEffect(() => {
        try{
                    fetch(`https://openlibrary.org/authors/${authorId}/works.json`)
                        .then((res) => res.json())
                        .then((data) => {
                            setBooksByAuthor(data);})
                        

                }
                catch(err){console.log(err)}

    },[])

// console.log('author',author)
// console.log(booksByAuthor)
if(author){
return(
    <>
    <h1>{author.name}</h1>
  
    <h2>Books by this Author</h2>
    {booksByAuthor && booksByAuthor.entries.map(
        book => 
        <StyledList key={uuid()}>
             <h3>{book.title}</h3>
            <p><a href={`https://openlibrary.org${book.key}`} target="_blank" rel="noopener noreferrer">See more info at Open Library</a></p>
        </StyledList>
    )}
    {!booksByAuthor && <h3>Loading</h3>}

    </>
    
)
    } else{
        return <h2>Loading</h2>
    }
}
export default AuthorProfile