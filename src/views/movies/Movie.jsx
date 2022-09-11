import axios from 'axios';
import React, { useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { useParams } from 'react-router-dom'
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeartCrack } from '@fortawesome/free-solid-svg-icons';

export default function Movie() {
    const [movie, setMovie] = useState(null)
    const movieId = useParams();
    const storedToken = localStorage.getItem('authToken');
    useEffect(() => {
        const getMovie = async () => {
            try {
                const movieFromDB = axios.get(`${process.env.REACT_APP_AP_URL}/movies/${movieId}`, { headers: { Authorization: `Bearer ${storedToken}` } });
                setMovie(movieFromDB.data.data);
            } catch (error) {
                console.log(error);
            }
        }
    },[])

    return (
        <div>

        </div>
    )
}
