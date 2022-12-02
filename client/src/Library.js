import { UserContext } from "./UserContext"
import { useContext } from "react"

const Library = () =>{
    const {state,actions:{modifyFavourites,addToWishlist,markAsRead,markAsCurrentlyReading}} = useContext(UserContext)
    
  
    if(state){
    const library = state.library
    console.log(library)
    console.log(state)
    const libraryKeys = Object.keys(library)
    const libraryValues = Object.values(library)
    return(
        <div >
            <h1>Library</h1>
           {Object.keys(library).length > 0 && 
           
           
            libraryKeys.map( (key) => 
                <div>
                    <p>{library[key].book.title}</p> 
                     <button onClick={() =>{ modifyFavourites({bookId:key})}}>{library[key] && library[key].isFavourite? 'Favourited': 'Add to favourites'}</button>
                    <button onClick={() =>{ markAsRead({bookId:key})}}>{library[key] && library[key].isRead? 'Read': 'Mark as Read'}</button>
                    <button onClick={() =>{ markAsCurrentlyReading({bookId:key})}}>{library[key] && library[key].isCurrentlyRead? 'Currently reading': 'Mark as Currently reading'}</button>
                    <button onClick={() =>{ addToWishlist({bookId:key})}}>{library[key] && library[key].isWishlist? 'Wishlisted': 'Add to Wishlist'}</button>
                </div>
                )
                
        }
        {Object.keys(library).length === 0 && <h2>Library is empty</h2>}
        </div>
    )
    }
}
    export default Library