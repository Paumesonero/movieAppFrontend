import React from 'react'
import { useOutletContext } from 'react-router-dom'

export default function AllReviews() {
<<<<<<< HEAD
  const[allReviews] = useOutletContext();
=======
    const[allReviews, handleDelete] = useOutletContext()
>>>>>>> delete-review
  return (
    <div>
        {allReviews && allReviews.map(el =>{
            return(
                <div key={el._id}>
                <a href={`/movies/${el.movieId}`}><img src={el.translations[0].poster.og} alt="movie poster"></img></a>
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
