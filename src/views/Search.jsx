import React, {useState} from 'react'
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export default function Search() {
    const [search, setSearch] = useState("");
    const [searchAPIName, setSearchAPIName] = useState("");
    const [searchAPIImdbId, setSearchAPIImdbId] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);
    const navigate = useNavigate();
    const handleChange = (e) => {
        setSearch(e.target.value)
    };
    const handleChangeAPIName = (e) => {
        setSearchAPIName(e.target.value);
    };
    const handleChangeAPIImdbId = (e) => {
        setSearchAPIImdbId(e.target.value);
    };   
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const searchedMovie = await axios.get(`${process.env.REACT_APP_API_URL}/movies/search/${search}`);
            navigate(`/movies/${searchedMovie.data.data[0]._id}/overview`);
        } catch (error) {
            setErrorMessage(error.response.data.error)
        }
    };
    const handleAPINameSubmit = async (e) => {
        e.preventDefault();
        try {
            const searchedMovie = await axios.get(`${process.env.REACT_APP_API_URL}/movies/api-search-by-name/${searchAPIName}`);
            console.log(JSON.stringify(searchedMovie.data.data));
        } catch (error) {
            console.log(error)
        }
    }
    const handleAPIImdbIdSubmit = async (e) => {
        e.preventDefault();
        try {
            const searchedMovie = await axios.get(`${process.env.REACT_APP_API_URL}/movies/api-search-by-imdbId/${searchAPIImdbId}`);
            console.log(JSON.stringify(searchedMovie.data.data));
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='h-screen flex flex-col justify-evenly bg-gray-900 text-center'>
            <form onSubmit={handleSubmit} method="GET" className="searchForm top-48 mx-10">
                <input type="text" placeholder="Movie title" className="bg-zinc-700 h-10 rounded-xl px-3 w-full focus:outline-[#65B3AD] text-xl" value={search} onChange={handleChange}/>
                <FontAwesomeIcon icon={faMagnifyingGlass} className="relative -top-12 left-48 text-gray-200"/>
                <button type="submit" className="mt-2 flex-shrink-0 bg-[#65B3AD] hover:bg-teal-700 border-[#65B3AD] hover:border-teal-700 border-4 text-white py-1 px-2 rounded">Search in APP</button>
            </form>
            <form onSubmit={handleAPINameSubmit} method="GET" className="searchForm mx-10">
                <input type="text" placeholder="Movie title" className="bg-zinc-700 h-10 rounded-xl px-3 w-full focus:outline-[#65B3AD] text-xl" value={searchAPIName} onChange={handleChangeAPIName}/>
                <FontAwesomeIcon icon={faMagnifyingGlass} className="relative -top-12 left-48 text-gray-200"/>
                <button type="submit" className="mt-2 flex-shrink-0 bg-[#65B3AD] hover:bg-teal-700 border-[#65B3AD] hover:border-teal-700 border-4 text-white py-1 px-2 rounded">Search in API</button>
            </form>
            <form onSubmit={handleAPIImdbIdSubmit} method="GET" className="searchForm mx-10">
                <input type="text" placeholder="Movie IMDB-ID" className="bg-zinc-700 h-10 rounded-xl px-3 w-full focus:outline-[#65B3AD] text-xl" value={searchAPIImdbId} onChange={handleChangeAPIImdbId}/>
                <FontAwesomeIcon icon={faMagnifyingGlass} className="relative -top-12 left-48 text-gray-200"/>
                <button type="submit" className="mt-2 flex-shrink-0 bg-[#65B3AD] hover:bg-teal-700 border-[#65B3AD] hover:border-teal-700 border-4 text-white py-1 px-2 rounded">Search in API</button>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </form>
        </div>
    )
}
