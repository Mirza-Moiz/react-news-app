import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
    static defaultProps = {
        country: 'us',
        pageSize: 6,
        category: 'general',
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0,
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} | NewsApp`
    }
    async updateNews() {
        this.props.setProgress(15);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e5cd55c1a66b43e1b11cbd8cc115fb99&page=${this.state.page}`
        this.setState(
            { loading: true }
        )
        let data = await fetch(url);
        this.props.setProgress(35);
        let parsedData = await data.json();
        this.props.setProgress(55);
        this.setState(
            {
                articles: parsedData.articles,
                totalResults: parsedData.totalResults,
                loading: false,
            }
        )
        this.props.setProgress(100);
    }
    async componentDidMount() {
        this.updateNews()
    }
    // HandlePreviousClick = async () => {
    //     this.setState({
    //         page: this.state.page - 1,
    //     })
    //     this.updateNews();
    // }

    // HandleNextClick = async () => {
    //     this.setState({
    //         page: this.state.page + 1,
    //     })
    //     this.updateNews();
    // }
    fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e5cd55c1a66b43e1b11cbd8cc115fb99&page=${this.state.page + 1}`
        this.setState({ page: this.state.page + 1 })
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState(
            {
                articles: this.state.articles.concat(parsedData.articles),
                totalResults: parsedData.totalResults,
            }
        )
    }

    render() {
        return (<>
            <h1 className='text-center  margin'>News - Top {this.capitalizeFirstLetter(this.props.category)} News Headlines</h1>
            {this.state.loading && <Spinner />}
            <InfiniteScroll
                dataLength={this.state.articles.length}
                next={this.fetchMoreData}
                hasMore={this.state.articles.length !== this.state.totalResults}
                loader={<Spinner />}>
                <div className='container'>
                    <div className='container row'>
                        {this.state.articles.map((element) => {
                            return <div className='col-md-4' key={element.url}>
                                <NewsItems title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 60) : ""} NewsUrl={element.url} ImageUrl={element.urlToImage} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>

            </InfiniteScroll>
            {/* <div className='container d-flex justify-content-between'>
                <button disabled={this.state.page <= 1} type='button' className="btn btn-dark" onClick={this.HandlePreviousClick} >&larr; Previous</button>
                <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-dark" onClick={this.HandleNextClick}>Next &rarr;</button>
            </div> */}
        </>
        )
    }
}

export default News