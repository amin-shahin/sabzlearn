import React from "react";
import CourseDetailsBox from "../CourseDetailsBox/CourseDetailsBox";
import './CourseInformation.css'

const CourseInformation = (courseInfoDetails) => {
   
    return ( 
        <div className="course">
            <div className="row">
            <CourseDetailsBox icon='fas fa-graduation-cap' title=' وضعیت دوره:' description={courseInfoDetails.isComplete ? 'به اتمام رسیده':'در حال برگزاری'}/>
            <CourseDetailsBox icon='fas fa-clock' title='  زمان برگزاری دوره:' description={courseInfoDetails.createdAt}/>
            <CourseDetailsBox icon='fas fa-calender-days' title='آخرین بروزرسانی:' description={courseInfoDetails.updatedAt}/>
            <CourseDetailsBox icon='fas fa-user-alt' title='روش پشتیبانی:' description={courseInfoDetails.support}/>
            <CourseDetailsBox icon='fas fa-info-circle' title='پیش نیاز:' description='HTML CSS'/>
            <CourseDetailsBox icon='fas fa-play' title='نوع مشاهده:' description='ضبط شده / آنلاین'/>
            </div>
        </div>
     );
}
 
export default CourseInformation;