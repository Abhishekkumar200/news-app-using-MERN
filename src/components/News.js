import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';


const News = (props)=>{

   const [articles, setArticles] = useState([]);
   const [loading, setLoading] = useState(true);
   const [page, setPage] = useState(1);
   const [totalResults, setTotalResults] = useState(0);

    const newsUpdate = async() =>{
        props.setProgress(0);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        props.setProgress(30);
        setLoading(true);
        let result = await fetch(url);
        props.setProgress(60);
        let parsedData = await result.json();
        props.setProgress(90);

        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);

        props.setProgress(100);
    }

    useEffect(()=>{
        newsUpdate();
    },[]);
    
    // handlePrevClick = async ()=>{
    //     // console.log("Previous button clicked.");
    //     // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=eced5a4e7b2049b8bd1b7725ab4d72e8&page=${this.state.page-1}&pageSize=${props.pageSize}`;
    //     // this.setState({loading: true});
    //     // let result = await fetch(url);
    //     // let parsedData = await result.json();
    //     // this.setState({
    //     //     page: this.state.page-1,
    //     //     articles: parsedData.articles,
    //     //     loading: false
    //     // })
    //     await this.setState({page: this.state.page-1});
    //     this.newsUpdate();
    // }

    // handleNextClick = async ()=>{
    //     // console.log("Next button clicked.");
    //     if(this.state.page+1 <= Math.ceil(this.state.totalResults/(props.pageSize)))
    //     {

    //         // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=eced5a4e7b2049b8bd1b7725ab4d72e8&page=${this.state.page+1}&pageSize=${props.pageSize}`;
    //         // this.setState({loading: true});
    //         // let result = await fetch(url);
    //         // let parsedData = await result.json();
    //         // this.setState({
    //         //     page: this.state.page+1,
    //         //     articles: parsedData.articles,
    //         //     loading: false
    //         // })
    //     }
    //     await this.setState({page: this.state.page+1});
    //     this.newsUpdate();
    // }

    const fetchMoreData = async () => {
      
        
        setTimeout(async ()=>{
            // console.log(`Fetch more 1, page- ${this.state.page}`);
            // console.log(`Fetch more 2, page- ${this.state.page}`);
            let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
            setPage(page+1);
            let result = await fetch(url);
            let parsedData = await result.json();
            setArticles(articles.concat(parsedData.articles));
            setTotalResults(parsedData.totalResults);    

        }, 500);
        
    };

        return (
            <>
                <h2 className='text-center'>News App - Top {props.category} hedlines</h2>
                {loading && articles.length <=  totalResults && <Spinner />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length <  totalResults}
                    loader={<Spinner />} style={{overflow: 'hidden'}}
                    >
                        <div className='container'>
                        <div className='row'>
                            {articles.map((element, index) => {
                                return (<div className='col-md-4' key={index} >
                                    <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                                </div>
    )})}
                        </div>
                        </div>
                </InfiniteScroll>
            </>
        )
};

News.defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News;