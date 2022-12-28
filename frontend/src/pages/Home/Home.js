import React from "react";
import './Home.css'
import AboutUs from "../../Components/AboutUs/AboutUs";
import Header from "../../Components/Header/Header";
import PopularCourses from "../../Components/PopularCourses/PopularCourses";
import LastCourses from "../../Components/LastCourses/LastCourses";
import PresellCourses from "../../Components/PresellCourses/PresellCourses";
import LastArticles from "../../Components/LastArticles/LastArticles";
import Footer from "../../Components/Footer/Footer";

const Home = () => {
    return (  
        <div className="home">
        <Header/>
        <LastCourses />
        <AboutUs/>
        <PopularCourses/>
        <PresellCourses/>
        <LastArticles/>
        <Footer/>
        </div>
    );
}
 
export default Home;