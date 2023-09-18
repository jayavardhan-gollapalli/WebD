import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  let host = "http://localhost:5000";
  let notes = [];
  let [state, setState] = useState(notes);
  const getNotes = async () => {
    //API
    let url = `${host}/api/notes/allnotes`;
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      // body: JSON.stringify({}), // body data type must match "Content-Type" header
    });
    let json = await response.json();
    notes = await json;
    console.log("this is notes", notes);
    setState(notes);
    // parses JSON response into native JavaScript objects
  };

  const addNote = async (title, description, tag) => {
    //API
    let url = `${host}/api/notes/savenote`;
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    try {
      let json = await response.json();
    } catch {
      // parses JSON response into native JavaScript objects
      console.log("note can't be added");
    }

    getNotes();
  };

  const deleteNote = async (id) => {
    //API
    let url = `${host}/api/notes/deleteNote/${id}`;
    const response = await fetch(url, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),// 'Content-Type': 'application/x-www-form-urlencoded',
      },
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({}), // body data type must match "Content-Type" header
    });
    let json = await response; // parses JSON response into native JavaScript objects
    let newNotes = await json;
    console.log("Deleting note", id);
    getNotes();
  };

  const editNote = async (id, title, description, tag) => {
    //API
    let url = `${host}/api/notes/updateNote/${id}`;
    console.log(url);
    const response = await fetch(url, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'), // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    // let json = response.json(); // parses JSON response into native JavaScript objects
    //
    getNotes();
  };

  return (
    <NoteContext.Provider
      value={{ state, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
