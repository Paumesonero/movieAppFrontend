import React, { useEffect,useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

export default function UserDetails() {

    const {  user } = useContext(AuthContext);
    const [reviews, setReviews] = useState(null)

    useEffect(() => {
        const getReviews = async () =>{
            try {
                const reviewsFromApi = await axios.get(`${process.env.REACT_APP_API_URL}/reviews/recentUserReviews`, user)
                console.log(reviewsFromApi)
                setReviews(reviewsFromApi.data)
            } catch (error) {
                console.log(error)
            }
        }
        getReviews();
    },[user])
  return (
    <div>
        <p>Hello {user.username}</p>
        <p>{user.biography}</p>

        <h5>My reviews</h5>
        {reviews && reviews.map(el =>{
            return(
                <div key={el._id}>
                <p><strong>{el.titleReview}</strong></p>
                <p>{el.review}</p>
                </div>
            )
        })}
        {!reviews && <p>Loading...</p>}
    </div>
  )
}
