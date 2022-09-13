import React from 'react'
import { useOutletContext } from 'react-router-dom'

export default function AllReviews() {
    const[allReviews, handleDelete] = useOutletContext()
  return (
    <div>
        {allReviews && allReviews.map(el =>{
            return(
                <div key={el._id}>
                {/* <a href={`/movies/${el.movieId}`}><img src={el.translations[0].poster.og} alt="movie poster"></img></a> */}
                <p><strong>{el.titleReview}</strong></p>
                <p>{el.review}</p>
                <button onClick={() => handleDelete(el._id, el.titleReview)}>Delete</button>
                </div>
            );
        })}
        {!allReviews && <p>Loading</p>}
    </div>
  );
}
