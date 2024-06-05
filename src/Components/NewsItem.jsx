import React from "react"
import image from '../assets/News.png'

const NewsItem = ({title,description,src,url}) => {
  return (
    <div className="card mb-3 bg-dark text-light d-inline-block my-3 mx-3 px-2 py-2 " style={{maxWidth:"345px"}}>
      <img src={src?src:image} style={{height:"200px", width:"327px"}} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{title.slice(0,50)}</h5>
        <p className="card-text">{description?description.slice(0,60):"This is a current event. Not much info about this incident is out."}</p>
        <a href={url} className="btn btn-primary">Read more</a>
      </div>
    </div>
  )
}

export default NewsItem