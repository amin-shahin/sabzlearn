import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { AuthContext } from "../../../contexts/AuthContext";
import './SidebarAdminPanel.css'

const SidebarAdminPanel = () => {

  const authContextData =  useContext(AuthContext)
  const navigate = useNavigate()

  const logoutUesr = ()=>{
    // authContextData.logout()
    swal({
      title:'از خروج اطمینان دارید؟',
      icon:'warning',
     
      buttons:{
      cancel: "خیر",
      catch: 'بله'
      }
  
    }).then((button) =>{
      switch(button){
        case 'catch':{
          swal({
            title:'با موفقیت خارج شدید',
            icon:'success',
            button:'تایید'
          })

          authContextData.logout()
          navigate('/')
          break
        }
        case 'cancel':{
          break
        }
        default:{
          break
        }
      }

    })
  }

    return ( 
        <div id="sidebar" class="col-2">
        <div class="sidebar-header">
          <div class="sidebar-logo">
            <Link to="">
              <img src="/images/logo/Logo.png" alt="Logo" />
            </Link>
          </div>
  
          <div class="sidebar-menu-btn">
            <i class="fas fa-bars"></i>
          </div>
        </div>
        <div class="sidebar-menu">
          <ul>
            <li class="active-menu">
              <Link to="">
                <span>صفحه اصلی</span>
              </Link>
            </li>
            <li>
              <Link to="courses">
                <span>دوره ها</span>
              </Link>
            </li>
            <li>
              <Link to="sessions">
                <span>جلسه های دوره ها</span>
              </Link>
            </li>
            <li>
              <Link to="menus">
                <span>منو ها</span>
              </Link>
            </li>
            <li>
              <Link to="articles">
                <span>مقاله ها</span>
              </Link>
            </li>
            <li>
              <Link to="users">
                <span>کاربران</span>
              </Link>
            </li>
            <li>
              <Link to="comments">
                <span>کامنت ها</span>
              </Link>
            </li>
            <li>
              <Link to="dis-count">
                <span>کدهای تخفیف</span>
              </Link>
            </li>
            <li>
              <Link to="categories">
                <span>دسته‌بندی‌ها</span>
              </Link>
            </li>
            <li>
              <Link to="contacts">
                <span> پیغام های ارتباط با ما</span>
              </Link>
            </li>
            <li>
              <Link onClick={logoutUesr}>
                <span >خروج</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
     );
}
 
export default SidebarAdminPanel;