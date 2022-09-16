import axios from "axios";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Preferences() {
  const { user } = useContext(AuthContext);
  const storedToken = localStorage.getItem('authToken');
  const navigate = useNavigate();
  const [genres, setGenres] = useState({
    action: false,
    drama: false,
    fantasy: false,
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
  useEffect(() => {
    const getPreferences = async () => {
      try {
        const currentUser = await axios.get(`${process.env.REACT_APP_API_URL}/user/loggedInUser`, { headers: { Authorization: `Bearer ${storedToken}` } });
        setGenres({
          action: currentUser.data.data.preferences.includes("1"),
          drama: currentUser.data.data.preferences.includes("12"),
          fantasy: currentUser.data.data.preferences.includes("14"),

        });
      } catch (error) {
        console.log(error);
      }
    };
    getPreferences();
  },[storedToken]);
  const handleCheck = (e) => {
    setGenres(prev => {
      return{
        ...prev,
        [e.target.name]:e.target.checked
      }
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPreferences = [];
    if(genres.action) {
        newPreferences.push("1");
    };
    if(genres.drama) {
        newPreferences.push("12");
    };
    if(genres.fantasy) {
        newPreferences.push("14");
    };
    // if(comedy === true) {
    //     newPreferences.push("8");
    // };
    // if(mystery === true) {
    //     newPreferences.push("22");
    // };
    // if(adventure === true) {
    //     newPreferences.push("3");
    // };
    // if(war === true) {
    //     newPreferences.push("34");
    // };
    // if(scifi === true) {
    //     newPreferences.push("27");
    // };
    // if(romance === true) {
    //     newPreferences.push("26");
    // };
    // if(history === true) {
    //     newPreferences.push("20");
    // };
    // if(documentary === true) {
    //     newPreferences.push("11");
    // };
    // if(crime === true) {
    //     newPreferences.push("10");
    // };
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/user/preferences`, newPreferences, { headers: { Authorization: `Bearer ${storedToken}` } });
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
          <input type="checkbox" className="checkbox" id="action" name="action" checked={genres.action} onChange={(e) => handleCheck(e)} />
          <label>Drama</label>
          <input type="checkbox" className="checkbox" id="drama" name="drama" checked={genres.drama} onChange={(e) => handleCheck(e)} />
          <label>Fantasy</label>
          <input type="checkbox" className="checkbox" id="fantasy" name="fantasy" checked={genres.fantasy} onChange={(e) => handleCheck(e)} />
          <button type="submit">Save preferences</button>
        </form>
      </div>}
      <h1>How do you feel today?</h1>
    </div>
  );
}
