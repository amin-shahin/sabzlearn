import React, { useEffect } from "react";
import { useState } from "react";
import ArticleBox from "../ArticleBox/ArticleBox";
import SectionHeader from "../SectionHeader/SectionHeader";
import "./LastArticles.css";

const LastArticles = () => {

  const [allArticles,setAllArticles] = useState([])
  useEffect(()=>{


    fetch(`http://localhost:4000/v1/articles`).then(res =>res.json())
    .then(results => {
      setAllArticles(results)
      console.log(results);
    })
  },[])
  return (
    <section className="articles">
      <div className="container">
        <SectionHeader title='جدیدترین مقاله ها' subTitle='پیش به سوی ارتقا دانش' btnTitle='تمامی مقاله ها' btnHref='articles/1'/>

        <div className="articles__content">
          
          <div className="row">
            {allArticles.filter(article => article.publish ===1).slice(0,3).map(article =>(
              <ArticleBox {...article}/>
            ))}
          </div>

        </div>
          
      </div>
    </section>
  );
};

export default LastArticles;
