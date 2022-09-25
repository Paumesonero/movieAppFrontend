import React,{useState} from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function AddReview() {
    const {movieId} = useParams();
    const [movie, setMovie] = useState(null)
    const storedToken = localStorage.getItem('authToken');
    const[review, setReview] = useState({
        titleReview: '',
        review: ''
    });
    const navigate = useNavigate()

    useEffect(() =>{
        const getMovie = async() =>{
            try {
                const movieFromApi = await axios.get(`${process.env.REACT_APP_API_URL}/movies/${movieId}`, { headers: { Authorization: `Bearer ${storedToken}` } });
                setMovie(movieFromApi.data.data);
            } catch (error) {
                console.error(error);
            }
        }
        getMovie();
    },[movieId, storedToken]);

    const handleChange = (e) =>{
        setReview(prev =>{
            return{
                ...prev,
                [e.target.name] : e.target.value
            }
        })
    };
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
             await axios.post(`${process.env.REACT_APP_API_URL}/reviews/${movieId}/create`, review, { headers: { Authorization: `Bearer ${storedToken}` } });
             toast.success('Review posted')
             navigate('/vote-list');
        } catch (error) {
           console.log(error);
        } 
    }
    return (
        <div className='h-screen mb-14'>
            <div className='background-img polygon h-64 flex justify-center items-start'>
                <h2 className='text-3xl mt-10'><strong>Add a <span className='text-[#65B3AD]'>review</span> </strong> </h2>
            </div>
            {movie && <img src={movie.translations[0].poster.og} alt='movie poster' className='w-28 rounded-xl ml-5 relative bottom-32'></img>}
            <form onSubmit={handleSubmit} className=' h-64 flex flex-col items-center gap-4 justify-center '>
                <div className='flex flex-col w-3/4'>
                    <label><strong className='text-xl'>Title</strong></label>
                    <input type="text" name='titleReview' maxLength='35' value={review.titleReview} onChange={handleChange} className='rounded h-11 w-full text-gray-200 bg-gray-700 text-lg px-3 focus:outline-[#65B3AD]' />
                </div>
                <div className='flex flex-col w-3/4'>
                    <label> <strong className='text-xl'>Your review</strong></label>
                    <textarea name="review"  cols="15" rows="7" defaultValue={review.review} onChange={handleChange} className='rounded text-gray-200 bg-gray-700 px-3 focus:outline-[#65B3AD]' />
                </div>
                <button type='submit' className='border-2 px-[7.5rem] py-3 mt-3 bg-[#65B3AD] border-[#65B3AD] rounded'> <strong className='text-lg text-gray-700'>Save</strong></button>
            </form>
        </div>
    );
};
