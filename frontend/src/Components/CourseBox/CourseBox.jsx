import React, { useState } from "react";
import { Link } from "react-router-dom";
import CircleSpinner from "../CircleSpinner/CircleSpinner";
import "./CourseBox.css";

const CourseBox = (props) => {
  const [isShowImg, setIsShowImg] = useState(false);
  const onLoadImage = () => setIsShowImg(true);
  const onErrorImage = () => {
    console.log("error image");
  };
  return (
    <div className="col-4" style={{ width: `${props.isSlider && "100%"}` }}>
      <div className="course-box">
        <Link to={`/course-info/${props.shortName}`}>
          <img
            onLoad={onLoadImage}
            onError={onErrorImage}
            src={`http://localhost:4000/courses/covers/${props.cover}`}
            alt="Course img"
            className="course-box__img"
          />
          {!isShowImg && <CircleSpinner />}
        </Link>
        <div className="course-box__main">
          <Link
            to={`/course-info/${props.shortName}`}
            className="course-box__title"
          >
            {props.name}{" "}
          </Link>

          <div className="course-box__rating-teacher">
            <div className="course-box__teacher">
              <i className="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
              <span className="course-box__teacher-link">{props.creator}</span>
            </div>
            <div className="course-box__rating">
              {Array(5 - props.courseAverageScore)
                .fill(0)
                .map((item) => (
                  <img src="/images/svgs/star.svg" alt="score" />
                ))}
              {Array(props.courseAverageScore)
                .fill(0)
                .map((item) => (
                  <img src="/images/svgs/star_fill.svg" alt="score" />
                ))}
            </div>
          </div>

          <div className="course-box__status">
            <div className="course-box__users">
              <i className="fas fa-users course-box__users-icon"></i>
              <span className="course-box__users-text mx-4">
                {props.registers}
              </span>
            </div>
            <span className="course-box__price">
              {props.price === 0
                ? " رایگان"
                : `${props.price.toLocaleString()}تومان`}
            </span>
          </div>
        </div>

        <div className="course-box__footer">
          <Link
            to={`/course-info/${props.shortName}`}
            className="course-box__footer-link"
          >
            مشاهده اطلاعات
            <i className="fas fa-arrow-left course-box__footer-icon"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseBox;
