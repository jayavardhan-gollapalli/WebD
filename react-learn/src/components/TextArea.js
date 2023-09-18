import React, { useState } from 'react'

export default function TextForm(props){
    const[text,settext]=useState("Click");
    function clicked(){
        let ntext= text.toUpperCase();
        settext(ntext);
    }
    const update=(event)=>{
        settext(event.target.value);
    }
    return(
        <>
        <div className="input-group input-group-sm mb-3">
            {/* <span className="input-group-text" id="inputGroup-sizing-sm">Small</span> */}
            <input type="text" className="form-control" value={text} onChange={update}  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/>
            <button onClick={clicked}>Click</button>
        </div>
        </>
    )
}