import React, { Component } from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom'; //import these wherever you want to use the Link tag
import Group from './components/Group';
export class App extends Component {
  render() {
    return (
      <Router>
      <div>
        <Navbar/>
      </div>
      <Routes>
        <Route exact key="1" path="/all" element={<Group category="everything" pageSize='20' />}></Route>
        <Route exact key="2" path="/business" element={<Group category="business" pageSize='20' />}></Route>
        <Route exact key="3" path="/tech" element={<Group category="technolgy" pageSize="20" />}></Route>
        <Route exact key="4" path="/sports" element={<Group category="sports" pageSize="20" />}></Route>
        <Route exact key="5" path="/space" element={<Group category="space" pageSize="20" />}></Route>
      </Routes>
      </Router>
    )
  }
}

export default App
