import React, {useState, useContext} from 'react'
import { AuthContext } from '../../context/AuthContext';

export default function AllReviews() {
  const {user} = useContext(AuthContext);
  const [genres, setGenres] = useState({
    action:"",
    drama:"",
    fantasy:"",
    comedy:"",
    mystery:"",
    adventure:"",
    war:"",
    scify:"",
    romance:"",
    history:"",
    documentary:"",
    crime:""
  });
  const handleChange = () => {
    
  }
  const handleSubmit = () => {

  };
  return (
    <div>
      <h1>How do you feel today?</h1>
      <form onSubmit={handleSubmit}action="">
        <label>Action</label>
        <input type="checkbox" className="checkbox" id="action" name="action" checked={user.preferences.includes("1")? true : false} onChange={handleChange}/>
      </form>
    </div>
  );
}
