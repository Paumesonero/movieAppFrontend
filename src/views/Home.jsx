import React, {useState, useEffect} from 'react'
import axios from "axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

export default function Home() {
  const storedToken = localStorage.getItem('authToken');
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [nextMovieId, setNextMovieId] = useState("");
  useEffect(() => {
    const getNextMovie = async () => {
      try {
        const nextMovie = await axios.get(`${process.env.REACT_APP_API_URL}/movies/next`, { headers: { Authorization: `Bearer ${storedToken}` } });
        setNextMovieId(nextMovie.data.data._id);
      } catch (error) {
        setErrorMessage(error.response.data.error);
      }
    };
    getNextMovie();
  },[storedToken])
  return (
    <div className='h-screen'>
      <h1>Find something to watch!</h1>
      {nextMovieId && <div>
        <form method="GET" className="searchForm">
          <NavLink to="/search"><input type="text" placeholder="Search"/><FontAwesomeIcon icon={faMagnifyingGlass} /></NavLink>
        </form>
        <NavLink to={`/movies/${nextMovieId}`}><img src="https://cdn-icons-png.flaticon.com/512/122/122662.png" alt="main-btn" /></NavLink>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div> }
      {!nextMovieId && <div>
        <form method="GET" className="searchForm">
          <NavLink to="/search"><input type="text" placeholder="Search"/><FontAwesomeIcon icon={faMagnifyingGlass} /></NavLink>
        </form>
        <NavLink to='/login'><img src="https://cdn-icons-png.flaticon.com/512/122/122662.png" alt="main-btn" /></NavLink>
      </div> }
    </div>
  )
}
