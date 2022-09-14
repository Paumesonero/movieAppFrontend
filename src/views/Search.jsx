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
            navigate(`/movies/${searchedMovie.data.data[0]._id}`);
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
        <div>
            <form onSubmit={handleSubmit} method="GET" className="searchForm">
                <input type="text" placeholder="Search" value={search} onChange={handleChange}/>
                <input type="checkbox"/>
                <button type="submit"><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </form>
            <form onSubmit={handleAPINameSubmit} method="GET" className="searchForm">
                <input type="text" placeholder="Search in API" value={searchAPIName} onChange={handleChangeAPIName}/>
                <button type="submit"><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </form>
            <form onSubmit={handleAPIImdbIdSubmit} method="GET" className="searchForm">
                <input type="text" placeholder="Search in API" value={searchAPIImdbId} onChange={handleChangeAPIImdbId}/>
                <button type="submit"><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </form>
        </div>
    )
}
