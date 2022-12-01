import { UserContext } from "./UserContext";
import { useContext, useState } from "react";

const UserReview = ({bookId}) =>{
    const{actions: {addReview} } = useContext(UserContext)
    const reviewElem = document.getElementById('review');
    const ratingElem = document.querySelector('input[name="rating"]:checked');
    const [review,setReview] = useState();
    const [rating,setRating] = useState();
    const handleReview = (e) => {
        if(e.target === reviewElem){
            console.log(e.target.value)
            setReview(e.target.value)
        }
        if(e.target === ratingElem){
            console.log(e.target.value)
            setRating(e.target.value)
        }
    }

    console.log(review,rating)
return(
<div>
    <fieldset>
        <h4>Review</h4>
        <div>
            <input onClick = {handleReview} type="radio" id="1" name="rating" value="1"/>
            <label htmlFor="1">1</label>
        </div>
        <div>
            <input onClick = {handleReview} type="radio" id="2" name="rating" value="2"/>
            <label htmlFor="2">2</label></div>
        <div>
            <input onClick = {handleReview} type="radio" id="3" name="rating" value="3"/>
            <label htmlFor="3">3</label></div>
        <div>
            <input  onClick = {handleReview} type="radio" id="4" name="rating" value="4"/>
            <label htmlFor="4">4</label></div>
        <div>
            <input onClick = {handleReview} type="radio" id="5" name="rating" value="5"/>
            <label htmlFor="5">5</label></div>
        
    </fieldset>
    <textarea  onChange ={handleReview}id="review"  placeholder="write your review here...">
    
    </textarea>
    <button disabled={review && rating === undefined? true : false} onClick={() => addReview({bookId:bookId,review:review,rating:rating})}>Submit</button>
</div>
)
}

export default UserReview