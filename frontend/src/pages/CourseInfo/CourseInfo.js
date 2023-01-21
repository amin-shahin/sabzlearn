import React, { useEffect, useState } from "react";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import CommentsTextArea from "../../Components/CommentsTextArea/CommentsTextArea";
import CourseInformation from "../../Components/CourseInformation/CourseInformation";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import Topbar from "../../Components/Topbar/Topbar";
import Accordion from "react-bootstrap/Accordion";
import "./CourseInfo.css";
import { Link, useParams } from "react-router-dom";
import swal from "sweetalert";

const CourseInfo = () => {
  const { courseName } = useParams();

  const [sessions, setSessions] = useState([]);
  const [comments, setComments] = useState([]);
  const [courseInfoDetails, setCourseInfoDetails] = useState({});
  const [courseTeacher, setCourseTeacher] = useState({});
  const [courseCategory, setCourseCategory] = useState({});
  const [courseCategoryRelated, setCourseCategoryRelated] = useState([]);


  const localStorageData = JSON.parse(localStorage.getItem("user"));

  const onSubmitComment = (commentBody,courseScoreByUser) => {
    console.log(commentBody);

    fetch(`http://localhost:4000/v1/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorageData.token}`,
      },
      body: JSON.stringify({
        body: commentBody,
        courseShortName: courseName,
        score: courseScoreByUser,
      }),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((result) => {
        console.log(result);
        swal({
          title: "کامنت با موفقیت ثبت شد",
          buttons: "تایید",
          icon: "success",
        });
      });
  };

  useEffect(() => {
    getInformationCourse();

    fetch(`http://localhost:4000/v1/courses/related/${courseName}`)
    .then(res => res.json())
    .then(results =>{
      console.log('related',results);
      setCourseCategoryRelated(results)
    })
  
  }, []);

  function getInformationCourse() {
    fetch(`http://localhost:4000/v1/courses/${courseName}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${
          localStorageData === null ? null : localStorageData.token
        }`,
      },
    })
      .then((res) => res.json())
      .then((courseInfo) => {
        console.log("data =>", courseInfo);
        setComments(courseInfo.comments);
        setSessions(courseInfo.sessions);
        setCourseTeacher(courseInfo.creator);
        setCourseInfoDetails(courseInfo);
        setCourseCategory(courseInfo.categoryID);
      });
  }
  const registerInCourse = (courseInfo) => {
    const priceCourse = courseInfo.price === 0 ? 0 : courseInfo.price;
    if (courseInfo.price === 0) {
      swal({
        title: "آیا از ثبت نام در این دوره اطمینان دارید؟",
        icon: "warning",
        buttons: ["خیر", "بله"],
      }).then((result) => {
        if (result) {
          fetch(`http://localhost:4000/v1/courses/${courseInfo._id}/register`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("user")).token
              }`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              price: priceCourse,
            }),
          }).then((res) => {
            if (res.ok) {
              swal({
                title: "ثبت نام با موفقیت انجام شد",
                icon: "success",
                buttons: "بستن",
              }).then(() => getInformationCourse());
            }
          });
        }
      });
    } else {
      swal({
        title: "آیا از ثبت نام در این دوره اطمینان دارید؟",
        icon: "warning",
        buttons: ["خیر", "بله"],
      }).then((result) => {
        if (result) {
          swal({
            title: "کد تخفیف را وارد نمایید",
            content: "input",
            buttons: ["ثبت نام بدون کد تخفیف", "اعمال کد تخفیف"],
          }).then((inputValue) => {
            if (inputValue === null) {
              fetch(
                `http://localhost:4000/v1/courses/${courseInfo._id}/register`,
                {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${
                      JSON.parse(localStorage.getItem("user")).token
                    }`,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    price: priceCourse,
                  }),
                }
              ).then((res) => {
                if (res.ok) {
                  swal({
                    title: "ثبت نام با موفقیت انجام شد",
                    icon: "success",
                    buttons: "بستن",
                  }).then(() => getInformationCourse());
                }
              });
            }else {
              fetch(`http://localhost:4000/v1/offs/${inputValue}`,
              {
                method:'POST',
                headers:{
                  Authorization: `Bearer ${
                    JSON.parse(localStorage.getItem("user")).token
                  }`,
                  "Content-Type": "application/json",
                },
                body:JSON.stringify({
                  course:courseInfo._id
                })
              }).then(res =>{
                  console.log(res.status);
                  if(res.status === 404){
                    swal({
                      title:'این کد تخفیف معتبر نیست',
                      icon:'error',
                      button:'بستن'
                    })
                  }
                  else if(res.status === 409){
                    swal({
                      title:'این کد تخفیف قبلا استفاده شده ',
                      icon:'error',
                      button:'بستن'
                    })
                  }
                  else{
                    return res.json()
                  }
                }).then(codeInfo => {
                  fetch(`http://localhost:4000/v1/courses/${courseInfo._id}/register`, {
                    method: "POST",
                    headers: {
                      Authorization: `Bearer ${
                        JSON.parse(localStorage.getItem("user")).token
                      }`,
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      price: priceCourse -( priceCourse * codeInfo.percent / 100)
                    }),
                  }).then((res) => {
                    if (res.ok) {
                      swal({
                        title: "ثبت نام با موفقیت انجام شد",
                        icon: "success",
                        buttons: "بستن",
                      }).then(() => getInformationCourse());
                    }
                }).then(()=>getInformationCourse())
                })
          }

        });
        }
      });
    }
  };

  return (
    <>
      <Topbar />
      <Navbar />

      <Breadcrumb
        links={[
          { id: 1, title: "خانه", to: "" },
          {
            id: 2,
            title: "آموزش برنامه نویسی فرانت اند",
            to: "category-info/frontend",
          },
          { id: 3, title: "متخصص جاوااسکریپت", to: "course-info/js-expert" },
        ]}
      />

      <section className="course-info">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <a href="#" className="course-info__link">
                {courseCategory.title}
              </a>
              <h1 className="course-info__title">{courseInfoDetails.name}</h1>
              <p className="course-info__text">
                {courseInfoDetails.description}
              </p>

              <div className="course-info__social-media">
                <a href="#" className="course-info__social-media-item">
                  <i className="fab fa-telegram-plane course-info__icon"></i>
                </a>
                <a href="#" className="course-info__social-media-item">
                  <i className="fab fa-twitter course-info__icon"></i>
                </a>
                <a href="#" className="course-info__social-media-item">
                  <i className="fab fa-facebook-f course-info__icon"></i>
                </a>
              </div>
            </div>

            <div className="col-6">
              <video
                src=""
                poster="/images/courses/js_project.png"
                className="course-info__video"
                controls
              ></video>
            </div>
          </div>
        </div>
      </section>

      <main className="main">
        <div className="container">
          <div className="row">
            <div className="col-8">
              <CourseInformation {...courseInfoDetails} />
              {/* <!-- Start Course Progress --> */}
              <div className="course-progress">
                <div className="course-progress__header">
                  <i className="fas fa-chart-line course-progress__icon"></i>
                  <span className="course-progress__title">
                    درصد پیشرفت دوره: 100%
                  </span>
                </div>
                <div className="progress course-progress__bar">
                  <div
                    className="progress-bar progress-bar-striped progress-bar-animated"
                    role="progressbar"
                    aria-label="Animated striped example"
                    aria-valuenow="75"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: "75%" }}
                  ></div>
                </div>
              </div>
              {/* <!-- finish Course Progress --> */}

              {/* <!-- Start Introduction --> */}

              <div className="introduction">
                <div className="introduction__item">
                  <span className="introduction__title title">
                    آموزش 20 کتابخانه جاوا اسکریپت مخصوص بازار کار
                  </span>
                  <img
                    src="/images/info/1.gif"
                    alt="course info image"
                    className="introduction__img img-fluid"
                  />
                  <p className="introduction__text">
                    کتابخانه های بسیار زیادی برای زبان جاوا اسکریپت وجود دارد و
                    سالانه چندین کتابخانه جدید نیز به این لیست اضافه می شود که
                    در بازار کار به شدت از آن ها استفاده می شود و اگر بدون بلد
                    بودن این کتابخانه ها وارد بازار کار شوید، خیلی اذیت خواهید
                    شد و حتی ممکن است ناامید شوید!
                  </p>
                  <p className="introduction__text">
                    در این دوره نحوه کار با 20 مورد از پر استفاده ترین کتابخانه
                    های جاوا اسکریپت به صورت پروژه محور به شما عزیزان آموزش داده
                    می شود تا هیچ مشکلی برای ورود به بازار کار نداشته باشید
                  </p>
                </div>
                <div className="introduction__item">
                  <span className="introduction__title title">
                    هدف از این دوره چیست؟ (تنها راه ورود به بازار کار و کسب
                    درآمد)
                  </span>
                  <img
                    src="/images/info/2.jpg"
                    alt="course info image"
                    className="introduction__img img-fluid"
                  />
                  <p className="introduction__text">
                    وقتی برای اولین بار وارد یکی از شرکت های برنامه نویسی شدم،
                    از کتابخانه هایی به اسم Lodash و Formik استفاده می شد، در
                    حالی که من اولین بارم بود اسم Formik را می شنیدم و تا اون
                    موقع از این کتابخانه ها استفاده نکرده بودم.
                  </p>
                  <p className="introduction__text">
                    همینجا بود که متوجه شدم کتابخانه های جاوا اسکریپت یکی از مهم
                    ترین مباحثی هستند که هر برنامه نویس وب برای ورود به بازار
                    کار و کسب درآمد بهتر، راحت و بیشتر باید با آن ها کار کرده
                    باشد{" "}
                  </p>
                  <p className="introduction__text">
                    همان طور که از اسم این دوره مشخص است، هدف از این دوره آموزش
                    20 مورد از کاربردی ترین و پر استفاده ترین کتابخانه های جاوا
                    اسکریپت است تا شما بتوانید بعد از این دوره با قدرت و آمادگی
                    بیشتر ادامه مسیر برنامه نویسی وب را ادامه دهید، ری اکت یا
                    نود یا … را راحت تر یاد بگیرید و در نهایت وارد بازار کار شده
                    و کسب درآمد کنید.
                  </p>
                  <p className="introduction__text">
                    شا به عنوان یک برنامه نویس وب، حداقل اگر با کتابخانه خاصی
                    کار نکرده باشید، باید بلد باشید که چطور باید یک کتابخانه
                    جدید را یاد بگیرید. فرض کنید یک یک کتابخانه جدید ساخته شد.
                    آیا شما باید منتظر دوره آموزشی باشید؟! قطعا نه.
                  </p>
                  <p className="introduction__text">
                    در این دوره سعی کردیم علاوه بر آموزش مستقیم هر کتابخانه،
                    نحوه یادگیری یک کتابخانه جدید را نیز به شما عزیزان آموزش
                    دهیم تا بعد از گذراندن دوره، دیگر وابسته هیچ دوره یا شخص
                    خاصی نباشید و اگر کتابخانه جدیدی به دنیای جاوا اسکریپت و وب
                    اضافه شد، به راحتی بتوانید آن را یاد بگیرید.
                  </p>
                </div>
                <div className="introduction__btns">
                  <a href="#" className="introduction__btns-item">
                    دانلود همگانی ویدیوها
                  </a>
                  <a href="#" className="introduction__btns-item">
                    دانلود همگانی پیوست‌ها
                  </a>
                </div>

                <div className="introduction__topic">
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0" className="accordion">
                      <Accordion.Header>جلسات دوره</Accordion.Header>
                      {sessions.map((session, index) => (
                        <Accordion.Body className="introduction__accordion-body">
                          {courseInfoDetails.isUserRegisteredToThisCourse ||
                          session.free === 1 ? (
                            <>
                              <div className="introduction__accordion-right">
                                <span className="introduction__accordion-count">
                                  {index + 1}
                                </span>
                                <i className="fab fa-youtube introduction__accordion-icon"></i>
                                <Link
                                  to={`/${courseName}/${session._id}`}
                                  className="introduction__accordion-link"
                                >
                                  {session.title}
                                </Link>
                              </div>
                              <div className="introduction__accordion-left">
                                <span className="introduction__accordion-time">
                                  {session.time}
                                </span>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="introduction__accordion-right">
                                <span className="introduction__accordion-count">
                                  {index + 1}
                                </span>
                                <i className="fab fa-youtube introduction__accordion-icon"></i>
                                <span
                                  href="#"
                                  className="introduction__accordion-link"
                                >
                                  {session.title}
                                </span>
                              </div>
                              <div className="introduction__accordion-left">
                                <i className="fa fa-lock mx-3"></i>
                                <span className="introduction__accordion-time">
                                  {session.time}
                                </span>
                              </div>
                            </>
                          )}
                        </Accordion.Body>
                      ))}
                    </Accordion.Item>
                  </Accordion>
                </div>
              </div>

              {/* <!-- Finish Introduction --> */}

              {/* <!-- Start Teacher Details --> */}

              <div className="techer-details">
                <div className="techer-details__header">
                  <div className="techer-details__header-right">
                    <img
                      src="/images/info/teacher.jfif"
                      alt="Teacher Profile"
                      className="techer-details__header-img"
                    />
                    <div className="techer-details__header-titles">
                      <a href="#" className="techer-details__header-link">
                        {courseTeacher.name}
                      </a>
                      <span className="techer-details__header-skill">
                        Front End and Back End Developer
                      </span>
                    </div>
                  </div>
                  <div className="techer-details__header-left">
                    <i className="fas fa-chalkboard-teacher techer-details__header-icon"></i>
                    <span className="techer-details__header-name">مدرس</span>
                  </div>
                </div>
                <p className="techer-details__footer">
                  اول از همه برنامه نویسی اندروید رو شروع کردم و نزدیک به 2 سال
                  با زبان جاوا اندروید کار میکردم .بعد تصمیم گرفتم در زمینه وب
                  فعالیت داشته باشم.و..
                </p>
              </div>

              {/* <!-- Finish Teacher Details -->   */}
              <CommentsTextArea
                comments={comments}
                onSubmitComment={onSubmitComment}
              />
            </div>

            <div className="col-4">
              <div className="courses-info">
                <div className="course-info">
                  <div className="course-info__register">
                    {courseInfoDetails.isUserRegisteredToThisCourse ? (
                      <span className="course-info__register-title">
                        <i className="fas fa-graduation-cap course-info__register-icon"></i>
                        دانشجوی دوره هستید
                      </span>
                    ) : (
                      <span
                        className="course-info__register-title"
                        onClick={() => registerInCourse(courseInfoDetails)}
                      >
                        <i className="fas fa-graduation-cap course-info__register-icon"></i>
                        ثبت نام در دوره
                      </span>
                    )}
                  </div>
                </div>
                <div className="course-info">
                  <div className="course-info__total">
                    <div className="course-info__top">
                      <div className="course-info__total-sale">
                        <i className="fas fa-user-graduate course-info__total-sale-icon"></i>
                        <span className="course-info__total-sale-text">
                          تعداد دانشجو :
                        </span>
                        <span className="course-info__total-sale-number">
                          {courseInfoDetails.courseStudentsCount}
                        </span>
                      </div>
                    </div>
                    <div className="course-info__bottom">
                      <div className="course-info__total-comment">
                        <i className="far fa-comments course-info__total-comment-icon"></i>
                        <span className="course-info__total-comment-text">
                          67 دیدگاه
                        </span>
                      </div>
                      <div className="course-info__total-view">
                        <i className="far fa-eye course-info__total-view-icon"></i>
                        <span className="course-info__total-view-text">
                          14,234 بازدید
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="course-info">
                  <div className="course-info__header-short-url">
                    <i className="fas fa-link course-info__short-url-icon"></i>
                    <span className="course-info__short-url-text">
                      لینک کوتاه
                    </span>
                  </div>
                  <span className="course-info__short-url">
                    https://sabzlearn.ir/?p=117472
                  </span>
                </div>
                <div className="course-info">
                  <span className="course-info__topic-title">
                    سرفصل های دوره
                  </span>
                  <span className="course-info__topic-text">
                    برای مشاهده و یا دانلود دوره روی کلمه
                    <a href="#" style={{ color: "blue", fontWeight: "bold" }}>
                      {" "}
                      لینک{" "}
                    </a>
                    کلیک کنید
                  </span>
                </div>
               {courseCategoryRelated.length !==0 && (
                 <div className="course-info">
                 <span className="course-info__courses-title">
                   دوره های مرتبط
                 </span>
                 <ul className="course-info__courses-list">
                  {courseCategoryRelated.map(course =>(
                    <li key={course._id} className="course-info__courses-list-item">
                     <Link to={`/course-info/${course.shortName}`} className="course-info__courses-link">
                       <img
                         src={`http://localhost:4000/courses/covers/${course.cover}`}
                         alt="Course Cover"
                         className="course-info__courses-img"
                       />
                       <span className="course-info__courses-text">
                          {course.name}
                       </span>
                     </Link>
                   </li>
                  ))}
                 </ul>
               </div>
               )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default CourseInfo;
