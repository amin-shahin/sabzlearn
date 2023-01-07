import React, { useEffect, useState } from "react";
import CourseBox from "../CourseBox/CourseBox";
import SectionHeader from "../SectionHeader/SectionHeader";

import './LastCourses.css'

const LastCourses = () => {

  const [allCourses,setAllCourses] = useState([])

  useEffect(()=>{
    fetch(`http://localhost:4000/v1/courses`)
    .then(res => res.json())
    .then(getAllCourses => {
      console.log(getAllCourses);
      setAllCourses(getAllCourses)})
  },[])


    return ( 
      <div className="courses">
         <div className="container">
            <SectionHeader title='جدیدترین دوره ها' subTitle='سکوی پرتاپ شما به سمت موفقیت' btnTitle='تمامی دوره ها' btnHref='courses/1'/>
           
            <div className="courses-content">
              <div className="container">
                <div className="row">
                  {allCourses.slice(0,6).map(lastCourse =>(
                    <CourseBox {...lastCourse}/>
                  ))}
                </div>
              </div>
            </div>



        </div>
      </div>
     );
}
 
export default LastCourses;