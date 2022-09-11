import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import { Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
// import { faHeartCrack } from '@fortawesome/free-solid-svg-icons';

export default function Movie() {
    const [movie, setMovie] = useState("");
    const {movieId} = useParams();
    const storedToken = localStorage.getItem('authToken');
    const [errorMessage, setErrorMessage] = useState(undefined);
    useEffect(() => {
        const getMovie = async () => {
            try {
                const movieFromDB = await axios.get(`${process.env.REACT_APP_API_URL}/movies/${movieId}`, { headers: { Authorization: `Bearer ${storedToken}` } });
                setMovie(movieFromDB.data.data)
            } catch (error) {
                console.log(error);
            }
        }
        getMovie();
    },[storedToken, movieId]);
    const handleLike = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/votes/${movieId}/like`, { headers: { Authorization: `Bearer ${storedToken}` } });
            // const nextMovie = await axios.get(`${process.env.REACT_APP_API_URL}/movies/next`, { headers: { Authorization: `Bearer ${storedToken}` } });
        } catch (error) {
            setErrorMessage(error.response.data.error);
        }
    };
    return (
        <div>
            {movie && <div>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <div>
                    <img src={movie.translations[0].poster.og} alt="poster" />
                </div>
                <div id="voteButtons">
                    <button onClick={() => handleLike()} className="voteButtons"><FontAwesomeIcon icon={faHeart} className='heart-icon'/></button>
                </div>
                <NavLink className={(element) => element.isActive ? "selected" : ""} to={`/movies/${movieId}/overview`}>Overview</NavLink>
                <NavLink className={(element) => element.isActive ? "selected" : ""} to={`/movies/${movieId}/reviews`}>Reviews</NavLink>
                <Outlet context={[movie]}/>
            </div>}
        </div>
    )
}
