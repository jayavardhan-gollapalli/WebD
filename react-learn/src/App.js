import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import TextArea from './components/TextArea';
import AtextA from './components/test'
import DarkLight from './components/DarkLight';
import Alerts from './components/Alerts';
import { useState } from 'react';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import PC from './components/PC';
import About from './components/About';

function App() {
  return (
    <>
    <Router>
      
      <Routes>
        {/* <Route exact path='/' element={<Home/>}></Route> */}
        {/* <Route exact path='/about' element={<About/>}></Route> */}
        <Route exact path='/pc' element={<PC/>}></Route>
      </Routes>
      <Navbar></Navbar>
      <Routes>
        <Route exact path='/' element={<Home/>}></Route>
        <Route exact path='/about' element={<About/>}></Route>
        {/* <Route exact path='/pc' element={<PC/>}></Route> */}
      </Routes>
    </Router>
    </>
  );
}

export default App;