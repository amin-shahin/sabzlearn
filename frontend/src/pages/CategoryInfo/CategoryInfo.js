import React from "react";
import CourseBox from "../../Components/CourseBox/CourseBox";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import Pagination from "../../Components/Pagination/Pagination";
import Topbar from "../../Components/Topbar/Topbar";
import "./CategoryInfo.css"

const CategoryInfo = () => {
    return ( 
        <>
        <Topbar/>
        <Navbar/>

     <section className="courses">
      <div className="container">
        <div className="courses-top-bar">

          <div className="courses-top-bar__right">
            <div className="courses-top-bar__row-btn courses-top-bar__icon--active">
              <i className="fas fa-border-all courses-top-bar__icon"></i>
            </div>
            <div className="courses-top-bar__column-btn">
              <i className="fas fa-align-left courses-top-bar__icon"></i>
            </div>

            <div className="courses-top-bar__selection">
              <span className="courses-top-bar__selection-title">
                مرتب سازی پیش فرض
                <i className="fas fa-angle-down courses-top-bar__selection-icon"></i>
              </span>
              <ul className="courses-top-bar__selection-list">
                <li className="courses-top-bar__selection-item courses-top-bar__selection-item--active">مرتب سازی پیش فرض</li>
                <li className="courses-top-bar__selection-item">مربت سازی بر اساس محبوبیت</li>
                <li className="courses-top-bar__selection-item">مربت سازی بر اساس امتیاز</li>
                <li className="courses-top-bar__selection-item">مربت سازی بر اساس آخرین</li>
                <li className="courses-top-bar__selection-item">مربت سازی بر اساس ارزان ترین</li>
                <li className="courses-top-bar__selection-item">مربت سازی بر اساس گران ترین</li>
              </ul>
            </div>
          </div>

          <div className="courses-top-bar__left">
            <form action="#" className="courses-top-bar__form">
              <input type="text" className="courses-top-bar__input" placeholder="جستجوی دوره ..." />
              <i className="fas fa-search courses-top-bar__search-icon"></i>
            </form>
          </div>

        </div>
      </div>
    </section>

            <div className="courses-content">
                <div className="container">
                    <div className="row">
                    <CourseBox courseTitle='دوره پروژه محور متخصص جنگو' courseTeacher='رضا دولتی' courseUsers='500' coursePrice="1,000,000"/>
                    <CourseBox courseTitle='دوره پروژه محور متخصص جنگو' courseTeacher='رضا دولتی' courseUsers='500' coursePrice="1,000,000"/>
                    <CourseBox courseTitle='دوره پروژه محور متخصص جنگو' courseTeacher='رضا دولتی' courseUsers='500' coursePrice="1,000,000"/>

                    </div>
                </div>
            </div>

        <Pagination/>
        <Footer/>
        </>
     );
}
 
export default CategoryInfo;