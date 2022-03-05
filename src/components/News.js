import React, { useEffect, useState } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


const News = (props) => {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)


    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(70);

        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)

        props.setProgress(100);
    }

    useEffect(() => {
        updateNews();
        // react is asking us to use a dependency but we don't want since we want to use it as componentDidMount
        // in such cases we use the below comment line to ignore such errors

        // eslint-disable-next-line
    }, [])

    const onNext = async () => {

        setPage(page + 1)
        updateNews();
    }
    const onPrevious = async () => {
        setPage(page - 1)
        updateNews();
    }

    const fetchData = async () => {


        // fetching data from next page using our function
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
        setPage(page + 1)

        let data = await fetch(url);
        let parsedData = await data.json();

        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
        setLoading(false)

    };

    return (
        <>
            <div className="container my-3 ">
                <h1 className="text-center my-5" >Top Headlines - {props.category}</h1>

                {/* if loading is true than show spinner */}
                {loading && <Spinner />}

                <InfiniteScroll
                    dataLength={articles.length} //This is important field to render the next data
                    next={fetchData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner />} >
                    <div className="container">
                        <div className="row d-flex justify-content-center ">
                            {!loading && articles.map((element) => {
                                return <div className="col-md-3 mx-3 my-3 " key={element.url}>
                                    <Newsitem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={(element.url).slice(6)} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>


            </div>

        </>
    );

}

News.defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",
    apiKey: "098c2a1f476f4147973886a18a3b1d2f"
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News;

// unused codes that were for the 'next' and 'previous' button

/* 
    <div className="container d-flex justify-content-between">
    <button disabled={page <= 1} type="button" onClick={onPrevious} className="btn btn-dark"> &larr; Previous</button>
    <h4>Page {page}</h4>
    <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" onClick={onNext} className="btn btn-dark">Next &rarr;</button>
    </div> 

*/