import React from "react";

export default function DataTable({ children, title }) {
  return (
    <div class="container">
      <div class="home-content-latset-users">
        <div class="home-content-users-title">
          <span>
            لیست <span class="signup">{title}</span>
          </span>
        </div>
        <div class="home-content-users-table">
          {
              children
          }
        </div>
      </div>
    </div>
  );
}
