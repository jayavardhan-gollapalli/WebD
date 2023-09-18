import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  let [credentials, setCredentials] = useState({ email: "", password: "" });
  let [auth,setAuth]=useState(false);
  let suc=true;
    const navigate=useNavigate();
  const pass = async (e) => {
    console.log("Passing function");
    e.preventDefault();
    let host = "http://localhost:5000";
    let url = `${host}/api/auth/login`;
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email: credentials.email,password: credentials.password}), // body data type must match "Content-Type" header
    });
    let json = await response.json();
    if(json.success){
        localStorage.setItem('token',json.authtoken);
        console.log(localStorage.getItem('token'));
        setAuth(true);
        // navigate('/');
    }else{
        alert("Invalid cred");
    }
    console.log(json,suc);
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  useEffect(()=>{
    localStorage.removeItem('token');
  },[])
  return (
<>
    <form className="container">
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input
          type="email"
          className="form-control"
          value={credentials.email}
          name='email'
          onChange={onChange}
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
        />
        <small id="emailHelp" className="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input
          type="password"
          className="form-control"
          name='password'
          value={credentials.password}
          onChange={onChange}
          id="exampleInputPassword1"
          placeholder="Password"
        />
      </div>
      <button type="submit" className="btn btn-primary" onClick={pass}>
        Submit
      </button>
    </form>
    {auth?<div>Logged in</div>:<div>please login</div>}
</>
  );
};

export default Login;
