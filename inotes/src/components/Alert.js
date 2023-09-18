import React, { useState } from 'react'
import { ReactPropTypes } from 'react';

function Alert(props) {
    let warn=props.alert;
    let [alert, setAlert]=useState(warn);
    let up =()=>{setTimeout(() => {
        setAlert(null);
    }, 2000);}

    up();
  return (
    alert && <div className="alert alert-warning disable" role="alert"> {alert} </div>
  )
}

Alert.defaultProps={
    alert:null
}

export default Alert
