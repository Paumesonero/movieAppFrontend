import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeartCrack } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Link, NavLink} from 'react-router-dom';
import ReviewCard from '../../components/ReviewCard';
import toast from 'react-hot-toast';

export default function UserDetails() {
    const { isLoggedIn, logOutUser } = useContext(AuthContext);
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
                console.log(error);
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
        <div className=''>
            <NavLink to="/edit-user">Edit user</NavLink>
            {isLoggedIn && <button onClick={() => logOutUser()}>Log out</button>}
            <img src={user.imageUrl} alt="profile" />
            <p>{user.biography}</p>
            <h5>My votes</h5>
            <div className='flex overflow-x-auto gap-3 h-40 min-h-[10rem] ml-2'>
            {votes && votes.map(el =>{
                return(
                    <div key={el._id}>
                        {el.vote && ( 
                            <div className='relative'>
                            <Link to={`/movies/${el.movieId._id}`}><img src={el.movieId.translations[0].poster.og} alt="movie" className='w-28 min-w-[6rem] h-36 rounded-md'/></Link>
                            <FontAwesomeIcon icon={faHeart} className='absolute top-[8rem] right-[-0.5rem] text-3xl text-green-600'/>
                            </div>)}
                        {(!el.vote && !el.ignore)  && 
                        (<div className='relative'>
                        <Link to={`/movies/${el.movieId._id}`}><img src={el.movieId.translations[0].poster.og} alt="movie" className='w-28 min-w-[6rem] h-36 rounded-md'/></Link>
                        <FontAwesomeIcon icon={faHeartCrack} className='absolute top-[8rem] right-[-0.5rem] text-3xl text-red-600' />
                        </div>)}
                    </div>
                )
            })}
            </div>
            {!votes && <p>There's no votes yet</p>}
            <h5>My reviews</h5>
            <div className='flex flex-col gap-5 mt-4'>
                {reviews && reviews.slice(0,2).map(el =>{
                    return(
                      <div key={el._id} className='flex gap-3'>
                        <ReviewCard review={el} onDelete={handleDelete} storedToken={storedToken}/>
                     </div>
                    )
                })}
            </div>
            <Link to={'/my-reviews'}>See all my reviews</Link>
            <NavLink to={`/user/preferences`}>See my preferences</NavLink>
            {user.role === 'admin' && <NavLink to='/user-list'>See users</NavLink>}
            {!reviews && <p>There's no reviews yet</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    )
}




