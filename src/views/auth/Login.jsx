import axios from 'axios';
import React, { useState, useContext } from 'react';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, NavLink } from 'react-router-dom';

export default function Login() {
  const { storeToken, authenticateUser } = useContext(AuthContext);
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
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
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, user);
      toast.success('Welcome back!')
      storeToken(response.data.authToken);
      authenticateUser();
      navigate('/');
    } catch (error) {
      setErrorMessage(error.response.data.error)
    }
  }
  return (
    <div className='bg-gray-900 h-screen'>
      <div className='background-img polygon h-64'></div>
      <form onSubmit={handleSubmit} className=' h-64 flex flex-col items-center gap-4 justify-center '>
        <div className='flex flex-col w-3/4'>
          <label><strong className='relative'>Email</strong></label>
          <FontAwesomeIcon icon={faEnvelope} className='relative top-8 right-32 text-xl' />
          <input required type="email" name="email" value={user.email} onChange={handleChange} className='rounded h-11 w-full text-gray-200 bg-gray-700 text-lg' />
        </div>
        <div className='flex flex-col w-3/4'>
          <label><strong>Password</strong></label>
          <input required type="password" name="password" value={user.password} onChange={handleChange} className='rounded h-11 w-full text-gray-200 bg-gray-700 text-2xl focus:outline-teal-600' />
        </div>
        <button type="submit" className='border-2 px-[7.5rem] py-3 mt-3 bg-teal-600 border-teal-600 rounded'> <strong className='text-lg'>Log in</strong> </button>
        <div className='w-3/4'>
          <p className='ml-1'><strong>Not a member yet? Sign up</strong>  <NavLink to="/signup"><strong className='text-teal-600'>here</strong></NavLink></p>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
        
      </form>
    </div>
    
  )
}
