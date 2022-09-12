import React from 'react'
import { useOutletContext } from 'react-router-dom';

export default function Overview() {
    const [movie] = useOutletContext();
    return (
        <div>
            {movie && <div className="movie-details">
                <h4>Overview</h4>
                <p>{movie.translations[0].overview}</p>
                {movie.people && movie.people.map(person => {
                    return (<div key={`${person.name}, ${person.department}`}>
                        <h4>{person.department}</h4>
                        <p>{person.name}</p>
                    </div>)
                })}
                <h4>Release Date</h4>
                <p>{movie.premiere}</p>
                <h4>Average Rating</h4>
                <p>{movie.imdb_rating}</p>
                <h4>Votes</h4>
                <p>{movie.imdb_vote}</p>
                <a href={`https://www.imdb.com/title/tt${movie.imdb_id}`}><img src="https://1000marcas.net/wp-content/uploads/2021/05/Imdb-Logo-2012.png" alt="imdb-logo" /></a>
            </div>}
        </div>
    )
}
