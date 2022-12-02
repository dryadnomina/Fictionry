import { useContext } from "react"
import { UserContext } from "./UserContext"

const LibraryListActions = ({bookId}) => {
const {state,actions:{modifyFavourites,markAsRead,markAsCurrentlyReading,addToWishlist}} = useContext(UserContext)
const library = state.library;
    return(
        <div>
            <button onClick={() =>{ modifyFavourites({bookId:bookId})}}>{library[bookId] && library[bookId].isFavourite? 'Favourited': 'Add to favourites'}</button>
            <button onClick={() =>{ markAsRead({bookId:bookId})}}>{library[bookId] && library[bookId].isRead? 'Read': 'Mark as Read'}</button>
            <button onClick={() =>{ markAsCurrentlyReading({bookId:bookId})}}>{library[bookId] && library[bookId].isCurrentlyRead? 'Currently reading': 'Mark as Currently reading'}</button>
            <button onClick={() =>{ addToWishlist({bookId:bookId})}}>{library[bookId] && library[bookId].isWishlist? 'Wishlisted': 'Add to Wishlist'}</button>
        </div>
    )
}
export default LibraryListActions