import axios from "axios";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Checkbox from "../../components/Checkbox";
import actionImg from "../../images/action.webp";
import dramaImg from "../../images/drama.jpeg";
import fantasyImg from "../../images/fantasy.jpeg";
import comedyImg from "../../images/comedy.jpeg";
import mysteryImg from "../../images/mystery.webp";
import adventureImg from "../../images/adventure.webp";
import warImg from "../../images/war.jpeg";
import scifyImg from "../../images/scifi.jpeg";
import romanceImg from "../../images/romance.jpeg";
import historyImg from "../../images/history.jpeg";
import documentaryImg from "../../images/documentary.jpeg";
import crimeImg from "../../images/crime.jpeg";

export default function Preferences() {
  const { user } = useContext(AuthContext);
  const storedToken = localStorage.getItem('authToken');
  const navigate = useNavigate();
  const [genres, setGenres] = useState({
    action: false,
    drama: false,
    fantasy: false,
    comedy: false,
    mystery: false,
    adventure: false,
    war: false,
    scify: false,
    romance: false,
    history: false,
    documentary: false,
    crime: false
  });
  // Gets the current user and checks its preferences, preferences are declared through a number in db
  useEffect(() => {
    const getPreferences = async () => {
      try {
        const currentUser = await axios.get(`${process.env.REACT_APP_API_URL}/user/loggedInUser`, { headers: { Authorization: `Bearer ${storedToken}` } });
        setGenres({
          action: currentUser.data.data.preferences.includes("1"),
          drama: currentUser.data.data.preferences.includes("12"),
          fantasy: currentUser.data.data.preferences.includes("14"),
          comedy: currentUser.data.data.preferences.includes("8"),
          mystery: currentUser.data.data.preferences.includes("22"),
          adventure: currentUser.data.data.preferences.includes("3"),
          war: currentUser.data.data.preferences.includes("34"),
          scify: currentUser.data.data.preferences.includes("27"),
          romance: currentUser.data.data.preferences.includes("26"),
          history: currentUser.data.data.preferences.includes("20"),
          documentary: currentUser.data.data.preferences.includes("11"),
          crime: currentUser.data.data.preferences.includes("10"),
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
    if(genres.comedy) {
        newPreferences.push("8");
    };
    if(genres.mystery) {
        newPreferences.push("22");
    };
    if(genres.adventure) {
        newPreferences.push("3");
    };
    if(genres.war) {
        newPreferences.push("34");
    };
    if(genres.scify) {
        newPreferences.push("27");
    };
    if(genres.romance) {
        newPreferences.push("26");
    };
    if(genres.history) {
        newPreferences.push("20");
    };
    if(genres.documentary) {
        newPreferences.push("11");
    };
    if(genres.crime) {
        newPreferences.push("10");
    };
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/user/preferences`, {newPreferences}, { headers: { Authorization: `Bearer ${storedToken}` } });
      toast.success('Your preferences have been udpated.');
      navigate('/');
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div className="min-h-screen">
      <h1 className='mb-4 text-2xl font-bold ml-10 pt-10'>How do you <span className='text-[#65B3AD]'>feel</span> today?</h1>
      {user && <div>
        <form onSubmit={handleSubmit} className="flex flex-wrap justify-evenly">
          <Checkbox image={actionImg} checked={genres.action} label="action" genres={genres} handleCheck={handleCheck} />
          <Checkbox image={dramaImg} checked={genres.drama} label="drama" genres={genres} handleCheck={handleCheck} />
          <Checkbox image={fantasyImg} checked={genres.fantasy} label="fantasy" genres={genres} handleCheck={handleCheck} />
          <Checkbox image={comedyImg} checked={genres.comedy} label="comedy" genres={genres.comedy} handleCheck={handleCheck} />
          <Checkbox image={mysteryImg} checked={genres.mystery} label="mystery" genres={genres} handleCheck={handleCheck} />
          <Checkbox image={adventureImg} checked={genres.adventure} label="adventure" genres={genres} handleCheck={handleCheck} />
          <Checkbox image={warImg} checked={genres.war} label="war" genres={genres} handleCheck={handleCheck} />
          <Checkbox image={scifyImg} checked={genres.scify} label="scify" genres={genres} handleCheck={handleCheck} />
          <Checkbox image={romanceImg} checked={genres.romance} label="romance" genres={genres} handleCheck={handleCheck} />
          <Checkbox image={historyImg} checked={genres.history} label="history" genres={genres} handleCheck={handleCheck} />
          <Checkbox image={documentaryImg} checked={genres.documentary} label="documentary" genres={genres} handleCheck={handleCheck} />
          <Checkbox image={crimeImg} checked={genres.crime} label="crime" genres={genres} handleCheck={handleCheck} />
          <div className="flex justify-center">
            <button type="submit" className="mb-36 mt-8 flex-shrink-0 bg-[#65B3AD] hover:bg-teal-700 border-[#65B3AD] hover:border-teal-700 text-xl border-4 text-white py-1 px-2 rounded w-28">Save</button>
          </div>
        </form>
      </div>}
    </div>
  );
}
