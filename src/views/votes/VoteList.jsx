import React,{useState, useEffect} from 'react'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeartCrack } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function VoteList() {
    const[myVotes, setMyVotes] = useState(null)
    const[ignored, setIgnored] = useState(false)
    const storedToken = localStorage.getItem('authToken');

    useEffect(() =>{
        const getVotes = async() =>{
            try {
                const votesFromApi = await axios.get(`${process.env.REACT_APP_API_URL}/votes/myVotes`, { headers: { Authorization: `Bearer ${storedToken}` } });
                console.log(votesFromApi)
                setMyVotes(votesFromApi.data.data);
            } catch (error) {
                console.error(error);
            }
        }
        getVotes();
    },[storedToken]);

    const handleCheck = (e) =>{
        setIgnored(prev =>{
            return !prev
        })
    }
    
  return (
    <div>
        <h2>Vote List</h2>
        <label > See ignored</label>
        <input type="checkbox" name='ignored' onChange={(e) => {handleCheck(e)}} />
        {myVotes && myVotes.map(el =>{
            return(
                <div key={el._id}>
                    {(el.vote || el.vote === false) &&(
                        <div key={el._id} className='watchlist-movie' >
                            {el.vote ? (
                                <div className='poster-and-icon'>
                                    <img src={el.movieId.translations[0].poster.og} alt="movie" width='70px' className='movie-image' />
                                    <FontAwesomeIcon icon={faHeart} className='heart-icon'/>
                            </div>
                            ) : (
                                <div className='poster-and-icon'>
                                     <img src={el.movieId.translations[0].poster.og} alt="movie"  width='70px' />
                                     <FontAwesomeIcon icon={faHeartCrack} className='crack-heart-icon' />
                                </div>
                            )}
                        
                        <div className='movie-info'>
                            <p><strong>Title:</strong></p>
                            <p>{el.movieId.name}</p>
                            <p><strong>Release Date:</strong></p>
                            <p>{el.movieId.premiere}</p>
                            <p><strong>Average Rating:</strong></p>
                            <p>{el.movieId.imdb_rating}</p>
                            <Link to=''>Add Review</Link>
                        </div>
                    </div>
                    )}
                  {(ignored && el.vote === undefined) &&(
                    <div className='watchlist-movie'>
                        <div className='poster-and-icon'>
                            <img src={el.movieId.translations[0].poster.og} alt="movie" width='70px' className='movie-image' />
                            <FontAwesomeIcon icon={faEyeSlash} className='ignore'/>
                     </div>
                     <div className='movie-info'>
                            <p><strong>Title:</strong></p>
                            <p>{el.movieId.name}</p>
                            <p><strong>Release Date:</strong></p>
                            <p>{el.movieId.premiere}</p>
                            <p><strong>Average Rating:</strong></p>
                            <p>{el.movieId.imdb_rating}</p>
                            <Link to=''>Add Review</Link>
                    </div>
                    </div>
                  )  }  
                </div>
                
                
                
            )
        })}
        {!myVotes && <p>loading...</p>}
    </div>
    
  )
}
