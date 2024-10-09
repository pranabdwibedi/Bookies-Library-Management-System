import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function Register() {
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [mobNo, setMobNo] = useState();
  const [password, setPassword] = useState("");
  const [password1,setPassword1] = useState('');
  const [isAdmin, SetIsAdmin] = useState(false);
  const [adminSecret, setAdminSecret] = useState("")
  const [message, setMessage] = useState("")
  const navigate = useNavigate()
  const handleSubmit = async (event) => {
    event.preventDefault()
    if(password !== password1){
      setMessage("The password didn't match")
      setTimeout(()=>{
          setMessage('')
      },3000)
      return;
  }
    let data = {
        name : name,
        userId : userId,
        email : email,
        mobileNo : mobNo,
        password : password,
    }
    if(isAdmin){
        data.userType = "ADMIN"
        data.adminSecret = adminSecret
    }

    try{
        await axios.post('http://localhost:8000/LMS/api/v1/users/signup',data).then(response=>{
          setMessage(response.data.message)
          setTimeout(()=>{
            navigate('/login')
          },500)
        }).catch(err=>{
          setMessage(err.response.data.message)
          setTimeout(()=>{
            setMessage('')
          },3000)
        })
        
    }catch(err){
        console.log(err)
    }
  };
  const handleAdminCheck = () => {
    if(isAdmin){
        SetIsAdmin(false)
    }else{
        SetIsAdmin(true)
    }
  };
  return (
    <div className="contentViewport pt-5">
      <div className="d-flex registerPage flex-column justify-content-center align-items-center mt-5">
      <h1>
        <u>Register User</u>
      </h1>
      <form onSubmit={handleSubmit} className="registerForm text-light d-flex flex-wrap flex-column rounded-4 p-4 w-50">
        <div className="d-flex flex-wrap gap-3 justify-content-center">
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">
            Full Name
          </label>
          <input
            className="form-control inputField text-white bg-transparent"
            id="fullName"
            aria-describedby="userName"
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="userId" className="form-label">
            User ID
          </label>
          <input
            className="form-control inputField text-white bg-transparent"
            id="userId"
            aria-describedby="userId"
            type="text"
            placeholder="Enter user ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="emailId" className="form-label">
            Email ID
          </label>
          <input
            className="form-control inputField text-white bg-transparent"
            id="emailId"
            aria-describedby="email"
            type="email"
            placeholder="Enter your email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="mobileNo" className="form-label">
            Mobile No
          </label>
          <input
            className="form-control inputField text-white bg-transparent"
            id="mobileNo" 
            aria-describedby="emailHelp"
            placeholder="Enter your number"
            type="number"
            value={mobNo}
            onChange={(e) => setMobNo(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control inputField text-white bg-transparent"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password1" className="form-label">
            Reenter Password
          </label>
          <input
            type="password"
            className="form-control inputField text-white bg-transparent"
            id="password1"
            placeholder="Enter password"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
          />
        </div>
        </div>
        <div className="mb-3 form-check mx-auto">
          <input
            type="checkbox"
            className="form-check-input bg-transparent"
            id="AdminCheck"
            onClick={handleAdminCheck}
          />
          <label className="form-check-label" htmlFor="AdminCheck">
            ADMIN
          </label>
        </div>
        <div className={`mb-3 w-75 mx-auto ${isAdmin?"":"visually-hidden"}`}>
          <label htmlFor="exampleInputPassword1" className="form-label">
            Secret Code
          </label>
          <input
            type="text"
            className="form-control inputField text-white bg-transparent"
            id="exampleInputPassword1"
            placeholder="Enter admin secret code"
            value={adminSecret}
            onChange={(e) => setAdminSecret(e.target.value)}
          />
        </div>
        <div className="mb-3 text-center">
          <p>
            {message}
          </p>
        </div>
          <button type="submit" className="btn btn-success mx-auto">
            Register
          </button>
      </form>
      </div>
      </div>
  );
}

export default Register;
