import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { NavLink } from 'react-router-dom';
import SearchBar from '../../components/SearchBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedal } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faRemove  } from '@fortawesome/free-solid-svg-icons';

export default function Watchlist() {
    const[myWatchList, setMyWatchList] = useState(null)
    const[filteredWatchlist, setFilteredWatchlist] = useState(null)
    const storedToken = localStorage.getItem('authToken');
    const [errorMessage, setErrorMessage] = useState(undefined);
    //Gets the movies a user has selected as watch later
    useEffect(() =>{
        const getMovies = async() =>{
            try {
                const moviesFromApi = await axios.get(`${process.env.REACT_APP_API_URL}/watchList`, { headers: { Authorization: `Bearer ${storedToken}` } });
                setMyWatchList(moviesFromApi.data.data);
                setFilteredWatchlist(moviesFromApi.data.data)
            } catch (error) {
                console.error(error);
            }
        }
        getMovies();
    },[storedToken, myWatchList]);
    const handleSearch = (searchValue) =>{
        if(searchValue === ''){
            setFilteredWatchlist(myWatchList);
        } else {
            const filtered = myWatchList.filter(el => el.movieId.name.toLowerCase().includes((searchValue).toLowerCase()))
            setFilteredWatchlist(filtered);
        }
    };
    const handleRemove = async (movieId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/watchList/${movieId}/remove`, { headers: { Authorization: `Bearer ${storedToken}` } });
            const moviesFromApi = await axios.get(`${process.env.REACT_APP_API_URL}/watchList`, { headers: { Authorization: `Bearer ${storedToken}` } });
            setMyWatchList(moviesFromApi.data.data);
        } catch (error) {
            setErrorMessage(error.response.data.error);
        }
    }
    const handleSelect = (e) => {
        if(e.target.value === 'date'){
            const orderedByDate = [...myWatchList].sort((a,b) => (b.movieId.year > a.movieId.year) ? 1 : -1);
            setFilteredWatchlist(orderedByDate);
        } else if(e.target.value === 'name'){
            const orderedByName = [...myWatchList].sort((a,b) => (a.movieId.name > b.movieId.name)? 1 : -1);
            setFilteredWatchlist(orderedByName);
        } else if(e.target.value === 'rating'){
            const orderedByRating = [...myWatchList].sort((a,b) => b.movieId.imdb_rating - a.movieId.imdb_rating);
            setFilteredWatchlist(orderedByRating);
        };
    }
    return (
        <div className='h-scren min-h-screen'>
            <div className='relative top-3 flex flex-col gap-3'>
                <h2 className='text-2xl font-bold ml-5 mt-8 '>Find your <span className='text-[#65B3AD]'>movies</span></h2>
                <SearchBar onSearch={ handleSearch}/>
            </div>
            <div className='mt-8 ml-5'>
                <p><strong>Sorted by:</strong></p>
                <div className='flex gap-8 mt-3'>
                    <button onClick={handleSelect} value='date'>Last released</button>
                    <button onClick={handleSelect} value='rating'>Top rated</button>
                    <button onClick={handleSelect} value='name'>By name</button>
                </div>
            </div>
            <div className='flex flex-col gap-2 text-sm mt-4 ml-5 mb-14'>
            {filteredWatchlist && filteredWatchlist.map(el =>{
                return(
                    <div key={el._id} className='flex gap-2 mb-5 bg-zinc-700 rounded-xl mr-5' >
                        <div>
                        <NavLink to={`/movies/${el.movieId._id}/overview`} > <img src={el.movieId.translations[0].poster.og} alt="movie"  className='w-24 h-36 rounded-xl my-2 mx-2' /></NavLink>  
                        </div>
                        <div className='flex flex-col gap-3 justify-center w-44'>
                                <div className='flex flex-col w-40 justify-center'>
                                    <p className="text-xl"><strong>{el.movieId.name}</strong></p>
                                    <p className="mb-2">({el.movieId.year})</p>
                                    {el.movieId.people[0].name && <p className="text-base mb-2"><strong>{el.movieId.people[0].name}</strong></p>}
                                    <p><span className="mr-1"><FontAwesomeIcon icon={faMedal}/></span>{el.movieId.imdb_rating} <span className="ml-2"><FontAwesomeIcon icon={faUsers}/> </span>{el.movieId.imdb_vote}</p>
                                </div>
                        </div>
                        <button onClick={() => handleRemove(el.movieId._id)}><FontAwesomeIcon icon={faRemove} className="rounded-full h-8 w-8 border-0 bg-[#FF2F61]/40 text-base"/></button>
                    </div>
                )
            })}
            </div>
             {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    )
}
