import React from 'react'
import { useOutletContext } from 'react-router-dom';

export default function Overview() {
    const [movie] = useOutletContext();
    return (
        <div>
            {movie && <div className="movie-details">
                <h4 className="font-bold mb-1">Overviews:</h4>
                <p className="mr-5">{movie.translations[0].overview}</p>
                {movie.people && movie.people.map(person => {
                    return (<div key={`${person.name}, ${person.department}`}>
                        <h4 className="font-bold mt-3">{person.department}</h4>
                        <p>{person.name}</p>
                    </div>)
                })}
                <div className="flex flex-row flex-wrap justify-between">
                    <div className="" >
                        <h4 className=" font-bold mt-3">Release Date:</h4>
                        <p>{movie.premiere}</p>
                    </div>
                    <div>
                        <h4 className="font-bold mt-3">Average Rating:</h4>
                        <p>{movie.imdb_rating}</p>
                    </div>
                    <div className="mr-5">
                        <h4 className="font-bold mt-3">Votes:</h4>
                        <p>{movie.imdb_vote}</p>
                    </div>
                </div>
                    <a href={`https://www.imdb.com/title/tt${movie.imdb_id}`}><img src="https://1000marcas.net/wp-content/uploads/2021/05/Imdb-Logo-2012.png" alt="imdb-logo"/></a>
            </div>}
        </div>
    )
}
