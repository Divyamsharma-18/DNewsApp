import React, { useEffect, useState } from "react"
import NewsItem from "./NewsItem";

const Newsboard = ({category}) => {

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${import.meta.env.VITE_API_KEY}`;
        let response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      }
    };
    fetchData();
  }, [category]);

  return (
    <div >
      <h2 className="text-center mt-3">Latest <span className="badge bg-danger">News</span></h2>
      {articles.map((news, index) => (
        <NewsItem key={index} title={news.title} description={news.description} src={news.urlToImage} url={news.url} />
      ))}
    </div>
  )
}

export default Newsboard;
