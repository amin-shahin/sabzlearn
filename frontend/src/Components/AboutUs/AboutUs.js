import React from "react";
import AboutUsBox from "../AboutUsBox/AboutUsBox";
import SectionHeader from "../SectionHeader/SectionHeader";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-us">
      <div class="container">
      <SectionHeader title='ما چه کمکی به شما می کنیم؟' subTitle='از اونجایی که آکادمی سبزلرن یه آکادمی خصوصی هست' />

        <div class="row">
          <AboutUsBox
            aboutTitle="دوره های اختصاصی"
            aboutSubTitle="با پشتیبانی و کیفیت بالا ارائه میده !"
            aboutIcon='far fa-copyright'
          />
            <AboutUsBox
            aboutTitle="اجازه تدریس"
            aboutSubTitle='به هر مدرسی رو نمیده. چون کیفیت براش مهمه !'
            aboutIcon='fa fa-leaf'
          />
            <AboutUsBox
            aboutTitle="دوره پولی و رایگان"
            aboutSubTitle='براش مهم نیست. به مدرسینش حقوق میده تا نهایت کیفیت رو در پشتیبانی و اپدیت دوره ارائه بده'
            aboutIcon='fas fa-gem'
          />
            <AboutUsBox
            aboutTitle="اهمیت به کاربر"
            aboutSubTitle='اولویت اول و آخر آکادمی آموزش برنامه نویسی سبزلرن اهمیت به کاربرها و رفع نیاز های آموزشی و رسوندن اونها به بازار کار هست'
            aboutIcon='fas fa-crown'
          />
        </div>
      </div>
    </div> 
  );
};

export default AboutUs;
