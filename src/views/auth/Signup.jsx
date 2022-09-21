import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';

export default function Signup() {
  const [user, setUser] = useState({
    username: '',
    email: '',
  });
  //const [imageUrl, setImageUrl] = useState('')
  const [password, setPassword] = useState('');
  const [passwordControl, setPasswordControl] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setUser(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }
  useEffect(() => {
    if (password !== passwordControl) {
      setErrorMessage("Passwords don't match")
    } else {
      setErrorMessage(undefined)
    }
    // eslint-disable-next-line
  }, [passwordControl]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, { username: user.username, email: user.email, password });
      navigate('/login');
    } catch (error) {
      setErrorMessage(error.response.data.error)
    }
  };
  return (
    <div className='h-screen'>
      <div className='background-img polygon h-64'></div>
      <form onSubmit={handleSubmit} className='mt-24 h-64 flex flex-col items-center justify-center '>
        <div className='flex flex-col w-3/4'>
          <label><strong className='relative top-5'>Username</strong></label>
          <div>
          <FontAwesomeIcon icon={faUser} className='relative top-[2.3rem] left-3 text-2xl' />
          </div>
          <input required type="text" name="username" value={user.username} onChange={handleChange} className='rounded h-11 w-full text-gray-200 bg-gray-700 text-lg px-12 focus:outline-teal-600' />
        </div>
        <div className='flex flex-col w-3/4'>
          <label><strong className='relative top-5'>Email</strong></label>
          <div>
          <FontAwesomeIcon icon={faEnvelope} className='relative top-[2.3rem] left-3 text-2xl' />
          </div>
          <input required type="email" name="email" value={user.email} onChange={handleChange} className='rounded h-11 w-full text-gray-200 bg-gray-700 text-lg px-12 focus:outline-teal-600' />
        </div>
        <div className='flex flex-col w-3/4'>
          <label><strong className='relative top-5'>Password</strong></label>
          <div>
          <FontAwesomeIcon icon={faLock} className='relative top-[2.3rem] left-3 text-2xl' />
          </div>
          <input required type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value) } className='rounded h-11 w-full text-gray-200 bg-gray-700 text-lg px-12 focus:outline-teal-600' />
        </div>
        <div className='flex flex-col w-3/4'>
          <label><strong className='relative top-5'>Confirm password</strong></label>
          <div>
          <FontAwesomeIcon icon={faLock} className='relative top-[2.3rem] left-3 text-2xl' />
          </div>
          <input required type="password" name="passwordControl" value={passwordControl} onChange={(e) => setPasswordControl(e.target.value)} className='rounded h-11 w-full text-gray-200 bg-gray-700 text-lg px-12 focus:outline-teal-600' />
        </div>
        <button type="submit" className='border-2 px-[6.9rem] py-3 mb-2 mt-7 bg-[#65B3AD] border-[#65B3AD] rounded'><strong className='text-lg text-gray-700'>Register</strong></button>
        <div className='w-3/4'>
        <p className='ml-1'> <strong>Already have an Account? click</strong>  {<NavLink to='/login'><strong className='text-[#65B3AD]'>here</strong></NavLink>}</p>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
      </form>
      
     
      
    </div>
  )
}
