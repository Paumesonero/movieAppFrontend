import React, {useState} from 'react'
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export default function Search() {
    const [search, setSearch] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);
    const navigate = useNavigate();
    const handleChange = (e) => {
        setSearch(e.target.value)
    };    
    const handleSubmit = async (e) => {
        const params = {
            movieSearchString: {toJSON: () => search}
        };
        e.preventDefault();
        try {
            const searchedMovie = await axios.get(`${process.env.REACT_APP_API_URL}/movies/search}`, {params});
            navigate(`/movies/${searchedMovie.data.data.movieId}`);
        } catch (error) {
            setErrorMessage(error.response.data.error);
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit} method="GET" className="searchForm">
                <input type="text" placeholder="Search" value={search} onChange={handleChange}/>
                <input type="checkbox"/>
                <button type="submit"><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </form>
        </div>
    )
}
