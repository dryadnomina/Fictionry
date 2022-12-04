import { UserContext } from "./UserContext"
import { useContext } from "react"
import LibraryListActions from "./LibraryListActions"
import { Tab, Tabs, TabList, TabPanel} from "react-tabs"

import styled from "styled-components"
import { useNavigate } from "react-router-dom"
const Library = () =>{
    const {state} = useContext(UserContext)
    const navigate= useNavigate();

    if(state){
    const library = state.library;
    const reviews = state.reviews;
    console.log(library)
    console.log(state)
    const libraryKeys = Object.keys(library)
    const libraryValues = Object.values(library)
    const reviewValues = Object.values(reviews)
        
    return(
        <StyledLibrary >
            <h1>Library</h1>
            <Tabs>
                <TabList>
                    <Tab>All Books</Tab>
                    <Tab>Favourites</Tab>
                    <Tab>Read</Tab>
                    <Tab>Currently Reading</Tab>
                    <Tab>Wishlist</Tab>
                    <Tab>Your reviews</Tab>
                </TabList>

                <TabPanel>
                <h2>All Books</h2>
                {libraryKeys.length > 0 && 

                    libraryKeys.map( (key) => 
                    
                        <StyledListItem>
                            <p>{library[key].book.title}</p>
                            <LibraryListActions bookId = {key} key ={key}/>
                        </StyledListItem>
                        )
                        
                }
                {Object.keys(library).length === 0 && <h2>Library is empty</h2>} 
                </TabPanel>

                <TabPanel>
                <h2>Favourites</h2>
                {libraryKeys.length > 0 &&
                
                    Object.values(library).map(book => {
                        if( book.isFavourite === true){
                            return (
                                    <StyledListItem>
                                    <h4>{book.book.title}</h4>
                                        <LibraryListActions bookId = {book.bookId} key ={book.bookId}/>
                                    </StyledListItem>
                            )
                            }
                        }
                    )
                }
                {Object.values(library).filter(book => book.isFavourite === true).length === 0 && <p>No books are favourited</p>}
                </TabPanel>

                <TabPanel>
                <h2>Read</h2>
                {libraryKeys.length > 0 &&
                
                Object.values(library).map(book => {
                    if( book.isRead === true){
                        return  ( <StyledListItem>
                                <h4>{book.book.title}</h4>
                                <LibraryListActions bookId = {book.bookId} key ={book.bookId}/>
                            </StyledListItem>)
                        }
                    }
                )
                }
                {libraryValues.filter(book => book.isRead === true).length === 0 && <p>No books are read</p>}
                </TabPanel>

                <TabPanel>
                <h2>Currently Reading</h2>
                {libraryKeys.length > 0 &&
                
                libraryValues.map(book => {
                    if( book.isCurrentlyRead === true){
                        return  ( 
                        <StyledListItem>
                                <h4>{book.book.title}</h4>
                                <LibraryListActions bookId = {book.bookId} key ={book.bookId}/>
                            </StyledListItem>
                            )
                        }
                    }
                )
                }
                {libraryValues.filter(book => book.isCurrentlyRead === true).length === 0 && <p>No books are currently being read</p>}
                </TabPanel>
                <TabPanel>
                <h2>Wishlist</h2>
                {libraryKeys.length > 0 &&
                
                libraryValues.map(book => {
                    if( book.isWishlist === true){
                        return  (
                            <StyledListItem>
                            <h4>{book.book.title}</h4>
                                <LibraryListActions bookId = {book.bookId} key ={book.bookId}/>
                            </StyledListItem>
                        )
                        }
                    }
                )  
                }
                {libraryValues.filter(book => book.isWishlist=== true).length === 0 && <p>No books are wishlisted</p>}
                </TabPanel>
                <TabPanel>
                <h2>Your Book Reviews</h2>
                {reviewValues.length > 0 && reviewValues.map(review => 
                    
                     <StyledReview>
                     <p><span>title:</span> {review.title}</p>
                     <p><span>rating:</span> {review.rating}</p>
                    <p><span>review:</span> {review.review}</p>
                    <button onClick = {() => { navigate(`/book/${review.bookId}`)} } > Book Details</button>
                     </StyledReview>
                )
               }
                </TabPanel>
            </Tabs>

        </StyledLibrary>
    )
    }
}
    export default Library

const StyledLibrary = styled.div`
ul{
    list-style:none;
    display:flex;
    gap:1vw;
}
li{
    padding:10px;
    font-weight:700;
}
li:hover{
background-color:#81EFD1;
color: white;
}
`
const StyledListItem = styled.div`
&{
    box-shadow: 12px 12px 2px 1px gold;
    margin-bottom:2vh;
}

`

const StyledReview = styled.div`
&{
    box-shadow: 12px 12px 2px 1px #81EFD1;
    margin-bottom:2vh;
    font-weight:
}

span{
font-weight:700;
}

`