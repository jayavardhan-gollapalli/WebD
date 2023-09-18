import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const Notes=()=>{
  // console.log(notes);
  const [show, setShow] = useState(false);
  
  const[curNote,setCurNote]=useState({title:"",description:"",tag:""});
  const handleClose =() =>{setShow(false);}
  const handleShow =() =>{setShow(true);}
  const updateNote=()=>{
    ref.current.click();
  }

  const open=(note)=>{
    setCurNote(note);
    ref.current.click();
  }
  let { addNote, deleteNote, editNote, getNotes } = useContext(NoteContext);
  let [note, setNote] = useState({
    title: "",
    description: "",
    tag: "default",
  });
  let { state } = useContext(NoteContext);

  let change = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  let upChange = (e) => {
    setCurNote({ ...curNote, [e.target.name]: e.target.value });
  };
  let add = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
  };
  const ref=useRef(null);
  useEffect(() => {
    console.log(localStorage.getItem('token'));
    getNotes();
  }, []);
  
  return (
  <>
    <>
      <Button variant="primary" onClick={handleShow} ref={ref}>
        Click here
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{curNote.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tag</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                name='tag'
                value={curNote.tag}
                onChange={upChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3}
                type="text"
                autoFocus
                name='description'
                value={curNote.description}
                onChange={upChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{handleClose(); editNote(curNote._id,curNote.title ,curNote.description,curNote.tag)}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
      <form className="container">
        <div className="mb-3 mx-3 my-2 ">
          <label htmlFor="tag" className="form-label">
            Title
          </label>
          <input
            type="text"
            name="title"
            onChange={change}
            className="form-control"
            id="title"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3 mx-3 my-2 ">
          <label htmlFor="tag" className="form-label">
            Title
          </label>
          <input
            type="text"
            name="tag"
            onChange={change}
            className="form-control"
            id="tag"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            name="description"
            onChange={change}
            className="form-control"
            id="description"
          />
        </div>
        <button type="submit" onClick={add} className="btn btn-primary">
          Submit
        </button>
      </form>
      <div className="d-flex flex-wrap">
        {state.map((element, index) => {
          return <NoteItem note={element} handleShow={handleShow} openModal={open} key={index} />;
        })}
      </div>
  </>
  );
}

export default Notes;