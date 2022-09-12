import axios from 'axios';
import React, {useState} from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

export default function EditMovie() {
    const location = useLocation();
    const {myState, movie} = location.state;
    const {movieId} = useParams();
    const navigate = useNavigate();
    const storedToken = localStorage.getItem('authToken');
    const [movieToDB, setMovieToDB] = useState({
        imdb_id:movie.imdb_id?movie.imdb_id:undefined,
        name:movie.name?movie.name:"",
        year:movie.year?movie.year:undefined,
        image1: movie.image.og?movie.image.og:"",
        premiere: movie.premiere?movie.premiere:"",
        genre1:movie.genres[0]?movie.genres[0]:undefined,
        genre2:movie.genres[1]?movie.genres[1]:undefined,
        genre3:movie.genres[2]?movie.genres[2]:undefined,
        department1: movie.people[0].department? movie.people[0].department:"",
        people1: movie.people[0].name? movie.people[0].name:"",
        department2: movie.people[1].department? movie.people[1].department:"",
        people2: movie.people[1].name? movie.people[1].name:"",
        department3: movie.people[2].department? movie.people[2].department:"",
        people3: movie.people[2].name? movie.people[2].name:"",
        imdb_rating: movie.imdb_rating?movie.imdb_rating:undefined,
        imdb_vote: movie.imdb_vote?movie.imdb_vote:undefined,
        poster1: movie.translations[0].poster.og?movie.translations[0].poster.og:"",
        overview: movie.translations[0].overview?movie.translations[0].overview:""
    });
    const handleChange = (e) => {
        setMovieToDB(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    };
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/movies/${movieId}/edit`, movieToDB, { headers: { Authorization: `Bearer ${storedToken}` } });
            navigate(`/movies/${movieId}`);
        } catch (error) {
            console.log(error)
        }
    }
    const handleCreateSubmit = async (e) => {

    }
    return (
        <div>
            {movieToDB && <div>
                {myState === "edit" && <h1>Edit movie</h1>}
            {myState === "create" && <h1>New movie</h1>}
            <form onSubmit={myState === "edit"? handleEditSubmit : handleCreateSubmit}>
                <label>IMDB Id</label>
                <input type="text" name="imdb_id" defaultValue={movieToDB.imdb_id?movieToDB.imdb_id:undefined} onChange={handleChange}/>
                <label>Title</label>
                <input type="text" name="name" value={movieToDB.name?movieToDB.name:""} onChange={handleChange}/>
                <label>Year</label>
                <input type="number" name="year" defaultValue={movieToDB.year?movieToDB.year:undefined} onChange={handleChange}/>
                <label>Movie frame</label>
                <input type="text" name="image1" value={movieToDB.image1?movieToDB.image1:""} onChange={handleChange}/>
                <img src={movieToDB.image1} alt="movie-frame" />
                <label>Premiere</label>
                <input type="text" name="premiere" value={movieToDB.premiere?movieToDB.premiere:""} onChange={handleChange}/>
                <label>Genres</label>
                <div className="genreForm">
                    <input type="number" name="genre1" defaultValue={movieToDB.genre1?movieToDB.genre1:undefined} onChange={handleChange}/>
                    <input type="number" name="genre2" defaultValue={movieToDB.genre2?movieToDB.genre2:undefined} onChange={handleChange}/>
                    <input type="number" name="genre3" defaultValue={movieToDB.genre3?movieToDB.genre3:undefined} onChange={handleChange}/>
                </div>
                <label>People & roles</label>
                <div className="peopleAndRoleForm">
                    <input type="text" name="department1" value={movieToDB.department1? movieToDB.department1:""} onChange={handleChange}/>
                    <input type="text" name="people1" value={movieToDB.people1? movieToDB.people1:""} onChange={handleChange}/>
                    <input type="text" name="department2" value={movieToDB.department2? movieToDB.department2:""} onChange={handleChange}/>
                    <input type="text" name="people2" value={movieToDB.people2? movieToDB.people2:""} onChange={handleChange}/>
                    <input type="text" name="department3" value={movieToDB.department3? movieToDB.department3:""} onChange={handleChange}/>
                    <input type="text" name="people3" value={movieToDB.people3? movieToDB.people3:""} onChange={handleChange}/>
                </div>
                <label>IMDB rating</label>
                <input type="number" name="imdb_rating" defaultValue={movieToDB.imdb_rating?movieToDB.imdb_rating:undefined} onChange={handleChange}/>
                <label>IMDB votes</label>
                <input type="number" name="imdb_vote" defaultValue={movieToDB.imdb_vote?movieToDB.imdb_vote:undefined} onChange={handleChange}/>
                <label>Movie poster</label>
                <input type="text" name="poster1" value={movieToDB.poster1?movieToDB.poster1:""} onChange={handleChange}/>
                <img src={movieToDB.poster1} alt="movie-poster" />
                <label>Overview</label>
                <textarea name="overview" cols="30" rows="7" value={movieToDB.overview?movieToDB.overview:""} onChange={handleChange}></textarea>
                <button type="submit">{myState === "edit"? "Edit movie" : "Create movie"}</button>
            </form>
            </div>}
        </div>
    )
};
