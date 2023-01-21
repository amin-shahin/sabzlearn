import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import DataTable from "../../Components/AdminPanel/DataTable/DataTable";
import Input from "../../Components/Form/Input";
import useForm from "../../Hooks/useForm";
import { maxValidator, minValidator } from "../../validators/rules";

import './Category.css'

const AdminCategories = () => {
  const [allCategories, setAllCategories] = useState([]);


  const [formState, onChangeInputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      shortname: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    getAllCategories();
  }, []);

  function getAllCategories() {
    fetch(`http://localhost:4000/v1/category`)
      .then((res) => res.json())
      .then((result) => setAllCategories(result));
  }

  const localStorageData = JSON.parse(localStorage.getItem('user'))

  const editcategory = (categoryID) => {
    swal({
        title:'آیا از ویرایش این دسته بندی اطمینان دارید؟',
        icon:'warning',
        buttons:['خیر','بله']
         }).then(result =>{      
                    if(result){
                        swal({
                            title:'عنوان جدید دسته بندی',
                            content:'input',
                            buttons:'ثبت'
                          }).then(valueInput =>{
                            if(valueInput.trim().length){
                                fetch(`http://localhost:4000/v1/category/${categoryID}`,{
                                    method: 'PUT',
                                    headers:{
                                        'Authorization':`Bearer ${localStorageData.token}`,
                                        'Content-Type':'application/json'
                                    },
                                    body:JSON.stringify({
                                       title:valueInput
                                    })
                              } ).then(()=> getAllCategories())
                            }
                        
                    })
                }
         })
    }

  const deletecategory = (categoryID) => {
    swal({
           title:'آیا از حذف این دسته بندی اطمینان دارید؟',
           icon:'warning',
           buttons:['خیر','بله']
            }).then(result =>{
                if(result){
                    fetch(`http://localhost:4000/v1/category/${categoryID}`,{
                        method: 'DELETE',
                        headers:{
                            'Authorization':`Bearer ${localStorageData.token}`
                        }
                    }).then(res => {
                        if(res.ok){
                            swal({
                                title:'دسته بندی با  موفقیت حذف شد',
                                icon:'success',
                                button:'بستن'
                              }).then(()=> getAllCategories())
                        }
                    })
                }

            })
        }




  const createNewCategory = (event) => {
    event.preventDefault();
    const localStorageData = JSON.parse(localStorage.getItem("user"))

    const newCategoryInfo = {
      title: formState.inputs.title.value,
      name: formState.inputs.shortname.value,
    };

    fetch("http://localhost:4000/v1/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorageData.token}`,
      },
      body: JSON.stringify(newCategoryInfo),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        swal({
          title: "دسته بندی مورد نظر با موفقیت اضافه شد",
          icon: "success",
          buttons: "اوکی",
        }).then(() => {
            getAllCategories();
        });
      });
  };
  return (
    <>
    <div className="container-fluid" id="home-content">
        <div className="container">
          <div className="home-title">
            <span>افزودن دسته‌بندی جدید</span>
          </div>
          <form className="form">
            <div className="col-6">
              <div className="name input">
                <label className="input-title">عنوان</label>
                <Input
                  element="input"
                  onChangeInputHandler={onChangeInputHandler}
                  type="text"
                  id="title"
                  placeholder="لطفا عنوان را وارد کنید..."
                  validations={[minValidator(5), maxValidator
                    (20)]}
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="name input">
                <label className="input-title">اسم کوتاه</label>
                <Input
                  element="input"
                  onChangeInputHandler={onChangeInputHandler}
                  type="text"
                  id="shortname"
                  placeholder="لطفا اسم کوتاه را وارد کنید..."
                  validations={[minValidator(5), maxValidator(20)]}
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-12">
              <div className="bottom-form">
                <div className="submit-btn">
                  <input
                    type="submit"
                    value="افزودن"
                    onClick={createNewCategory}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    <DataTable title="کاربران">
      <table className="table">
        <thead>
          <tr>
            <th>شناسه</th>
            <th> عنوان </th>
            <th>ویرایش</th>
            <th>حذف</th>
          </tr>
        </thead>
        <tbody>
          {allCategories.map((category, index) => (
            <tr key={category._id}>
              <td>{index + 1}</td>
              <td>{category.title}</td>

              <td>
                <button
                  onClick={() => editcategory(category._id)}
                  type="button"
                  className="btn btn-primary edit-btn"
                >
                  ویرایش
                </button>
              </td>
              <td>
                <button
                  onClick={() => deletecategory(category._id)}
                  type="button"
                  className="btn btn-danger delete-btn"
                >
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </DataTable>
    </>
  );
}

export default AdminCategories
