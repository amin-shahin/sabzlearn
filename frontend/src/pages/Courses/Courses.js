import React from "react";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import CourseBox from "../../Components/CourseBox/CourseBox";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import Pagination from "../../Components/Pagination/Pagination";
import Topbar from "../../Components/Topbar/Topbar";
import './Courses.css'

const Courses = () => {
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
                            <CourseBox/>
                        </div>
                    </div>
                  <Pagination/>
                </div>
            </div>
        </div>
        <Footer/>
        </>
     );
}
 
export default Courses;