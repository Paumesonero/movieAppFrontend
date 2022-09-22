import React from 'react'

export default function Checkbox(props) {
    const {label, genres, handleCheck} = props;
    return (
        <div>
            <label>{label}</label>
            <input type="checkbox" className="checkbox" id={label} name={label} checked={genres.label} onChange={(e) => handleCheck(e)} />
        </div>
    )
}
