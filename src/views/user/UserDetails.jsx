import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeartCrack } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Link, NavLink} from 'react-router-dom';
import toast from 'react-hot-toast';

export default function UserDetails() {
    const { isLoggedIn, logOutUser } = useContext(AuthContext);
    const storedToken = localStorage.getItem('authToken');
    const [errorMessage, setErrorMessage] = useState(undefined);
    const {user} = useContext(AuthContext);
    const [reviews, setReviews] = useState(null)
    const [votes, setVotes] = useState(null)
    console.log(reviews)
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
                console.log(error);
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
            toast.error(' Review deleted!');
        } catch (error) {
            console.log(error)
        }
    };

    const handleLike = async (reviewId) => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/reviewLike/${reviewId}/add`, {}, { headers: { Authorization: `Bearer ${storedToken}` } });
        } catch (error) {
            setErrorMessage(error.response.data.error);
        }
    }

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
            </div>
            <Link to={'/my-reviews'}>See all my reviews</Link>
            {user.role === 'admin' && <NavLink to={`/movies/create`}>Create new Movie</NavLink>}
            <NavLink to={`/user/preferences`}>See my preferences</NavLink>
            {!reviews && <p>There's no reviews yet</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    )
}
// PENDING: div appears when ignored, making movie posters not be equally separated.



