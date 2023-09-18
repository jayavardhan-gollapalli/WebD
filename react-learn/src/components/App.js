// import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import TextArea from './components/TextArea';
import AtextA from './components/test'
import DarkLight from './components/DarkLight';
import Alerts from './components/Alerts';
import { useState } from 'react';


function App() {
  const[mode, setmode]=useState("light");
  const theme=()=>{
    if(mode==="light"){
      setmode("dark");
      showAlert("Darkmode is enabled","success");
    }
    else{
      setmode("light");
      showAlert("Dark mode is disabled", "danger");
      setTimeout(()=>{setAlert(null)}, 1000)
    }
  }
  
  const[alert,setAlert]=useState(null)
  function showAlert(message,type){
    setAlert({message:message, type:type});
    setTimeout(()=>{setAlert(null)}, 1000)
  }

  return (
    <>
    <Navbar mode={mode}/>
    <Alerts alert={alert} />
    <Navbar about="about field"></Navbar>
    <TextArea></TextArea>
    <TextArea></TextArea>
    <AtextA></AtextA>
    <DarkLight></DarkLight>
    <div className="form-check form-switch">
    <input className="form-check-input" type="checkbox" role="switch" onClick={theme} id="flexSwitchCheckDefault"/>
    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">{mode}</label>
    </div>
    </>
  );
}

export default App;
