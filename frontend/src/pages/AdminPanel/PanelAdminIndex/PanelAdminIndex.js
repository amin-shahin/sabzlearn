import React, { useEffect, useState } from "react";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import PAdminItem from "../../../Components/PAdminItem/PAdminItem";


import "./PanelAdminIndex.css";

export default function PanelAdminIndex() {

    const [infos, setInfos] = useState([])
    const [lastRegisteredUsers, setLastRegisteredUsers] = useState([])
    const [adminName, setAdminName] = useState('')

  useEffect(() => {
    fetch("http://localhost:4000/v1/infos/p-admin", {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    })
      .then((res) => res.json())
      .then((pageInfo) => {
        console.log(pageInfo);
        setInfos(pageInfo.infos)
        setLastRegisteredUsers(pageInfo.lastUsers)
        setAdminName(pageInfo.adminName)
      });
  }, []);

  return (
    <>
      <div class="container-fluid" id="home-content">
        <div class="container">
          <div class="home-content-title">
            <span class="welcome">
              خوش آمدید,<span class="name">{adminName}</span>
            </span>
          </div>
          <div class="home-content-boxes">
            <div class="row">
              {
                 infos.map(item => (
                   <PAdminItem {...item} />
                 ))
              }
              
            </div>
          </div>

          <div class="home-content-latset-users">
            <DataTable title="افراد اخیرا ثبت نام شده">

            <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام و نام خانوادگی</th>
              <th>ایمیل</th>
            </tr>
          </thead>
          <tbody>
            {lastRegisteredUsers.map((user, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                {/* <td>09123443243</td> */}
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>

            </DataTable>
          </div>
        </div>
      </div>
    </>
  );
}
