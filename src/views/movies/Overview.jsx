import React from 'react'
import { useOutletContext } from 'react-router-dom';

export default function Overview(props) {
    const [movie, setMovie] = useOutletContext();
    return (
        <div>
            {movie && <div className="movie-details">
                <h4>Overview</h4>
                <p>{movie.translations[0].overview}</p>
                <h4>{movie.people[0].job}</h4>
                <p>{}</p>
            </div>}
        </div>
    )
}
