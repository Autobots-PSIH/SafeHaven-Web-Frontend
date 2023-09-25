import React, { useState, useEffect } from "react";
import axios from "axios";
import '../Stylesheets/News.css';
import newspaper from '../images/newspaper-solid.svg'
const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          "https://api.reliefweb.int/v1/disasters?appname=Shit-disastro&profile=list&preset=latest&slim=1"
        );

        // Extract the list of disasters from the response
        const disasters = response.data.data;

        // Map the disaster data to match the structure of your News component
        const newsArticles = disasters.map((disaster, index) => ({
          title: disaster.fields.name,
          description: disaster.fields.description,
          url: disaster.fields.url,
          // You may need to modify this part based on the actual data structure
          urlToImage: disaster.fields.thumbnail,
        }));

        setNews(newsArticles);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <>
    
    <div className="news-container" >
    <h1 style={{ display:'inline-flex',width:'100%', background:'white'}}><img src={newspaper} style={{height:'16px', margin: '2px'}}></img><b>Disaster News</b></h1>
      <div className="news-cards">
        {news.map((article, index) => (
          <div
            className="news-card"
            key={index}
          >
            {/* <img
              src={article.urlToImage}
              alt={article.title}
              className="news-image"
            /> */}
            <div className="news-content">
              <h4 className="news-title">{article.title}</h4>
              <p className="news-description">{article.description}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="news-link"
              >
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default News;
