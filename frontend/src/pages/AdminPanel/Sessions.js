import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import DataTable from "../../Components/AdminPanel/DataTable/DataTable";
import Input from "../../Components/Form/Input";
import useForm from "../../Hooks/useForm";
import { minValidator } from "../../validators/rules";


export default function Sessions() {
  const [courses, setCourses] = useState([]);
  const [sessionCourseID, setSessionCourseID] = useState('-1');
  const [publishSessionPrice, setPublishSessionPrice] = useState('-1');
  const [sessionVideo, setSessionVideo] = useState({});
  const [allSessions, setAllSessions] = useState([]);
  const [formState, onChangeInputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      time: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    getAllSessions()
    fetch("http://localhost:4000/v1/courses")
      .then((res) => res.json())
      .then((allCourses) => {
        console.log(allCourses);
        setCourses(allCourses);
      });
  }, []);

  function getAllSessions () {
    fetch(`http://localhost:4000/v1/courses/sessions`).then(res => res.json()).then( allSessions => {
    console.log('allSessions',allSessions);  
    setAllSessions(allSessions)})
  }

  const addNewSession =(event)=>{
    event.preventDefault()
    const localStorageData = JSON.parse(localStorage.getItem('user'))
    let formData = new FormData()
    formData.append('title',formState.inputs.title.value)
    formData.append('time',formState.inputs.time.value)
    formData.append('video',sessionVideo)
    formData.append('free',publishSessionPrice)
    fetch(`http://localhost:4000/v1/courses/${sessionCourseID}/sessions`,{
      method:'POST',
      headers:{
        'Authorization':`Bearer ${localStorageData.token}`
      },
      body: formData
    }).then(res =>{
      if(res.ok){
        swal({
          title:'جلسه مورد نظر با موفقیت اضافه گردید',
          icon:'success',
          buttons:"بستن"
        })
      }
    }).then( ()=> getAllSessions())
  }

  const deletesession =(sessionID)=>{
    const localStorageData = JSON.parse(localStorage.getItem('user'))
  swal({
    title:'آیا از حذف این جلسه اطمینان دارید؟',
    icon:'warning',
    buttons:['خیر','بله']
  }).then(result => {
    if(result){
      fetch(`http://localhost:4000/v1/courses/sessions/${sessionID}`,{
        method:'DELETE',
        headers:{
          'Authorization':`Bearer ${localStorageData.token}`
        },
    }).then(res =>{
      if(res.ok){
        swal({
          title:'جلسه مورد نظر با موفقیت حذف شد',
          icon:'success',
          buttons:'بستن'
        })
      }
    }).then(()=>getAllSessions())
  }
})
  }

  return (
    <>
      <div className="container-fluid" id="home-content">
        <div className="container">
          <div className="home-title">
            <span>افزودن جلسه جدید</span>
          </div>
          <form className="form">
            <div className="col-6">
              <div className="name input">
                <label className="input-title">عنوان جلسه</label>
                <Input
                  element="input"
                  onChangeInputHandler={onChangeInputHandler}
                  type="text"
                  id="title"
                  validations={[minValidator(5)]}
                  placeholder="لطفا نام جلسه را وارد کنید..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="price input">
                <label className="input-title">مدت زمان جلسه</label>
                <Input
                  element="input"
                  onChangeInputHandler={onChangeInputHandler}
                  type="text"
                  id="time"
                  validations={[minValidator(5)]}
                  placeholder="لطفا مدت زمان جلسه را وارد کنید..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="price input">
                <label className="input-title" style={{ display: "block" }}>
                  دوره
                </label>
                <select className="select" onChange={event => setSessionCourseID(event.target.value)}>
                    <option value="-1">دوره مدنظر را انتخاب کنید</option>
                  {courses.map((course) => (
                    <option value={course._id} key={course._id}>{course.name}</option>
                  ))}
                </select>
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="price input">
                <label className="input-title" style={{ display: "block" }}>
                 آدرس ویدیو
                </label>
                    <input type='file' onChange={(event => setSessionVideo(event.target.files[0]))}/>
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="price input">
                <label className="input-title" style={{ display: "block" }}>
                نحوه انتشار
                </label>
                <select className="select" onChange={event => setPublishSessionPrice(event.target.value)}>
                    <option value="-1"> نحوه انتشار قسمت جدید را انتخاب کنید</option>
                    <option value='1' >رایگان</option>
                    <option value='0' >غیر رایگان</option>
                
                </select>
                <span className="error-message text-danger"></span>
              </div>
            </div>

            <div className="col-12">
              <div className="bottom-form">
                <div className="submit-btn">
                  <input type="submit" value="افزودن" onClick={addNewSession} />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <DataTable title='جلسه ها'>
      <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th> عنوان</th>
              <th>زمان</th>
              <th>دوره</th>
          
              <th>حذف</th>
    
            </tr>
          </thead>
          <tbody>
            {allSessions.map((session,index)=>(
            <tr key={session._id}>
              <td>{index + 1}</td>
              <td>{session.title}</td>
              <td>{session.time}</td>
              <td>{session.course?.name}</td>

              <td>
                <button onClick={()=> deletesession(session._id)} type="button" className="btn btn-danger delete-btn">
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
