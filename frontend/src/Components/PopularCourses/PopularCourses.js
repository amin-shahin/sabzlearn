import React, { useEffect, useState } from "react";
import SectionHeader from "../SectionHeader/SectionHeader";

import {Swiper,SwiperSlide} from 'swiper/react'
import 'swiper/css'
import './PopularCourses.css'
import CourseBox from "../CourseBox/CourseBox";


const  PopularCourses= () => {
   const [popularCourses,setPopularCourses] =  useState([])
   useEffect(()=>{
      fetch('http://localhost:4000/v1/courses/popular').then(res => res.json())
      .then(results =>{
         setPopularCourses(results)
         console.log("presell" ,results);
      })
   },[])
    return ( 
      <div class="popular">
         <div class="container">
            <SectionHeader title='محبوب ترین دوره ها' subTitle=''/>
         </div>
         <div className="courses-content">
              <div className="container">
                <div className="row">
                <Swiper
                pagination={{
                  clickable:true
                }}
                spaceBetween={30}
                slidesPerView={3}
                >
                  {popularCourses.map(popular =>(
                  <SwiperSlide key={popular.id}>
                     <CourseBox {...popular} isSlider={true}/>
                  </SwiperSlide>
                  ))}
                </Swiper>
                </div>
              </div>
         </div>
      </div>
     );
}
 
export default PopularCourses;