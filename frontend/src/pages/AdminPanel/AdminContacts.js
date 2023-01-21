import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import DataTable from "../../Components/AdminPanel/DataTable/DataTable";

const AdminContacts = () => {
    const [allmessages,setAllMessages] = useState([])

    useEffect(()=>{
        getAllMessages()
    },[])
    
    function getAllMessages(){
        fetch(`http://localhost:4000/v1/contact`)
        .then(res => res.json())
        .then(messages =>{
            console.log(messages);
            setAllMessages(messages)
        })
    }
    const answerToMessage = (emailUser)=>{
        const localStorageData = JSON.parse(localStorage.getItem('user'))
        
        swal({
            title:'پاسخ را وارد نمایید',
            content:"input",
            button:'ثبت پاسخ'
        }).then(answer =>{
            const answerToUser ={
                email:emailUser,
                answer:answer
            }
            if(answer.trim().length){
                fetch(`http://localhost:4000/v1/contact/answer`,{
                    method:'POST',
                    headers:{
                        'Content-Type' : 'application/json',
                        'Authorization':`Bearer ${localStorageData.token}`
                    },
                    body:JSON.stringify(answerToUser)
                }).then(res => res.json()).then(result =>{
                    swal({
                        title:'پیغام با موفقیت پاسخ داده شد',
                        icon:'success',
                        buttons:'بستن'
                    })
                    getAllMessages()
                })
          
        }
       
     
    })
}

    const deleteMessage = (messageID)=>{
      swal({
        title:"آیا از حذف این پیغام اطمینان دارید",
        icon:'warning',
        buttons:['خیر','بله']
      }).then(value=>{
        if(value){
            fetch(`http://localhost:4000/v1/contact/${messageID}`,{
                method:'DELETE'
            })
            .then(res => res.json())
            .then(result =>{
                swal({
                    title:'پیغام با موفقیت حذف شد',
                    icon:'success',
                    buttons:'بستن'
                })
                getAllMessages()

            })
        }
      })
    }
    const viewMessage = (messageBody)=>{
        swal({
            title:messageBody,
            button:'بستن'
        })
    }

    return ( 
        <DataTable title="پیغام ها">
              <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام ونام خانوادگی</th>
              <th>شماره</th>
              <th>ایمیل</th>
              <th>مشاهده</th>
              <th>حذف</th>
              <th>پاسخ</th>
            </tr>
          </thead>
          <tbody>
            {allmessages.map((message,index)=>(
            <tr key={message._id}>
              <td className={message.answer === 1 ? 'text-white bg-success' : 'text-white bg-danger'}>{index + 1}</td>
              <td>{message.name}</td>
              <td>{message.phone}</td>
              <td>{message.email}</td>
              <td>
                <button onClick={()=> viewMessage(message.body)} type="button" className="btn btn-info delete-btn">
                  مشاهده پیغام 
                </button>
              </td>
              <td>
                <button onClick={()=> answerToMessage(message.email)} type="button" className="btn btn-primary edit-btn">
                  پاسخ
                </button>
              </td>
              <td>
                <button onClick={()=> deleteMessage(message._id)} type="button" className="btn btn-danger delete-btn">
                  حذف
                </button>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
        </DataTable>
     );
}
 
export default AdminContacts;