import React from "react";
import './ArticleBox.css'

const ArticleBox = ({articleTitle,partOfContent,cover}) => {
    return ( 
        <div className="col-4">
              <div className="article-card">
                <div className="article-card__header">
                  <a href="#" className="article-card__link-img">
                    <img src={cover} className="article-card__img" alt="Article Cover" />
                  </a>
                </div>
                <div className="article-card__content">
                  <a href="#" className="article-card__link">
                   {articleTitle}
                  </a>
                  <p className="article-card__text">
                    {partOfContent}
                  </p>
                  <a href="#" className="article-card__btn">بیشتر بخوانید</a>
                </div>
              </div>
            </div>
     );
}
 
export default ArticleBox;