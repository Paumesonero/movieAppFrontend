import axios from "axios";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Preferences() {
  const { user } = useContext(AuthContext);
  console.log(user);
  const storedToken = localStorage.getItem('authToken');
  const navigate = useNavigate();
  const [genres, setGenres] = useState({
    action: true,
    // drama: user.preferences.drama,
    // fantasy: user.preferences.fantasy,
    // comedy: user.preferences.comedy,
    // mystery: user.preferences.mystery,
    // adventure: user.preferences.adventure,
    // war: user.preferences.war,
    // scify: user.preferences.scify,
    // romance: user.preferences.romance,
    // history: user.preferences.history,
    // documentary: user.preferences.documentary,
    // crime: user.preferences.crime,
  });
  const handleChange = (e) => {
    console.log(e.target.name);
    setGenres(prev => {
      return{
        ...prev,
        [e.target.name]:!e.target.name
      }
    });
  };
  const handleSubmit = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/user/preferences`, genres, { headers: { Authorization: `Bearer ${storedToken}` } });
      toast.success('Your preferences have been udpated.');
      // navigate('/');
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div>
      {user && <div>
        <form onSubmit={handleSubmit} action="">
          <label>Action</label>
          <input type="checkbox" className="checkbox" id="action" name="action" checked={genres.action} onChange={handleChange} />
          <button type="submit">Save preferences</button>
        </form>
      </div>}
      <h1>How do you feel today?</h1>
    </div>
  );
}
