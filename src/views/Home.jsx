import React, {useState, useEffect, useContext} from 'react'
import axios from "axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Home() {
  const storedToken = localStorage.getItem('authToken');
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [nextMovieId, setNextMovieId] = useState("");
  const {user} = useContext(AuthContext);
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
    <div id="homePage" className="background-img h-screen">
      <h1 className="text-gray-200 ml-10 mb-2 pt-32 font-bold text-xl">Find a movie</h1>
      {nextMovieId && <div>
        <form method="GET" className="mx-10">
          <NavLink to="/search"><input type="text" placeholder="Search" className="bg-zinc-700 h-10 rounded-xl px-3 w-full focus:outline-[#65B3AD] text-lg"/><FontAwesomeIcon icon={faMagnifyingGlass} className="relative -top-8 left-72 text-gray-200"/></NavLink>
        </form>
        <NavLink to={`/movies/${nextMovieId}/overview`}><img className="w-40 mx-auto" src="https://cdn-icons-png.flaticon.com/512/122/122662.png" alt="main-btn" /></NavLink>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div> }
      {!nextMovieId && <div>
        <form method="GET" className="searchForm mx-10">
        <NavLink to="/search"><input type="text" placeholder="Search" className="appearance-none block w-full bg-gray-700 text-gray-400 border border-gray-900 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-200 focus:border-gray-900"/><FontAwesomeIcon icon={faMagnifyingGlass} className="relative -top-12 left-32 text-gray-200"/></NavLink>
        </form>
        <NavLink to='/login'><img src="https://cdn-icons-png.flaticon.com/512/122/122662.png" alt="main-btn" className="w-40 mx-auto"/></NavLink>
      </div> }
      {user && user.role === 'admin' && <NavLink to={`/movies/create`}><FontAwesomeIcon icon={faCirclePlus} className='absolute right-10 bottom-24 text-7xl text-[#65B3AD]'/></NavLink>}
    </div>
  )
}
