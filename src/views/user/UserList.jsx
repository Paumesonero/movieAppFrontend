import React, {useState, useEffect} from 'react'
import axios from 'axios';
import SearchBar from '../../components/SearchBar';


export default function UserList() {
    const[users, setUsers] = useState(null)
    const[filteredUsers, setFilteredUsers] = useState(null)
    const storedToken = localStorage.getItem('authToken');
   
    useEffect(() => {
        const getUsers = async () => {
            try {
                const usersFromDb = await axios.get(`${process.env.REACT_APP_API_URL}/user/userList`, { headers: { Authorization: `Bearer ${storedToken}` } });
                setUsers(usersFromDb.data.data);
                setFilteredUsers(usersFromDb.data.data)
            } catch (error) {
                console.log(error);
            }
        }
        getUsers();
    },[storedToken]);

    const handleSearch = (searchValue) =>{
        if(searchValue === ''){
            setFilteredUsers(users);
        } else {
            const filtered = users.filter(el => el.username.toLowerCase().includes((searchValue).toLowerCase()))
            setFilteredUsers(filtered);
        }
    };
    
  return (
    <div>
        <h2>All users</h2>
        <SearchBar onSearch={handleSearch} />
        {filteredUsers && filteredUsers.map(el =>{
            return(
                <div key={el._id}>
                    <div>
                        <img src={el.imageUrl} alt="user" width='70px' />
                    </div>
                    <div>
                        <p><strong>Username:</strong> {el.username}</p>
                        <p><strong>Email:</strong>{el.email}</p>
                    </div>
                </div>
            )
        })}
    </div>
  )
}
