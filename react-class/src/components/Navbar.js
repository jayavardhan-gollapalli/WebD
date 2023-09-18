import React, { Component } from 'react'
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom'; //import these wherever you want to use the Link tag

export class Navbar extends Component {
    render() {
    return (

      <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary ">
        <div className="container-fluid ">
            <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarNav">
                <ul className="navbar-nav align-items-center">
                    <li className="nav-item">
                        <Link className="nav-link active"  aria-current="page" to='/'><h6>All</h6></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active"  aria-current="page" to='/space'><h6>Space</h6></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active"  aria-current="page" to='/sports'><h6>Sports</h6></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active"  aria-current="page" to='/tech'><h6>Tech</h6></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active"  aria-current="page" to='/business'><h6>Business</h6></Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    </div>
    )
  }
}

export default Navbar
