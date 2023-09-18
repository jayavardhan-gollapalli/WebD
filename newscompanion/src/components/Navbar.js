import React, { Component } from 'react'
import News from './News'
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom'; //import these wherever you want to use the Link tag
import '../App.css'

export class Navbar extends Component {
  render() {
    return (
    <Router>
    <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                {/* <Link className="button" to="/">NewsCompanion</Link> */}
                <li className="btn heading my-2">
                <Link className="nav-link active" aria-current="page" to="/sports">NewsCompanion</Link>
                </li>
                <li className="button">
                <Link className="nav-link active" aria-current="page" to="/sports">Sports</Link>
                </li>
                <li className="button">
                <Link className="nav-link active" aria-current="page" to="/business">Business</Link>
                </li>
                <li className="button">
                <Link className="nav-link active" aria-current="page" to="/space">Space</Link>
                </li>
                <li className="button">
                <Link className="nav-link active" aria-current="page" to="/stocks">Stocks</Link>
                </li>
            </ul>
            </div>
        </div>
    </nav>
    {/* <News category="business"></News> */}
    <div>
        <Routes>
            <Route exact path="/" element={<News  />}></Route>
            <Route exact path="/sports" element={<News category="sports" key='1'/>}></Route>
            <Route exact path="/stocks" element={<News  category="stocks" key='2' />}></Route>
            <Route exact path="/business" element={<News category="business" key='3' />}></Route>
            <Route exact path="/space" element={<News category="space" key='4'/>}></Route>
        </Routes>
    </div>
    </Router>
    )
  }
}

export default Navbar