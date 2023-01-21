import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import DataTable from "../../Components/AdminPanel/DataTable/DataTable";
import Input from "../../Components/Form/Input";
import useForm from "../../Hooks/useForm";
import { emailValidator, maxValidator, minValidator, requiredValidator } from "../../validators/rules";


export default function Users() {

  const [allUser,setAllUser] = useState([])
  const [formState,onChangeInputHandler] = useForm({
    name:{
      value:'',
      isValid:false
    },
    username:{
      value:'',
      isValid:false
    },
    email:{
      value:'',
      isValid:false
    },
    phone:{
      value:'',
      isValid:false
    },
    password:{
      value:'',
      isValid:false
    },
  },false)


  const localStorageData = JSON.parse(localStorage.getItem('user'))
  useEffect(()=>{
    getAllUserData()
  },[])

    async function getAllUserData () {
      const res = await fetch(`http://localhost:4000/v1/users`,{
        headers:{
          'Authorization' : `Bearer ${localStorageData.token}`
        }
      })
      const result = await res.json()
      console.log(result);
      setAllUser(result)
    }

    const registerNewUser = (event)=>{
      event.preventDefault()
      const newUserAddByAdmin = {
        name: formState.inputs.name.value,
        username:formState.inputs.username.value,
        email: formState.inputs.email.value,
        phone:formState.inputs.phone.value,
        password: formState.inputs.password.value,
        confirmPassword: formState.inputs.password.value
      }

      fetch(`http://localhost:4000/v1/auth/register`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(newUserAddByAdmin)
      }).then(res => res.json())
      .then(() => getAllUserData())

    }
   
    const deleteUser = (userID)=>{
      swal({
        title:'آیا از حذف این کاربر اطمینان دارید؟',
        icon:'warning',
        buttons:['خیر','بله']
      }).then(result =>{
        if(result){
          fetch(`http://localhost:4000/v1/users/${userID}`,{
            method:'DELETE',
            headers:{
              'Authorization' : `Bearer ${localStorageData.token}`
            }
          }).then(res =>{
            if(res.ok){
              swal({
                title:'کاربر با  موفقیت حذف شد',
                icon:'success',
                button:'بستن'
              }).then(()=> getAllUserData())
            }
          })
        }
      })
    }

    const banUser = (userID)=>{
      swal({
        title:'آیا از بن این کاربر اطمینان دارید؟',
        icon:'warning',
        buttons:['خیر','بله']
      }).then(result =>{
        if(result){
          fetch(`http://localhost:4000/v1/users/ban/${userID}`,{
            method:'PUT',
            headers:{
              'Authorization' : `Bearer ${localStorageData.token}`
            }
          }).then(res =>{
            if(res.ok){
              swal({
                title:'کاربر با  موفقیت بن شد',
                icon:'success',
                button:'بستن'
              }).then(()=> getAllUserData())
            }
          })
        }
      })
    }
    
    const editUser = (userID)=>{
      console.log('edit');
    }

  return (
    <>
    <div class="home-content-edit">
        <div class="back-btn">
          <i class="fas fa-arrow-right"></i>
        </div>
        <form class="form">
          <div class="col-6">
            <div class="name input">
              <label class="input-title">نام و نام خانوادگی</label>
              <Input
                type="text"
                className=""
                id="name"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
                onChangeInputHandler={onChangeInputHandler}
                placeholder="لطفا نام و نام خانوادگی کاربر را وارد کنید..."
              />
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-6">
            <div class="family input">
              <label class="input-title">نام کاربری</label>
              <Input
                type="text"
                className=""
                id="username"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
                onChangeInputHandler={onChangeInputHandler}
                placeholder="لطفا نام کاربری را وارد کنید..."
              />
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-6">
            <div class="email input">
              <label class="input-title">ایمیل</label>
              <Input
                type="text"
                className=""
                id="email"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                  emailValidator(),
                ]}
                onChangeInputHandler={onChangeInputHandler}
                placeholder="لطفا ایمیل کاربر را وارد کنید..."
              />
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-6">
            <div class="password input">
              <label class="input-title">رمز عبور</label>
              <Input
                type="text"
                className=""
                id="password"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
                onChangeInputHandler={onChangeInputHandler}
                placeholder="لطفا رمز عبور کاربر را وارد کنید..."
              />
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-6">
            <div class="phone input">
              <label class="input-title">شماره تلفن</label>
              <Input
                type="text"
                className=""
                id="phone"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
                onChangeInputHandler={onChangeInputHandler}
                placeholder="لطفا شماره تلفن کاربر را وارد کنید..."
              />
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-12">
            <div class="bottom-form">
              <div class="submit-btn">
                <input type="submit" value="افزودن" onClick={registerNewUser} />
              </div>
            </div>
          </div>
        </form>
      </div>
      <DataTable title="کاربران">
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام ونام خانوادگی</th>
              <th>شماره</th>
              <th>ایمیل</th>
              <th>ویرایش</th>
              <th>حذف</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {allUser.map((user,index)=>(
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={()=> editUser(user._id)} type="button" className="btn btn-primary edit-btn">
                  ویرایش
                </button>
              </td>
              <td>
                <button onClick={()=> deleteUser(user._id)} type="button" className="btn btn-danger delete-btn">
                  حذف
                </button>
              </td>
              <td>
                <button onClick={()=> banUser(user._id)} type="button" className="btn btn-danger delete-btn">
                  بن 
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
