import axios from 'axios'
import React, { useState } from 'react'
import Login from './Login'
import { useNavigate } from 'react-router-dom'

export default function UserIdUpdate({isLogin, setIsLogin, isAdmin, setIsAdmin}) {
    const [userId, setUserId] = useState()
    const [message,setMessage] = useState('')
    const [isAvailable, setIsAvailable] = useState(false)
    const navigate = useNavigate()
    if (!isLogin) {
        return (
          <>
            <Login
              isLogin={isLogin}
              setIsLogin={setIsLogin}
              isAdmin={isAdmin}
              setIsAdmin={setIsAdmin}
            />
          </>
        );
      }
    const checkAvailability = async(event)=>{
        event.preventDefault();
        if(userId === localStorage.getItem('userId')){
            setMessage("You have entered your present user Id")
            setTimeout(()=>{
                setMessage('')
            },4000)
            return
        }
        try{
            await axios.get(`http://localhost:8000/LMS/api/v1/user/userInfo?userId=${userId}`,{
                headers : {
                    "x-access-token" : localStorage.getItem('token')
                }
            }).then(response=>{
                setMessage("User Id is not available, try another one")
                setIsAvailable(false)
                setTimeout(()=>{
                    setMessage('')
                },4000)
            }).catch(err=>{
                setMessage('The user Id is available')
                setTimeout(()=>{
                    setMessage('')
                },4000)
                setIsAvailable(true);
            })
        }catch(err){

        }
    }

    const updateUserId = async() =>{
        const data = {
            userId : localStorage.getItem('userId'),
            newUserId : userId
        }
        try{
            await axios.post('http://localhost:8000/LMS/api/v1/user/updateUserID',data,{
                headers : {
                    "x-access-token" : localStorage.getItem('token')
                }
            }).then(response=>{
                setMessage(response.data.message)
                localStorage.setItem('token','')
                setTimeout(()=>{
                    setMessage('')
                },4000)
                navigate('/login');
            }).catch(err=>{
                console.log(err)
                setMessage(err.response.data.message)
                setTimeout(()=>{
                    setMessage('')
                },4000)
            })
        }catch(err){
            console.log(err)
        }
    }
  return (
    <div className='contentViewport pt-5 d-flex align-items-center justify-content-center'>
      <div className='d-flex flex-column align-items-center gap-4'>
        <h1><u>User ID update</u></h1>
      <div className='IdUpdateCard'>
      <form
          className="d-flex flex-wrap gap-2 align-items-center findBookForm flex-column"
          onSubmit={checkAvailability}
        >
          <label htmlFor="userIdInput">
            <b>Enter your preferred user ID :</b>
          </label>
          <div className="d-flex justify-content-center gap-3 align-items-center">
            <input
              className="form-control w-60 align-self-center"
              id="userIdInput"
              aria-describedby="userIdInput"
              type="text"
              value={userId}
              onChange={(e) => {
                setIsAvailable(false) 
                setUserId(e.target.value)
            }}
            />

            <button type="submit" className="btn btn-success mx-auto">
              Check Availability
            </button>
          </div>
          <p className='fs-5'>
            {message}
          </p>
        </form>
        <div className={`d-flex flex-column align-items-center gap-2 ${isAvailable ? "":"visually-hidden"}`}>
            <span className='fs-4 text-success'><b>@{localStorage.getItem('userId')} ------{'>'} @{userId}</b></span>
            <button className='btn btn-primary' onClick={updateUserId}>Update user ID</button>
        </div>
      </div>
        
      </div>
    </div>
  )
}
