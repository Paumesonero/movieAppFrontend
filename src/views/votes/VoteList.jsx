import React,{useState, useEffect} from 'react'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeartCrack } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import SearchBar from '../../components/SearchBar';

export default function VoteList() {
    const[myVotes, setMyVotes] = useState(null);
    const[filteredVotes, setFilteredVotes] = useState(null);
    const[ignored, setIgnored] = useState(false);
    const storedToken = localStorage.getItem('authToken');
    useEffect(() =>{
        const getVotes = async () => {
            try {
                const votesFromApi = await axios.get(`${process.env.REACT_APP_API_URL}/votes/myVotes`, { headers: { Authorization: `Bearer ${storedToken}` } });
                setMyVotes(votesFromApi.data.data);
                setFilteredVotes(votesFromApi.data.data);
            } catch (error) {
                console.error(error);
            };
        };
        getVotes();
    }, [storedToken]);
    const handleCheck = (e) =>{
        setIgnored(prev =>{
            return !prev
        });
    };
    const handleSearch = (searchValue) =>{
        if(searchValue === ''){
            setFilteredVotes(myVotes);
        } else {
            const filtered = myVotes.filter(el => el.movieId.name.toLowerCase().includes((searchValue).toLowerCase()))
            setFilteredVotes(filtered);
        }
    };
    const handleSelect = (e) =>{
        if(e.target.value === 'date'){
            const orderedByDate = [...filteredVotes].sort((a,b) => (b.movieId.year > a.movieId.year) ? 1 : -1);
            setFilteredVotes(orderedByDate);
        } else if(e.target.value === 'name'){
            const orderedByName = [...filteredVotes].sort((a,b) => (a.movieId.name > b.movieId.name)? 1 : -1);
            setFilteredVotes(orderedByName);
        } else if(e.target.value === 'rating'){
            const orderedByRating = [...filteredVotes].sort((a,b) => b.movieId.imdb_rating - a.movieId.imdb_rating);
            setFilteredVotes(orderedByRating);
        };
    };
    return (
        <div>
            <div className='relative top-5 flex flex-col gap-3'>
                <h2 className='text-2xl font-bold ml-5 '> <span className='text-teal-600'>Vote</span> List</h2>
                <SearchBar onSearch={ handleSearch} />
            </div>
            <div className='mt-8 ml-5'>
            <p><strong>Categories:</strong></p>
                <div className='flex gap-8 mt-3'>
                    <button onClick={handleSelect} value='date'>Last released</button>
                    <button onClick={handleSelect} value='rating'>Top rated</button>
                    <button onClick={handleSelect} value='name'>By name</button>
                    <button onClick={handleCheck} value='ignored'>{ignored ? <p className='text-teal-600'>Ignored</p>: <p>Ignored</p>}</button>
                </div>
            </div>
            <div className='flex flex-col gap-5 text-sm mt-4 ml-5'>
            {filteredVotes && filteredVotes.map(el =>{
                return(
                    <div key={el._id}>
                        {(el.vote || el.vote === false) &&(
                            <div key={el._id} className='flex gap-5 h-44 mb-0 items-center' >
                                {el.vote ? (
                                    <div className='flex items-center'>
                                        <Link to={`/movies/${el.movieId._id}`} > <img src={el.movieId.translations[0].poster.og} alt="movie"  className='w-28 h-44' /></Link>  
                                    </div>
                                ) : (
                                    <div className='flex items-center '>
                                      <Link to={`/movies/${el.movieId._id}`} > <img src={el.movieId.translations[0].poster.og} alt="movie"  className='w-28 h-44' /></Link>  
                                    </div>
                                )}
                                <div className='flex flex-col w-32 justify-center gap-2'>
                                    <p><strong className='text-teal-600'>Title:</strong></p>
                                    <p>{el.movieId.name}</p>
                                    <p><strong className='text-teal-600'>Release Date:</strong></p>
                                    <p>{el.movieId.premiere}</p>
                                    <p><strong className='text-teal-600'>Average Rating:</strong></p>
                                    <p>{el.movieId.imdb_rating}</p>
                                    
                                </div>

                                <div className='flex flex-col justify-between h-28 items-end'>
                                    {el.vote ? <Link to={`/movies/${el.movieId._id}`} ><FontAwesomeIcon icon={faHeart} className='text-3xl text-lime-700 mr-3'/></Link> : <Link to={`/movies/${el.movieId._id}`} ><FontAwesomeIcon icon={faHeartCrack} className='text-3xl text-red-700 mr-3' /></Link>}
                                <Link to={`/addReview/${el.movieId._id}`} className='border-2 border-teal-600 border-opacity-50 px-3 py-px'>Add Review</Link>
                                </div>
                            </div>
                        )}
                    {(ignored && el.vote === undefined) &&(
                        <div className='flex gap-5'>
                                <Link to={`/movies/${el.movieId._id}`} > <img src={el.movieId.translations[0].poster.og} alt="movie"  className='w-28 h-44' /></Link>  
                        <div className='flex flex-col w-32 '>
                                <p><strong className='text-teal-600'>Title:</strong></p>
                                <p>{el.movieId.name}</p>
                                <p><strong className='text-teal-600'>Release Date:</strong></p>
                                <p>{el.movieId.premiere}</p>
                                <p><strong className='text-teal-600'>Average Rating:</strong></p>
                                <p>{el.movieId.imdb_rating}</p>
                                
                        </div>
                        <div className='flex flex-col justify-between h-28 items-end'>
                            {el.vote === undefined && <Link to={`/movies/${el.movieId._id}`} ><FontAwesomeIcon icon={faEyeSlash} className='text-3xl text-amber-400 '/></Link> }
                            <Link to={`/addReview/${el.movieId._id}`}>Add Review</Link>
                        </div>
                        </div>
                    )}  
                    </div>
                )
                
            })}
            </div>
            {!myVotes && <p>loading...</p>}
        </div>
    )
}
