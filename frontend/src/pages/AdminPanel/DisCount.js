import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import DataTable from "../../Components/AdminPanel/DataTable/DataTable";
import Input from "../../Components/Form/Input";
import useForm from "../../Hooks/useForm";
import { minValidator, requiredValidator } from "../../validators/rules";

const DisCount = () => {
    const [allCourses,setAllCourses] = useState([])
    const [allCode,setAllCode] = useState([])
    const [courseID,setCourseID] = useState('-1')

const[formState,onChangeInputHandler] = useForm({
    code:{
        value:'',
        isValid:false
    },
    percent:{
        value:'',
        isValid:false
    },
    max:{
        value:'',
        isValid:false
    },
    },false)

    useEffect(()=>{
        getAllCourses()
        getAllDisCountCode()
    },[])

    function getAllCourses (){
        fetch(`http://localhost:4000/v1/courses`)
        .then(res => res.json())
        .then(result => setAllCourses(result))
    }
    function getAllDisCountCode(){
        const localStorageData = JSON.parse(localStorage.getItem('user'))
        fetch(`http://localhost:4000/v1/offs/`,{
            headers:{
                'Authorization':`Bearer ${localStorageData.token}`

            }
        })
        .then(res => res.json())
        .then(result => {
            console.log('code',result);
            setAllCode(result)})
    }


    const createDisCountCode = (event) =>{
        event.preventDefault()
        const createNewCode = {
            code:formState.inputs.code.value,
            max:formState.inputs.max.value,
            percent:formState.inputs.percent.value,
            course:courseID
        }
        fetch(`http://localhost:4000/v1/offs`,{
            method:'POST',
            headers:{
                'Authorization' :`Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify(createNewCode)
        }).then(res =>{
            if(res.ok){
                swal({
                    title:'کد با موفقیت ایجاد شد',
                    icon:'success',
                    button:'بستن'
                }).then(()=> getAllDisCountCode())
     }
     })
        
    }
    const deleteCode = (codeID)=>{
        swal({
            title:'آیا از حذف این کد تخفیف اطمینان دارید؟',
            icon:'warning',
            buttons:['خیر','بله']
        }).then(result =>{
            if(result){
                fetch(`http://localhost:4000/v1/offs/${codeID}`,{
                    method:'DELETE',
                    headers:{
                    'Authorization' :`Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
                    }
                }).then(res =>{
                   
                    if(res.ok){
                        swal({
                            title:'کد با موفقیت حذف شد',
                            icon:'success',
                            button:'بستن'
                        }).then(()=> getAllDisCountCode())
                    }
                })
            }
        })
    }
    return ( 
        <>
    <div className="container-fluid" id="home-content">
        <div className="container">
          <div className="home-title">
            <span>افزودن کد تخفیف جدید</span>
          </div>
          <form className="form">
            <div className="col-6">
              <div className="name input">
                <label className="input-title">عنوان کد</label>
                <Input
                  element="input"
                  id="code"
                  onChangeInputHandler={onChangeInputHandler}
                  type="text"
                  
                  validations={[minValidator(5)]}
                  placeholder="لطفا عنوان کد تخفیف را وارد کنید..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="price input">
                <label className="input-title">درصد کد تخفیف</label>
                <Input
                  element="input"
                  id="percent"
                  onChangeInputHandler={onChangeInputHandler}
                  type="text"
                  
                  validations={[requiredValidator()]}
                  placeholder="لطفا درصد کد تخفیف  را وارد کنید..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="price input">
                <label className="input-title">حداکثر استفاده از کد تخفیف</label>
                <Input
                  element="input"
                  id="max"
                  onChangeInputHandler={onChangeInputHandler}
                  type="text"
              
                  validations={[requiredValidator()]}
                  placeholder="لطفا تعداد استفاده از کد تخفیف  را وارد کنید..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>


            <div className="col-6">
              <div className="price input">
                <label className="input-title" style={{ display: "block" }}>
                 دوره
                </label>
                <select className="select" onChange={(event)=> setCourseID(event.target.value)}>
                    <option value="-1"> دوره مورد نظر را انتخاب نمایید</option>
                   {allCourses.map(course =>(
                    <option value={course._id} key={course._id}>{course.name}</option>
                   ))}
                </select>
                <span className="error-message text-danger"></span>
              </div>
            </div>

            <div className="col-12">
              <div className="bottom-form">
                <div className="submit-btn">
                  <input type="submit" value="افزودن" onClick={createDisCountCode} />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <DataTable title="کدهای تخفیف">
      <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th> کد</th>
              <th>درصد تخفیف %</th>
              <th> تعداد قابل استفاده</th>
              <th> تعداد استفاده شده</th>
              <th>سازنده کد</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {allCode.map((code,index)=>(
            <tr key={code._id}>
              <td>{index + 1}</td>
              <td>{code.code}</td>
              <td>{code.percent}</td>
              <td>{code.max}</td>
              <td>{code.uses}</td>
              <td>{code.creator}</td>

              <td>
                <button onClick={()=> deleteCode(code._id)} type="button" className="btn btn-danger delete-btn">
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
 
export default DisCount;