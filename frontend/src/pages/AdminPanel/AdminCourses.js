import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import DataTable from "../../Components/AdminPanel/DataTable/DataTable";
import Input from "../../Components/Form/Input";
import useForm from "../../Hooks/useForm";
import { minValidator, requiredValidator } from "../../validators/rules";
import './Courses.css'
const AdminCourses = () => {
    const [allCourse,setAllCourse] = useState([])
    const [allCategories,setAllCategories] = useState([])
    const [categoryID,setCategoryID] = useState(-1)
    const [coverCourse,setCoverCourse] = useState({})
    const [statusCourse,setStatusCourse] = useState('start')
    

    const [formState,onChangeInputHandler] = useForm({

      name:{
        value:'',
        isValid:false
      },
      shortName:{
        value:'',
        isValid:false
      },
      price:{
        value:'',
        isValid:false
      },
      description:{
        value:'',
        isValid:false
      },
      support:{
        value:'',
        isValid:false
      },

    },false)

    useEffect(()=>{
      getAllCourses()
      getAllCategories()
    },[])

    function getAllCategories() {
      fetch(`http://localhost:4000/v1/category`)
        .then((res) => res.json())
        .then((result) => setAllCategories(result));
    }
    function getAllCourses (){
      fetch(`http://localhost:4000/v1/courses`)
      .then(res => res.json())
      .then(result => setAllCourse(result))
    }
    const editcourse = () => {
        console.log();
    }
    const deletecourse = (courseID) => {
      const localStorageData = JSON.parse(localStorage.getItem('user'))

      swal({
        title:'آیا از حذف این دوره اطمینان دارید',
        icon:'warning',
        buttons:['خیر','بله']
      }).then(result =>{
        if(result){
          fetch(`http://localhost:4000/v1/courses/${courseID}`,{
            method:'DELETE',
            headers:{
              'Authorization' : `Bearer ${localStorageData.token}`
            }
          }).then(res => {
            if(res.ok){
              swal({
                title:'دوره مورد نظر با موفقیت حذف شد',
                icon:'success',
                buttons:'بستن'
            }).then(()=>getAllCourses())
          }else{
            swal({
              title:' حذف دوره مورد نظر با خطا مواجه شد',
              icon:'error',
              buttons:'بستن'
          })
          }
          })
        }
      })
    }

    const selectCategory = (event)=>{
      setCategoryID(event.target.value)
    }
    const addNewCourseByAdmin = (event)=>{
      event.preventDefault()
      const localStorageData = JSON.parse(localStorage.getItem('user'))
      let formData =  new FormData()
      formData.append('name',formState.inputs.name.value)
      formData.append('description',formState.inputs.description.value)
      formData.append('price',formState.inputs.price.value)
      formData.append('shortName',formState.inputs.shortName.value)
      formData.append('support',formState.inputs.support.value)
      formData.append('cover',coverCourse)
      formData.append('status',statusCourse)
      formData.append('categoryID',categoryID)

      if(categoryID === -1){
        swal({
          title:'لطفا دسته بندی را انتخاب نمایید',
          icon:'error',
          buttons:'بستن'
        })
      }else{
        fetch(`http://localhost:4000/v1/courses`,{
        method:'POST',
        headers:{
          'Authorization' : `Bearer ${localStorageData.token}`
        },
        body:formData
      }).then( res => {
        if(res.ok){
          swal({
          title:'دوره با موفقیت اضافه شد',
          icon:'success',
          button:'بستن'
          })
        }
      }).then(()=> getAllCourses())
      }

    }
    return ( 
        <>
              <div class="container-fluid" id="home-content">
        <div class="container">
          <div class="home-title">
            <span>افزودن دوره جدید</span>
          </div>
          <form class="form">
            <div class="col-6">
              <div class="name input">
                <label class="input-title">نام دوره</label>
                <Input
                onChangeInputHandler={onChangeInputHandler}
                  type="text"
                  element="input"
                  id="name"
                  validations={[
                    requiredValidator(),
                    minValidator(5)
                  ]}
                  placeholder="لطفا نام دوره را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">قیمت دوره</label>
                <Input
                onChangeInputHandler={onChangeInputHandler}
                  type="text"
                  element="input"
                  id="price"
                  validations={[
                    requiredValidator(),
                    minValidator(5)
                  ]}
                  placeholder="لطفا قیمت دوره را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="number input">
                <label class="input-title">توضیحات دوره</label>
                <Input
                onChangeInputHandler={onChangeInputHandler}
                  type="text"
                  element="input"
                  id="description"
                  validations={[
                    requiredValidator(),
                    minValidator(5)
                  ]}
                  placeholder="لطفا توضیحات دوره را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="number input">
                <label class="input-title">پشتیبانی دوره</label>
                <Input
                onChangeInputHandler={onChangeInputHandler}
                  type="text"
                  element="input"
                  id="support"
                  validations={[
                    requiredValidator(),
                    minValidator(5)
                  ]}
                  placeholder="لطفا پشتیبانی دوره را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">URL دوره</label>
                <Input
                onChangeInputHandler={onChangeInputHandler}
                  type="text"
                  element="input"
                  id="shortName"
                  validations={[
                    requiredValidator(),
                    minValidator(2)
                  ]}
                  placeholder="لطفا لینک دوره را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="number input">
                <label class="input-title">دسته‌بندی دوره</label>
                <select onChange={selectCategory}>
                  <option value={-1} > لطفا دسته بندی را انتخاب نمایید</option>
                  {allCategories.map((category) => (
                    <option value={category._id}>{category.title}</option>
                  ))}
                </select>
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="file">
                <label class="input-title">عکس دوره</label>
                <input
                type="file" id="file" onChange={event =>{
                  setCoverCourse(event.target.files[0])
                  console.log(event.target.files);
                }} />
              </div>
            </div>
            <div class="col-12">
              <div class="bottom-form">
                <div class="condition">
                  <label class="input-title">وضعیت دوره</label>
                  <div class="radios">
                    <div class="available">
                      <label>
                        <span>پیش فروش</span>
                        <input
                        
                          onChange={ event => setStatusCourse(event.target.value)}
                          type="radio"
                          value="presell"
                          name="condition"
                          checked
                        />
                      </label>
                    </div>
                    <div class="unavailable">
                      <label>
                        <span>در حال برگزاری</span>
                        <input
                        onChangeInputHandler={onChangeInputHandler}
                          onChange={ event => setStatusCourse(event.target.value)}
                          type="radio"
                          value="start"
                          name="condition"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div class="submit-btn">
                  <input
                   type="submit" value="افزودن" onClick={addNewCourseByAdmin} />
                </div>
              </div>
            </div>

          </form>
        </div>
      </div>
        <DataTable title="دوره ها">
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام دوره </th>
              <th>قیمت</th>
              <th>وضعیت</th>
              <th>مدرس</th>
              <th>دسته بندی</th>
              <th>ویرایش</th>
              <th>حذف</th>
              
            </tr>
          </thead>
          <tbody>
            {allCourse.map((course,index)=>(
            <tr key={course._id}>
              <td>{index + 1}</td>
              <td>{course.name}</td>
              <td>{course.price === 0 ? 'رایگان' : course.price.toLocaleString() }</td>
              <td>{course.isComplete === 0 ? 'در حال برگزاری' : "تکمیل شده"}</td>
              <td>{course.creator}</td>
              <td>{course.categoryID}</td>
           

              <td>
                <button onClick={()=> editcourse(course._id)} type="button" className="btn btn-primary edit-btn">
                  ویرایش
                </button>
              </td>
              <td>
                <button onClick={()=> deletecourse(course._id)} type="button" className="btn btn-danger delete-btn">
                  حذف
                </button>
              </td>
              <td>

              </td>
            </tr>
            ))}
          </tbody>
        </table>
        </DataTable>
        </>
     );
}
 
export default AdminCourses;