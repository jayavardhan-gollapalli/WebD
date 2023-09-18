import React, { useState } from 'react'

export default function TextArea(props){
    const[Text, setText]=useState("");
    const update=(event)=>{
        setText(event.target.value);
    }
    const toUP =()=>{
        let ntext= Text.toUpperCase();
        setText(ntext);
    }
    return(
        <div className="container">
            <input type = "text" rows="8" value={Text} onChange={update} placeholder='Enter Text Here'></input>
            <button onClick={toUP}>Click</button>
        </div>
    )
}