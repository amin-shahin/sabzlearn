import React, { useEffect, useState } from "react";

import './TopbarForAdminPanel.css'

const TopbarForAdminPanel = () => {

    const [adminInfos,setAdminInfos] =  useState({})
    const [adminNotifications,setAdminNotifications] =  useState([])
    const [isShowNotificationsBox,setIsShowNotificationsBox] =  useState(false)

    const localStorageData = JSON.parse(localStorage.getItem('user'))
    
    useEffect(()=>{
        fetch(`http://localhost:4000/v1/auth/me`,{
            headers:{
                'Authorization': `Bearer ${localStorageData.token}`
            }
        })
        .then(res => res.json())
        .then(adminData =>{
            // console.log(adminData);
            setAdminInfos(adminData)
            setAdminNotifications(adminData.notifications)
        })
    },[seeNotification])

    function seeNotification(notificationID) {
      console.log(notificationID);
        fetch(`http://localhost:4000/v1/notifications/see/${notificationID}`,{
            method:'PUT',
            headers:{
              'Authorization' : `Bearer ${localStorageData.token}`
            }
        }).then(res => res.json()).then(result => console.log(result))
    }

    return ( 
        <div className="container-fluid">
        <div className="container">
          <div className={`home-header ${isShowNotificationsBox && 'active-modal-notification'}`}>
            <div className="home-right">
              <div className="home-searchbar">
                <input type="text" className="search-bar" placeholder="جستجو..." />
              </div>
              <div className="home-notification">
                <button type="button" onMouseEnter={()=> setIsShowNotificationsBox(true)}>
                  <i className="far fa-bell"></i>
                </button>
              </div>
              <div className="home-notification-modal" onMouseEnter={()=> setIsShowNotificationsBox(true)} onMouseLeave={()=> setIsShowNotificationsBox(false)}>
                <ul className="home-notification-modal-list">
                  {adminNotifications.length === 0 ? (
                   <li  className="home-notification-modal-item text-danger ">
                  هیچ پیغامی وجود ندارد
                  </li>
                  ):(
                    <>
                        {adminNotifications.map(notification =>(
                            <li key={notification._id} className="home-notification-modal-item">
                            
                            <span className="home-notification-modal-text">{notification.msg}</span>
                            <label className="switch">
                                {/* <input type="checkbox" checked />
                                <span className="slider round"></span> */}
                                <a className="text-apply-notification" href="javascript:void(0)" onClick={() => seeNotification(notification._id)}>متوجه شدم</a>
                            </label>
                        </li>
                        ))}
                    </>
                  )}
                    
                 

                </ul>
              </div>
            </div>
            <div className="home-left">
              <div className="home-profile">
                <div className="home-profile-image">
                  <a href="#">
                    <img src={adminInfos.profile} alt="" />
                  </a>
                </div>
                <div className="home-profile-name">
                  <a href="#"> {adminInfos.name}</a>
                </div>
                <div className="home-profile-icon">
                  <i className="fas fa-angle-down"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
     );
}
 
export default TopbarForAdminPanel;