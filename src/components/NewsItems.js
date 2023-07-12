import React from 'react'

const NewsItems=(props)=> {


        let { title, description, ImageUrl, NewsUrl, author, date, source } = props;

        return (
                <div className='my-3'>
                    <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'start', position: 'absolute', right: '0'} } >
                            <span className="badge rounded-pill bg-danger">{source}</span>
                        </div>
                    <img src={!ImageUrl ? "https://techcrunch.com/wp-content/uploads/2022/07/GettyImages-1235254642.jpg?w=600" : ImageUrl} className="card-img-top " alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}... </h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">By {!author ? "unknown" : author} on {new Date(date).toGMTString()}</small></p>
                        <a href={NewsUrl} target="-blank" className="btn btn-dark btn-sm">Read More</a>
                    </div>
                </div>
            </div>
        )
}

export default NewsItems