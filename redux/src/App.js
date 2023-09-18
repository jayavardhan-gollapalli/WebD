import { useSelector, useDispatch } from 'react-redux'
import './App.css';
import { getNotes } from './notes/noteSlice';
import { useEffect } from 'react';
import { allnotes } from './notes/noteSlice';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Notes from './components/Notes';

function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    localStorage.setItem('token',"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmOGU4YjlhZWIyZWY5NzMxZGVjZDBlIn0sImlhdCI6MTY5NDAzNDEyM30.Ouu9CSBJB8CQu_yLhAw6U-kNNx2py12G4rshSifjNRU")
  })

  return (
<div className='container'>
<Router>
  <Navbar/>
  <Routes>
    <Route path='/notes' exact element= {<Notes/>} />
  </Routes>
</Router>
</div>
  );
}

export default App;
