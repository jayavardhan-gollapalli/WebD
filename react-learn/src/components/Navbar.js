import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import About from './About'
import Home from './Home';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import PC from './PC';

export default function Navbar(props){
  return (
    <>
    <nav class="container">
      <span class="container mx-1"><Link to="/">Home</Link></span>
      <span class="container mx-1"><Link to="/about">About</Link></span>
      <span class="container mx-1"><Link to="/pc">PC</Link></span>
    </nav>

    </>
    )
}
Navbar.propTypes={
    title: PropTypes.string.isRequired,
    about: PropTypes.string.isRequired
}
Navbar.defaultProps={
    title: "default title",
    about: "default about"
}