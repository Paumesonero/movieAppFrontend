import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './views/Home';
import Search from "./views/Search"
import Footer from './components/Footer';
import ErrorPage from './views/ErrorPage';
import Signup from './views/auth/Signup';
import Login from './views/auth/Login';
import IsPrivate from './components/IsPrivate';
import UserDetails from './views/user/UserDetails';
import EditUser from './views/user/EditUser';
import Preferences from "./views/user/Preferences"
import Movie from './views/movies/Movie';
import Overview from './views/movies/Overview';
import Reviews from './views/movies/Reviews';
import NewMovie from './views/movies/NewMovie'
import EditMovie from './views/movies/EditMovie'
import Watchlist from './views/watchList/Watchlist';
import VoteList from './views/votes/VoteList';
import AddReview from './views/reviews/AddReview';
import AllReviews from './views/user/AllReviews';
import UserList from './views/user/UserList';

function App() {
  return (
    <div className="m-0 box-border text-base">
      <Toaster/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path='/user' element={<IsPrivate><UserDetails/></IsPrivate>}/>
        <Route path='/user-list' element={<IsPrivate><UserList/></IsPrivate>} />
        <Route path='/my-reviews' element={<IsPrivate><AllReviews /></IsPrivate>}/> 
        <Route path='/edit-user' element={<IsPrivate><EditUser/></IsPrivate>}/>
        <Route path="user/preferences" element={<Preferences/>}/>
        <Route path='/movies/:movieId' element={<Movie />}>
          <Route path='overview' element={<Overview />}/>
          <Route path='reviews' element={<Reviews />}/>
        </Route>
        <Route path='/movies/create' element={<NewMovie />}></Route>
        <Route path='/movies/:movieId/edit' element={<EditMovie />}></Route>
        <Route path='/vote-list' element={<IsPrivate><VoteList/></IsPrivate>}/>
        <Route path='/watchlist' element={<IsPrivate><Watchlist/></IsPrivate>}/>
        <Route path='/addReview/:movieId' element={<IsPrivate><AddReview /></IsPrivate>}/>
        <Route path="*" element={<ErrorPage />}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
