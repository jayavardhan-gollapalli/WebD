import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    // let [title,description,urlToImage,url]=this.props;
    return (
      <div>
        <div className="card mx-2 my-2" style={{width: "18rem"}}>
        <img src={this.props.urlToImage} className="card-img-top" alt={this.props.title}/>
        <div className="card-body">
            <h5 className="card-title">{this.props.title}</h5>
            <p className="card-text">{this.props.description}</p>
            <a href={this.props.url} className="btn btn-primary">Read more</a>
        </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
