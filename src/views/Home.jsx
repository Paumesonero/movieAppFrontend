import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>Find something to watch!</h1>
      <form method="GET" className="searchForm">
        <Link to="/search"><input type="text" placeholder="Search"/><FontAwesomeIcon icon={faMagnifyingGlass} /></Link>
      </form>
    </div>
  )
}
