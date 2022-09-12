import React from 'react'
import { useLocation } from 'react-router-dom'

export default function EditMovie() {
    const location = useLocation();
    const {myState, myMovie} = location.state;
    const movie = myMovie.movie;
    const storedToken = localStorage.getItem('authToken');
    const handleEditSubmit = () => {

    }
    const handleCreateSubmit = () => {

    }
    return (
        <div>
            {movie && <div>
                {myState === "edit" && <h1>Edit movie</h1>}
            {myState === "create" && <h1>New movie</h1>}
            <form onSubmit={myState === "edit"? handleEditSubmit : handleCreateSubmit}>
                <label>Title</label>
                <input type="text" name="name" defaultValue={movie.name}/>
                <label>Title</label>
                <input type="text" name="name" defaultValue={movie.name}/>
            </form>
            </div>}
        </div>
    )
};
