import React from 'react'
import PropTypes from 'prop-types'

const NoteItem = (props) => {
  let {title,description}=props;
  return (
<div className="card" style={{width: "18rem"}}>
  {/* <img src="..." className="card-img-top" alt="..."> */}
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
  </div>
</div>
  )
}

NoteItem.propTypes = {

}

export default NoteItem
