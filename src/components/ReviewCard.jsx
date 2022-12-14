import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faRemove  } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export default function ReviewCard(props) {
    const [errorMessage, setErrorMessage] = useState(undefined);
    const {review, onDelete, storedToken} = props;
    const [isLiked, setIsLiked] = useState(false);
    const [likeNumber, setLikeNumber] = useState(0)
    // Gets from database a boolean, true if you've liked the review or false if you haven't
    useEffect(() => {
        const getIfIsLiked = async () => {
            try {
                const reviewIsLiked = await axios.get(`${process.env.REACT_APP_API_URL}/reviewLike/isLiked/${review._id}`, { headers: { Authorization: `Bearer ${storedToken}` } });
                setIsLiked(reviewIsLiked.data.data);
            } catch (error) {
                setErrorMessage(error.response.data.error);
            }
        }
        getIfIsLiked();
    },[isLiked,storedToken,review._id]);
    //Gets the number of likes of a review.
    useEffect(() =>{
        const getNumber = async () =>{
            try {
                const reviewLikeNum = await axios.get(`${process.env.REACT_APP_API_URL}/reviewLike/${review._id}`, { headers: { Authorization: `Bearer ${storedToken}` } });
                setLikeNumber(reviewLikeNum.data.data)
            } catch (error) {
                setErrorMessage(error.response.data.error);
            }
        }
        getNumber();
    },[storedToken, review._id, likeNumber])
    const handleLike = async (reviewId) => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/reviewLike/${reviewId}/add`, {}, { headers: { Authorization: `Bearer ${storedToken}` } });    
            !isLiked && setLikeNumber(prev => prev +1)
            setIsLiked(prev => {return !prev})
        } catch (error) {
            setErrorMessage(error.response.data.error);
        }
    };
    const handleRemoveLike = async (reviewId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/reviewLike/${reviewId}/remove`, { headers: { Authorization: `Bearer ${storedToken}` } });
            isLiked && setLikeNumber(prev => prev -1)
            setIsLiked(prev => {return !prev})
        } catch (error) {
            setErrorMessage(error.response.data.error);
        }
    };
    return (
        <div className='flex w-full py-3 px-3 mb-8 gap-2 bg-zinc-700 rounded-xl mr-5'>
            <div className='flex flex-col items-center gap-2'>
                <NavLink to={`/movies/${review.movieId._id}/overview`}><img src={review.movieId.translations[0].poster.og} alt="movie poster" className='w-12 min-w-[3rem] h-16 rounded-md' /></NavLink>
                {!isLiked && <FontAwesomeIcon icon={faHeart} onClick={() => handleLike(review._id)} />}
                {isLiked && <FontAwesomeIcon icon={faHeart} onClick={() => handleRemoveLike(review._id)} className='text-[#65B3AD]'/>}
                {!isLiked && <p>{likeNumber}</p>}
                {isLiked && <p className='text-[#65B3AD]'>{likeNumber}</p>}
            </div>
            <div className='ml-3'>
                <p><strong className='text-lg text-[#65B3AD]'>{review.titleReview}</strong></p>
                <p>{review.review}</p>
            </div>
            <button onClick={() => onDelete(review._id, review.titleReview)}><FontAwesomeIcon icon={faRemove} className="rounded-full h-8 w-8 border-0 bg-[#FF2F61]/40 text-base"/></button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    )
}
