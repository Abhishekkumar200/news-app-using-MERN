import React from 'react';

const NewsItem = (props)=>{
        let {title, description, imgUrl, newsUrl, author, date} = props;
        return (
            <div>
                <div className="card my-3">
                    <img src={imgUrl  ? imgUrl:"https://about.fb.com/wp-content/uploads/2023/09/GettyImages-686732223.jpg"} className="card-img-top" alt="img" />
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                            <p className="card-text"><small className="text-body-secondary">Written by {author?author:"Unknown"} on {date ? new Date(date).toGMTString():"Unknown"}</small></p>
                            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-outline-primary">Learn more...</a>
                        </div>
                </div>
            </div>
        )
}

export default NewsItem;