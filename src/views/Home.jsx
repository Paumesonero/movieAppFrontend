import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Find something to watch!</h1>
      <form action="" method="GET" className="searchForm">
        <button onClick={navigate("/search", {replace:true})}><input type="text" placeholder="Search"/><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
      </form>
    </div>
  )
}
