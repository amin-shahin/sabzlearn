import React from "react";
import "./AboutUsBox.css";

const AboutUsBox = ({aboutTitle,aboutSubTitle,aboutIcon}) => {
  return (
    <div class="col-6">
      <div class="about-us__box">
        <div class="about-us__box-right">
          <i class={`${aboutIcon} about-us__icon`}></i>
        </div>
        <div class="about-us__box-left">
          <span class="about-us__box-title">{aboutTitle}</span>
          <span class="about-us__box-text">
            {aboutSubTitle}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AboutUsBox;
