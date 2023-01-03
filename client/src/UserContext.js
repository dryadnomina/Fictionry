import {createContext, useEffect, useReducer} from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const UserContext = createContext();
 
const initialState = {

    library:{},
    reviews:{}
}

const WEB_SERVICE_URL = 'https://fictionry.onrender.com';
const reducer = (state, action) => {
 
    switch (action.type) {
        // gets user from backend
        case 'get-user' : {
            const {payload} = action
                    return {...state,...payload}
                    }

//adds user email
        case 'add-email' : {
    
            const {payload} = action
            return {
                ...state, email:payload
    
            }
        }

        //adds book to user's library
        case 'add-book' : {
    
            const {payload:{bookId,book}} = action
            const library = state.library

            const newBook = {bookId:bookId, 
                book:book, 
                isRead:false,
                isFavourite:false,
                isCurrentlyRead:false,
                isWishlist:false
            }
    
            library[bookId] = newBook;
            return {...state}
            }
//adds review to review object
            case 'add-review' : {
    
                const {payload:{bookId,rating,review,title,author}} = action
                const reviews = state.reviews

                const newReview = {
                    title: title,
                    author:author,
                    bookId:bookId, 
                    rating:rating,
                    review:review,
                }
        
                reviews[bookId] = newReview;
                return {...state}
                }
        
//toggles favourites
        case 'modify-favourites' : {
    
            
            const {payload} = action
            if(!state.library[payload.bookId].isFavourite){
                state.library[payload.bookId].isFavourite = true
                return {...state}
        }
        if(state.library[payload.bookId].isFavourite){
            state.library[payload.bookId].isFavourite = false
            return {...state}
        }
        
        }
//marks book as read
        case 'mark-as-read' : {
    
            
            const {payload} = action
            if(!state.library[payload.bookId].isRead){
                state.library[payload.bookId].isRead = true
                return {...state}
        }
        if(state.library[payload.bookId].isRead){
            state.library[payload.bookId].isRead = false
            return {...state}
        }
        
        }
//marks book as currently read
        case 'mark-as-currently-reading' : {
    
            
            const {payload} = action
            if(!state.library[payload.bookId].isCurrentlyRead){
                state.library[payload.bookId].isCurrentlyRead = true
                return {...state}
        }
        if(state.library[payload.bookId].isCurrentlyRead){
            state.library[payload.bookId].isCurrentlyRead = false
            return {...state}
        }
        
        }
//adds book to wishlist
        case 'add-to-wishlist' : {
    
            
            const {payload} = action
            if(!state.library[payload.bookId].isWishlist){
                state.library[payload.bookId].isWishlist = true
                return {...state}
        }
        if(state.library[payload.bookId].isWishlist){
            state.library[payload.bookId].isWishlist= false
            return {...state}
        }
        
        }
//removes book from user's library
        case 'remove-book':{
            const {payload} = action
            delete state.library[payload.bookId]
            return {
                ...state,
            }
        }
//clear library
        case 'clear-library':{
        
            state.library = {}
            return {
                ...state,
            }
        }
        //clears all reviews
        case 'clear-reviews':{
            
                state.reviews = {}
                return {
                    ...state,
                }
            }
//deletes specific review based on id
        case 'delete-review':{
            const {payload} = action
            delete state.reviews[payload.bookId]
            return {
                ...state,
            }
        }
        default:
        throw new Error(`Unrecognized action: ${action.type}`);
    }
    }
    
    export const UserProvider = ({ children }) => {
        const {user} = useAuth0();
        
        const [state, dispatch] = useReducer(reducer, initialState);
        // console.log('authenticated',isAuthenticated,'loading', isLoading,'user', user)
        //updates user when state changes
        const updateUser=()=>{
        
            fetch(WEB_SERVICE_URL + '/update-user', {
                method: 'PATCH',

                body: JSON.stringify(state),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                })
                .then((response) => response.json())
                // .then((json) => console.log(json));
            }
        
        
     //will only update state if user's id is present to prevent accidental deletion of library or reviews
    useEffect(()=>{
        if(state._id){
        
    updateUser();

    }},[state])

    //fetches user information, if newuser, creates a new user in the database
    useEffect(()=>{
        if(user){
            try{
            fetch(WEB_SERVICE_URL + '/find-user', {
                        method: 'POST',
        
                        body: JSON.stringify({email:user.email}),
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                        },
                        })
                .then((response) => response.json())
                .then(data =>{ if(data.status === 200)
                    {getUser(data.data)
                    }else{
                        fetch(WEB_SERVICE_URL + '/add-user', {
                                    method: 'POST',
                    
                                    body: JSON.stringify({state}),
                                    headers: {
                                        'Content-type': 'application/json; charset=UTF-8',
                                    },
                                    })
                            .then((response) => response.json())
                            .then(data => getUser(data.data))
                            }
                })

            }catch(err){
                    console.log(err)
                }
            }
            },[user])        
//adds book to library: { bookId:123,book:{book obj},}
const addBook = (data) => dispatch({type: 'add-book',payload:data});

//add review for selected book
const addReview = (data) => dispatch({type: 'add-review',payload:data})
//adds current user email to state
const addEmail = (data) => dispatch({type: 'add-email',payload:data});


//removes selected book from library, data shape: { bookId:123}
const removeBook = (data) => dispatch({type: 'remove-book',payload:data});

//toggles favourites of select book on click
const modifyFavourites = (data) => dispatch({type: 'modify-favourites',payload:data});

//marks selected book as read
const markAsRead = (data) => dispatch({type: 'mark-as-read',payload:data});

//marks selected book as currently reading
const markAsCurrentlyReading = (data) => dispatch({type: 'mark-as-currently-reading',payload:data});

//adds selected book to wishlist
const addToWishlist = (data) => dispatch({type: 'add-to-wishlist',payload:data});

//adds user information to state
const getUser = (data)=>dispatch({type: 'get-user',payload:data});

//clears user's Library
const clearLibrary = () => {dispatch({type:'clear-library'})};

//clears reviews
const clearReviews = () => {dispatch({type:'clear-reviews'})};

//delete specific review based on book id
const deleteReview = (data) => dispatch({type: 'delete-review',payload:data});

// console.log('state',state)


    return (
        <UserContext.Provider
            value={{
            ...state,
            actions: {
                getUser,
                addBook,
                addEmail,
                removeBook,
                modifyFavourites,
                markAsRead,
                markAsCurrentlyReading,
                addToWishlist,
                addReview,
                clearLibrary,
                clearReviews,
                deleteReview}
                ,state
        }}
        >
            {children}
        </UserContext.Provider>
    );
}