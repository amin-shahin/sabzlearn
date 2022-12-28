import React from "react";
import './CourseDetailsBox.css'
const CourseDetailsBox = ({icon,title,description}) => {
    return (  
        <div class="col-4">
        <div class="course-boxes__box">
          <div class="course-boxes__box-right">
            <i class={`course-boxes__box-right-icon ${icon}`}></i>
          </div>
          <div class="course-boxes__box-left">
            <span class="course-boxes__box-left-title">
             {title}
            </span>
            <span class="course-boxes__box-left--subtitle">
              {description}
            </span>
          </div>
        </div>
      </div>
    );
}
 
export default CourseDetailsBox;