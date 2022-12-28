import React from "react";
import CourseDetailsBox from "../CourseDetailsBox/CourseDetailsBox";
import './CourseInformation.css'

const CourseInformation = () => {
    return ( 
        <div className="course">
            <div className="row">
            <CourseDetailsBox icon='fas fa-graduation-cap' title=' وضعیت دوره:' description='به اتمام رسیده'/>
            <CourseDetailsBox icon='fas fa-clock' title=' مدت زمان دوره:' description='19 ساعت'/>
            <CourseDetailsBox icon='fas fa-calender-days' title='آخرین بروزرسانی:' description='1401/03/02'/>
            <CourseDetailsBox icon='fas fa-user-alt' title='روش پشتیبانی:' description='آنلاین'/>
            <CourseDetailsBox icon='fas fa-info-circle' title='پیش نیاز:' description='HTML CSS'/>
            <CourseDetailsBox icon='fas fa-play' title='نوع مشاهده:' description='ضبط شده / آنلاین'/>
            </div>
        </div>
     );
}
 
export default CourseInformation;