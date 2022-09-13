import React from 'react'
import { useOutletContext } from 'react-router-dom'

export default function AllReviews() {
    const[allReviews] = useOutletContext()
  return (
    <div>
        {allReviews && allReviews.map(el =>{
            return(
                <div key={el._id}>
                <p><strong>{el.titleReview}</strong></p>
                <p>{el.review}</p>
                </div>
            )
        })}
        {!allReviews && <p>Loading</p>}
    </div>
  )
}
