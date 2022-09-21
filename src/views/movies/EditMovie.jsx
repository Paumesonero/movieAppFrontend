import axios from 'axios';
import React, {useState} from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

export default function EditMovie() {
    const location = useLocation();
    const {movie} = location.state;
    const {movieId} = useParams();
    const navigate = useNavigate();
    const storedToken = localStorage.getItem('authToken');
    const [movieToDB, setMovieToDB] = useState({
        imdb_id:movie.imdb_id,
        name: movie.name,
        year: movie.year,
        image1: movie.image.og,
        premiere: movie.premiere,
        genre1:movie.genres[0],
        genre2:movie.genres[1],
        genre3:movie.genres[2],
        department1: movie.people[0].department,
        people1: movie.people[0].name,
        department2: movie.people[1].department,
        people2: movie.people[1].name,
        department3: movie.people[2].department,
        people3: movie.people[2].name,
        imdb_rating: movie.imdb_rating,
        imdb_vote: movie.imdb_vote,
        poster1: movie.translations[0].poster.og,
        overview: movie.translations[0].overview,
    });
    const handleChange = (e) => {
        setMovieToDB(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/movies/${movieId}/edit`, movieToDB, { headers: { Authorization: `Bearer ${storedToken}` } });
            navigate(`/movies/${movieId}/overview`);
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            {movieToDB && <div>
                <h1 className='text-2xl font-bold ml-10 pt-10'> Edit <span className='text-teal-600' >movie</span></h1>
                <form onSubmit={handleSubmit} className="flex flex-col searchForm top-48 mx-10">
                    <label className="mt-5"><strong>IMDB Id:</strong></label>
                    <input className='rounded h-11 px-3 w-full text-gray-200 bg-gray-700 text-lg focus:outline-teal-600' type="text" name="imdb_id" defaultValue={movieToDB.imdb_id?movieToDB.imdb_id:undefined} onChange={handleChange}/>
                    <label className="mt-5"><strong>Title:</strong></label>
                    <input type="text" name="name" value={movieToDB.name?movieToDB.name:""}  className='rounded h-11 px-3 w-full text-gray-200 bg-gray-700 text-lg focus:outline-teal-600' onChange={handleChange} />
                    <label className="mt-5"><strong>Year:</strong></label>
                    <input type="number" name="year" defaultValue={movieToDB.year?movieToDB.year:undefined} className='rounded h-11 px-3 w-full text-gray-200 bg-gray-700 text-lg focus:outline-teal-600' onChange={handleChange}/>
                    <label className="mt-5"><strong>Movie frame:</strong></label>
                    <input type="text" name="image1" value={movieToDB.image1?movieToDB.image1:""} className='rounded h-11 px-3 w-full text-gray-200 bg-gray-700 text-lg focus:outline-teal-600' onChange={handleChange}/>
                    <img src={movieToDB.image1} alt="movie-frame" className="mt-5 w-full border-solid border-2 rounded-lg border-1 border-gray-200"/>
                    <label className="mt-5"><strong>Premiere:</strong></label>
                    <input type="text" name="premiere" value={movieToDB.premiere?movieToDB.premiere:""} className='rounded h-11 px-3 w-full text-gray-200 bg-gray-700 text-lg focus:outline-teal-600' onChange={handleChange}/>
                    <label className="mt-5"><strong>Genres:</strong></label>
                    <div className="genreForm flex">
                        <input type="number" name="genre1" defaultValue={movieToDB.genre1?movieToDB.genre1:undefined} className='mt-1 mx-4 rounded h-11 px-3 w-full text-gray-200 bg-gray-700 text-lg focus:outline-teal-600' onChange={handleChange}/>
                        <input type="number" name="genre2" defaultValue={movieToDB.genre2?movieToDB.genre2:undefined} className='mt-1 mx-4 rounded h-11 px-3 w-full text-gray-200 bg-gray-700 text-lg focus:outline-teal-600' onChange={handleChange}/>
                        <input type="number" name="genre3" defaultValue={movieToDB.genre3?movieToDB.genre3:undefined} className='mt-1 mx-4 rounded h-11 px-3 w-full text-gray-200 bg-gray-700 text-lg focus:outline-teal-600' onChange={handleChange}/>
                    </div>
                    <label className="mt-5"><strong>Cast & Crew:</strong></label>
                    <div className="peopleAndRoleForm">
                        <input type="text" name="department1" value={movieToDB.department1? movieToDB.department1:""} className='rounded h-11 px-3 w-full text-gray-200 bg-gray-700 text-lg focus:outline-teal-600' onChange={handleChange}/>
                        <input type="text" name="people1" value={movieToDB.people1? movieToDB.people1:""} className='rounded h-11 px-3 w-full text-gray-200 bg-gray-700 text-lg focus:outline-teal-600' onChange={handleChange}/>
                        <input type="text" name="department2" value={movieToDB.department2? movieToDB.department2:""} className='mt-5 rounded h-11 px-3 w-full text-gray-200 bg-gray-700 text-lg focus:outline-teal-600' onChange={handleChange}/>
                        <input type="text" name="people2" value={movieToDB.people2? movieToDB.people2:""} className='rounded h-11 px-3 w-full text-gray-200 bg-gray-700 text-lg focus:outline-teal-600' onChange={handleChange}/>
                        <input type="text" name="department3" value={movieToDB.department3? movieToDB.department3:""} className='mt-5 rounded h-11 px-3 w-full text-gray-200 bg-gray-700 text-lg focus:outline-teal-600' onChange={handleChange}/>
                        <input type="text" name="people3" value={movieToDB.people3? movieToDB.people3:""} className='rounded h-11 px-3 w-full text-gray-200 bg-gray-700 text-lg focus:outline-teal-600' onChange={handleChange}/>
                    </div>
                    <label className="mt-5"><strong>IMDB rating:</strong></label>
                    <input type="number" name="imdb_rating" defaultValue={movieToDB.imdb_rating?movieToDB.imdb_rating:undefined} className='rounded h-11 px-3 w-full text-gray-200 bg-gray-700 text-lg focus:outline-teal-600' onChange={handleChange}/>
                    <label className="mt-5"><strong>IMDB votes:</strong></label>
                    <input type="number" name="imdb_vote" defaultValue={movieToDB.imdb_vote?movieToDB.imdb_vote:undefined} className='rounded h-11 px-3 w-full text-gray-200 bg-gray-700 text-lg focus:outline-teal-600' onChange={handleChange}/>
                    <label className="mt-5"><strong>Movie poster:</strong></label>
                    <input type="text" name="poster1" value={movieToDB.poster1?movieToDB.poster1:""} className='rounded h-11 px-3 w-full text-gray-200 bg-gray-700 text-lg focus:outline-teal-600' onChange={handleChange}/>
                    <img src={movieToDB.poster1} alt="movie-poster" className="mt-5 w-32 border-solid border-2 rounded-lg mx-4 border-1 border-gray-200"/>
                    <label className="mt-5"><strong>Overview:</strong></label>
                    <textarea name="overview" cols="30" rows="7" value={movieToDB.overview?movieToDB.overview:""} className='rounded px-3 w-full text-gray-200 bg-gray-700 text-lg focus:outline-teal-600 h-40' onChange={handleChange}></textarea>
                    <div className="flex justify-center">
                        <button type="submit" className="mb-36 mt-8 flex-shrink-0 bg-[#65B3AD] hover:bg-teal-700 border-[#65B3AD] hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded w-24">Edit movie</button>
                    </div>
                </form>
            </div>}
        </div>
    )
};
