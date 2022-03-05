import React from 'react'
import { Link } from 'react-router-dom'

const Newsitem = (props) => {

    let { title, description, imageUrl, newsUrl, author, date, source } = props

    return (
        <>


            <div className="card">

                <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>
                    <span className="badge rounded-pill bg-danger">
                        {source}
                    </span>
                </div>

                <img src={!imageUrl ? "https://image.shutterstock.com/image-vector/breaking-news-background-world-global-260nw-719766118.jpg" : imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on {new Date(date).toDateString().slice(4)}</small></p>
                    <Link to={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-success">Read More</Link>
                </div>
                {/* target="_blank" to open at new tab*/}
            </div>


        </>
    )

}


export default Newsitem