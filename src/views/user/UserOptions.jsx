import React,{useContext} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../context/AuthContext';
import { NavLink} from 'react-router-dom';

export default function UserOptions() {
    const { isLoggedIn, logOutUser } = useContext(AuthContext);
    const {user} = useContext(AuthContext);
  return (
    <div className='h-screen'>
        <div className='flex justify-end mr-4 text-3xl relative top-4'>
         <NavLink to='/user'><FontAwesomeIcon icon={faXmark}/></NavLink>
        </div>
       
        <div className='flex flex-col items-center justify-evenly h-3/4 '>
            <NavLink to={`/user/preferences`} className='text-3xl border-b border-[#65B3AD] px-2'>Preferences</NavLink>
            <NavLink to="/edit-user" className='text-3xl border-b border-[#65B3AD] px-2 '>Edit user</NavLink>
            <NavLink to={'/my-reviews'} className='text-3xl border-b border-[#65B3AD] px-2 '> My reviews</NavLink>
            {user && user.role === 'admin' && <NavLink to='/user-list' className='text-3xl border-b border-[#65B3AD] px-2 '>See users</NavLink>} 
            {isLoggedIn && <button onClick={() => logOutUser()} className='text-3xl border-b border-[#65B3AD] px-2'>Log out</button>}
        </div>
    </div>
  )
}
