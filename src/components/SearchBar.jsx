import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function SearchBar(props) {
    const{onSearch} = props
  return (
    <div className='ml-5'>
        <input type="text" placeholder='Search' onChange={(e) => onSearch(e.target.value)} className='bg-zinc-700 h-10 rounded-xl px-3 w-3/4 focus:outline-teal-600'/>
        <FontAwesomeIcon icon={faMagnifyingGlass} className='relative right-9 top-px text-xl' />
    </div>
  )
}
