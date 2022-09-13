import axios from 'axios';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast, { Toast } from 'react-hot-toast';

export default function EditUser() {
const navigate = useNavigate();
const storedToken = localStorage.getItem('authToken');
const {user, logOutUser} = useContext(AuthContext);

const [userData, setUserData] = useState({
    username: user.username,
    email: user.email,
    biography: user.biography
})

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

return(
    <div>
        <h2>Edit user.</h2>
         <form onSubmit={handleSubmit}>
            <input required type='text' name='username' value={userData.username} onChange={handleChange} />
            <input required type='email' name='email' value={userData.email} onChange={handleChange} />
            <textarea name="biography"  cols="30" rows="7" value={userData.biography} onChange={handleChange} />
            <button type='submit'>Save changes and log out</button>
         </form>
    </div>
)

}
//     const {  user } = useContext(AuthContext);
//     const storedToken = localStorage.getItem('authToken');
//     const navigate = useNavigate();
//     const[currentUser, setCurrentUser] = useState(null);
//     const handleChange = (e) => {
//         setCurrentUser(prev =>{
//             return{
//                 ...prev,
//                 [e.target.name]: e.target.value
//             }
//         })
//     }
//     const handleSubmit = async (e) =>{
//         e.preventDefault();
//         try {
//             console.log(currentUser)
//              await axios.put(`${process.env.REACT_APP_API_URL}/user/edit`, currentUser, { headers: { Authorization: `Bearer ${storedToken}` } });
//              navigate('/user')
//         } catch (error) {
//             console.error(error)
//         }
//     }
//     return (
//         <div>
//             <h2>Edit.</h2>
//             <p>Hello {user.username}</p>
//             <form onSubmit={handleSubmit}>
//                 <input type="text" name='username' defaultValue={user.username} onChange={handleChange} />
//                 <input type="email" name='email' defaultValue={user.email} onChange={handleChange} />
//                 <textarea name="biography"  cols="30" rows="7" defaultValue={user.biography} onChange={handleChange}></textarea>
//                 <input type="file" name='imageUrl' defaultValue={user.imageUrl} onChange={handleChange} />
//                 <input type="text" name='existingImage' hidden  onChange={handleChange} />
//                 <button type="submit">Edit</button>
//             </form>
//         </div>
//     )
// }


// PENDING: need to update user somehow so changes are seen without having to logout.
