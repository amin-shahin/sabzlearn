import React, { useEffect, useState } from "react";
import SectionHeader from "../SectionHeader/SectionHeader";
import CourseBox from "../CourseBox/CourseBox";

import {Swiper,SwiperSlide} from 'swiper/react'
import 'swiper/css'
import './PresellCourses.css'

const  PresellCourses= () => {

   const [presellCourses,setPresellCourses] =  useState([])
   useEffect(()=>{
      fetch('http://localhost:4000/v1/courses/presell').then(res => res.json())
      .then(results =>{
         setPresellCourses(results)
         console.log("presell" ,results);
      })
   },[])

    return ( 
      <div class="presell">
         <div class="container">
            <SectionHeader title=' دوره های در حال پیش فروش' subTitle=''/>
         </div>
         <div className="courses-content">
              <div className="container">
                <div className="row">
                <Swiper
                pagination={{
                  clickable:true
                }}
                spaceBetween={25}
                slidesPerView={3}
                >
                  {presellCourses.map(presell =>(
                  <SwiperSlide key={presell.id}>
                     <CourseBox {...presell} isSlider='true'/>
                  </SwiperSlide>
                  ))}
                </Swiper>
                </div>
              </div>
         </div>
      </div>
     );
}
 
export default PresellCourses;