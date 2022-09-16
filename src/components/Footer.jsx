import React, { useContext } from 'react';
import { NavLink} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const { isLoggedIn } = useContext(AuthContext);
  const {user} = useContext(AuthContext);
  console.log(user)
  return (
    <div className='bg-zinc-700 flex justify-around items-center  h-20 rounded-t-md  sticky bottom-0 w-full'>
      <NavLink to="/user"><FontAwesomeIcon icon={faUser} className='text-4xl text-slate-400 target:text-red-600'/></NavLink> 
      <NavLink to='/'><FontAwesomeIcon icon={faHouse} className='text-4xl text-slate-400'/></NavLink>
      <NavLink to='/watchlist'><FontAwesomeIcon icon={faClipboardList} className='text-4xl text-slate-400'/></NavLink>
      <NavLink to='vote-list'><FontAwesomeIcon icon={faThumbsUp} className='text-4xl text-slate-400'/></NavLink>
      {/* {user && <p>Hello {user.username}</p> }
      <ul>
        <li><NavLink className={(element) => element.isActive ? 'selected' : ''} to="/">Home</NavLink></li>
        {!isLoggedIn && <li><NavLink className={(element) => element.isActive ? 'selected' : ''} to="/signup">Sign up</NavLink></li>}
        {!isLoggedIn && <li><NavLink className={(element) => element.isActive ? 'selected' : ''} to="/login">Login</NavLink></li>}
        {isLoggedIn && <li><NavLink className={(element) => element.isActive ? 'selected' : ''} to="/private">Private view</NavLink></li>}
        {isLoggedIn && <li><button onClick={() => logOutUser()}>Log out</button></li>}
        <li><button onClick={() => navigate(-1)}>Go back</button></li>
      </ul> */}
    </div>
  )
}
