import React from "react";
import { Link } from "react-router-dom";
import './ArticleBox.css'

const ArticleBox = ({title,shortName,cover,description}) => {
    return ( 
        <div className="col-4">
              <div className="article-card">
                <div className="article-card__header">
                  <Link to={`/article-info/${shortName}`} className="article-card__link-img">
                    <img src={`/images/blog/${cover}`} className="article-card__img" alt="Article Cover" />
                  </Link>
                </div>
                <div className="article-card__content">
                  <Link to={`/article-info/${shortName}`} className="article-card__link">
                   {title}
                  </Link>
                  <p className="article-card__text">
                    {description}
                  </p>
                  <Link to={`/article-info/${shortName}`} className="article-card__btn">بیشتر بخوانید</Link>
                </div>
              </div>
            </div>
     );
}
 
export default ArticleBox;