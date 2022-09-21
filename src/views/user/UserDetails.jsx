import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeartCrack } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Link, NavLink} from 'react-router-dom';
import ReviewCard from '../../components/ReviewCard';
import toast from 'react-hot-toast';

export default function UserDetails() {
    const storedToken = localStorage.getItem('authToken');
    const [errorMessage, setErrorMessage] = useState(undefined);
    const {user} = useContext(AuthContext);
    const [reviews, setReviews] = useState(null);
    const [votes, setVotes] = useState(null);
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
    useEffect(() => {
        const getVotes = async () => {
            try {
                const votesFromDB = await axios.get(`${process.env.REACT_APP_API_URL}/movies/voteList`, { headers: { Authorization: `Bearer ${storedToken}` } });
                setVotes(votesFromDB.data.data)
            } catch (error) {
                setErrorMessage(error.response.data.error);
            }
        }
        getVotes();
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
        <div className='h-max mb-14 min-h-screen'>
            <div className="background-img h-72 mb-10 absolute polygon">
                <div className='flex justify-end mr-4 text-3xl relative top-4'>
                  <NavLink to='/options'><FontAwesomeIcon icon={faBars}/></NavLink>
                </div>
                <div className='flex flex-col ml-8'>
                    <img src={user.imageUrl} alt="profile" className='profile-img' />
                    <div className='relative bottom-8 mb-4'>
                        <p className='relative top-3'><strong>{user.username}</strong></p>
                        <p className='relative top-5 w-4/5'>{user.biography}</p>
                    </div>
                    
                </div>
            </div>
            <h5 className='text-2xl mb-3 ml-3 font-semibold'>My <span className='text-[#65B3AD]'>votes</span> </h5>
            <div className='flex overflow-x-auto gap-3 h-40 min-h-[10rem] ml-3'>
            {votes && votes.slice(0, 26).map(el =>{
                return(
                    <div key={el._id}>
                        {el.vote && ( 
                            <div className='relative'>
                            <Link to={`/movies/${el.movieId._id}/overview`}><img src={el.movieId.translations[0].poster.og} alt="movie" className='w-2 min-w-[6rem] h-36 rounded-md'/></Link>
                            <FontAwesomeIcon icon={faHeart} className='absolute top-[8rem] right-[-0.5rem] text-3xl text-green-600'/>
                            </div>)}
                        {(!el.vote && !el.ignore)  && 
                        (<div className='relative'>
                        <Link to={`/movies/${el.movieId._id}`}><img src={el.movieId.translations[0].poster.og} alt="movie" className='w-22 min-w-[6rem] h-36 rounded-md'/></Link>
                        <FontAwesomeIcon icon={faHeartCrack} className='absolute top-[8rem] right-[-0.5rem] text-3xl text-red-600' />
                        </div>)}
                    </div>
                )
            })}
            <div className='flex flex-col justify-center items-center  w-2 min-w-[6rem] h-36 rounded-md border-2 border-dashed border-[#65B3AD] mr-2'>
                <NavLink to='/vote-list' className='flex flex-col text-[#65B3AD]'>See more
                <FontAwesomeIcon icon={faPlus} />
                </NavLink>
            </div>
            </div>
            {!votes && <p>There's no votes yet</p>}
            <h5 className='text-2xl mt-4 ml-3 font-semibold'>My <span className='text-[#65B3AD]'>reviews</span></h5>
            <div className='flex flex-col mt-4'>
                {reviews && reviews.slice(0,2).map(el =>{
                    return(
                      <div key={el._id}>
                        <ReviewCard review={el} onDelete={handleDelete} storedToken={storedToken}/>
                     </div>
                    )
                })}
            </div>
            {!reviews && <p>There's no reviews yet</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    )
}
  




