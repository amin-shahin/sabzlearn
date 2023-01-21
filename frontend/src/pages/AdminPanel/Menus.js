import React, { useEffect } from "react";
import { useState } from "react";
import swal from "sweetalert";
import DataTable from "../../Components/AdminPanel/DataTable/DataTable";
import Input from "../../Components/Form/Input";
import useForm from "../../Hooks/useForm";
import { minValidator } from "../../validators/rules";

const Menus = () => {
    const [menus,setMenus] = useState([])

    const [menuParent, setMenuParent] = useState("-1");

  const [formState, onChangeInputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      href: {
        value: "",
        isValid: false,
      },
    },
    false
  );

    useEffect(()=>{
      getAllMenus()
    },[])

    function getAllMenus(){
        fetch(`http://localhost:4000/v1/menus/all`)
        .then(res => res.json())
        .then(menus =>{ 
            console.log(menus);
            setMenus(menus)
        })
    }

    const editMenu =(menuID)=>{

    }
    const deleteMenu =(menuID)=>{
        
       swal({
        title:'آیا از حذف این مورد اطمینان دارید؟',
        icon:'warning',
        buttons:['خیر','بله']
       }).then(res => {
            if(res){
                fetch(`http://localhost:4000/v1/menus/${menuID}`,{
                    method:"DELETE",
                    headers:{
                        'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
                    }
                }).then(res => {
                    if(res.ok){
                        swal({
                            title:'منو مورد نظر با موفقیت حذف گردید',
                            icon:'warning', 
                            buttons:'بستن'
                        })
                    }
                })
                .then(() =>{
                    getAllMenus()
                })
            }
        })
        
    }

    const createMenu = (event) =>{
        event.preventDefault()
        const newMenu = {
            title:formState.inputs.title.value,
            href:formState.inputs.href.value,
            parent:menuParent === '-1' ? undefined : menuParent
        }

        fetch(`http://localhost:4000/v1/menus`,{
            method:'POST',
            headers:{
                'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify(newMenu)
        }).then(res => {
            if(res.ok){
                swal({

                title:'منو با موفقیت اضافه شد',
                icon:'success',
                button:'بستن'
                }).then(()=> getAllMenus())
            }
        })
        
    }

    return ( 
        <>
            <div class="container">
            <div class="home-title">
            <span>افزودن کاربر جدید</span>
            </div>
            <form class="form">
            <div class="col-6">
                <div class="name input">
                <label class="input-title">عنوان</label>
                <Input
                    element="input"
                    onChangeInputHandler={onChangeInputHandler}
                    id="title"
                    type="text"
                    isValid="false"
                    placeholder="لطفا عنوان را وارد کنید..."
                    validations={[minValidator(5)]}
                />
                <span class="error-message text-danger"></span>
                </div>
            </div>
            <div class="col-6">
                <div class="name input">
                <label class="input-title">عنوان</label>
                <Input
                    element="input"
                    onChangeInputHandler={onChangeInputHandler}
                    id="href"
                    type="text"
                    isValid="false"
                    validations={[minValidator(5)]}
                    placeholder="لطفا عنوان را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
                </div>
            </div>
            <div class="col-6">
                <div class="name input">
                <label class="input-title">عنوان</label>
                <select
                    class="select"
                    onChange={(event) => setMenuParent(event.target.value)}
                >
                    <option value="-1">منوی اصلی را انتخاب کنید</option>
                    {menus.map((menu) => (
                    <>
                        {!Boolean(menu.parent) && (
                        <option value={menu._id}>{menu.title}</option>
                        )}
                    </>
                    ))}
                </select>
                <span class="error-message text-danger"></span>
                </div>
            </div>
            <div class="col-12">
                <div class="bottom-form">
                <div class="submit-btn">
                    <input type="submit" value="افزودن" onClick={createMenu} />
                </div>
                </div>
            </div>
            </form>
            </div>

            <DataTable title='منوها'>
                <table className="table">
            <thead>
                <tr>
                <th>شناسه</th>
                <th>عنوان منو</th>
                <th>لینک</th>
                <th>ساب منو</th>
                <th>ویرایش</th>
                <th>حذف</th>
                </tr>
            </thead>
            <tbody>
                {menus.map((menu,index)=>(
                <tr key={menu._id}>
                <td>{index + 1}</td>
                <td>{menu.title}</td>
                <td>{menu.href}</td>
                <td>
                    {menu.parent ? menu.parent.title : <i className="fa fa-check"></i>}
                    </td>
                <td>
                    <button onClick={()=> editMenu(menu._id)} type="button" className="btn btn-primary edit-btn">
                    ویرایش
                    </button>
                </td>
                <td>
                    <button onClick={()=> deleteMenu(menu._id)} type="button" className="btn btn-danger delete-btn">
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
 export default Menus;