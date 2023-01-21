import React, { useState } from "react";
import { useEffect } from "react";
import swal from "sweetalert";
import DataTable from "../../Components/AdminPanel/DataTable/DataTable";

const Comments = () => {

    const [allComments,setAllComments] = useState([])
    const [commentBody,setCommentBody] = useState({})

   async function getAllComments(){
        const res = await fetch(`http://localhost:4000/v1/comments`)
        const result = await res.json()
            console.log(result);
            setAllComments(result)
    }

    useEffect(()=> {
        getAllComments()
    },[])


    const answerComment = (commentID) => {
        swal({
            title:"متن پاسخ را وارد نمایید",
            content:'input',
            button:'ثبت پاسخ'
        }).then(answer =>{
            if(answer){
                fetch(`http://localhost:4000/v1/comments/answer/${commentID}`,{
                    method:'POST',
                    headers:{
                        "Content-Type":"application/json",
                        'Authorization':`Bearer ${JSON.parse(localStorage.getItem('user')).token}`
                    },
                    body:JSON.stringify({
                        body:answer
                    })
                }).then(res =>{
                    if(res.ok){
                        swal({
                            title:'پاسخ با موفقیت ارسال شد',
                            icon:'success',
                            button:'بستن'
                        }).then(() => getAllComments())
                    }
                })
            }
        })
    }

    const confrimComment = (commentID) =>{
        swal({
            title:"  آیا از تایید کامنت اطمینان دارید؟ ",
            icon:'warning',
            buttons:['خیر','بله']
        }).then(result =>{
            if(result){
                fetch(`http://localhost:4000/v1/comments/accept/${commentID}`,{
                    method:'PUT',
                    headers:{
                        'Authorization':`Bearer ${JSON.parse(localStorage.getItem('user')).token}`
                    }
                }).then(res =>{
                    if(res.ok){
                        swal({
                            title:'کامنت با موفقیت تایید شد',
                            icon:'success',
                            button:'بستن'
                        }).then(() => getAllComments())
                    }
                })
            }
        })
    }
    const rejectComment = (commentID) =>{
        swal({
            title:"  آیا از رد کامنت اطمینان دارید؟ ",
            icon:'warning',
            buttons:['خیر','بله']
        }).then(result =>{
            if(result){
                fetch(`http://localhost:4000/v1/comments/reject/${commentID}`,{
                    method:'PUT',
                    headers:{
                        'Authorization':`Bearer ${JSON.parse(localStorage.getItem('user')).token}`
                    }
                }).then(res =>{
                    if(res.ok){
                        swal({
                            title:'کامنت با موفقیت رد شد',
                            icon:'success',
                            button:'بستن'
                        }).then(() => getAllComments())
                    }
                })
            }
        })
    }
    const deleteComment = (commentID) => {
        swal({
            title:'آیا از حذف این کامنت اطمینان دارید؟',
            icon:'warning',
            buttons:['خیر','بله']
        }).then(result =>{
            if(result){
                fetch(`http://localhost:4000/v1/comments/${commentID}`,{
                    method:'DELETE',
                    headers:{
                        'Authorization':`Bearer ${JSON.parse(localStorage.getItem('user')).token}`
                    }
                }).then(res => {
                    if(res.ok){
                        swal({
                            title:'کامنت مورد نظر با موفقیت حذف شد',
                            icon:'success',
                            button:'بستن'
                        }).then(()=> getAllComments())
                    }
                })
            }
        })
    }
    const banUser = (personCreatorID) => {
        console.log(personCreatorID);
        swal({
            title:'آیا از بن این کامنت اطمینان دارید؟',
            icon:'warning',
            buttons:['خیر','بله']
        }).then(result =>{
            if(result){
                fetch(`http://localhost:4000/v1/users/ban/${personCreatorID}`,{
                    method:'PUT',
                    headers:{
                        'Authorization':`Bearer ${JSON.parse(localStorage.getItem('user')).token}`
                    }
                }).then(res =>{
                    if(res.ok){
                        swal({
                            title:'کاربر مورد نظر با موفقیت بن شد',
                            icon:'success',
                            button:'بستن'
                        })
                    }
                })
            }
        })
    }
    const viewComment = (comment) => {
        setCommentBody(comment.body)
            swal({
                title:commentBody,
                buttons:'بستن'
            })
        
    }
    return ( 
        <>
        <DataTable title='کامنت ها'>
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام کاربر</th>
              <th>دوره </th>
              <th>امتیاز به دوره </th>
              <th>مشاهده</th>
              <th>پاسخ</th>
              <th>تایید</th>
              <th>حذف</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {allComments.map((comment,index)=>(
            <tr key={comment._id}>
              <td className={comment.answer === 1 ? 'bg-info' :'bg-danger'}>{index + 1}</td>
              <td>{comment.creator.name}</td>
              <td>{comment.course}</td>
              <td>
                     {Array(5 - comment.score).fill(0).map(item =>(
                        <img src="/images/svgs/star.svg" alt="score" />
                    ))}
                    {Array(comment.score).fill(0).map(item =>(
                        <img src="/images/svgs/star_fill.svg" alt="score" />
                    ))}
                   
                </td>
              <td>
                <button onClick={()=> viewComment(comment)} type="button" className="btn btn-primary edit-btn">
                  مشاهده
                </button>
              </td>
              <td>
                <button onClick={()=> answerComment(comment._id)} type="button" className="btn btn-primary edit-btn">
                  پاسخ
                </button>
              </td>
                {comment.answer === 1 ? (
                      <td>
                      <button onClick={()=> rejectComment(comment._id)} type="button" className="btn btn-warning edit-btn">
                        رد
                      </button>
                    </td>
                )
                :
                (
                    <td>
                    <button onClick={()=> confrimComment(comment._id)} type="button" className="btn btn-info edit-btn">
                      تایید
                    </button>
                  </td>
                )}
              <td>
                <button onClick={()=> deleteComment(comment._id)} type="button" className="btn btn-danger delete-btn">
                  حذف
                </button>
              </td>
              <td>
                <button onClick={()=> banUser(comment.creator._id)} type="button" className="btn btn-danger delete-btn">
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
 
export default Comments;