import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeartCrack } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Link, NavLink, Outlet } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function UserDetails() {
    const { isLoggedIn, logOutUser } = useContext(AuthContext);
    const storedToken = localStorage.getItem('authToken');
    const {user} = useContext(AuthContext);
    const [reviews, setReviews] = useState(null)
    const [allReviews, setAllReviews] = useState(null)
    const [votes, setVotes] = useState(null)
    const [showMore, setShowMore] = useState(false)
   // const [errorMessage, setErrorMessage] = useState(undefined); 
    // gets user's most recent reviews
    useEffect(() => {
        const getReviews = async () => {
            try {
                const reviewsFromApi = await axios.get(`${process.env.REACT_APP_API_URL}/reviews/recentUserReviews`, { headers: { Authorization: `Bearer ${storedToken}` } });
                setReviews(reviewsFromApi.data.data);
            } catch (error) {
                console.log(error);
            }
        }
        getReviews();
    },[storedToken, reviews]);
    // gets all user's reviews.
    useEffect(() => {
        const getReviews = async () => {
            try {
                const reviewsFromApi = await axios.get(`${process.env.REACT_APP_API_URL}/reviews/allUserReviews`, { headers: { Authorization: `Bearer ${storedToken}` } });
                setAllReviews(reviewsFromApi.data.data);
            } catch (error) {
                console.log(error);
            }
        }
        getReviews();
    },[storedToken, allReviews]);
    // gets users votes
    useEffect(() => {
        const getVotes = async () =>{
            try {
                const votesFromDB = await axios.get(`${process.env.REACT_APP_API_URL}/movies/voteList`, { headers: { Authorization: `Bearer ${storedToken}` } });
                setVotes(votesFromDB.data.data)
            } catch (error) {
                console.log(error);
            }
        }
        getVotes();
    },[storedToken]);
    const handleCheck = (e) =>{
        setShowMore(prev =>{
            return !prev
        });
    };
    const handleDelete = async (reviewId, titleReview) => {
        try {
            const filteredAllReviews = allReviews.filter(el =>{
                return el.titleReview !== titleReview
            })
            setAllReviews(filteredAllReviews)
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
                        <Link to={`/movies/${el.movieId._id}`} className=''><img src={el.movieId.translations[0].poster.og} alt="movie" className='w-28 min-w-[6rem] h-36 rounded-md'/></Link>
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
        {!votes && <p>Loading...</p>}
        <h5>My reviews</h5>
        {reviews && reviews.map(el =>{
            return(
                <div key={el._id}>
                <p><strong>{el.titleReview}</strong></p>
                <p>{el.review}</p>
                <button onClick={() => handleDelete(el._id, el.titleReview)}> Delete</button>
                </div>
            )
        })}
        <button onClick={handleCheck}><Link to='/user/allReviews'>Show more reviews</Link></button>
        {(allReviews && showMore) &&(
            <div>
            <Outlet context={[allReviews, handleDelete]}/> 
            </div>
        )}
        {user.role === 'admin' && <NavLink to={`/movies/create`}>Create new Movie</NavLink>}
        <NavLink to={`/user/preferences`}>See my preferences</NavLink>
        {!reviews && <p>Loading...</p>}
        {!allReviews && <p>Loading...</p>}
    </div>
  )
}
// PENDING: div appears when ignored, making movie posters not be equally separated.
// loading not appearing when user doest have any reviews or votes.


