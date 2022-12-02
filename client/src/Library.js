import { UserContext } from "./UserContext"
import { useContext } from "react"
import LibraryListActions from "./LibraryListActions"
import { Tab, Tabs, TabList, TabPanel} from "react-tabs"
const Library = () =>{
    const {state,actions:{modifyFavourites,addToWishlist,markAsRead,markAsCurrentlyReading}} = useContext(UserContext)
    
  
    if(state){
    const library = state.library;
    const reviews = state.reviews;
    console.log(library)
    console.log(state)
    const libraryKeys = Object.keys(library)
    const libraryValues = Object.values(library)
    const reviewValues = Object.values(reviews)

    return(
        <div >
            <h1>Library</h1>
            <Tabs>
                <TabList>
                    <Tab>All Books</Tab>
                    <Tab>Favourites</Tab>
                    <Tab>Read</Tab>
                    <Tab>Currently Reading</Tab>
                    <Tab>Wishlisted</Tab>
                    <Tab>Your reviews</Tab>
                </TabList>

                <TabPanel>
                <h2>All Books</h2>
                {libraryKeys.length > 0 && 

                    libraryKeys.map( (key) => 
                    
                        <div>
                            <p>{library[key].book.title}</p>
                            <LibraryListActions bookId = {key} key ={key}/>
                        </div>
                        )
                        
                }
                {Object.keys(library).length === 0 && <h2>Library is empty</h2>} 
                </TabPanel>

                <TabPanel>
                <h2>favourites</h2>
                {libraryKeys.length > 0 &&
                
                    Object.values(library).map(book => {
                        if( book.isFavourite === true){
                            return  <div>
                                        <p>{book.book.title}</p>
                                        <LibraryListActions bookId = {book.bookId} key ={book.bookId}/>
                                    </div>
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
                        return  <div>
                                    <p>{book.book.title}</p>
                                    <LibraryListActions bookId = {book.bookId} key ={book.bookId}/>
                                </div>
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
                        return  <div>
                                    <p>{book.book.title}</p>
                                    <LibraryListActions bookId = {book.bookId} key ={book.bookId}/>
                                </div>
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
                        return  <div>
                                    <p>{book.book.title}</p>
                                    <LibraryListActions bookId = {book.bookId} key ={book.bookId}/>
                                </div>
                        }
                    }
                )
                }
                {libraryValues.filter(book => book.isWishlist=== true).length === 0 && <p>No books are wishlisted</p>}
                </TabPanel>
                <TabPanel>
                <h2>Your Book Reviews</h2>
                {reviewValues.length > 0 && reviewValues.map(review => 
                    <div>
                    <p>rating: {review.rating}</p>
                    <p>review: {review.review}</p>
                    </div>
                    
                )
               }
                </TabPanel>
            </Tabs>

        </div>
    )
    }
}
    export default Library