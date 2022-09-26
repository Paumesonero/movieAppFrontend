import React, {useEffect, useState} from 'react'
import { useOutletContext } from 'react-router-dom'
import MovieReviewCard from '../../components/MovieReviewCard';
import axios from 'axios';

export default function Reviews() {
    const [movie] = useOutletContext();
    const storedToken = localStorage.getItem('authToken');
    const [reviews, setReviews] = useState('')
    //Gets all reviews about a certain movie
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
        <div className='flex flex-col items-center gap-6 mr-3'>
            {reviews && reviews.map(review => {
                    return (
                    <div className="flex, flex-col gap-5" key={`${review._id}`}>
                        <MovieReviewCard review={review} storedToken={storedToken} />
                        <hr className='relative top-5 mb-4' />
                    </div>)
                })}
        </div>
    )
}
