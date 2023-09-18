import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNote } from "../notes/noteSlice";

const AddNote = () => {
    const [note,setNote]=useState({title:"",description:"",tag:""});
    const dispatch=useDispatch();
    const change=(e)=>{
        setNote({...note, [e.target.id]:e.target.value})
    }

    const submit=()=>{
        console.log("Dispatching addnote")
        dispatch(addNote(note));
    }

    return (
    <div>
      <div class="mb-3">
        <label htmlFor="title" class="form-label">
          Title
        </label>
        <input
          type="text"
          class="form-control"
          id="title"
          placeholder="Enter your Title"
          value={note.title}
          onChange={change}
        />
        <label htmlFor="tag" class="form-label">
          Tag
        </label>
        <input
          type="text"
          class="form-control"
          id="tag"
          placeholder="Enter your tag"
          value={note.id}
          onChange={change}
        />
      </div>
      <div class="mb-3">
        <label htmlFor="description" class="form-label">
          Description
        </label>
        <textarea
          class="form-control"
          id="description"
          rows="3"
          value={note.description}
          onChange={change}
        ></textarea>
        <button type="submit" class="btn btn-primary" onClick={submit} >Submit</button>
      </div>
    </div>
  );
};

export default AddNote;
