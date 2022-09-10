import React, { useEffect,useContext,useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export default function UserDetails() {
    const storedToken = localStorage.getItem('authToken');
    const {  user } = useContext(AuthContext);
    const [reviews, setReviews] = useState(null)
    const [votes, setVotes] = useState(null)

    console.log('This is USER ID',user._id)
    useEffect(() => {
        const getReviews = async () =>{
            try {
                const reviewsFromApi = await axios.get(`${process.env.REACT_APP_API_URL}/reviews/recentUserReviews`, { headers: { Authorization: `Bearer ${storedToken}` } })
                setReviews(reviewsFromApi.data.data)
            } catch (error) {
                console.log(error)
            }
        }
        getReviews();
    },[storedToken])

    useEffect(() => {
        const getVotes = async () =>{
            try {
                const votesFromApi = await axios.get(`${process.env.REACT_APP_API_URL}/movies/voteList`, { headers: { Authorization: `Bearer ${storedToken}` } })
                //console.log(votesFromApi.data.data[0].movieId.name)
                console.log(votesFromApi)
                setVotes(votesFromApi.data.data)
            } catch (error) {
                console.log(error)
            }
        }
        getVotes();
    },[storedToken])
    

  return (
    <div>
        <p>Hello {user.username}</p>
        <NavLink to="/editUser">Edit user</NavLink>
        <p>{user.biography}</p>
        <h5>My votes</h5>
        <div>
        {votes && votes.map(el =>{
            return(
                <div key={el._id}>
                    <h1>{el.movieId.vote}</h1>
                    {el.vote && <img src={el.movieId.translations[0].poster.og} alt="movie" className='liked-movie' width='70px'></img>}
                    {(!el.vote && !el.ignore)  && <img src={el.movieId.translations[0].poster.og} alt="movie" className='disLiked-movie' width='70px'></img>}
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
