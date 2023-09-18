import React from 'react'
import { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'

const NoteItem = (props) => {
    let {deleteNote, editNote}=useContext(NoteContext);
    let note=props.note;
    let {updateNote,handleShow}= props;
    // console.log(note);
    return (
  <>
    <div className="card w-25 mb-3 mx-3 my-3">
    <div className="card-body d-flex flex-wrap">
        <h5 className="card-title mx-3 my-3">{note.title}</h5>
        <i className="fa-solid fa-pen-to-square mx-3 my-3" onClick={()=>{props.openModal(note)}}></i>
        <i className="fa-regular fa-trash-can mx-3 my-3" onClick={()=>{deleteNote(note._id)}}></i>
        <h6 className="card-title mx-3 my-3">{note.tag}</h6>
        <p className="card-text mx-3 my-3">{note.description}</p>
        <a href="/" className="btn btn-primary mx-3 my-3">Read more..</a>
    </div>
    </div>
    </>
  )
}

export default NoteItem
