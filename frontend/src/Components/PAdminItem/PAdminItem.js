import React from "react";

const PAdminItem = ({title,count}) => {
    return (
        <div class="col-4">
          <div class="home-content-revanue box">
            <div class="home-box">
              <div class="home-box-left">
                <div class="home-box-title">
                  <span>{title}</span>
                </div>
                <div class="home-box-value">
                  <div class="home-box-price">
                    <span>{count}</span>
                  </div>
                  
                </div>
                <div class="home-box-text">
                  <span>{title} در یک ماه گذشته</span>
                </div>
              </div>
              <div class="home-box-right">
                <div class="home-box-icon">
                  <i class="fas fa-money-bill-alt"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}
 
export default PAdminItem;