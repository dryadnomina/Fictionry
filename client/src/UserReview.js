import { UserContext } from "./UserContext";
import { useContext, useState } from "react";
import styled from "styled-components";

//user can rate book out of 5 and leave a review
const UserReview = ({bookId,author,title}) =>{
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
<StyledReview>
    <h3>Leave Review</h3>
    <div>
        <button  onClick ={handleReview} value="1">1</button>
        <button onClick ={handleReview} value="2">2</button>
        <button onClick ={handleReview} value="3">3</button>
        <button onClick ={handleReview} value="4">4</button>
        <button onClick ={handleReview} value="5">5</button>
    </div>
    <textarea  onChange ={handleReview}id="review"  placeholder="write your review here...">
    
    </textarea>
    <button disabled={review && rating === undefined? true : false} onClick={() => addReview({title:title,author:author, bookId:bookId,review:review,rating:rating,})}>Submit</button>
</StyledReview>
)
}

export default UserReview

const StyledReview = styled.div`
div{
    display:flex;
}
&{
    display:flex;
    flex-flow:column;
}
textarea{
    height:10vh;
    font-size: 15px;
}
div > button{
    padding:10px;
    border-radius:5px;
}
button:hover{
    background-color:#81EFD1;
    color: white;
    }
`