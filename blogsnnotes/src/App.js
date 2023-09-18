import './App.css';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import YourBlog from './components/YourBlogs'
import Unpublished from './components/Unpublished'
import Login from './components/Login';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from './features/userSlice';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { logged } from './features/userSlice'; 

function App() {
  const dispatch=useDispatch();
  useEffect(()=>{
    console.log("dispatching get user")
    dispatch( getUser() );
  },[dispatch])
  let  loggedin = useSelector(logged);
  console.log(loggedin);
  return (

<Router>
    <Navbar/>

  <Routes>
    <Route exact path='/' element={<Home/>}></Route>
    <Route exact path='/yourBlogs' element={<YourBlog/>}></Route>
    <Route exact path='/unPublished' element={<Unpublished/>}></Route>
  </Routes>
</Router>
  );
}

export default App;
