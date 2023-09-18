import React, { Component } from 'react'
import Item from './Item';

export class Group extends Component {
    // articles=[];
    constructor(props){
        super(props);
        this.state={
          page:1,
          pageSize:20,
          total:60,
          articles:[],
          category:props.category
        }
        console.log(`Group is created of ${this.state.category}`)
    }
    ppage(){
      console.log("Hello");
      return "hello";
    }
    npage(){
      // this.setState({page:this.state.page-1});
      // this.upNews();
      console.log("Hello");
      return "Hello";
    }
    async upNews(){
        // this.setState({category:this.props.category});
        // let url=`https://newsapi.org/v2/everything?q=${this.state.category==''?"everything":this.state.category}&from=2023-09-03&to=2023-09-01&sortBy=popularity&apiKey=ec3891a4d81045ba8fd5f0b5250ba992&pageSize=${this.state.pageSize}&page=${this.state.page}`;
        let url=`https://newsapi.org/v2/everything?q=${this.state.category}&from=2023-08-05&sortBy=publishedAt&apiKey=628ae1adb7a04bf4ba8064fcc57f0276`;
        console.log(url);
        let data=await fetch(url);
        let parsedData=await data.json();
        // console.log(parsedData.articles);
        this.setState({articles:parsedData.articles,total:parsedData.totalResults});
        // console.log("up",this.state.articles)
    }
    async componentDidMount(){
        console.log("cdm");
        this.upNews();
    }
    render() {
    return (
      <>
      <div>
        <div className='d-flex justify-content-center flex-wrap'>
        {/* <Item title="Hello" url="https://www.google.com" urli="https://www.sammobile.com/wp-content/uploads/2023/09/Intel-Foundry-18A-Semiconductor-Chips-720x405.jpg" description="helaljfdljaljfjhahjfa;"></Item> */}
        { 
          this.state.articles.map((element,index)=>{
            // console.log(element.title,element.url,element.urlToImage,element.content);
            return <Item title={element.title} url={element.url} urli={element.urlToImage} description={element.content}></Item>
          })
        }
        </div>
        <button type="button" className="btn btn-primary">Prev</button>
        <button type="button" className="btn btn-primary">Next</button>
      </div>
      </>
    )
  }
}

export default Group
