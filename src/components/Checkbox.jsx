import React from 'react'

export default function Checkbox(props) {
    const {label, handleCheck, checked, image} = props;
    return (
        <div>
            <label className="box-border">
                <img onClick={(e) => handleCheck(e)} src={image} alt={`${label}`} className={checked? "w-28 h-28 border-[#65B3AD] box-border my-2 border-4":"my-2 w-28 h-28 box-content"} />
                <input type="checkbox" className={checked? "hidden" : "hidden"} id={label} name={label} checked={checked} onChange={(e) => handleCheck(e)}/>
            </label>
        </div>
    )
}
