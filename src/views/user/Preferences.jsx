import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Preferences() {
  const { user } = useContext(AuthContext);
  const [genres, setGenres] = useState({
    action: user.preferences.action,
    drama: user.preferences.drama,
    fantasy: user.preferences.fantasy,
    comedy: user.preferences.comedy,
    mystery: user.preferences.mystery,
    adventure: user.preferences.adventure,
    war: user.preferences.war,
    scify: user.preferences.scify,
    romance: user.preferences.romance,
    history: user.preferences.history,
    documentary: user.preferences.documentary,
    crime: user.preferences.crime,
  });
  const handleChange = (e) => {
    setGenres(prev => {
      return{
        ...prev,
        [e.target.name]:!e.target.name
      }
    });
  };
  const handleSubmit = () => {

  };
  return (
    <div>
      <h1>How do you feel today?</h1>
      <form onSubmit={handleSubmit} action="">
        <label>Action</label>
        <input type="checkbox" className="checkbox" id="action" name="action" checked={user.preferences.action} onChange={handleChange} />
        <button type="submit">Save preferences</button>
      </form>
    </div>
  );
}
