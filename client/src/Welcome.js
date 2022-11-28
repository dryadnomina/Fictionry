import { useAuth0 } from "@auth0/auth0-react"
import { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "./UserContext";

const Welcome = () =>{
const {user} = useAuth0();
const navigate = useNavigate();
const {actions:{getUser,addUser},state} = useContext(UserContext);

useEffect(()=>{
    if(user){
        try{
        fetch('/find-user', {
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
                    fetch('/add-user', {
                                method: 'POST',
                
                                body: JSON.stringify({state}),
                                headers: {
                                    'Content-type': 'application/json; charset=UTF-8',
                                },
                                })
                        .then((response) => response.json())
                        .then(data => getUser(data.data))
                            console.log('in use effect')}
            })
            
           
        }catch(err){
                console.log(err)
            }
        }
    //     // else{
        //   
        },[])
    return(
        <div>
            <h1>Welcome, {user.given_name}</h1>
            <h3 onClick={() => navigate('/find-books')}>Find your next sanctuary</h3>
        </div>
    )
}

export default Welcome;