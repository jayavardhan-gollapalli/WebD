import React, { Component } from 'react'

export class Item extends Component {
    render() {
        let {title,description,url,urli}=this.props;

        return (
            <div className="card mx-2 my-2" style={{width: "18rem"}}>
            <img src={urli} className="card-img-top" alt={title}/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <a href={url} className="btn btn-primary">Read more</a>
            </div>
            </div>
        )
  }
}

export default Item
