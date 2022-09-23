import React,{useState, useEffect} from 'react'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart  } from '@fortawesome/free-solid-svg-icons';
import { faRemove  } from '@fortawesome/free-solid-svg-icons';
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
        }else if(e.target.value === 'like'){
            const orderedByLike =[...filteredVotes].sort((a,b) =>(b.vote - a.vote));
            setFilteredVotes(orderedByLike)
        } else if(e.target.value === 'disLike'){
            const orderedBydisLike =[...filteredVotes].sort((a,b) =>(a.vote - b.vote));
            setFilteredVotes(orderedBydisLike)
        }
    };
    return (
        <div className='mb-14 min-h-screen'>
            <div className='relative top-5 flex flex-col gap-3'>
                <h2 className='text-2xl font-bold ml-5 '> <span className='text-[#65B3AD]'>Vote</span> List</h2>
                <SearchBar onSearch={ handleSearch} />
            </div>
            <div className='mt-8 ml-5'>
            <p><strong>Categories:</strong></p>
                <div className='flex overflow-x-auto gap-8 mr-3 min-h-[4rem] items-center '>
                    <button onClick={handleSelect} value='date' className='min-w-[35%] h-1/3 border-2 px-2 py-1 rounded-2xl bg-zinc-700 border-zinc-700'>Last released</button>
                    <button onClick={handleSelect} value='rating' className='min-w-[25%] h-1/3 border-2 px-2 py-1 rounded-2xl bg-zinc-700 border-zinc-700'>Top rated</button>
                    <button onClick={handleSelect} value='name' className='min-w-[25%] h-1/3 border-2 px-2 py-1 rounded-2xl bg-zinc-700 border-zinc-700'>By name</button>
                    <button onClick={handleCheck} value='ignored' className='min-w-[25%] h-1/3 border-2 px-2 py-1 rounded-2xl bg-zinc-700 border-zinc-700'>{ignored ? <p className='text-[#65B3AD]'>Ignored</p>: <p>Ignored</p>}</button>
                    <button onClick={handleSelect} value='like' className='min-w-[25%] h-1/3 border-2 px-2 py-1 rounded-2xl bg-zinc-700 border-zinc-700'>Liked</button>
                    <button onClick={handleSelect} value='disLike' className='min-w-[25%] h-1/3 border-2 px-2 py-1 rounded-2xl bg-zinc-700 border-zinc-700'>Disliked</button>
                </div>
            </div>
            <div className='flex flex-col gap-2 text-sm mt-4 ml-5'>
            {filteredVotes && filteredVotes.map(el =>{
                return(
                    <div key={el._id} className='mb-5'>
                        {(el.vote || el.vote === false) &&(
                            <div key={el._id} className='flex gap-5 h-44 mb-0 items-center' >
                                {el.vote ? (
                                    <div className='flex items-center'>
                                        <Link to={`/movies/${el.movieId._id}/overview`} > <img src={el.movieId.translations[0].poster.og} alt="movie"  className='w-28 h-44' /></Link>  
                                    </div>
                                ) : (
                                    <div className='flex items-center '>
                                      <Link to={`/movies/${el.movieId._id}/overview`} > <img src={el.movieId.translations[0].poster.og} alt="movie"  className='w-28 h-44' /></Link>  
                                    </div>
                                )}
                                <div className='flex flex-col w-32 justify-center gap-2'>
                                    <p><strong className='text-[#65B3AD]'>Title:</strong></p>
                                    <p>{el.movieId.name}</p>
                                    <p><strong className='text-[#65B3AD]'>Release Date:</strong></p>
                                    <p>{el.movieId.premiere}</p>
                                    <p><strong className='text-[#65B3AD]'>Average Rating:</strong></p>
                                    <p>{el.movieId.imdb_rating}</p>
                                    
                                </div>

                                <div className='flex flex-col justify-between h-28 items-end'>
                                    {el.vote ? 
                                         <Link to={`/movies/${el.movieId._id}/overview`} >
                                            <div className='rounded-full border-1 w-9 bg-[#7ED360]/70 text-3xl relative top-[1rem] right-[0.8rem]'>
                                                 <FontAwesomeIcon icon={faHeart} className="text-base relative bottom-[0.2rem] left-[0.62rem]"/>    
                                            </div>
                                         
                                         </Link> : 
                                         <Link to={`/movies/${el.movieId._id}`} >
                                            <div className='rounded-full border-1 w-9 bg-[#FF2F61]/70 text-3xl relative top-[1rem] right-[0.8rem]'>
                                                 <FontAwesomeIcon icon={faRemove} className="text-base relative bottom-[0.3rem] left-[0.78rem]"/>    
                                            </div>
                                         </Link>}
                                         <Link to={`/addReview/${el.movieId._id}`} className='border-b-2 border-[#65B3AD]'>Add Review</Link>
                                </div>
                            </div>
                        )}
                    {(ignored && el.vote === undefined) &&(
                        <div className='flex gap-5'>
                                <Link to={`/movies/${el.movieId._id}/overview`} > <img src={el.movieId.translations[0].poster.og} alt="movie"  className='w-28 h-44' /></Link>  
                        <div className='flex flex-col w-32 '>
                                <p><strong className='text-[#65B3AD]'>Title:</strong></p>
                                <p>{el.movieId.name}</p>
                                <p><strong className='text-[#65B3AD]'>Release Date:</strong></p>
                                <p>{el.movieId.premiere}</p>
                                <p><strong className='text-[#65B3AD]'>Average Rating:</strong></p>
                                <p>{el.movieId.imdb_rating}</p>
                        </div>
                        <div className='flex flex-col justify-between h-28 items-end'>
                            {el.vote === undefined && 
                            <Link to={`/movies/${el.movieId._id}/overview`} >
                                <div className='rounded-full border-1 w-9 bg-[#F0EB78]/70 text-3xl relative top-[1rem] right-[0.8rem]'>
                                     <FontAwesomeIcon icon={faEyeSlash} className="text-base relative bottom-[0.3rem] left-[0.5rem]"/>    
                                 </div>
                            </Link> }
                            <Link to={`/addReview/${el.movieId._id}`} className='border-b-2 border-[#65B3AD]'>Add Review</Link>
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
