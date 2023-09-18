import React, { useEffect } from 'react';
import { UseSelector, useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { allNotes, allnotes, getNotes } from '../notes/noteSlice'
import NoteItem from './NoteItem'
import { useState } from 'react'
import AddNote from './AddNote';

const Notes = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(allnotes());
    },[dispatch])

    const notes = useSelector((state) => state.notes.notes);
    console.log("notes i notes",notes);
  return (
    <div>
    <AddNote />
    {notes.map((element)=>{
        return <NoteItem title={element.title} description={element.description} key={element._id} ></NoteItem>
    })}
    </div>
  )
}

export default Notes
