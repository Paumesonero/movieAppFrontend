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
            <h2>Add a review.</h2>
            {movie && <img src={movie.translations[0].poster.og} alt='movie poster'></img>}
            <form onSubmit={handleSubmit} className=''>
                <div>
                <label> Title</label>
                <input type="text" name='titleReview' placeholder='Title' value={review.titleReview} onChange={handleChange} />
                </div>
                <div>
                <label> Description</label>
                <textarea name="review"  cols="30" rows="7" defaultValue={review.review} onChange={handleChange} />
                </div>
                <button type='submit'>Post</button>
            </form>
        </div>
    );
};
