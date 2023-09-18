import React, { Component } from 'react'
import NewsItem from './NewsItem';
import { useState } from 'react';
import '../App.css'


export class News extends Component {
    constructor(props){
        super(props);
        console.log("News is created");
        this.state={
            loading:false,
            npage:false,
            category:props.category,
            page:1,
            articles:[],
            total:40,
            pageSize:20,
        }
    }
    static defaultProps = {
        category:"general",
        country:'in',
    }
    next= async ()=>{
        this.setState({loading:true});
        // this.setState({loading:true});
        console.log("Next page");
        // let url=`https://newsapi.org/v2/top-headlines?country=us&category=${this.state.category}&apiKey=628ae1adb7a04bf4ba8064fcc57f0276&page=${this.state.page+1}`
        await this.setState({page:this.state.page + 1})
        console.log(this.state.page);
        // console.log(url);
        // let data=await fetch(url);
        // let parsedData=await data.json();
        // this.setState({articles:parsedData.articles});
        // console.log(this.state.total/this.state.pageSize)
        this.upNews();
        this.state.loading=false;
        this.setState({npage:this.state.page >= this.state.total/ 20});
        console.log("npage", this.state.npage,this.state.page, this.state.total);
    }
    prev= async()=>{
        console.log("Previous page");
        // let url=`https://newsapi.org/v2/top-headlines?country=us&category=${this.state.category}&apiKey=628ae1adb7a04bf4ba8064fcc57f0276&page=${this.state.page-1}`
        await this.setState({page:this.state.page-1})
        // console.log(url);
        // let data=await fetch(url);
        // let parsedData= await data.json();
        // this.setState({articles:parsedData.articles});
        this.upNews();
    }
    upNews= async ()=>{
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dca88d3fda68451e80176f761b88b12b&page=${this.state.page}`;
        // let url="https://newsapi.org/v2/everything?q=tesla&from=2023-08-05&sortBy=publishedAt&apiKey=1a5879e85e9f4d6491e198b3b0e5adf2"
        console.log(url);
        let data =await fetch(url);
        let parsedData= await data.json();
        console.log(parsedData);
        this.setState({articles:parsedData.articles,total:parsedData.totalResults});
        this.setState({loading:false});
    }
    async componentDidMount(){
        console.log(this.state.page);
        this.setState({loading:true});
        this.upNews();
        console.log("page",this.state.total/this.state.pageSize)
        // console.log("true")
        console.log("this.state.total", this.state.total);
    }
    // async componentDidUpdate(){
    //     await this.setState({category:this.props.category});
    //     await this.upNews();
    // }
    render() {
    return (
    <>
    {this.state.loading && <div className='center'><div class="spinner-border load" role="status">
        <span class="visually-hidden">Loading...</span>
        </div></div>
    }
    {!this.state.loading && !this.state.articles.length && <>
        <div className='center'>
            <h3>There are no {this.props.category} news in India for now</h3>
        </div>
        </>
    }
    {!this.state.loading && this.state.articles.length &&  <>
        <img src={ require('../components/bg.png')} className='cover' />
        <button type="button" className="btn btn-primary mx-2 prev" disabled={this.state.page<=1} onClick={this.prev}>&larr;</button>
        <button type="button" className="btn btn-primary mx-2 next" disabled={this.state.npage} onClick={()=>{this.next();}}>&rarr;	</button>
      <div className='d-flex justify-content-center flex-wrap my-5'>
        {this.state.articles.map((element,index)=>{
            return <NewsItem url={element.url} key={index} urlToImage={element.urlToImage} title={element.title} description={element.description} />
        })}
      </div>
      </>
    }
    </>
    )
  }
}

export default News
