import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArticleBox from "../ArticleBox/ArticleBox";
import CourseBox from "../CourseBox/CourseBox";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import SectionHeader from "../SectionHeader/SectionHeader";
import Topbar from "../Topbar/Topbar";

const Search = () => {

    const [reasultForCourses,setReasultForCourses] = useState([])
    const [reasultForArticles,setReasultForArticles] = useState([])
    const {searchValue} = useParams()

    useEffect(()=>{
        fetch(`http://localhost:4000/v1/search/${searchValue}`)
        .then(res => res.json())
        .then(searchResult =>{
            setReasultForArticles(searchResult.allResultArticles)
            setReasultForCourses(searchResult.allResultCourses)
        })
    },[])
    
    return (
        <>
        <Topbar/>
        <Navbar/>
        <div className="courses">
         <div className="container">
            <SectionHeader title='نتیجه جستجوی شما برای دوره ها' subTitle='سکوی پرتاپ شما به سمت موفقیت'/>
            {reasultForCourses.length === 0 ? (
                <div className="alert alert-warning text-center my-5">نتیجه ای برای جستجوی دوره ها یافت نشد</div>
            ):(
                <div className="courses-content mb-3">
                    <div className="container">
                        <div className="row">
                            {reasultForCourses.map(course =>(
                            <CourseBox {...course}/>
                            ))}
                        </div>
                </div>
            </div>
            )}
            <SectionHeader title='نتیجه جستجوی شما برای مقالات ' subTitle='پیش یه سوی ارتقاء دانش'/>
            {reasultForArticles.length === 0 ? (
                <div className="alert alert-warning text-center my-5">نتیجه ای برای جستجوی مقالات  یافت نشد</div>
            ):(
                <div className="courses-content">
                    <div className="container">
                        <div className="row">
                            {reasultForArticles.map(article =>(
                            <ArticleBox {...article}/>
                            ))}
                        </div>
                    </div>
            </div>
            )}
         </div>
        </div>
        <Footer/>
        </>
      );
}
 
export default Search;
<>
</>