import React, { useContext } from 'react';
import { NavLink} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { isLoggedIn } = useContext(AuthContext);
  //const navigate = useNavigate();
  return (
    <div>
      {isLoggedIn ? <NavLink to="/user">User</NavLink> : <NavLink to='/signup'>signup</NavLink>}
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/watchlist'>Watchlist</NavLink>
      <NavLink to='vote-list'>VoteList</NavLink>
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
