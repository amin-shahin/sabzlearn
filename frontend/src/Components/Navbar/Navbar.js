import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import './Navbar.css'

const Navbar = () => {


  const authContextData = useContext(AuthContext)

    const [allMenusInNavbar,setAllMenusInNavbar]= useState([])

    useEffect(()=>{
      fetch(`http://localhost:4000/v1/menus`)
      .then(res => res.json())
      .then(menus => {
        setAllMenusInNavbar(menus)
      })
    },[])
    return ( 
          
        <div className="main-header">
          <div className="container-fluid">
            <div className="main-header__content">
              <div className="main-header__right">
                <img src="/images/logo/Logo.png" className="main-header__logo" alt="لوگوی سبزلرن" />
  
                <ul className="main-header__menu">

                  <li className="main-header__item">
                    <a href="#" className="main-header__link">صفحه اصلی</a>
                  </li>
                  {
                    allMenusInNavbar.map(menu =>(
                      <li key={menu._id} className="main-header__item">
                        <Link to={menu.href} className="main-header__link"> {menu.title}
                        {menu.submenus.length !== 0 &&  (
                          <>
                          <i className="fas fa-angle-down main-header__link-icon"></i>
                          <ul className="main-header__dropdown">
                            { menu.submenus.map(subMenu=>(

                            <li key={subMenu._id} className="main-header__dropdown-item">
                              <Link to={subMenu.href} className="main-header__dropdown-link">{subMenu.title}</Link>
                            </li>
                            ))}
                          </ul>
                        </>
                        )}
                        </Link>
                     </li>
                    ))
                  }
                </ul>
              </div>
  
              <div className="main-header__left">
                <a href="#" className="main-header__search-btn">
                  <i className="fas fa-search main-header__search-icon"></i>
                </a>
                <a href="#" className="main-header__cart-btn">
                  <i className="fas fa-shopping-cart main-header__cart-icon"></i>
                </a>
                {
                authContextData.isLoggedIn ? 
                  (
                     <Link to="#" className="main-header__profile">
                     <span className="main-header__profile-text"> {authContextData.userInfos.name} </span>
                   </Link>
                  ):(
                  <Link to="/login" className="main-header__profile">
                  <span className="main-header__profile-text"> ثبت نام / ورود </span>
                </Link>
                  )
             }
             
              </div>
            </div>
          </div>
        </div>
     );
}
 
export default Navbar;