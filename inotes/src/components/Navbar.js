import React, { Component, useEffect } from 'react'
import { BrowserRouter as Router,Routes, Route, Link, useLocation } from 'react-router-dom';
import Alert from './Alert';

let Navbar=()=>{
    let location=useLocation();
    useEffect(()=>{
      // console.log(location);
    },[location])
    return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">iNotes</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className={`nav-link ${location.pathname==='/'?"active":" "}`} aria-current="page" to="/">Home</Link>
              <Link className={`nav-link ${location.pathname==='/about'?"active":" "}`} aria-current="page" to="/about">About</Link>
              <Link className={`nav-link ${location.pathname==='/notes'?"active":" "}`} aria-current="page" to="/notes">Notes</Link>
              <Link className={`nav-link ${location.pathname==='/notes'?"active":" "}`} aria-current="page" to="/login">Login</Link>
              {/* <Link className="nav-link active" aria-current="page" to="/">Home</Link> */}
            </div>
          </div>
        </div>
      </nav>
      <Alert/>
    </>
    )
  }

export default Navbar
