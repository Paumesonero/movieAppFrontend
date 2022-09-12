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
import Movie from './views/movies/Movie';
import Overview from './views/movies/Overview';
import Reviews from './views/movies/Reviews';
import NewMovie from './views/movies/NewMovie'
import EditMovie from './views/movies/EditMovie'
import Watchlist from './views/watchList/Watchlist';
import VoteList from './views/votes/VoteList';

function App() {
  return (
    <div className="App">
      <Toaster/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path='/user' element={<IsPrivate><UserDetails/></IsPrivate>} />
        <Route path='/edit-user' element={<IsPrivate><EditUser/></IsPrivate>} />
        <Route path='/movies/:movieId' element={<Movie />}>
          <Route path='overview' element={<Overview />} />
          <Route path='reviews' element={<Reviews />} />
        </Route>
        <Route path='/movies/create' element={<NewMovie />}></Route>
        <Route path='/movies/:movieId/edit' element={<EditMovie />}></Route>
        <Route path='/vote-list' element={<IsPrivate><VoteList/></IsPrivate>} />
        <Route path='/watchlist' element={<IsPrivate><Watchlist/></IsPrivate>} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
