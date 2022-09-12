import React,{useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'

export default function AddReview() {
    const {movieId} = useParams();
    const storedToken = localStorage.getItem('authToken');
    const[review, setReview] = useState({
        titleReview: '',
        review: ''
    })

    const navigate = useNavigate()

    const handleChange = (e) =>{
        setReview(prev =>{
            return{
                ...prev,
                [e.target.name] : e.target.value
            }
        })
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
             await axios.post(`${process.env.REACT_APP_API_URL}/reviews/${movieId}/create`, review, { headers: { Authorization: `Bearer ${storedToken}` } });
             navigate('/vote-list')
        } catch (error) {
           console.log(error)
        } 
    }

  return (
    <div>
        <h2>Add a review.</h2>
        <form onSubmit={handleSubmit}>
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
  )
}
