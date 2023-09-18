import React, { Component, useEffect } from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/NoteContext'

const About=()=>{
    let a= useContext(noteContext);
    // console.log(a);

    return (
      <div>
        <p>
          The name is {a.state.name} and the class is {a.state.class}
        </p>
        <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit veritatis a nostrum omnis sed beatae soluta et suscipit quas repellendus voluptatem quasi alias dicta doloremque, earum similique in sit? Assumenda?z
        </p>
      </div>
    )
  }

export default About
