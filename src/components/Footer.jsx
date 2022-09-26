import React from 'react';
import { NavLink, useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faBackwardStep } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const navigate = useNavigate();
  return (
    
      <div className=' bg-zinc-700 flex justify-around items-center  h-14  fixed bottom-0 w-full'>
      <FontAwesomeIcon icon={faBackwardStep} onClick={() => navigate(-1)} className='text-2xl text-slate-200'/>
      <NavLink to="/user"><FontAwesomeIcon icon={faUser} className='text-2xl text-slate-200'/></NavLink>
      <NavLink to='/'><FontAwesomeIcon icon={faHouse} className='text-2xl text-slate-200'/></NavLink>
      <NavLink to='/watchlist'><FontAwesomeIcon icon={faClipboardList} className='text-2xl text-slate-200'/></NavLink>
      <NavLink to='vote-list'><FontAwesomeIcon icon={faThumbsUp} className='text-2xl text-slate-200'/></NavLink>
    </div>
    
    
  )
}
