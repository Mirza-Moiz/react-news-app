import React from 'react'

const NewsItems = (props) => {

    const divStyle = {
        backgroundColor: '#4F4557',
        border: 'none',
        color: 'white',
    };
    const boxShadow = {
        boxShadow: '0 0 15px rgba(0,0,0,0.5)',
    };

    let { title, description, ImageUrl, NewsUrl, author, date, source } = props;

    return (
        <div className='my-3 news_card' style={boxShadow}>
            <div className="card" style={divStyle}>
                <div style={{ display: 'flex', justifyContent: 'start', position: 'absolute', right: '0' }} >
                    <span className="badge rounded-pill bg-danger">{source}</span>
                </div>
                <img src={!ImageUrl ? "https://techcrunch.com/wp-content/uploads/2022/07/GettyImages-1235254642.jpg?w=600" : ImageUrl} className="card-img-top " alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}... </h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-muted">By {!author ? "unknown" : author} on {new Date(date).toGMTString()}</small></p>
                    <a href={NewsUrl} target="-blank" className="btn btn-dark btn-sm px-4 py-2">Read More</a>
                </div>
            </div>
        </div>
    )
}

export default NewsItems