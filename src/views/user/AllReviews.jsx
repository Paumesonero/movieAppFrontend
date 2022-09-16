import React,{useState, useEffect} from 'react'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import {NavLink} from 'react-router-dom';
import toast from 'react-hot-toast';

export default function AllReviews() {
  const storedToken = localStorage.getItem('authToken');
  const [reviews, setReviews] = useState(null)
  const [errorMessage, setErrorMessage] = useState(undefined);

  useEffect(() => {
    const getReviews = async () => {
        try {
            const reviewsFromApi = await axios.get(`${process.env.REACT_APP_API_URL}/reviews/allUserReviews`, { headers: { Authorization: `Bearer ${storedToken}` } });
            setReviews(reviewsFromApi.data.data);
        } catch (error) {
            console.log(error);
        }
    }
    getReviews();
},[storedToken]);

const handleLike = async (reviewId) => {
  try {
      await axios.post(`${process.env.REACT_APP_API_URL}/reviewLike/${reviewId}/add`, {}, { headers: { Authorization: `Bearer ${storedToken}` } });
  } catch (error) {
      setErrorMessage(error.response.data.error);
  }
}

const handleDelete = async (reviewId, titleReview) => {
  try {
      const filteredReviews = reviews.filter(el =>{
          return el.titleReview !== titleReview
      })
      setReviews(filteredReviews)
      await axios.delete(`${process.env.REACT_APP_API_URL}/reviews/${reviewId}/delete`, { headers: { Authorization: `Bearer ${storedToken}` } });
      toast.error(' Review deleted!');
  } catch (error) {
      console.log(error)
  }
};
  return (
    <div>
        <h2>My reviews</h2>
        {reviews && reviews.slice(2).map(el =>{
          return(
            <div key={el._id} className='flex gap-3'>
                          <div>
                            <NavLink to={`/movies/${el.movieId}`}><img src={el.movieId.translations[0].poster.og} alt="movie poster" className='w-12 min-w-[3rem] h-16 rounded-md' /></NavLink>
                            <FontAwesomeIcon icon={faHeart} onClick={() => handleLike(el._id)}/>
                            </div>
                            <div>
                            <p><strong>{el.titleReview}</strong></p>
                            <p>{el.review}</p>
                            <button onClick={() => handleDelete(el._id, el.titleReview)}> Delete</button>
                            </div>
                     </div>
          )
        })}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}
