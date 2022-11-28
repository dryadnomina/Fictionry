import {createContext, useEffect, useReducer} from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';

export const UserContext = createContext();
 
const initialState = {

    library:[]
}




const reducer = (state, action) => {
 
    switch (action.type) {
        // gets user from backend
        case 'get-user' : {
            const {payload} = action
                    return payload
                    }

//adds book to user's library
        case 'add-email' : {
    
            const {payload} = action
            return {
                ...state, email:payload
    
            }
        }

//removes book from user's library
        case 'remove-book':{
            const {payload} = action
            delete state[payload.bookId]
            return {
                ...state,
            }
        }

        default:
        throw new Error(`Unrecognized action: ${action.type}`);
    }
    }
    
    export const UserProvider = ({ children }) => {
        const { isAuthenticated, isLoading, user} = useAuth0();
        const [email,setEmail] = useState();
        
        const [state, dispatch] = useReducer(reducer, initialState);
        console.log('authenticated',isAuthenticated,'loading', isLoading,'user', user)
        const updateUser=()=>{
        
            fetch('/add-user', {
                method: 'POST',

                body: JSON.stringify({state}),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                })
                .then((response) => response.json())
                .then((json) => console.log(json));
            }
        
        
     
    // useEffect(()=>{
    //     if(user && !isLoading){
        
    // updateUser();
    // //     }
    // },[state])


//adds book to library: { bookId:123,book:{book obj},}
const addBook = (data) => dispatch({type: 'add-book',payload:data});
//adds current user email to state
const addEmail = (data) => dispatch({type: 'add-email',payload:data});
// if(user){addEmail(user.email)}

//removes selected book from library, data shape: { bookId:123}
const removeBook = (data) => dispatch({type: 'remove-book',payload:data});

const getUser = (data)=>dispatch({type: 'get-user',payload:data})

//clears user's Library
const clearLibrary = () => {dispatch({type:'clear-library'})}

console.log('state',state)


//cannot use useContext hook with AUth0, whe use context is not used in other components - it works
    return (
        <UserContext.Provider
            value={{
            ...state,
            actions: {
                getUser,
                addBook,
                addEmail,
                removeBook,
                clearLibrary}
                ,state
        }}
        >
            {children}
        </UserContext.Provider>
    );
}