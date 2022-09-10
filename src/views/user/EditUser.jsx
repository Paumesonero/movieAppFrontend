import axios from 'axios';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function EditUser() {
    const {  user } = useContext(AuthContext);
    const storedToken = localStorage.getItem('authToken');
    const navigate = useNavigate();
    const[currentUser, setCurrentUser] = useState(null);
    
    const handleChange = (e) => {
        setCurrentUser(prev =>{
            return{
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            console.log(currentUser)
             await axios.put(`${process.env.REACT_APP_API_URL}/user/edit`, currentUser, { headers: { Authorization: `Bearer ${storedToken}` } });
             navigate('/user')
        } catch (error) {
            console.error(error)
        }

        
    }

    
  return (
    <div>
        <h2>Edit.</h2>
        <p>Hello {user.username}</p>
        <form onSubmit={handleSubmit}>
            <input type="text" name='username' defaultValue={user.username} onChange={handleChange} />
            <input type="email" name='email' value={user.email} onChange={handleChange} />
            <textarea name="biography"  cols="30" rows="7" value={user.biography} onChange={handleChange}></textarea>
            <input type="file" name='imageUrl' value={user.imageUrl} onChange={handleChange} />
            <input type="text" name='existingImage' hidden  onChange={handleChange} />
            <button type="submit">Edit</button>

        </form>
    </div>
  )
}
