import React, { Component } from 'react'

export default function Alerts(props) {
  return ( props.alert && 
    <div>
        <div class={`alert alert-${props.alert.type}`} role="alert">
        {props.alert.message}
        </div>
    </div>
  )
}
    