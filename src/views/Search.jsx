import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const handleSearch = () => {
    try {
        const searchedMovie = axios.get("/")
    } catch (error) {
        
    }
};

export default function Search() {
  return (
    <div>
        <form method="GET" className="searchForm">
        <input type="text" placeholder="Search"/>
        <button onClick={handleSearch}><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
      </form>
    </div>
  )
}
