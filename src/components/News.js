import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
export default class NewsComp extends Component {
    // default props
    static defaultProps = {
        country: 'in',
        pageSize: '3',
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.string,
        category: PropTypes.string
    }



    // function for capitalize 1 L
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    //state constructor in class
    constructor(props) {
        super(props);
        this.state = {
            article: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsApp`;
        this.timeout = null;
    }

    // lifecycle
    async componentDidMount() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        let data = await fetch(url);
        this.props.setProgress(50);
        let parsedData = await data.json();
        this.props.setProgress(80);
        this.setState({
            article: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
        this.props.setProgress(100);
    }
    // function for infinity loop
    fetchMoreData = async () => {
        setTimeout(async () => {
            this.setState({ page: this.state.page + 1 })
            const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                article: this.state.article.concat(parsedData.articles),
                totalResults: parsedData.totalResults
            })
        }, 1000);
    };
    render() {
        return (
            <>
                <h1 className="text-center my-4">News App - Top {this.capitalizeFirstLetter(this.props.category)} Headline</h1>
                {this.state.loading && <Spinner />}
                {/* infinity scroll */}
                <InfiniteScroll
                    dataLength={this.state.article.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.article.length < this.state.totalResults}
                    loader={<Spinner />}
                >
                    {/* main container of news */}
                    <div className="container mb-3 mt-3">
                        <div className="row">
                            {this.state.article.map((element) => {
                                return <div className="col-md-4 mb-5" key={element.url}>
                                    <NewsItem title={element.title ? element.title.slice(0, 44) : ""} discription={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage ? element.urlToImage : ""} newsUrl={element.url} date={element.publishedAt} author={element.author} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div >
                </InfiniteScroll>
            </>
        )
    }
}