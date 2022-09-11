import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';

export default function Watchlist() {
    const[myWatchList, setMyWatchList] = useState(null)
    const storedToken = localStorage.getItem('authToken');

    useEffect(() =>{
        const getMovies = async() =>{
            try {
                const moviesFromApi = await axios.get(`${process.env.REACT_APP_API_URL}/watchlist/myWatchList`, { headers: { Authorization: `Bearer ${storedToken}` } });
                setMyWatchList(moviesFromApi.data.data);
            } catch (error) {
                console.error(error);
            }
        }
        getMovies();
    },[storedToken]);
  return (
    <div >
        <h2>Your Watchlist</h2>
        {myWatchList && myWatchList.map(el =>{
            return(
                <div key={el._id} className='watchlist-movie' >
                    <div>
                        <img src={el.movieId.translations[0].poster.og} alt="movie poster" width='70px' />
                    </div>
                    <div className='movie-info'>
                        <p><strong>Title:</strong></p>
                        <p>{el.movieId.name}</p>
                        <p><strong>Release Date:</strong></p>
                        <p>{el.movieId.premiere}</p>
                        <p><strong>Average Rating:</strong></p>
                        <p>{el.movieId.imdb_rating}</p>
                        <Link to={`/movies/${el.movieId._id}`}>Read more</Link>
                    </div>
                </div>
            )
        })}
    </div>
  )
}
