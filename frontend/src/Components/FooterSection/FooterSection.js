import React from "react";
import './FooterSection.css'

const FooterSection = ({footerSectionTitle,children}) => {
    return ( 
        <div class="col-4">
        <div class="footer-widgets__item">
          <span class="footer-widgets__title">
            {footerSectionTitle}
          </span>
          
            {children}
          
        </div>
      </div>
     );
}
 
export default FooterSection;