import React from "react";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import CommentsTextArea from "../../Components/CommentsTextArea/CommentsTextArea";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import Topbar from "../../Components/Topbar/Topbar";
import "./ArticleInfo.css"

const ArticleInfo = () => {
    return ( 
    <>
        <Topbar/>
        <Navbar/>

        <Breadcrumb 
        links={[
            {id:1,title:'خانه',to:''},
            {id:2,title:'آموزش برنامه نویسی فرانت اند',to:'categoryInfo/frontend'},
            {id:3,title:'متخصص جاوااسکریپت',to:'courseInfo/js-expert'}
        ]}
        />
         <main class="main">
            <div class="container">
                <div class="row">
                <div class="col-8">
              <div class="article">
                <h1 class="article__title">
                  معرفی بهترین سایت آموزش جاوا اسکریپت [ تجربه محور ] + آموزش رایگان
                </h1>
                <div class="article__header">
                  <div class="article-header__category article-header__item">
                    <i class="far fa-folder article-header__icon"></i>
                    <a href="#" class="article-header__text">جاوا اسکریپت</a>
                  </div>
                  <div class="article-header__category article-header__item">
                    <i class="far fa-user article-header__icon"></i>
                    <span class="article-header__text"> ارسال شده توسط قدیر</span>
                  </div>
                  <div class="article-header__category article-header__item">
                    <i class="far fa-clock article-header__icon"></i>
                    <span class="article-header__text"> ارسال شده توسط قدیر</span>
                  </div>
                  <div class="article-header__category article-header__item">
                    <i class="far fa-eye article-header__icon"></i>
                    <span class="article-header__text">  2.14k بازدید</span>
                  </div>
                </div>
                <img src="/images/blog/1.jpg" alt="Article Cover" class="article__banner" />

                <div class="article__score">
                  <div class="article__score-icons">
                    <img src="/images/svgs/star_fill.svg" class="article__score-icon" />
                    <img src="/images/svgs/star_fill.svg" class="article__score-icon" />
                    <img src="/images/svgs/star_fill.svg" class="article__score-icon" />
                    <img src="/images/svgs/star_fill.svg" class="article__score-icon" />
                    <img src="/images/svgs/star.svg" class="article__score-icon" />
                  </div>
                  <span class="article__score-text">4.2/5 - (5 امتیاز)</span>
                </div>

                <p class="article__paragraph paragraph">
                  جاوا اسکریپت یکی از زبان‌های برنامه‌نویسی اصلی حوزه فرانت‌اند است که به واسطه فریم ورک‌های آن می‌توان انواع وب سایت‌ها، اپلیکیشن‌ها و وب اپلیکیشن‌ها را طراحی کرد. به طور کلی بعد از یادگیری html و css معمولاً باید آموزش جاوا اسکریپت را نیز فرا بگیرید. . چرا که این زبان تکمیل‌کننده html و css بوده و در چنین شرایطی موقعیت‌های شغلی بیشتر را در اختیار خواهید داشت و همچنین می‌توانید پروژه‌های گسترده‌تری را انجام دهید. در حال حاضر با وجود منابع رایگان موجود در وب شما به راحتی می‌توانید زبان جاوا اسکریپت را به صورت حرفه‌ای فرا بگیرید. به همین واسطه در ادامه مطلب قصد داریم سایت‌های شاخص آموزش این زبان برنامه‌نویسی در جهان را به شما معرفی کنیم و در آخر بگوییم که بهترین سایت آموزش جاوا اسکریپت کدام است.
                </p>

                <div class="article-read">
                  <span class="article-read__title">آنچه در این مقاله خواهید خواند</span>
                  <ul class="article-read__list">
                    <li class="article-read__item">
                      <a href="#" class="article-read__link">معرفی بهترین سایت ‌های آموزش جاوا اسکریپت:</a>
                    </li>
                    <li class="article-read__item">
                      <a href="#" class="article-read__link">یک راه آسان‌تر، دوره‌ های جاوا اسکریپت آکادمی سبزلرن!</a>
                    </li>
                    <li class="article-read__item">
                      <a href="#" class="article-read__link">ثبت نام در دوره‌ های جاوا اسکریپت سبزلرن:</a>
                    </li>
                  </ul>
                </div>

                <img src="/images/blog/2.jpg" alt="Article Image" class="article__seconadary-banner" />
                <div class="article-section">
                  <h2 class="article-section__title">
                    معرفی بهترین سایت ‌های آموزش جاوا اسکریپت:
                  </h2>
                  <p class="paragraph article-section__text">
                    توجه داشته باشید که تمام وب سایت‌هایی که به عنوان بهترین سایت آموزش جاوا اسکریپت در ادامه معرفی می‌کنیم، بین‌المللی هستند و منابع موجود در آن‌ها به زبان انگلیسی است. در نتیجه شما باید یا تسلط متوسط و حداقلی به زبان انگلیسی داشته باشید و یا اینکه با استفاده از گوگل ترنسلیت منابع موجود را ترجمه کرده و از آن‌ها استفاده کنید. به همین دلیل در انتهای محتوا به شما خواهیم گفت که راه آسان دیگری برای یادگیری زبان جاوا اسکریپت وجود دارد که شما بتوانید به واسطه آن به صورت رایگان و به زبان فارسی این زبان را یاد بگیرید.
                  </p>
                  <img src="/images/blog/4.png" alt="article body img" class="article-section__img" />
                </div>
                <div class="article-section">
                  <h2 class="article-section__title">
                    معرفی بهترین سایت ‌های آموزش جاوا اسکریپت:
                  </h2>
                  <p class="paragraph article-section__text">
                    توجه داشته باشید که تمام وب سایت‌هایی که به عنوان بهترین سایت آموزش جاوا اسکریپت در ادامه معرفی می‌کنیم، بین‌المللی هستند و منابع موجود در آن‌ها به زبان انگلیسی است. در نتیجه شما باید یا تسلط متوسط و حداقلی به زبان انگلیسی داشته باشید و یا اینکه با استفاده از گوگل ترنسلیت منابع موجود را ترجمه کرده و از آن‌ها استفاده کنید. به همین دلیل در انتهای محتوا به شما خواهیم گفت که راه آسان دیگری برای یادگیری زبان جاوا اسکریپت وجود دارد که شما بتوانید به واسطه آن به صورت رایگان و به زبان فارسی این زبان را یاد بگیرید.
                  </p>
                </div>
                <div class="article-section">
                  <h2 class="article-section__title">
                    معرفی بهترین سایت ‌های آموزش جاوا اسکریپت:
                  </h2>
                  <p class="paragraph article-section__text">
                    توجه داشته باشید که تمام وب سایت‌هایی که به عنوان بهترین سایت آموزش جاوا اسکریپت در ادامه معرفی می‌کنیم، بین‌المللی هستند و منابع موجود در آن‌ها به زبان انگلیسی است. در نتیجه شما باید یا تسلط متوسط و حداقلی به زبان انگلیسی داشته باشید و یا اینکه با استفاده از گوگل ترنسلیت منابع موجود را ترجمه کرده و از آن‌ها استفاده کنید. به همین دلیل در انتهای محتوا به شما خواهیم گفت که راه آسان دیگری برای یادگیری زبان جاوا اسکریپت وجود دارد که شما بتوانید به واسطه آن به صورت رایگان و به زبان فارسی این زبان را یاد بگیرید.
                  </p>
                  <img src="/images/blog/3.jpg" alt="article body img" class="article-section__img" />
                </div>

                <div class="article-social-media">
                  <span class="article-social-media__text">اشتراک گذاری :</span>
                  <a href="#" class="article-social-media__link">
                    <i class="fab fa-telegram-plane article-social-media__icon"></i>
                  </a>
                  <a href="#" class="article-social-media__link">
                    <i class="fab fa-twitter article-social-media__icon"></i>
                  </a>
                  <a href="#" class="article-social-media__link">
                    <i class="fab fa-facebook-f article-social-media__icon"></i>
                  </a>
                </div>

              </div>

              <div class="suggestion-articles">
                <div class="row">
                  <div class="col-6">
                    <div class="suggestion-articles__right suggestion-articles__content">
                      <a href="#" class="suggestion-articles__icon-link">
                        <i class="fas fa-arrow-right suggestion-articles__icon"></i>
                      </a>
                      <a href="#" class="suggestion-articles__link">
                        سریع ترین و بهترین راه یادگیری جاوا اسکریپت چیست؟ | تجربه برنامه نویسان
                      </a>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="suggestion-articles__left suggestion-articles__content">
                      <a href="#" class="suggestion-articles__icon-link">
                        <i class="fas fa-arrow-left suggestion-articles__icon"></i>
                      </a>
                      <a href="#" class="suggestion-articles__link">
                        سریع ترین و بهترین راه یادگیری جاوا اسکریپت چیست؟ | تجربه برنامه نویسان
                      </a>
                    </div>
                  </div>
                </div>
              </div>

                <CommentsTextArea/>

            </div>
  
            <div class="col-4">
              <div class="courses-info">

                <div class="course-info">
                  <span class="course-info__courses-title">پر امتیازترین دوره ها</span>
                  <ul class="course-info__courses-list">
                    <li class="course-info__courses-list-item">
                      <a href="#" class="course-info__courses-link">
                        <img src="/images/courses/js_project.png" alt="Course Cover" class="course-info__courses-img" />
                        <span class="course-info__courses-text">
                          پروژه های تخصصی با جاوا اسکریپت
                        </span>
                      </a>
                    </li>
                    <li class="course-info__courses-list-item">
                      <a href="#" class="course-info__courses-link">
                        <img src="/images/courses/fareelancer.png" alt="Course Cover" class="course-info__courses-img" />
                        <span class="course-info__courses-text">
                          تعیین قیمت پروژه های فریلنسری
                        </span>
                      </a>
                    </li>
                    <li class="course-info__courses-list-item">
                      <a href="#" class="course-info__courses-link">
                        <img src="/images/courses/nodejs.png" alt="Course Cover" class="course-info__courses-img" />
                        <span class="course-info__courses-text">
                          دوره Api نویسی
                        </span>
                      </a>
                    </li>
                    <li class="course-info__courses-list-item">
                      <a href="#" class="course-info__courses-link">
                        <img src="/images/courses/jango.png" alt="Course Cover" class="course-info__courses-img" />
                        <span class="course-info__courses-text">
                          متخصص جنگو
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>


                <div class="course-info">
                  <span class="course-info__courses-title">دسترسی سریع</span>
                  <ul class="sidebar-articles__list">
                    <li class="sidebar-articles__item">
                      <i class="fas fa-angle-left sidebar-articles__icon"></i>
                      <a href="#" class="sidebar-articles__link">صفحه اصلی</a>
                    </li>
                    <li class="sidebar-articles__item">
                      <i class="fas fa-angle-left sidebar-articles__icon"></i>
                      <a href="#" class="sidebar-articles__link">فرانت اند</a>
                    </li>
                    <li class="sidebar-articles__item">
                      <i class="fas fa-angle-left sidebar-articles__icon"></i>
                      <a href="#" class="sidebar-articles__link">امنیت</a>
                    </li>
                    <li class="sidebar-articles__item">
                      <i class="fas fa-angle-left sidebar-articles__icon"></i>
                      <a href="#" class="sidebar-articles__link">پایتون</a>
                    </li>
                    <li class="sidebar-articles__item">
                      <i class="fas fa-angle-left sidebar-articles__icon"></i>
                      <a href="#" class="sidebar-articles__link">مهارت های نرم</a>
                    </li>
                  </ul>
                </div>


                <div class="course-info">
                  <span class="course-info__courses-title">مقاله های جدید</span>
                  <ul class="last-articles__list">
                    <li class="last-articles__item">
                      <a href="#" class="last-articles__link">
                        نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون
                      </a>
                    </li>
                    <li class="last-articles__item">
                      <a href="#" class="last-articles__link">
                        نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون
                      </a>
                    </li>
                    <li class="last-articles__item">
                      <a href="#" class="last-articles__link">
                        نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون
                      </a>
                    </li>
                    <li class="last-articles__item">
                      <a href="#" class="last-articles__link">
                        نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون
                      </a>
                    </li>
                    <li class="last-articles__item">
                      <a href="#" class="last-articles__link">
                        نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون
                      </a>
                    </li>
                    <li class="last-articles__item">
                      <a href="#" class="last-articles__link">
                        نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون
                      </a>
                    </li>
                  </ul>
                </div>

                <div class="course-info">
                  <span class="course-info__courses-title">دسته بندی مقالات</span>
                  <ul class="sidebar-articles__list">
                    <li class="sidebar-articles__item">
                      <i class="fas fa-angle-left sidebar-articles__icon"></i>
                      <a href="#" class="sidebar-articles__link">صفحه اصلی</a>
                    </li>
                    <li class="sidebar-articles__item">
                      <i class="fas fa-angle-left sidebar-articles__icon"></i>
                      <a href="#" class="sidebar-articles__link">فرانت اند</a>
                    </li>
                    <li class="sidebar-articles__item">
                      <i class="fas fa-angle-left sidebar-articles__icon"></i>
                      <a href="#" class="sidebar-articles__link">امنیت</a>
                    </li>
                    <li class="sidebar-articles__item">
                      <i class="fas fa-angle-left sidebar-articles__icon"></i>
                      <a href="#" class="sidebar-articles__link">پایتون</a>
                    </li>
                    <li class="sidebar-articles__item">
                      <i class="fas fa-angle-left sidebar-articles__icon"></i>
                      <a href="#" class="sidebar-articles__link">مهارت های نرم</a>
                    </li>
                  </ul>
                </div>

                <div class="course-info">
                  <span class="course-info__courses-title">دوره های جدید</span>
                  <ul class="sidebar-articles__list">
                    <li class="sidebar-articles__item">
                      <i class="fas fa-angle-left sidebar-articles__icon"></i>
                      <a href="#" class="sidebar-articles__link">صفحه اصلی</a>
                    </li>
                    <li class="sidebar-articles__item">
                      <i class="fas fa-angle-left sidebar-articles__icon"></i>
                      <a href="#" class="sidebar-articles__link">فرانت اند</a>
                    </li>
                    <li class="sidebar-articles__item">
                      <i class="fas fa-angle-left sidebar-articles__icon"></i>
                      <a href="#" class="sidebar-articles__link">امنیت</a>
                    </li>
                    <li class="sidebar-articles__item">
                      <i class="fas fa-angle-left sidebar-articles__icon"></i>
                      <a href="#" class="sidebar-articles__link">پایتون</a>
                    </li>
                    <li class="sidebar-articles__item">
                      <i class="fas fa-angle-left sidebar-articles__icon"></i>
                      <a href="#" class="sidebar-articles__link">مهارت های نرم</a>
                    </li>
                  </ul>
                </div>

              </div>
            </div>
                </div>
            </div>
          </main>
        
        <Footer/>
    </> 
    );
}
 
export default ArticleInfo;