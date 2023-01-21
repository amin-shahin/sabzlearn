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
import Session from "./pages/Session/Session";

import Search from "./Components/Search/Search";

import AdminPanel from "./pages/AdminPanel/AdminPanel";
import AdminCourses from "./pages/AdminPanel/AdminCourses";
import AdminArticles from "./pages/AdminPanel/AdminArticles";
import AdminCategories from "./pages/AdminPanel/AdminCategories.js";
import AdminContacts from "./pages/AdminPanel/AdminContacts";
import Users from "./pages/AdminPanel/Users";
import Menus from "./pages/AdminPanel/Menus";
import Sessions from "./pages/AdminPanel/Sessions";
import Comments from "./pages/AdminPanel/Comments";
import DisCount from "./pages/AdminPanel/DisCount";
import DraftArticle from "./pages/AdminPanel/DraftArticle";
import PanelAdminIndex from "./pages/AdminPanel/PanelAdminIndex/PanelAdminIndex";



let routes =[
    {path:'/',element:<Home/>},
    {path:'/category-info/:categoryName/:page',element:<CategoryInfo/>},
    {path:'/course-info/:courseName',element:<CourseInfo/>},
    {path:'/article-info/:articleName',element:<ArticleInfo/>},
    {path:'/courses/:page',element:<Courses/>},
    {path:'/:courseName/:sessionID',element:<Session/>},
    {path:'/articles/:page',element:<Articles/>},
    {path:'/login',element:<Login/>},
    {path:'/register',element:<Register/>},
    {path:'/contact',element:<ContactUs/>},
    {path:'/search/:searchValue',element:<Search/>},
    
    {path:'/admin-panel/*',element:<AdminPanel/>,
    children:[
        {path:'',element:<PanelAdminIndex/>},
        {path:'users',element:<Users/>},
        {path:'courses',element:<AdminCourses/>},
        {path:'articles',element:<AdminArticles/>},
        {path:'menus',element:<Menus/>},
        {path:'categories',element:<AdminCategories/>},
        {path:'contacts',element:<AdminContacts/>},
        {path:'sessions',element:<Sessions/>},
        {path:'comments',element:<Comments/>},
        {path:'dis-count',element:<DisCount/>},
        {path:'articles/draft/:articleLink',element:<DraftArticle/>},
    ]},
]

export default routes