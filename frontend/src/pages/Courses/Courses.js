import React, { useEffect, useState } from "react";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import CourseBox from "../../Components/CourseBox/CourseBox";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import Pagination from "../../Components/Pagination/Pagination";
import Topbar from "../../Components/Topbar/Topbar";
import './Courses.css'

const Courses = () => {

    const [allCourses,setAllCourses]= useState([])
    const [shownCourses,setShownCourses] = useState([])

    useEffect(()=>{
            const fetchData = async () => {
            const res = await fetch(`http://localhost:4000/v1/courses`)
            const result = await res.json()
            setAllCourses(result)
            }
            fetchData()
    },[])

    return ( 
        <>
        <Topbar/>
        <Navbar/>
        <Breadcrumb 
        links={[
            {id:1,title:'خانه',to:''},
            {id:2,title:'تمامی دوره ها',to:'courses'},  
        ]}
        />
        <div className="courses">
            <div className="container">
                <div className="courses-content">
                    <div className="container">
                        <div className="row">
                            {shownCourses.map( course =>(
                                <CourseBox {...course}/>
                            ))}
                        </div>
                    </div>
                  <Pagination
                  items={allCourses}
                  itemsCount={3}
                  pathname="/courses"
                  setShownCourses={setShownCourses}
                  />
                </div>
            </div>
        </div>
        <Footer/>
        </>
     );
}
 
export default Courses;