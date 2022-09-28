import React,{useState, useEffect} from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import ReviewCard from '../../components/ReviewCard';
import SearchBar from '../../components/SearchBar';

export default function AllReviews() {
  const storedToken = localStorage.getItem('authToken');
  const[reviews, setReviews] = useState(null)
  const[filteredReviews, setFilteredReviews] = useState(null);
  const[errorMessage, setErrorMessage] = useState(undefined);
  //Gets all reviews a user has posted
  useEffect(() => {
    const getReviews = async () => {
        try {
            const reviewsFromApi = await axios.get(`${process.env.REACT_APP_API_URL}/reviews/allUserReviews`, { headers: { Authorization: `Bearer ${storedToken}` } });
            setReviews(reviewsFromApi.data.data);
            setFilteredReviews(reviewsFromApi.data.data)
        } catch (error) {
            setErrorMessage(error.response.data.error);
        }
    }
    getReviews();
},[storedToken]);
//Deletes a review from database, it also deletes all the reviewlikes from that review
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
const handleSearch = (searchValue) =>{
  if(searchValue === ''){
      setFilteredReviews(reviews);
  } else {
      const filtered = reviews.filter(el => el.movieId.name.toLowerCase().includes((searchValue).toLowerCase()))
      setFilteredReviews(filtered);
  }
};
  return (
    <div className='min-h-screen'>
      <div className='flex flex-col gap-3 relative top-3 mb-11'>
        <h2 className='text-2xl font-bold ml-5'><strong>My <span className='text-[#65B3AD]'>reviews</span> </strong> </h2>
        <p><strong className='ml-6 relative top-3'>Movie title:</strong> </p>
        <SearchBar onSearch={ handleSearch}/>
      </div>
        {filteredReviews && filteredReviews.map(el =>{
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
