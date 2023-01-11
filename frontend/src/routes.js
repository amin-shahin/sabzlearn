import React from "react";
import Home from "./pages/Home/Home"
import CategoryInfo from "./pages/CategoryInfo/CategoryInfo"
import ArticleInfo from "./pages/ArticleInfo/ArticleInfo"
import Courses from "./pages/Courses/Courses"
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import CourseInfo from "./pages/CourseInfo/CourseInfo";
import Articles from './pages/articles/Articles'
import ContactUs from "./pages/ContactUs/ContactUs";
import Search from "./Components/Search/Search";

import AdminPanel from "./pages/AdminPanel/AdminPanel";
import AdminCourses from "./pages/AdminPanel/AdminCourses";
import AdminArticles from "./pages/AdminPanel/AdminArticles";
import Users from "./pages/AdminPanel/Users";
import Menus from "./pages/AdminPanel/Menus";



let routes =[
    {path:'/',element:<Home/>},
    {path:'/course-info/:courseName',element:<CourseInfo/>},
    {path:'/category-info/:categoryName/:page',element:<CategoryInfo/>},
    {path:'/article-info/:articleName',element:<ArticleInfo/>},
    {path:'/courses/:page',element:<Courses/>},
    {path:'/articles/:page',element:<Articles/>},
    {path:'/login',element:<Login/>},
    {path:'/register',element:<Register/>},
    {path:'/contact',element:<ContactUs/>},
    {path:'/search/:searchValue',element:<Search/>},
    {path:'/admin-panel/*',element:<AdminPanel/>,
    children:[
        {path:'users',element:<Users/>},
        {path:'courses',element:<AdminCourses/>},
        {path:'articles',element:<AdminArticles/>},
        {path:'menus',element:<Menus/>}
    ]},
]

export default routes