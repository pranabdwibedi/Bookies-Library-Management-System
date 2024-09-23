import React, { useState } from "react";
import ValidateToken from "./utils/ValidateToken";
import Login from "./Login";
import axios from "axios";

export default function UserDetailUpdate({ isLogin, isAdmin, setIsAdmin, setIsLogin }) {
    const [userName, setUserName] = useState(localStorage.getItem('name'));
    const [mobileNo,setMobileNo] = useState(localStorage.getItem('mobileNo'));
    const [email, setEmail] = useState(localStorage.getItem('email'));
    const [message, setMessage] = useState('')
  setIsLogin(ValidateToken);
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



  const updateUserDetails = async(event)=>{
    event.preventDefault()
    const data ={
        name : userName,
        userId : localStorage.getItem('userId'),
        email : email,
        mobileNo : mobileNo
    }
    try{
        await axios.post('http://localhost:8000/LMS/api/v1/user/updateDetails',data,{
            headers : {
                "x-access-token" : localStorage.getItem('token')
            }
        }).then(response=>{
            setMessage(response.data.message)
            localStorage.setItem('name',response.data.name)
            localStorage.setItem('email',response.data.email)
            localStorage.setItem('mobileNo',response.data.mobileNo)
            setTimeout(()=>{
                setMessage('')
            },3000)
        }).catch(err=>{
            setMessage(err.response.data.message)
        })
    }catch(err){
        console.log(err)
    }
  }
  return (
    <div className="contentViewport d-flex justify-content-center align-items-center">
      <div className="d-flex updateBookContainer flex-column gap-2 justify-content-center align-items-center">
        <h1>
          <u>Update user details</u>
        </h1>
        <form
          onSubmit={updateUserDetails}
          className='updateBookForm w-100 d-flex flex-wrap justify-content-evenly align-items-center p-2 rounded-2 bg-lightBlue text-white'
        >
          <div className="mb-3">
            <label htmlFor="userName" className="form-label">
              Your Name :
            </label>
            <input
              className="form-control"
              id="userName"
              aria-describedby="userName"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="userEmail" className="form-label">
              Email Address : 
            </label>
            <input
              className="form-control"
              id="userEmail"
              aria-describedby="userEmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="userMobile" className="form-label">
              Mobile Number :
            </label>
            <input
              className="form-control"
              id="userMobile"
              aria-describedby="userMobile"
              type="number"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
            />
          </div>
          <div className="mb-3 w-100 d-flex flex-column">
            <p className="fs-5 mx-auto">{message}</p>
            <button type="submit" className="btn btn-success mx-auto">
              Update Book Details
            </button>
            </div>
        </form>
      </div>
    </div>
  );
}
