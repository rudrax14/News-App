import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
// import newsData from '../SampleOutput.json'
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



    // function
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    //state constructor in class
    constructor(props) {
        super(props);
        this.state = {
            article: [],
            loading: false,
            page: 1
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsApp`;
    }



    //function 
    async updateNews() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=70f010c9ecad4c909cb3c3e6857b589c&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true });
        const data = await fetch(url);
        const parsedData = await data.json();
        this.setState({
            article: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
    }

    // lifecycle
    async componentDidMount() {
        // console.log('cdm')
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=70f010c9ecad4c909cb3c3e6857b589c&pageSize=${this.props.pageSize}`
        // this.setState({ loading: true });
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // this.setState({
        //     article: parsedData.articles,
        //     totalResults: parsedData.totalResults,
        //     loading: false
        // })
        this.updateNews()
    }


    // state onClick function
    handlePreClick = async () => {
        // console.log('pre')
        // console.log(this.state.page - 1)
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=70f010c9ecad4c909cb3c3e6857b589c&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true });
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // this.setState({
        //     page: this.state.page - 1,
        //     article: parsedData.articles,
        //     loading: false
        // })
        await this.setState({ page: this.state.page - 1 })
        this.updateNews()
    }
    // state onClick function
    handleNextClick = async () => {
        // console.log('next')
        // console.log(this.state.page + 1)
        // if (!this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {

        // }
        // else {
        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=70f010c9ecad4c909cb3c3e6857b589c&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        //     this.setState({ loading: true });
        //     let data = await fetch(url);
        //     let parsedData = await data.json();
        //     this.setState({
        //         page: this.state.page + 1,
        //         article: parsedData.articles,
        //         loading: false

        //     })
        // }
        await this.setState({ page: this.state.page + 1 })
        this.updateNews()
    }
    render() {
        return (
            <>
                <div className="container mb-3">
                    <h1 className="text-center my-4">News App - Top {this.capitalizeFirstLetter(this.props.category)} Headline</h1>
                    {this.state.loading && <Spinner />}
                    <div className="row">
                        {this.state.article.map((element) => {
                            return <div className="col-md-4 mb-5" key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 44) : ""} discription={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage ? element.urlToImage : ""} newsUrl={element.url} date={element.publishedAt} author={element.author} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    <div className="container d-flex justify-content-between">
                        <button disabled={this.state.page <= 1} type="button" onClick={this.handlePreClick} className="btn btn-dark">&larr; Previous</button>
                        <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} onClick={this.handleNextClick} className="btn btn-dark">Next &rarr;</button>
                    </div>
                </div>
            </>
        )
    }
}