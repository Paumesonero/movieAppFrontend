import axios from 'axios';
import React, { useEffect, useState } from 'react'
// import { AuthContext } from '../../context/AuthContext';
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
// import { faHeartCrack } from '@fortawesome/free-solid-svg-icons';

export default function Movie() {
    const [movie, setMovie] = useState("");
    const {movieId} = useParams();
    const storedToken = localStorage.getItem('authToken');
    useEffect(() => {
        const getMovie = async () => {
            try {
                const movieFromDB = await axios.get(`${process.env.REACT_APP_API_URL}/movies/${movieId}`, { headers: { Authorization: `Bearer ${storedToken}` } });
                setMovie(movieFromDB.data.data);
                console.log(movie);
            } catch (error) {
                console.log(error);
            }
        }
        getMovie();
    },[storedToken, movieId, movie]);
    const handleIgnore = () => {

    };

    return (
        <div>
            {movie && <div>
                <div>
                    <img src={movie.translations[0].poster.og} alt="poster" />
                </div>
                <div id="voteButtons">
                    {/* <form onSubmit={handleWatchList}>
                        <button type="submit" className="voteButtons"><FontAwesomeIcon icon={faHeart} className='heart-icon'/>
                        </button>
                    </form> */}
                    {/* {/* <form onSubmit={handleLike}>
                        <button type="submit" className="voteButtons"><FontAwesomeIcon icon={faHeart} className='heart-icon'/>
                        </button>
                    </form> */}
                    {/* <form onSubmit={handleDisike}>
                        <button type="submit" className="voteButtons"><FontAwesomeIcon icon={faHeart} className='heart-icon'/>
                        </button>
                    </form> */}
                    <form onSubmit={handleIgnore}>
                        <button type="submit" className="voteButtons"><FontAwesomeIcon icon={faHeart} className='heart-icon'/>
                        </button>
                    </form> */}

                </div>
                {/* <p>{movie.translations[0].overview}</p> */}
                <h4></h4>
            </div>}
        </div>
    )
}
