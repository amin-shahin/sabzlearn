import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CourseBox from "../../Components/CourseBox/CourseBox";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import Pagination from "../../Components/Pagination/Pagination";
import Topbar from "../../Components/Topbar/Topbar";
import "./CategoryInfo.css"

const CategoryInfo = () => {
  const [coursesByCategory,setCoursesByCategory] = useState([])
  const {categoryName} = useParams()
  const [shownCourses,setShownCourses] = useState([])
  const [status,setStatus] = useState('default')
  const [statusTitle,setStatusTitle] = useState('مرتب سازی پیش فرض')
  const [orderedCourses,setOrderedCourses] = useState([])
  const [searchValue,setSearchValue] =useState('')
  const [courseDisplay,setCourseDisplay] = useState('row')

  const statusTitleChangeHandle =(event)=>{
    setStatusTitle(event.target.textContent)
  }

  useEffect(()=>{
    const fetchData = async () => {
    const res = await fetch(`http://localhost:4000/v1/courses/category/${categoryName}`)
    const result = await res.json()
    setCoursesByCategory(result)
    setOrderedCourses(result)
    }
    fetchData()
  },[categoryName])

  useEffect(()=>{
    switch(status){
      case 'free':{
      const freeCourses = coursesByCategory.filter(course => course.price === 0)
      setOrderedCourses(freeCourses)
      break

      }
      case 'money':{
        const notFreeCourses = coursesByCategory.filter(course => course.price !== 0)
        setOrderedCourses(notFreeCourses)
        break
        }
        case 'last':{
          setOrderedCourses(coursesByCategory)
        break

          }
        case 'first':{
        const reverseCourses =coursesByCategory.slice().reverse()
        setOrderedCourses(reverseCourses)
        break

            }
      default :{
        setOrderedCourses(coursesByCategory)
      }
    }
  },[status])

  const searchValueChangeHandler = (event) =>{
    setSearchValue(event.target.value)
    const filteredBySearch = coursesByCategory.filter( course => course.name.includes(event.target.value))
    setOrderedCourses(filteredBySearch)
  }
    return ( 
        <>
        <Topbar/>
        <Navbar/>

     <section className="courses">
      <div className="container">



            <div className="courses-content">
                <div className="container">
                    <div className="row">
                      {coursesByCategory.length ? (
                        <>
                           <div className="courses-top-bar">

                                    <div className="courses-top-bar__right">
                                      <div  onClick={()=> setCourseDisplay('row')} className={`courses-top-bar__row-btn ${courseDisplay === 'row' ? 'courses-top-bar__icon--active' : ''}  `} >
                                         <i className="fas fa-border-all courses-top-bar__icon"></i>
                                      </div>
                                      <div onClick={()=> setCourseDisplay('column')}  className={`courses-top-bar__column-btn ${courseDisplay === 'column' ? 'courses-top-bar__icon--active' : ''}  `}>
                                        <i className="fas fa-align-left courses-top-bar__icon"></i>
                                      </div>

                                      <div className="courses-top-bar__selection">
                                        <span className="courses-top-bar__selection-title">
                                          {statusTitle}
                                          <i className="fas fa-angle-down courses-top-bar__selection-icon"></i>
                                        </span>
                                        <ul className="courses-top-bar__selection-list">
                                          <li onClick={(event)=> {
                                            statusTitleChangeHandle(event)
                                            setStatus('default')
                                          }} className="courses-top-bar__selection-item courses-top-bar__selection-item--active">مرتب سازی پیش فرض</li>
                                          <li onClick={(event)=> {
                                            statusTitleChangeHandle(event)
                                            setStatus('first')
                                          }} className="courses-top-bar__selection-item">مرتب سازی بر اساس اولین دوره ها</li>
                                          <li onClick={(event)=> {
                                            statusTitleChangeHandle(event)
                                            setStatus('free')
                                          }} className="courses-top-bar__selection-item">مرتب سازی بر اساس دوره های رایگان</li>
                                          <li onClick={(event)=> {
                                            statusTitleChangeHandle(event)
                                            setStatus('money')
                                          }} className="courses-top-bar__selection-item">مرتب سازی بر اساس دوره های غیر رایگان</li>
                                         
                                          <li onClick={(event)=> {
                                            statusTitleChangeHandle(event)
                                            setStatus('last')
                                          }} className="courses-top-bar__selection-item">مرتب سازی بر اساس آخرین</li>
                                          <li onClick={(event)=> {
                                            statusTitleChangeHandle(event)
                                            setStatus('cheap')
                                          }} className="courses-top-bar__selection-item">مرتب سازی بر اساس ارزان ترین</li>
                                          <li onClick={(event)=> {
                                            statusTitleChangeHandle(event)
                                            setStatus('expensive')
                                          }} className="courses-top-bar__selection-item">مرتب سازی بر اساس گران ترین</li>
                                        </ul>
                                      </div>
                                    </div>

                                    <div className="courses-top-bar__left">
                                      <form action="#" className="courses-top-bar__form">
                                        <input 
                                        value={searchValue}
                                        onChange={searchValueChangeHandler}
                                        type="text" className="courses-top-bar__input" placeholder="جستجوی دوره ..." />
                                        <i className="fas fa-search courses-top-bar__search-icon"></i>
                                      </form>
                                    </div>

                           </div>
                        
                          {shownCourses.length ? (
                            <>
                          {courseDisplay === 'row' ? (
                            shownCourses.map( course =>(
                              <CourseBox {...course} />
                             ))               
                            ) : (
                            <>

                              {shownCourses.map((course) => (
                                <div className="col-12" key={course._id}>
                                  <div className="course-box">
                                    <div className="course__box-header">
                                      <div className="course__box-right">
                                        <a
                                          className="course__box-right-link"
                                          href="#"
                                        >
                                          <img
                                            src="/images/courses/fareelancer.png"
                                            className="course__box-right-img"
                                          />
                                        </a>
                                      </div>
                                      <div className="course__box-left">
                                        <div className="course__box-left-top">
                                          <a
                                            href="#"
                                            className="course__box-left-link"
                                          >
                                            {course.name}
                                          </a>
                                        </div>
                                        <div className="course__box-left-center">
                                          <div className="course__box-left-teacher">
                                            <i className="course__box-left-icon fa fa-chalkboard-teacher"></i>
                                            <span className="course__box-left-name">
                                              محمد امین سعیدی راد
                                            </span>
                                          </div>
                                          <div className="course__box-left-stars">
                                            <span className="course__box-left-star">
                                              <img src="/images/svgs/star_fill.svg" />
                                            </span>
                                            <span className="course__box-left-star">
                                              <img src="/images/svgs/star_fill.svg" />
                                            </span>
                                            <span className="course__box-left-star">
                                              <img src="/images/svgs/star_fill.svg" />
                                            </span>
                                            <span className="course__box-left-star">
                                              <img src="/images/svgs/star_fill.svg" />
                                            </span>
                                            <span className="course__box-left-star">
                                              <img src="/images/svgs/star_fill.svg" />
                                            </span>
                                          </div>
                                        </div>
                                        <div className="course__box-left-bottom">
                                          <div className="course__box-left-des">
                                            <p>{course.description}</p>
                                          </div>
                                        </div>
                                        <div className="course__box-footer">
                                          <div className="course__box-footer-right">
                                            <i className="course__box-footer-icon fa fa-users"></i>
                                            <span className="course__box-footer-count">
                                              202
                                            </span>
                                          </div>
                                          <span className="course__box-footer-left">
                                            {course.price === 0
                                              ? "رایگان"
                                              :`${course.price.toLocaleString()} تومان`}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}

                            </>
                            )}
                           </>

                         ) : (
                          <div className="alert alert-danger text-center">
                            هیچ دوره ای برای 
                            {' '}{statusTitle}{' '}
                          وجود ندارد
                          </div>
                         )}

                          <Pagination
                          pathname={`/category-info/${categoryName}`}
                          items={orderedCourses}
                          itemsCount={3}
                          setShownCourses={setShownCourses}
                          />
                        </>
                      ) :
                      
                      (<div className="alert alert-warning text-center">هنوز دوره ای برای این دسته بندی وجود ندارد</div>)}
                      
                    </div>
                </div>
            </div>
          </div>
    </section>
        <Footer/>
        </>
     );
}
 
export default CategoryInfo;