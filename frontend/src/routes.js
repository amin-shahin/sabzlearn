import React from "react";
import Home from "./pages/Home/Home"
import CategoryInfo from "./pages/CategoryInfo/CategoryInfo"
import ArticleInfo from "./pages/ArticleInfo/ArticleInfo"
import Courses from "./pages/Courses/Courses"
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import CourseInfo from "./pages/CourseInfo/CourseInfo";



let routes =[
    {path:'/',element:<Home/>},
    {path:'/course-info/:courseName',element:<CourseInfo/>},
    {path:'/category-info/:categoryInfoName',element:<CategoryInfo/>},
    {path:'/articleInfo/:categoryInfoName',element:<ArticleInfo/>},
    {path:'/courses',element:<Courses/>},
    {path:'/login',element:<Login/>},
    {path:'/register',element:<Register/>},
]

export default routes