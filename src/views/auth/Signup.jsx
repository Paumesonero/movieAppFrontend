import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import profilePng from '../../images/profile-icon.png'


export default function Signup() {
  const [user, setUser] = useState({
    username: '',
    email: '',
    imageUrl: '',
    biography: ''
  })
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
  }, [passwordControl])

  // image attempts here
  // const handleFiles = (e) =>{
  //   setImageUrl(e.target.files[0])
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const formData = new FormData()
    // formData.append('imageUrl', imageUrl)
    try {
      
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, { username: user.username, email: user.email, biography: user.biography, imageUrl: user.imageUrl, password });
      navigate('/login');
    } catch (error) {
      setErrorMessage(error.response.data.error)
    }
  }
  
  
  
  // const handleFileUpload = (e) =>{
  //   const uploadData = new FormData();
  //   uploadData.append('imageUrl', e.target.files[0]);

  //   service
  //   .uploadImage(uploadData)
  //   .then(response =>{
  //     setImageUrl(response.fileUrl)
      
  //   })
  //   .catch(err => console.log("Error while uploading the file", err))
  // }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input required type="text" name="username" value={user.username} onChange={handleChange} />

        <label>Email</label>
        <input required type="email" name="email" value={user.email} onChange={handleChange} />

        <label>Password</label>
        <input required type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value) } />

        <label>Repeat the password</label>
        <input required type="password" name="passwordControl" value={passwordControl} onChange={(e) => setPasswordControl(e.target.value)} />

        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

        <label>About me:</label>
        <textarea name="biography" value={user.biography} cols="25" rows="5" onChange={handleChange} />

        <label> Choose a photo</label>
        {/* <input type="file" name="imageUrl" value={user.imageUrl} />
        <input type="text" name='existingImage' hidden value={profilePng} /> */}

        <button type="submit">Register</button>
      </form>
      <p>Already have an Account? click {<NavLink to='/login'>Here</NavLink>}</p>
    </div>
  )
}
