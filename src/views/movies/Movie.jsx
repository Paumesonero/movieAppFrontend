import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { useParams } from 'react-router-dom'
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeartCrack } from '@fortawesome/free-solid-svg-icons';

export default function Movie() {
    const [movie, setMovie] = useState("");
    const {movieId} = useParams();
    const storedToken = localStorage.getItem('authToken');
    useEffect(() => {
        const getMovie = async () => {
            try {
                const movieFromDB = await axios.get(`${process.env.REACT_APP_API_URL}/movies/${movieId}`, { headers: { Authorization: `Bearer ${storedToken}` } });
                setMovie(movieFromDB.data.data);
            } catch (error) {
                console.log(error);
            }
        }
        getMovie();
    },[storedToken, movieId]);

    return (
        <div>
            <h1>this is a movie view</h1>
            <h3>{movie.name}</h3>
        </div>
    )
}
