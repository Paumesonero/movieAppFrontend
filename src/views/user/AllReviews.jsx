import React,{useState, useEffect} from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import ReviewCard from '../../components/ReviewCard';

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
            setErrorMessage(error.response.data.error);
        }
    }
    getReviews();
},[storedToken]);

const handleDelete = async (reviewId, titleReview) => {
  try {
    const filteredReviews = reviews.filter(el =>{
      return el.titleReview !== titleReview
  })
  setReviews(filteredReviews)
      await axios.delete(`${process.env.REACT_APP_API_URL}/reviews/${reviewId}/delete`, { headers: { Authorization: `Bearer ${storedToken}` } });
      await axios.delete(`${process.env.REACT_APP_API_URL}/reviewLike/${reviewId}/remove`, { headers: { Authorization: `Bearer ${storedToken}` } })
      toast.error(' Review deleted!');
  } catch (error) {
      setErrorMessage(error.response.data.error);
  }
};
  return (
    <div>
        <h2>My reviews</h2>
        {reviews && reviews.map(el =>{
          return(
            <div key={el._id} className='flex gap-3'>
                   <ReviewCard review={el} onDelete={handleDelete} storedToken={storedToken}/>
            </div>
          )
        })}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}
