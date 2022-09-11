import React, {useState} from 'react'
import axios from "axios";
import { AuthContext } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function Search() {
    const [search, setSearch] = setSearch("");
    const handleSubmit = async () => {
    
        try {
            const searchedMovie = await axios.get(`${process.env.REACT_APP_API_URL}/movies/search`, );
        } catch (error) {
            
        }
    };


    return (
        <div>
            <form onSubmit={handleSubmit} method="GET" className="searchForm">
                <input type="text" placeholder="Search"/>
                <button type="submit"><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
                <input type="checkbox"/>
            </form>
        </div>
    )
}
