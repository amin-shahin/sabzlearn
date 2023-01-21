import React from "react";
import { Outlet } from "react-router-dom";
import SidebarAdminPanel from "../../Components/AdminPanel/SidebarAdminPanel/SidebarAdminPanel";
import TopbarForAdminPanel from "../../Components/TopbarForAdminPanel/TopbarForAdminPanel";

import './index.css'

const AdminPanel = () => {
    return ( 
        <>
        <div id="content">
            <div className="col-2">
                <SidebarAdminPanel/>
            </div>
            <div id="home" className="col-10">
                <TopbarForAdminPanel/>
                <div className="container-fluid" id="home-content">
                  <Outlet/> 
                </div>
            </div>
        </div>
        </>
     );
}
 
export default AdminPanel;