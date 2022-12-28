import React from "react";
import CourseBox from "../CourseBox/CourseBox";
import SectionHeader from "../SectionHeader/SectionHeader";

import './LastCourses.css'

const LastCourses = () => {
    return ( 
      <div className="courses">
         <div className="container">
            <SectionHeader title='جدیدترین دوره ها' subTitle='سکوی پرتاپ شما به سمت موفقیت' btnTitle='تمامی دوره ها' btnHref='courses'/>
           
            <div className="courses-content">
              <div className="container">
                <div className="row">
                    <CourseBox courseTitle='دوره پروژه محور متخصص جنگو' courseTeacher='رضا دولتی' courseUsers='500' coursePrice="1,000,000"/>
                </div>
              </div>
            </div>



        </div>
      </div>
     );
}
 
export default LastCourses;