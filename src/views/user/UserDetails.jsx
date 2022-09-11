import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeartCrack } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export default function UserDetails() {
    const { isLoggedIn, logOutUser } = useContext(AuthContext);
    const storedToken = localStorage.getItem('authToken');
    const {user} = useContext(AuthContext);
    const [reviews, setReviews] = useState(null)
    const [votes, setVotes] = useState(null)

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
    },[storedToken])

    useEffect(() => {
        const getVotes = async () =>{
            try {
                const votesFromApi = await axios.get(`${process.env.REACT_APP_API_URL}/movies/voteList`, { headers: { Authorization: `Bearer ${storedToken}` } });
                setVotes(votesFromApi.data.data)
            } catch (error) {
                console.log(error)
            }
        }
        getVotes();
    },[storedToken])
    

  return (
    <div>
        <NavLink to="/edit-user">Edit user</NavLink>
        {isLoggedIn && <button onClick={() => logOutUser()}>Log out</button>}
        <p>{user.biography}</p>
        <h5>My votes</h5>
        <div className='user-vote-list'>
        {votes && votes.map(el =>{
            return(
                <div key={el._id}>
                    {el.vote &&
                    
                    ( <div className='poster-and-icon'>
                        <img src={el.movieId.translations[0].poster.og} alt="movie" width='70px' className='movie-image' />
                        <FontAwesomeIcon icon={faHeart} className='heart-icon'/>
                    </div>)}
                    {(!el.vote && !el.ignore)  && 
                    (<div className='poster-and-icon'>
                    <img src={el.movieId.translations[0].poster.og} alt="movie"  width='70px' />
                    <FontAwesomeIcon icon={faHeartCrack} className='crack-heart-icon' />
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
                </div>
            )
        })}
        {!reviews && <p>Loading...</p>}
    </div>
  )
}
// PENDING: div appears when ignored, making movie posters not be equally separated.
// loading not appearing when user doest have any reviews or votes.


