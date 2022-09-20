import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { NavLink } from 'react-router-dom';
import SearchBar from '../../components/SearchBar'

export default function Watchlist() {
    const[myWatchList, setMyWatchList] = useState(null)
    const[filteredWatchlist, setFilteredWatchlist] = useState(null)
    const storedToken = localStorage.getItem('authToken');
    const [errorMessage, setErrorMessage] = useState(undefined);
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
    },[storedToken]);
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
    const handleSelect = (e) =>{
        console.log()
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
        <div className=''>
            <div className='relative top-3 flex flex-col gap-3'>
                <h2 className='  text-2xl font-bold ml-5 '>Find your <span className='text-teal-600'>movies</span></h2>
                <SearchBar onSearch={ handleSearch}/>
            </div>
            <div className='mt-8 ml-5'>
                <p><strong>Categories:</strong></p>
                <div className='flex gap-8 mt-3'>
                    <button onClick={handleSelect} value='date'>Last released</button>
                    <button onClick={handleSelect} value='rating'>Top rated</button>
                    <button onClick={handleSelect} value='name'>By name</button>
                </div>
            </div>
            <div className='flex flex-col gap-10 mt-14'>
            {filteredWatchlist && filteredWatchlist.map(el =>{
                return(
                    <div key={el._id} className='flex gap-4 ml-5' >
                        <div>
                        <NavLink to={`/movies/${el.movieId._id}/overview`} > <img src={el.movieId.translations[0].poster.og} alt="movie"  className='w-28 h-44 rounded-lg' /></NavLink>  
                        </div>
                        <div className='flex flex-col gap-3'>
                            <div>
                                <p><strong className='text-teal-600'>Title:</strong></p>
                                <p>{el.movieId.name}</p>
                            </div>
                            <div>
                                <p><strong className='text-teal-600'>Release Date:</strong></p>
                                <p>{el.movieId.premiere}</p>
                            </div>
                            <div>
                                <p><strong className='text-teal-600'>Average Rating:</strong></p>
                                <p>{el.movieId.imdb_rating}</p>
                            </div>
                            <div className='flex w-max '>
                            <button onClick={() => handleRemove(el.movieId._id)} className='relative left-36 border-2 border-teal-600 border-opacity-50 px-3 py-px '>Remove</button>
                            </div>
                            
                        </div>
                    </div>
                )
            })}
            </div>
             {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    )
}
