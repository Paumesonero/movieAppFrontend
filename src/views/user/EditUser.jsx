import axios from 'axios';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';

export default function EditUser() {
const navigate = useNavigate();
const storedToken = localStorage.getItem('authToken');
const {user, logOutUser} = useContext(AuthContext);
const [userData, setUserData] = useState({
    username: user.username,
    email: user.email,
    biography: user.biography,
    imageUrl: user.imageUrl
});
const handleChange = (e) => {
  setUserData(prev =>{
    return{
        ...prev,
         [e.target.name]: e.target.value
    }
  })
}
const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
        await axios.put(`${process.env.REACT_APP_API_URL}/user/edit`, userData, { headers: { Authorization: `Bearer ${storedToken}` } });
        toast.success('User edited successfully. Please log in again');
        logOutUser();
        navigate('/login')
    } catch (error) {
        console.error(error)
    }
}
const handleFileUpload = async(e) =>{
    const uploadData = new FormData();
    uploadData.append('imageUrl', e.target.files[0]);
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/upload`, uploadData);
        setUserData(prev =>{
            return{
                ...prev,
                imageUrl: response.data.fileUrl
            }
        })
    } catch (error) {
        console.error(error)
    }
}
return(
    <div className='min-h-screen'>
        <div className='background-img polygon h-64 flex justify-center'>
            <h2 className='relative top-8 text-2xl'><strong>Edit <span className='text-[#65B3AD]'>user</span></strong> </h2>
        </div>
        
         <form onSubmit={handleSubmit} className='mt-32 h-64 flex gap-2 flex-col items-center justify-center '>
            <div className='flex flex-col w-3/4'>
                <label><strong className='relative top-5'>Username</strong></label>
                 <div>
                    <FontAwesomeIcon icon={faUser} className='relative top-[2.3rem] left-3 text-2xl' />
                 </div>
                <input required type='text' name='username' maxLength='15' value={userData.username} onChange={handleChange} className='rounded h-11 w-full text-gray-200 bg-gray-700 text-lg px-12 focus:outline-[#65B3AD]' />
            </div>
            <div className='flex flex-col w-3/4'>
                <label><strong className='relative top-5'>Email</strong></label>
                <div>
                    <FontAwesomeIcon icon={faEnvelope} className='relative top-[2.3rem] left-3 text-2xl' />
                 </div>
                <input required type='email' name='email' value={userData.email} onChange={handleChange} className='rounded h-11 w-full text-gray-200 bg-gray-700 text-lg px-12 focus:outline-[#65B3AD]' />
            </div>
            <div className='flex flex-col w-3/4'>
                <label><strong className=''>Biography</strong></label>
                <textarea name="biography"  cols="30" rows="5" maxLength='130' value={userData.biography} onChange={handleChange} className='rounded  w-full text-gray-200 bg-gray-700 text-lg px-2 py-2 focus:outline-[#65B3AD]' />
            </div>
            <div className='flex flex-col w-3/4'>
                <label for='profile' className=' border-2 w-3/4 mt-2 text-center px-9 py-3 bg-[#65B3AD] border-[#65B3AD] rounded text-gray-700'><strong>Choose a photo</strong></label>
                <div>
                    <FontAwesomeIcon icon={faUpload} className='relative bottom-[2.5rem] left-3 text-xl text-gray-700' />
                 </div>
                <input type="file" id='profile' onChange={(e) => handleFileUpload(e)} className='hidden'/>
            </div>
            <button type='submit' className='border-2 px-[4.8rem] py-3 mb-2  bg-[#65B3AD] border-[#65B3AD] rounded relative bottom-4' ><strong className='text-lg text-gray-700'>Save and log out</strong></button>
         </form>
    </div>
     )
}

