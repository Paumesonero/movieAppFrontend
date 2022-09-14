import axios from 'axios';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
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
    <div>
        <h2>Edit user.</h2>
         <form onSubmit={handleSubmit}>
            <input required type='text' name='username' value={userData.username} onChange={handleChange} />
            <input required type='email' name='email' value={userData.email} onChange={handleChange} />
            <textarea name="biography"  cols="30" rows="7" value={userData.biography} onChange={handleChange} />
            <input type="file" onChange={(e) => handleFileUpload(e)} />
            <button type='submit'>Save changes and log out</button>
         </form>
    </div>
     )

}

