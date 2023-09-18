import './App.css';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom'; //import these wherever you want to use the Link tag
import Navbar from './components/Navbar';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Notes from './components/Notes';
import Login from './components/Login';

function App() {
  return (
  <NoteState>
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route exact path="/"/>
        <Route exact path="/about" element={<About/>}/>
        <Route exact path="/notes" element={<Notes/>}/>
        <Route exact path="/"/>
        <Route exact path='/login' element={<Login/>}/>
      </Routes>
    </Router>
  </NoteState>
  );
}

export default App;
