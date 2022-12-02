import { UserContext } from "./UserContext";
import { useContext, useState } from "react";

const UserReview = ({bookId}) =>{
    const{actions: {addReview} } = useContext(UserContext)
    const reviewElem = document.getElementById('review');
    const [review,setReview] = useState();
    const [rating,setRating] = useState();
    const handleReview = (e) => {
        if(e.target === reviewElem){
            console.log(e.target.value)
            setReview(e.target.value)
        }
        else{
            console.log(e.target.value);
            setRating(e.target.value);
        }
    }

    console.log(review,rating)
return(
<div>
    <h3>review</h3>
    <div>
        <button  onClick ={handleReview} value="1">1</button>
        <button onClick ={handleReview} value="2">2</button>
        <button onClick ={handleReview} value="3">3</button>
        <button onClick ={handleReview} value="4">4</button>
        <button onClick ={handleReview} value="5">5</button>
    </div>
    <textarea  onChange ={handleReview}id="review"  placeholder="write your review here...">
    
    </textarea>
    <button disabled={review && rating === undefined? true : false} onClick={() => addReview({bookId:bookId,review:review,rating:rating})}>Submit</button>
</div>
)
}

export default UserReview