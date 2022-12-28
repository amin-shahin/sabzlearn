import React, { useState } from "react";
import CircleSpinner from "../CircleSpinner/CircleSpinner";
import './CourseBox.css'

const CourseBox = ({courseTitle,courseTeacher,coursePrice,courseUsers}) => {
  const [isShowImg,setIsShowImg] = useState(false)
  const onLoadImage = ()=>setIsShowImg(true)
  const onErrorImage = ()=>{
    console.log('error image');
  }
    return ( 
        
            
              <div className="col-4">
                <div className="course-box">
                  <a href="#">
                    <img onLoad={onLoadImage} onError={onErrorImage} src="/images/courses/fareelancer.png" alt="Course img" className="course-box__img" />
                    {/* <img onLoad={onLoadImage} src="https://placeimg.com/295/295/any/tech=190129384" alt="Course img" className="course-box__img" /> */}
                    {!isShowImg && (
                      <CircleSpinner/>
                    )}
                  </a>
                  <div className="course-box__main">
                    <a href="#" className="course-box__title">{courseTitle}</a>

                    <div className="course-box__rating-teacher">
                      <div className="course-box__teacher">
                        <i className="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
                        <a href="#" className="course-box__teacher-link">{courseTeacher}</a>
                      </div>
                      <div className="course-box__rating">
                        <img src="/images/svgs/star.svg" alt="rating" className="course-box__star" />
                        <img src="/images/svgs/star_fill.svg" alt="rating" className="course-box__star" />
                        <img src="/images/svgs/star_fill.svg" alt="rating" className="course-box__star" />
                        <img src="/images/svgs/star_fill.svg" alt="rating" className="course-box__star" />
                        <img src="/images/svgs/star_fill.svg" alt="rating" className="course-box__star" />
                      </div>
                    </div>

                    <div className="course-box__status">
                      <div className="course-box__users">
                        <i className="fas fa-users course-box__users-icon"></i>
                        <span className="course-box__users-text">{courseUsers}</span>
                      </div>
                      <span className="course-box__price">{coursePrice}</span>
                    </div>
                  </div>

                  <div className="course-box__footer">
                    <a href="#" className="course-box__footer-link">
                      مشاهده اطلاعات
                      <i className="fas fa-arrow-left course-box__footer-icon"></i>
                    </a>
                  </div>

                </div>
              </div>
            

     );
}
 
export default CourseBox;