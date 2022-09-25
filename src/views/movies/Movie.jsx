import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { useParams, NavLink, useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import { faRemove } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';
const colage = require("colage");

export default function Movie() {
    const {  user } = useContext(AuthContext);
    const [movie, setMovie] = useState("");
    const {movieId} = useParams();
    const storedToken = localStorage.getItem('authToken');
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [inWatchlist, setInWatchlist] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const getMovie = async () => {
            try {
                const movieFromDB = await axios.get(`${process.env.REACT_APP_API_URL}/movies/${movieId}`, { headers: { Authorization: `Bearer ${storedToken}` } });
                setMovie(movieFromDB.data.data);
            } catch (error) {
                console.log(error);
            }
        }
        getMovie();
    },[storedToken, movieId]);
    useEffect(() => {
        const isInWatchlist = async () => {
            try {
                const isInWatchList = await axios.get(`${process.env.REACT_APP_API_URL}/watchList/${movieId}/exists`, { headers: { Authorization: `Bearer ${storedToken}` } });
                setInWatchlist(isInWatchList.data.data);
            } catch (error) {
                setErrorMessage(error.response.data.error);
            }
        };
        isInWatchlist();
    });
    const handleNextMovie = async() => {
        try {
            const nextMovie = await axios.get(`${process.env.REACT_APP_API_URL}/movies/next`, { headers: { Authorization: `Bearer ${storedToken}` } });
            navigate(`/movies/${nextMovie.data.data._id}/overview`)
        } catch (error) {
            setErrorMessage(error.response.data.error);
        }
    };
    const handleLike = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/votes/${movieId}/like`, {}, { headers: { Authorization: `Bearer ${storedToken}` } });
            const isInWatchList = await axios.get(`${process.env.REACT_APP_API_URL}/watchList/${movieId}/exists`, { headers: { Authorization: `Bearer ${storedToken}` } });
            if(isInWatchList.data.data) {
                await axios.delete(`${process.env.REACT_APP_API_URL}/watchList/${movieId}/remove`, { headers: { Authorization: `Bearer ${storedToken}` } });
            };
            handleNextMovie();
        } catch (error) {
            setErrorMessage(error.response.data.error);
        }
    };
    const handleDislike = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/votes/${movieId}/dislike`, {}, { headers: { Authorization: `Bearer ${storedToken}` } });
            const isInWatchList = await axios.get(`${process.env.REACT_APP_API_URL}/watchList/${movieId}/exists`, { headers: { Authorization: `Bearer ${storedToken}` } });
            if(isInWatchList.data.data) {
                await axios.delete(`${process.env.REACT_APP_API_URL}/watchList/${movieId}/remove`, { headers: { Authorization: `Bearer ${storedToken}` } });
            }
            handleNextMovie();
        } catch (error) {
            setErrorMessage(error.response.data.error);
        }
    };
    const handleIgnore = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/votes/${movieId}/ignore`, {}, { headers: { Authorization: `Bearer ${storedToken}` } });
            const isInWatchList = await axios.get(`${process.env.REACT_APP_API_URL}/watchList/${movieId}/exists`, { headers: { Authorization: `Bearer ${storedToken}` } });
            if(isInWatchList.data.data) {
                await axios.delete(`${process.env.REACT_APP_API_URL}/watchList/${movieId}/remove`, { headers: { Authorization: `Bearer ${storedToken}` } });
            }
            handleNextMovie();
        } catch (error) {
            setErrorMessage(error.response.data.error);
        }
    };
    const handleWatchlist = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/watchlist/${movieId}/add`, {}, { headers: { Authorization: `Bearer ${storedToken}` } });
            handleNextMovie();
        } catch (error) {
            setErrorMessage(error.response.data.error);
        }
    };
    const handleDelete = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/movies/${movieId}/delete`, { headers: { Authorization: `Bearer ${storedToken}` } });
            toast.error(`${movie.name} was deleted!`);
            navigate("/");
        } catch (error) {
            setErrorMessage(error.response.data.error);
        }
    };
    return (
        <div>
            {movie && <div className="bg-slate-900">
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <img src="https://storage-asset.msi.com/event/mb/2016/for_honor/images/topblack.png" alt="fade" className="absolute h-screen" />
                <div className="max-h-full max-w-full h-screen">
                    <img src={movie.translations[0].poster.og} className="h-5/6 object-cover" alt="poster" />
                </div>
                <div id="watchLaterButtons">
                    {!inWatchlist && <button onClick={() => handleWatchlist()} className="absolute top-12 right-5 mt-2 flex-shrink-0 bg-[#65B3AD]/70 hover:bg-teal-700 border-[#65B3AD] hover:border-teal-700 text-sm border-2 text-white py-1 px-2 rounded">Watch later <FontAwesomeIcon icon={faClipboardList} className='text-xl text-slate-200'/></button>}
                    {inWatchlist && <button onClick={() => handleNextMovie()} className="absolute top-12 right-5 mt-2 flex-shrink-0 bg-[#65B3AD]/70 hover:bg-teal-700 border-[#65B3AD] hover:border-teal-700 text-sm border-2 text-white py-1 px-2 rounded">Keep in Watchlist</button>}
                </div>
                <div id="voteButtons" className="relative bottom-36 flex flex-row justify-between mx-5">
                    <button onClick={() => handleDislike()} className="dislike-btn rounded-full h-16 w-16 border-0 bg-[#FF2F61]/40 text-3xl"><FontAwesomeIcon icon={faRemove} className='remove-icon'/></button>
                    <button onClick={() => handleIgnore()} className="rounded-full h-16 w-16 border-0 bg-[#F0EB78]/40 text-3xl"><FontAwesomeIcon icon={faEyeSlash} className='eye-slash-icon'/></button>
                    <button onClick={() => handleLike()} className="rounded-full h-16 w-16 border-0 bg-[#65B3AD]/40 text-3xl "><FontAwesomeIcon icon={faHeart} className='heart-icon'/></button>                    
                </div>
                <img src={movie.image.og} className="relative bottom-28" alt="movie-frame" />
                <div className="relative bottom-52 flex flex-row items-baseline">
                    <img src={movie.translations[0].poster.og}  className="h-40 border-solid border-2 rounded-lg mx-4 border-1 border-gray-200" alt="poster" />
                    <h1 className="text-2xl font-bold">{movie.name}</h1>
                </div>
                <div className="h-8 flex flex-row justify-around relative bottom-48">
                    {movie.genres[0] && <span className="flex-shrink-0 bg-gray-700 text-center  leading-7 text-sm text-white px-5 rounded-2xl">{colage.ge([`${movie.genres[0]}`],"en")}</span>} {movie.genres[1] && <span className="flex-shrink-0 bg-gray-700 text-center  leading-7 text-sm text-white px-5 rounded-2xl">{colage.ge([`${movie.genres[1]}`],"en")}</span>} {movie.genres[2] && <span className="flex-shrink-0 bg-gray-700 text-center  leading-7 text-sm text-white px-5 rounded-2xl">{colage.ge([`${movie.genres[2]}`],"en")}</span>}
                </div>
                <div className="relative bottom-40 ml-5">
                    <NavLink isactive="true" className={(element) => element.isActive ? "selected" : "notSelected"} to={`/movies/${movieId}/overview`}>About Movie</NavLink>
                    <NavLink id="reviewToggle" className={(element) => element.isActive ? "selected" : ""} to={`/movies/${movieId}/reviews`}>Reviews</NavLink>
                    <div className="relative -bottom-6">
                        <Outlet context={[movie]}/>
                        {user && user.role === 'admin' && (
                        <div className="flex justify-evenly">
                            <NavLink state={{myState:"edit",movie:movie}} to={`/movies/${movieId}/edit`} className="mt-2 flex-shrink-0 bg-[#65B3AD] hover:bg-teal-700 border-[#65B3AD] hover:border-teal-700 text-xl border-4 text-white py-1 px-2 rounded">Edit movie</NavLink>
                            <button onClick={handleDelete} method="DELETE" type="submit" className="mt-2 flex-shrink-0 bg-[#FF2F61]/60 hover:bg-teal-700 border-[#FF2F61] hover:border-teal-700 text-xl border-2 text-white py-1 px-2 rounded">Delete</button>
                        </div>
                        )}
                    </div>     
                </div>
            </div>}
        </div>
    )
}
