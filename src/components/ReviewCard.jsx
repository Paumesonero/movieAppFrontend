import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { NavLink} from 'react-router-dom';
import { faHeartCrack } from '@fortawesome/free-solid-svg-icons';

export default function ReviewCard(props) {
    const [errorMessage, setErrorMessage] = useState(undefined);
    const {review, onDelete, storedToken} = props;
    const [isLiked, setIsLiked] = useState(false);
    const [likeNumber, setLikeNumber] = useState(0)

    useEffect(() => {
        const getIfIsLiked = async () => {
            try {
                const reviewIsLiked = await axios.get(`${process.env.REACT_APP_API_URL}/reviewLike/isLiked/${review._id}`, { headers: { Authorization: `Bearer ${storedToken}` } });
                setIsLiked(reviewIsLiked.data.data);
            } catch (error) {
                console.log(error)
            }
        }
        getIfIsLiked();
    },[isLiked,storedToken,review._id]);

    useEffect(() =>{
        const getNumber = async () =>{
            try {
                const reviewLikeNum = await axios.get(`${process.env.REACT_APP_API_URL}/reviewLike/${review._id}`, { headers: { Authorization: `Bearer ${storedToken}` } });
                setLikeNumber(reviewLikeNum.data.data)
            } catch (error) {
                console.log(error)
            }
        }
        getNumber();
    },[storedToken, review._id, likeNumber])
    const handleLike = async (reviewId) => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/reviewLike/add/${reviewId}`, {}, { headers: { Authorization: `Bearer ${storedToken}` } });    
            !isLiked && setLikeNumber(prev => prev +1)
            setIsLiked(prev => {return !prev})
        } catch (error) {
            console.log(error)
        }
    };

    const handleRemoveLike = async (reviewId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/reviewLike/remove/${reviewId}`, { headers: { Authorization: `Bearer ${storedToken}` } });
            isLiked && setLikeNumber(prev => prev -1)
            setIsLiked(prev => {return !prev})
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div>
            <div>
                <NavLink to={`/movies/${review.movieId._id}`}><img src={review.movieId.translations[0].poster.og} alt="movie poster" className='w-12 min-w-[3rem] h-16 rounded-md' /></NavLink>
                {!isLiked && <FontAwesomeIcon icon={faHeart} onClick={() => handleLike(review._id)}/>}
                {isLiked && <FontAwesomeIcon icon={faHeartCrack} onClick={() => handleRemoveLike(review._id)}/>}
                <p>{likeNumber}</p>
            </div>
            <div>
                <p><strong>{review.titleReview}</strong></p>
                <p>{review.review}</p>
                <button onClick={() => onDelete(review._id, review.titleReview)}> Delete</button>
            </div>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    )
}
