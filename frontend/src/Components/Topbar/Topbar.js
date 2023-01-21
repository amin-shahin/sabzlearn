import React, { memo, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { InfosIndexContext } from "../../contexts/InfosIndexContext";
import './Topbar.css'

const Topbar = memo( () => {
  
  const [allTopbarLinks,setAllTopbarLinks]=useState([])

  const infosContextData = useContext(InfosIndexContext)

  console.log(infosContextData);
  
  useEffect(()=>{
    fetch(`http://localhost:4000/v1/menus/topbar`)
    .then(res => res.json())
    .then(linkData => setAllTopbarLinks(linkData))
  },[])

  const getRandomItemsFromAllTopbarLinks = (linksArray,randomCount)=>{
    const shuffeld = [...linksArray].sort(()=> .5 - Math.random())
    return shuffeld.slice(0,randomCount)
  }

    return ( 
        <div className="top-bar">
        <div className="container-fluid">
          <div className="top-bar__content">

            <div className="top-bar__right">
              <ul className="top-bar__menu">
                {getRandomItemsFromAllTopbarLinks(allTopbarLinks,5).map( link =>(
                  <li className="top-bar__item">
                    <Link to={link.href} className="top-bar__link">{link.title}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="top-bar__left">
              <div className="top-bar__email">
                <a href="#" className="top-bar__email-text top-bar__link">

                 {infosContextData.infos.email}
               
                </a>
                <i className="fas fa-envelope top-bar__email-icon"></i>
              </div>
              <div className="top-bar__phone">
                <a href="#" className="top-bar__phone-text top-bar__link">
               
                 {infosContextData.infos.phone}

                </a>
                <i className="fas fa-phone top-bar__phone-icon"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
     );
})
 
export default Topbar;