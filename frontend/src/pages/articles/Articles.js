import React, { useEffect, useState } from "react";
import ArticleBox from "../../Components/ArticleBox/ArticleBox";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import Pagination from "../../Components/Pagination/Pagination";
import Topbar from "../../Components/Topbar/Topbar";


const Courses = () => {

    const [allArticles,setAllArticles]= useState([])
    const [shownArticles,setShownArticles] = useState([])

    useEffect(()=>{
            const fetchData = async () => {
            const res = await fetch(`http://localhost:4000/v1/articles`)
            const result = await res.json()
            setAllArticles(result)
            console.log("art",result);
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
            {id:2,title:'تمامی مقاله ها',to:'articles/1'},  
        ]}
        />
        <div className="courses">
            <div className="container">
                <div className="courses-content">
                    <div className="container">
                        <div className="row">
                            {shownArticles.filter(article => article.publish ===1).map( article =>(
                                <ArticleBox {...article}/>
                            ))}
                        </div>
                    </div>
                  <Pagination
                  items={allArticles}
                  itemsCount={3}
                  pathname="/articles"
                  setShownCourses={setShownArticles}
                  />
                </div>
            </div>
        </div>
        <Footer/>
        </>
     );
}
 
export default Courses;