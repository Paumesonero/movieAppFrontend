import React, {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default function MovieReviewCard(props) {
    const [errorMessage, setErrorMessage] = useState(undefined);
    const {review, storedToken} = props;
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
                const reviewLikeNum = await axios.get(`${process.env.REACT_APP_API_URL}/reviewLike/${review._id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
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
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <div className='flex flex-col items-center'>
                    <img src={review.userId.imageUrl} alt="user" className='profile-img-round max-w-[4rem] min-w-[3rem] h-[5.5rem]'/>
                    {!isLiked && <FontAwesomeIcon icon={faHeart} onClick={() => handleLike(review._id)} />}
                    {isLiked && <FontAwesomeIcon icon={faHeart} onClick={() => handleRemoveLike(review._id)} className='text-[#65B3AD]'/>}
                    {isLiked && <p className='text-[#65B3AD]'>{likeNumber}</p>}
                    {!isLiked && <p>{likeNumber}</p>}
                </div>
            <div className="flex flex-col">
                <h4> <strong className='text-lg text-[#65B3AD]'>{review.titleReview}</strong><span> ({review.userId.username})</span></h4>
                <p className=''>{review.review}</p>
            </div>
        </div>
    )
}
