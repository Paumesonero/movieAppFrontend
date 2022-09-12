import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom'

export default function EditMovie() {
    const location = useLocation();
    const {myState, movie} = location.state;
    const {movietoDB, setMovieToDB} = useState(movie)
    const storedToken = localStorage.getItem('authToken');
    const handleChange = (e) => {

    }
    const handleEditSubmit = () => {

    }
    const handleCreateSubmit = () => {

    }
    return (
        <div>
            {movie && <div>
                {myState === "edit" && <h1>Edit movie</h1>}
            {myState === "create" && <h1>New movie</h1>}
            <form onSubmit={myState === "edit"? handleEditSubmit : handleCreateSubmit}>
                <label>IMDB Id</label>
                <input type="text" name="imdb_id" value={movie.imdb_id?movie.imdb_id:undefined} onChange={handleChange}/>
                <label>Title</label>
                <input type="text" name="name" value={movie.name?movie.name:""} onChange={handleChange}/>
                <label>Year</label>
                <input type="number" name="year" value={movie.year?movie.year:undefined} onChange={handleChange}/>
                <label>Movie frame</label>
                <input type="text" name="image1" value={movie.image.og?movie.image.og:""} onChange={handleChange}/>
                <img src={movie.image.og} alt="movie-frame" />
                <label>Premiere</label>
                <input type="text" name="premiere" value={movie.premiere?movie.premiere:""} onChange={handleChange}/>
                <label>Genres</label>
                <div className="genreForm">
                    <input type="number" name="genre1" value={movie.genres[1]?movie.genres[1]:undefined} onChange={handleChange}/>
                    <input type="number" name="genre2" value={movie.genres[2]?movie.genres[2]:undefined} onChange={handleChange}/>
                    <input type="number" name="genre3" value={movie.genres[3]?movie.genres[3]:undefined} onChange={handleChange}/>
                </div>
                <label>People & roles</label>
                <div className="peopleAndRoleForm">
                    <input type="text" name="department1" value={movie.people[0].department? movie.people[0].department:""} onChange={handleChange}/>
                    <input type="text" name="department1" value={movie.people[0].name? movie.people[0].name:""} onChange={handleChange}/>
                    <input type="text" name="department1" value={movie.people[1].department? movie.people[1].department:""} onChange={handleChange}/>
                    <input type="text" name="department1" value={movie.people[1].name? movie.people[1].name:""} onChange={handleChange}/>
                    <input type="text" name="department1" value={movie.people[3].department? movie.people[3].department:""} onChange={handleChange}/>
                    <input type="text" name="department1" value={movie.people[3].name? movie.people[3].name:""} onChange={handleChange}/>
                </div>
                <label>IMDB rating</label>
                <input type="number" name="imdb_rating" value={movie.imdb_rating?movie.imdb_rating:undefined} onChange={handleChange}/>
                <label>IMDB votes</label>
                <input type="number" name="imdb_vote" value={movie.imdb_vote?movie.imdb_vote:undefined} onChange={handleChange}/>
                <label>Movie poster</label>
                <input type="text" name="poster1" value={movie.translations[0].poster.og?movie.translations[0].poster.og:""} onChange={handleChange}/>
                <img src={movie.translations[0].poster.og} alt="movie-poster" />
                <label>Overview</label>
                <textarea name="overview" cols="30" rows="7" value={movie.translations[0].overview} onChange={handleChange}></textarea>
                <button type="submit">{myState === "edit"? "Edit movie" : "Create movie"}</button>
            </form>
            </div>}
        </div>
    )
};
