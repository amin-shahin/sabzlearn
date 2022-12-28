import React from "react";
import ArticleBox from "../ArticleBox/ArticleBox";
import SectionHeader from "../SectionHeader/SectionHeader";
import "./LastArticles.css";

const LastArticles = () => {
  return (
    <section className="articles">
      <div className="container">
        <SectionHeader title='جدیدترین مقاله ها' subTitle='پیش به سوی ارتقا دانش' btnTitle='تمامی مقاله ها'/>

        <div className="articles__content">
          
          <div className="row">
            <ArticleBox cover="images/blog/1.jpg" articleTitle=' نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون' partOfContent='زبان پایتون هم مانند دیگر زبان­های برنامه نویسی رایج، دارای کتابخانه های مختلفی برای تسریع...'/>
          </div>

        </div>
          
      </div>
    </section>
  );
};

export default LastArticles;
