import React from 'react'

export default function Checkbox(props) {
    const {label, handleCheck, checked} = props;
    return (
        <div>
            <label>{label}</label>
            <input type="checkbox" className="checkbox" id={label} name={label} checked={checked} onChange={(e) => handleCheck(e)} />
        </div>
    )
}
