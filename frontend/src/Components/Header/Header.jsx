import React from "react";
import Landing from "../Landing/Landing";
import Navbar from "../Navbar/Navbar";
import Topbar from "../Topbar/Topbar";
import './Header.css'

const Header = () => {

  
    return (
       
            <header className="header">
                    <Topbar/>
                    <Navbar/>
                    <Landing />
            </header>
          
      );
}
 
export default Header;
