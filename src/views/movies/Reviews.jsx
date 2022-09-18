import React, {useContext, useEffect, useState} from 'react'
import { AuthContext } from '../../context/AuthContext';
import { useOutletContext } from 'react-router-dom'
import MovieReviewCard from '../../components/MovieReviewCard';
import axios from 'axios';

export default function Reviews() {
    const [movie] = useOutletContext();
    const storedToken = localStorage.getItem('authToken');
    const [reviews, setReviews] = useState('')
    const {user} = useContext(AuthContext);
    useEffect(() => {
        const getReviews = async () => {
            try {
                const reviewsFromDB = await axios.get(`${process.env.REACT_APP_API_URL}/reviews/${movie._id}/allReviews`, { headers: { Authorization: `Bearer ${storedToken}` } });
                setReviews(reviewsFromDB.data.data)
            } catch (error) {
                console.log(error);
            }
        }
        getReviews();
    },[storedToken, movie._id]);

    return (
        <div>
            {reviews && reviews.map(review => {
                    return (
                    <div className="" key={`${review._id}`}>
                        <MovieReviewCard review={review} storedToken={storedToken} />

                        {/* <div className="userProfilePicture">
                        <img src={review.userId.imageUrl} alt="user" />
                        </div>
                        <div className="reviewBody">
                            <h4>{review.titleReview}</h4>
                            <p>{review.review}</p>
                        </div> */}
                    </div>)
                })}
        </div>
    )
}
