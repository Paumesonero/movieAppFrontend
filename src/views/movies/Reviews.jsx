import React, {useContext} from 'react'
import { AuthContext } from '../../context/AuthContext';
import { useOutletContext } from 'react-router-dom'

export default function Reviews() {
    const [movie, reviews] = useOutletContext();
    const {user} = useContext(AuthContext);
    return (
        <div>
            {reviews && <div className="reviewList">
                {reviews.map(review => {
                    return (
                    <div className="eachReview" key={`${movie._id}, ${user._id}, ${review._id}`}>
                        <div className="userProfilePicture">
                        <img src={review.userId.imageUrl} alt="user" />
                        </div>
                        <div className="reviewBody">
                            <h4>{review.titleReview}</h4>
                            <p>{review.review}</p>
                        </div>
                    </div>)
                })}
            </div>}
        </div>
    )
}
