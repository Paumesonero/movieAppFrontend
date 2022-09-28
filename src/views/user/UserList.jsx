import React, {useState, useEffect} from 'react'
import axios from 'axios';
import SearchBar from '../../components/SearchBar';
import toast from 'react-hot-toast';

export default function UserList() {
    const[users, setUsers] = useState(null)
    const[filteredUsers, setFilteredUsers] = useState(null)
    const storedToken = localStorage.getItem('authToken');
   //Gets all users from the databse
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
    const handleDelete = async (userId, username) => {
        try {
            const filteredUsers = users.filter(el =>{
                return el.username !== username
            })
            console.log(filteredUsers)
            setFilteredUsers(filteredUsers)
            await axios.delete(`${process.env.REACT_APP_API_URL}/user/${userId}/delete`, { headers: { Authorization: `Bearer ${storedToken}` } });
            toast.error(' User deleted!');
        } catch (error) {
            console.log(error)
        }
    };
    return (
        <div className='h-max mb-14 min-h-screen'>
            <div className='relative top-5 flex flex-col gap-3'>
                    <h2 className='text-2xl font-bold ml-5 '> All <span className='text-[#65B3AD]'>Users</span></h2>
                    <SearchBar onSearch={ handleSearch} />
            </div>
            <div className='mt-10 ml-5 flex flex-col gap-9'>
            {filteredUsers && filteredUsers.map(el =>{
                return(
                    <div key={el._id} className='flex gap-2'>
                        <div>
                            <img src={el.imageUrl} alt="user" className='w-12 min-w-[3rem] h-16 rounded-md profile-img-round' />
                        </div>
                        <div className='w-3/5'>
                            <p><strong>Username:</strong> {el.username}</p>
                            <p><strong>Email:</strong>{el.email}</p>
                            <hr className='relative top-6 mb-4 right-10 '/>
                        </div>
                        <div>
                            <button onClick={() => handleDelete(el._id, el.username)} className=' bg-[#65B3AD]/70 hover:bg-teal-700 border-[#65B3AD] text-white py-1 px-2 rounded'>Delete</button>
                        </div>
                    </div>
                )
            })}
            </div>
        </div>
    )
}
