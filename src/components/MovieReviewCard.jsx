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
    <div className='flex gap-3 ml-3'>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <div className='flex flex-col items-center gap-1'>
                <img src={review.userId.imageUrl} alt="user" className='profile-img-round max-w-[4rem] min-w-[4rem] h-[5.5rem]'/>
                <p>{review.userId.username}</p>
            </div>
        <div className="flex flex-col gap-4">
            <h4> <strong className='text-lg text-[#65B3AD]'>{review.titleReview}</strong></h4>
            <p className=''>{review.review}</p>
            <div className='flex items-center gap-2'>
                {!isLiked && <FontAwesomeIcon icon={faHeart} onClick={() => handleLike(review._id)} />}
                {isLiked && <FontAwesomeIcon icon={faHeart} onClick={() => handleRemoveLike(review._id)} className='text-[#65B3AD]'/>}
                {isLiked && <p className='text-[#65B3AD]'>{likeNumber}</p>}
                {!isLiked && <p>{likeNumber}</p>}
            </div>
         </div> 
    </div>
  )
}
