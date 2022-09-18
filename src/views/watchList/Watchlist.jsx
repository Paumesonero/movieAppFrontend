import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';

export default function Watchlist() {
    const[myWatchList, setMyWatchList] = useState(null)
    const storedToken = localStorage.getItem('authToken');
    const [errorMessage, setErrorMessage] = useState(undefined);
    useEffect(() =>{
        const getMovies = async() =>{
            try {
                const moviesFromApi = await axios.get(`${process.env.REACT_APP_API_URL}/watchList`, { headers: { Authorization: `Bearer ${storedToken}` } });
                setMyWatchList(moviesFromApi.data.data);
            } catch (error) {
                console.error(error);
            }
        }
        getMovies();
    },[storedToken]);
    const handleRemove = async (movieId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/watchList/${movieId}/remove`, { headers: { Authorization: `Bearer ${storedToken}` } });
            const moviesFromApi = await axios.get(`${process.env.REACT_APP_API_URL}/watchList`, { headers: { Authorization: `Bearer ${storedToken}` } });
            setMyWatchList(moviesFromApi.data.data);
        } catch (error) {
            setErrorMessage(error.response.data.error);
        }
    }
    return (
        <div>
            <h2>Your Watchlist</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {myWatchList && myWatchList.map(el =>{
                return(
                    <div key={el._id} className='watchlist-movie' >
                        <div>
                        <Link to={`/movies/${el.movieId._id}`} > <img src={el.movieId.translations[0].poster.og} alt="movie"  className='w-28 h-44' /></Link>  
                        </div>
                        <div className='movie-info'>
                            <p><strong>Title:</strong></p>
                            <p>{el.movieId.name}</p>
                            <p><strong>Release Date:</strong></p>
                            <p>{el.movieId.premiere}</p>
                            <p><strong>Average Rating:</strong></p>
                            <p>{el.movieId.imdb_rating}</p>
                            <button onClick={() => handleRemove(el.movieId._id)}>Remove</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
