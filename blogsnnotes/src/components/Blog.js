import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import '../App.css'

const Blog = (props) => {
  let host = "http://localhost:5000";
  const [success, setSuccess] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [note, setNote] = useState(null);
  let {id}= useParams();
  console.log("id----------",id);
  useEffect(()=>{
    console.log("id passed as params",id);
    const thisBlog =async (id) => {
        console.log("getting note")
        let url = `${host}/api/blogs/blog/${id}`;
        console.log(url);
        let data = await fetch(url);
        console.log("data recieved");
        let json = await data.json();
        console.log(json);
        setLoaded(true);
        setSuccess(json.success);
        setNote(json.note);
      };

     thisBlog(id);
  },[])


  return (
    <div className="container">
      {!loaded && (
        <div className="center">
          <div className="spinner-border load" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {loaded && success && (
        <div style={{width:"100%",wordWrap:"normal" }}>
          <h1>{note.title}</h1>
          <p>{note.description}</p>
        </div>
      )}
      {loaded && !success && (
        <div>
          <h1>Some error occured</h1>
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {};

export default Blog;
