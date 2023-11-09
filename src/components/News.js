import React, { useState, useEffect } from 'react';
import NewsItems from './NewsItems';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const updateNews = async () => {
        props.setProgress(15);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e5cd55c1a66b43e1b11cbd8cc115fb99&page=${page}`;

        setLoading(true);

        try {
            const response = await fetch(url);
            props.setProgress(35);
            const parsedData = await response.json();
            props.setProgress(55);

            setArticles(parsedData.articles);
            setTotalResults(parsedData.totalResults);
            setLoading(false);
            props.setProgress(100);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchMoreData = async () => {
        const nextPage = page + 1;
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e5cd55c1a66b43e1b11cbd8cc115fb99&page=${nextPage}`;

        setPage(nextPage);

        try {
            const response = await fetch(url);
            const parsedData = await response.json();

            setArticles([...articles, ...parsedData.articles]);
            setTotalResults(parsedData.totalResults);
        } catch (error) {
            console.error('Error fetching more data:', error);
        }
    };

    useEffect(() => {
        updateNews();
    }, []);

    return (
        <>
            <h1 className='text-center margin'>News - Top {capitalizeFirstLetter(props.category)} News Headlines</h1>
            {loading && <Spinner />}
            {articles.length > 0 && (
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner />}
                >
                    <div className='container'>
                        <div className='container row'>
                            {articles.map((element, index) => (
                                <div className='col-md-4' key={index}>
                                    <NewsItems
                                        title={element.title ? element.title.slice(0, 40) : ''}
                                        description={element.description ? element.description.slice(0, 60) : ''}
                                        NewsUrl={element.url}
                                        ImageUrl={element.urlToImage}
                                        author={element.author}
                                        date={element.publishedAt}
                                        source={element.source.name}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </InfiniteScroll>
            )}
        </>
    );
};

News.defaultProps = {
    country: 'us',
    pageSize: 6,
    category: 'general',
};

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
};

export default News;
