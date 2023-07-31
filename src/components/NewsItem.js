import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        let { title, discription, imageUrl, newsUrl, author, date, source } = this.props
        return (
            <>
                <div className="card">
                    <span className="position-absolute top-0 start-90 translate-middle badge rounded-pill bg-danger" style={{ left: '88%', zIndex: '1' }}>
                        {source}
                    </span>
                    <img src={imageUrl} className="card-img-top" alt="NO IMG" />
                    <div className="card-body">

                        <h5 className="card-title">{title} ...</h5>
                        <p className="card-text">{discription} ...</p>
                        <p className="card-text"><small className="text-body-secondary">By {!author ? 'Unknown' : author} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} target='_blank' rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div >
            </>
        )
    }
}
