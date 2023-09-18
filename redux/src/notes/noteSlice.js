import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit';

const initialState ={
    notes:[],
}
let host = "http://localhost:5000";
const authtoken = localStorage.getItem('token');
export const addNote = createAsyncThunk(
    "noteSlice/addNote",
    async (note) => {
        let {title,description, tag}=note;
        let url = `${host}/api/notes/savenote`;
        const res = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
            "auth-token":authtoken,
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
        });
      const data = await res.json();
      console.log(data);
      return data;
    }
);
export const allnotes = createAsyncThunk(
    "noteSlice/allnotes",
    async () => {
        let url = `${host}/api/notes/allnotes`;
        const res = await fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
            "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmOGU4YjlhZWIyZWY5NzMxZGVjZDBlIn0sImlhdCI6MTY5NDAzNDEyM30.Ouu9CSBJB8CQu_yLhAw6U-kNNx2py12G4rshSifjNRU",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        // body: JSON.stringify({}), // body data type must match "Content-Type" header
        });
      const data = await res.json();
      console.log(data);
      return data;
    }
);
  


const noteSlice=createSlice({
    name:'notes',
    initialState,
    reducers:{
        getNotes: (state,{payload})=>{
            
            state.notes=payload;
            // console.log("this is notes", notes);
            // setState(notes);
              // parses JSON response into native JavaScript objects
        },
        
    },
    extraReducers: {
        [allnotes.pending]:()=>{
            console.log("Pending")
        },
        [allnotes.fulfilled]:(state,{payload})=>{
            console.log("Fetched Successfully")
                return{...state ,notes:payload};
        },
        [addNote.fulfilled]:(state,{payload})=>{
            return{...state,notes:state.notes.concat(payload)};
        }
    }
})

export const getallnotes=(state)=>state.notes;
export const { getNotes, deleteNote, editNote } = noteSlice.actions;
export default noteSlice.reducer;